window.CloudStore = (() => {
  const config = window.CloudConfig || {};
  const enabled = !!(config.url && config.publishableKey);
  const sessionKey = 'four-bright-ideas:session';
  let session = null;

  function remember(next) {
    session = next;
    if (next) localStorage.setItem(sessionKey, JSON.stringify(next));
    else localStorage.removeItem(sessionKey);
  }

  async function call(path, options = {}, authorized = false) {
    const headers = {
      apikey: config.publishableKey,
      'Content-Type': 'application/json',
      ...options.headers
    };
    if (authorized && session?.access_token) headers.Authorization = `Bearer ${session.access_token}`;
    const response = await fetch(config.url + path, {...options, headers});
    const text = await response.text();
    let data;
    try { data = text ? JSON.parse(text) : null; } catch { data = null; }
    if (!response.ok) throw Error(data?.msg || data?.message || data?.error_description || data?.error || `Request failed (${response.status})`);
    return data;
  }

  function setSession(data) {
    remember({
      access_token: data.access_token,
      refresh_token: data.refresh_token,
      expires_at: Math.floor(Date.now() / 1000) + Number(data.expires_in || 3600),
      user: data.user
    });
  }

  async function refresh() {
    if (!session?.refresh_token) return false;
    try {
      const data = await call('/auth/v1/token?grant_type=refresh_token', {
        method: 'POST', body: JSON.stringify({refresh_token: session.refresh_token})
      });
      setSession(data);
      return true;
    } catch { remember(null); return false; }
  }

  async function init() {
    if (!enabled) return {user: null};
    try { session = JSON.parse(localStorage.getItem(sessionKey) || 'null'); } catch { session = null; }
    if (!session) return {user: null};
    if (session.expires_at < Date.now() / 1000 + 90 && !(await refresh())) return {user: null};
    try {
      const person = await call('/auth/v1/user', {}, true);
      if (person.id !== session.user?.id) throw Error('Session mismatch');
      return {user: person.id};
    } catch { remember(null); return {user: null}; }
  }

  async function signIn(email, password) {
    const data = await call('/auth/v1/token?grant_type=password', {
      method: 'POST', body: JSON.stringify({email, password})
    });
    setSession(data);
    return {user: data.user.id};
  }

  async function signUp(email, password) {
    const redirect = encodeURIComponent(location.origin + location.pathname);
    const data = await call('/auth/v1/signup?redirect_to=' + redirect, {
      method: 'POST', body: JSON.stringify({email, password})
    });
    if (data.access_token) { setSession(data); return {user: data.user.id}; }
    return {pending: true};
  }

  async function signOut() {
    if (session?.access_token) {
      try { await call('/auth/v1/logout', {method: 'POST'}, true); } catch { /* Clear local session anyway. */ }
    }
    remember(null);
  }

  async function access(path, options) {
    if (session?.expires_at < Date.now() / 1000 + 90) {
      if (!(await refresh())) throw Error('Your session has expired. Please sign in again.');
    }
    return call('/rest/v1/portfolio_records' + path, options, true);
  }

  async function get(app, collection) {
    const query = `?select=data&app=eq.${encodeURIComponent(app)}&collection=eq.${encodeURIComponent(collection)}&order=updated_at.desc`;
    const rows = await access(query);
    return rows.map(row => row.data);
  }

  async function put(app, collection, record) {
    const row = {user_id: session.user.id, app, collection, id: record.id, data: record, updated_at: new Date().toISOString()};
    await access('?on_conflict=user_id,app,collection,id', {
      method: 'POST', headers: {Prefer: 'resolution=merge-duplicates,return=minimal'}, body: JSON.stringify(row)
    });
  }

  async function remove(app, collection, id) {
    await access(`?user_id=eq.${encodeURIComponent(session.user.id)}&app=eq.${encodeURIComponent(app)}&collection=eq.${encodeURIComponent(collection)}&id=eq.${encodeURIComponent(id)}`, {method: 'DELETE'});
  }

  return {enabled, init, signIn, signUp, signOut, get, put, remove};
})();
