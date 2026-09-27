// Records work on this device by default and sync to the local server when signed in.
window.Workbench = (() => {
  const app = document.body.dataset.app;
  const key = collection => `${app}:${collection}`;
  let server = false, user = null, cloud = false;
  async function request(path, options = {}) {
    const response = await fetch(path, {credentials:'same-origin', headers:{'Content-Type':'application/json'}, ...options});
    const result = await response.json();
    if (!response.ok) throw Error(result.error || 'Something went wrong.');
    return result;
  }
  async function init() {
    cloud = !!window.CloudStore?.enabled;
    if (cloud) {
      try { user = (await CloudStore.init()).user; }
      catch (error) { toast(error.message); }
    } else {
      try { await request('/api/health'); server = true; } catch { server = false; }
      if (server) { try { user = (await request('/api/me')).user; } catch { user = null; } }
    }
    const badge = document.querySelector('[data-sync]');
    if (badge) badge.textContent = user ? '● Synced account' : '◌ Saved on this device';
    const account = document.querySelector('[data-account]');
    if (account) {
      account.hidden = !server && !cloud;
      account.textContent = user ? 'Sign out' : 'Sign in to sync';
      account.onclick = async () => {
        if (user) {
          if (cloud) await CloudStore.signOut();
          else await request('/api/logout',{method:'POST'});
          location.reload();
        } else document.querySelector('#account-dialog').showModal();
      };
    }
    const form = document.querySelector('#account-form');
    if (form) form.onsubmit = async e => {
      e.preventDefault();
      const mode = e.submitter?.value || 'login';
      try {
        const email = form.elements.namedItem('email').value;
        const password = form.elements.namedItem('password').value;
        const result = cloud
          ? await (mode === 'signup' ? CloudStore.signUp(email, password) : CloudStore.signIn(email, password))
          : await request('/api/'+mode,{method:'POST',body:JSON.stringify({email,password})});
        if (result.pending) {
          document.querySelector('#account-error').style.color = '#285d4b';
          document.querySelector('#account-error').textContent = 'Check your email to confirm your account, then return here to sign in.';
          return;
        }
        location.reload();
      } catch (error) { document.querySelector('#account-error').textContent = error.message; }
    };
    return {server,user};
  }
  async function get(collection, fallback = []) {
    if (cloud && user) {
      try { return await CloudStore.get(app, collection); }
      catch (error) { toast(error.message); return []; }
    }
    if (server && user) {
      try { return (await request(`/api/${app}/records/${collection}`)).records; }
      catch (error) { toast(error.message); return []; }
    }
    try { return JSON.parse(localStorage.getItem(key(collection))) ?? fallback; } catch { return fallback; }
  }
  async function put(collection, record) {
    if (cloud && user) await CloudStore.put(app, collection, record);
    else if (server && user) await request(`/api/${app}/records/${collection}`,{method:'POST',body:JSON.stringify(record)});
    else { const items = await get(collection); localStorage.setItem(key(collection),JSON.stringify([record,...items.filter(item=>item.id!==record.id)])); }
  }
  async function remove(collection, id) {
    if (cloud && user) await CloudStore.remove(app, collection, id);
    else if (server && user) await request(`/api/${app}/records/${collection}/${encodeURIComponent(id)}`,{method:'DELETE'});
    else localStorage.setItem(key(collection),JSON.stringify((await get(collection)).filter(item=>item.id!==id)));
  }
  function id() { return crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(36)+Math.random().toString(36).slice(2); }
  function esc(value) { return String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }
  function money(value) { return new Intl.NumberFormat('en-ZA',{style:'currency',currency:'ZAR'}).format(Number(value)||0); }
  function toast(message) { let el=document.querySelector('#toast'); if(!el){el=document.createElement('div');el.id='toast';el.setAttribute('role','status');document.body.append(el);} el.textContent=message;el.classList.add('show');setTimeout(()=>el.classList.remove('show'),3500); }
  function download(name, content, type='text/plain') { const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([content],{type}));a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(a.href),2000); }
  return {init,get,put,remove,id,esc,money,toast,download};
})();
