"""Small local API for the four portfolio apps. Run with python3 server.py."""
from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler
from pathlib import Path
import hashlib
import hmac
import json
import os
import secrets
import sqlite3
import threading
import time
from urllib.parse import urlparse

ROOT = Path(__file__).resolve().parent
DB = ROOT / 'portfolio.sqlite3'
LOCK = threading.RLock()
APPS = {'billbento', 'trolleypop', 'lingoloom', 'rhythmnest'}


def connect():
    db = sqlite3.connect(DB, timeout=10)
    db.row_factory = sqlite3.Row
    db.execute('PRAGMA foreign_keys=ON')
    return db


with connect() as db:
    db.executescript('''
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY, email TEXT UNIQUE NOT NULL, salt TEXT NOT NULL,
      password_hash TEXT NOT NULL, created_at INTEGER NOT NULL
    );
    CREATE TABLE IF NOT EXISTS sessions (
      token_hash TEXT PRIMARY KEY, user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      expires_at INTEGER NOT NULL
    );
    CREATE TABLE IF NOT EXISTS records (
      user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      app TEXT NOT NULL, collection TEXT NOT NULL, id TEXT NOT NULL,
      data TEXT NOT NULL, updated_at INTEGER NOT NULL,
      PRIMARY KEY(user_id, app, collection, id)
    );
    ''')


class Handler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(ROOT), **kwargs)

    def log_message(self, format, *args):
        print('%s %s' % (self.address_string(), format % args))

    def send_json(self, status, payload, cookie=None):
        body = json.dumps(payload).encode()
        self.send_response(status)
        self.send_header('Content-Type', 'application/json; charset=utf-8')
        self.send_header('Content-Length', str(len(body)))
        self.send_header('Cache-Control', 'no-store')
        self.send_header('X-Content-Type-Options', 'nosniff')
        if cookie is not None:
            self.send_header('Set-Cookie', cookie)
        self.end_headers()
        self.wfile.write(body)

    def body(self):
        size = int(self.headers.get('Content-Length', '0'))
        if size > 65536 or size < 0:
            raise ValueError('Request is too large')
        return json.loads(self.rfile.read(size) or b'{}')

    def auth(self):
        cookie = self.headers.get('Cookie', '')
        token = next((p.strip()[8:] for p in cookie.split(';') if p.strip().startswith('session=')), '')
        if not token:
            return None
        digest = hashlib.sha256(token.encode()).hexdigest()
        with connect() as db:
            row = db.execute('SELECT user_id FROM sessions WHERE token_hash=? AND expires_at>?',
                             (digest, int(time.time()))).fetchone()
        return row['user_id'] if row else None

    def route(self):
        return [part for part in urlparse(self.path).path.split('/') if part]

    def do_GET(self):
        route = self.route()
        if route == ['api', 'health']:
            return self.send_json(200, {'ok': True})
        if route == ['api', 'me']:
            user = self.auth()
            return self.send_json(200 if user else 401, {'user': user})
        if len(route) == 4 and route[0] == 'api' and route[1] in APPS and route[2] == 'records':
            user = self.auth()
            if not user:
                return self.send_json(401, {'error': 'Sign in to sync your records.'})
            with connect() as db:
                rows = db.execute('SELECT id, data FROM records WHERE user_id=? AND app=? AND collection=? ORDER BY updated_at DESC',
                                  (user, route[1], route[3])).fetchall()
            return self.send_json(200, {'records': [json.loads(r['data']) for r in rows]})
        path = urlparse(self.path).path
        if path.endswith('/') or path.endswith(('.html', '.css', '.js', '.svg')):
            return super().do_GET()
        return self.send_json(404, {'error': 'Not found.'})

    def do_POST(self):
        route = self.route()
        try:
            data = self.body()
            if route in (['api', 'signup'], ['api', 'login']):
                email = str(data.get('email', '')).strip().lower()
                password = str(data.get('password', ''))
                if '@' not in email or len(email) > 254 or len(password) < 10:
                    return self.send_json(400, {'error': 'Use a valid email and a password of at least 10 characters.'})
                with LOCK, connect() as db:
                    if route[-1] == 'signup':
                        salt = secrets.token_hex(16)
                        digest = hashlib.pbkdf2_hmac('sha256', password.encode(), bytes.fromhex(salt), 260000).hex()
                        user_id = secrets.token_hex(16)
                        try:
                            db.execute('INSERT INTO users VALUES (?,?,?,?,?)', (user_id, email, salt, digest, int(time.time())))
                        except sqlite3.IntegrityError:
                            return self.send_json(409, {'error': 'This email is already registered.'})
                    else:
                        row = db.execute('SELECT * FROM users WHERE email=?', (email,)).fetchone()
                        digest = hashlib.pbkdf2_hmac('sha256', password.encode(), bytes.fromhex(row['salt']) if row else b'0'*16, 260000).hex()
                        if not row or not hmac.compare_digest(digest, row['password_hash']):
                            return self.send_json(401, {'error': 'Email or password does not match.'})
                        user_id = row['id']
                    token = secrets.token_urlsafe(40)
                    db.execute('INSERT INTO sessions VALUES (?,?,?)', (hashlib.sha256(token.encode()).hexdigest(), user_id, int(time.time())+604800))
                return self.send_json(200, {'user': user_id}, 'session=%s; HttpOnly; SameSite=Strict; Path=/; Max-Age=604800' % token)
            if route == ['api', 'logout']:
                cookie = self.headers.get('Cookie', '')
                token = next((p.strip()[8:] for p in cookie.split(';') if p.strip().startswith('session=')), '')
                with connect() as db:
                    db.execute('DELETE FROM sessions WHERE token_hash=?', (hashlib.sha256(token.encode()).hexdigest(),))
                return self.send_json(200, {'ok': True}, 'session=; HttpOnly; SameSite=Strict; Path=/; Max-Age=0')
            if len(route) == 4 and route[0] == 'api' and route[1] in APPS and route[2] == 'records':
                user = self.auth()
                if not user:
                    return self.send_json(401, {'error': 'Sign in first.'})
                record_id = str(data.get('id', ''))
                if not record_id or len(record_id) > 100 or len(route[3]) > 50 or not isinstance(data, dict):
                    return self.send_json(400, {'error': 'Invalid record.'})
                with connect() as db:
                    db.execute('INSERT INTO records VALUES (?,?,?,?,?,?) ON CONFLICT(user_id,app,collection,id) DO UPDATE SET data=excluded.data, updated_at=excluded.updated_at',
                               (user, route[1], route[3], record_id, json.dumps(data), int(time.time())))
                return self.send_json(200, {'ok': True})
            return self.send_json(404, {'error': 'Unknown route.'})
        except (ValueError, json.JSONDecodeError, TypeError):
            return self.send_json(400, {'error': 'Invalid request.'})

    def do_DELETE(self):
        route = self.route()
        if len(route) == 5 and route[0] == 'api' and route[1] in APPS and route[2] == 'records':
            user = self.auth()
            if not user:
                return self.send_json(401, {'error': 'Sign in first.'})
            with connect() as db:
                db.execute('DELETE FROM records WHERE user_id=? AND app=? AND collection=? AND id=?',
                           (user, route[1], route[3], route[4]))
            return self.send_json(200, {'ok': True})
        return self.send_json(404, {'error': 'Unknown route.'})


if __name__ == '__main__':
    host = os.environ.get('PORTFOLIO_HOST', '127.0.0.1')
    port = int(os.environ.get('PORT', '8000'))
    print('Portfolio apps at http://%s:%d' % (host, port))
    ThreadingHTTPServer((host, port), Handler).serve_forever()
