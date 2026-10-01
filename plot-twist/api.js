import {config} from './config.js';
const SESSION_KEY='plot-twist-session';
const emailRedirect=()=>'?redirect_to='+encodeURIComponent(location.origin+location.pathname);
const parse=(s,f=null)=>{try{return JSON.parse(s)||f}catch{return f}};
let session=parse(localStorage.getItem(SESSION_KEY));let refreshing;
function setSession(value){session=value;value?localStorage.setItem(SESSION_KEY,JSON.stringify(value)):localStorage.removeItem(SESSION_KEY);}
async function raw(path,{method='GET',body,headers={},auth=true}={}){
 if(auth&&session&&session.expires_at*1000<Date.now()+60000&&session.refresh_token){
  if(!refreshing)refreshing=raw('/auth/v1/token?grant_type=refresh_token',{method:'POST',body:{refresh_token:session.refresh_token},auth:false}).then(s=>{setSession({...s,expires_at:s.expires_at||Math.floor(Date.now()/1000)+s.expires_in});}).catch(e=>{setSession(null);throw e}).finally(()=>refreshing=null);
  await refreshing;
 }
 const h={apikey:config.key,...(body instanceof File?{}:{'Content-Type':'application/json'}),...headers};
 if(auth&&session?.access_token)h.Authorization=`Bearer ${session.access_token}`;
 let r;try{r=await fetch(config.url+path,{method,headers:h,body:body===undefined?undefined:body instanceof File?body:JSON.stringify(body),signal:AbortSignal.timeout(path.includes('/functions/')?60000:25000)});}catch{throw new Error('Could not reach the server. Check your connection and try again.');}
 const text=await r.text();const data=parse(text,text);
 if(!r.ok)throw new Error(typeof data==='object'?(data.msg||data.error_description||data.message||data.error||`Request failed (${r.status})`):`Request failed (${r.status})`);
 return data;
}
export const api={
 get session(){return session},
 async login(email,password){const s=await raw('/auth/v1/token?grant_type=password',{method:'POST',body:{email,password},auth:false});setSession({...s,expires_at:s.expires_at||Math.floor(Date.now()/1000)+s.expires_in});return s;},
 async signup(email,password,name){const s=await raw('/auth/v1/signup'+emailRedirect(),{method:'POST',body:{email,password,data:{display_name:name}},auth:false});if(s.access_token)setSession({...s,expires_at:s.expires_at||Math.floor(Date.now()/1000)+s.expires_in});return s;},
 async confirm(email,token){const s=await raw('/auth/v1/verify',{method:'POST',body:{email,token,type:'signup'},auth:false});if(s.access_token)setSession({...s,expires_at:s.expires_at||Math.floor(Date.now()/1000)+s.expires_in});return s;},
 async resend(email){return raw('/auth/v1/resend'+emailRedirect(),{method:'POST',body:{email,type:'signup'},auth:false});},
 async logout(){try{if(session)await raw('/auth/v1/logout?scope=local',{method:'POST'});}catch{}finally{setSession(null);}},
 async recover(email){return raw('/auth/v1/recover'+emailRedirect(),{method:'POST',body:{email},auth:false});},
 async recoveryCode(email,token,password){const s=await raw('/auth/v1/verify',{method:'POST',body:{email,token,type:'recovery'},auth:false});setSession({...s,expires_at:s.expires_at||Math.floor(Date.now()/1000)+s.expires_in});return raw('/auth/v1/user',{method:'PUT',body:{password}});},
 async password(password){return raw('/auth/v1/user',{method:'PUT',body:{password}});},
 async user(){return raw('/auth/v1/user')},
 async records(){return raw('/rest/v1/pt_records?select=kind,record_key,data,updated_at')},
 async save(kind,key,data){return raw('/rest/v1/pt_records?on_conflict=user_id,kind,record_key',{method:'POST',body:{user_id:session.user.id,kind,record_key:key,data,updated_at:new Date().toISOString()},headers:{Prefer:'resolution=merge-duplicates'}})},
 async remove(kind,key){return raw(`/rest/v1/pt_records?kind=eq.${encodeURIComponent(kind)}&record_key=eq.${encodeURIComponent(key)}`,{method:'DELETE'})},
 async profile(name,preferences){return raw('/rest/v1/pt_profiles?on_conflict=user_id',{method:'POST',body:{user_id:session.user.id,display_name:name,preferences},headers:{Prefer:'resolution=merge-duplicates'}})},
 async getProfile(){return raw('/rest/v1/pt_profiles?select=display_name,preferences')},
 async educator(){return raw('/rest/v1/qj_educators?select=user_id')},
 async resources(){return raw('/rest/v1/pt_resources?select=*&order=created_at.desc')},
 async upload(file){const path=`${session.user.id}/${crypto.randomUUID()}-${file.name.replace(/[^a-zA-Z0-9._-]/g,'_')}`;await raw('/storage/v1/object/plot-twist/'+path,{method:'POST',body:file,headers:{'Content-Type':file.type}});return path;},
 async resource(data){return raw('/rest/v1/pt_resources',{method:'POST',body:{...data,owner_id:session.user.id},headers:{Prefer:'return=representation'}})},
 async editResource(id,data){return raw(`/rest/v1/pt_resources?id=eq.${encodeURIComponent(id)}`,{method:'PATCH',body:data})},
 async deleteResource(id){return raw(`/rest/v1/pt_resources?id=eq.${encodeURIComponent(id)}`,{method:'DELETE'})},
 async deleteFile(path){return raw('/storage/v1/object/plot-twist',{method:'DELETE',body:{prefixes:[path]}})},
 async fileUrl(path){const r=await raw('/storage/v1/object/sign/plot-twist/'+path,{method:'POST',body:{expiresIn:300}});return config.url+'/storage/v1'+r.signedURL;},
 async newton(data){return raw('/functions/v1/'+config.function,{method:'POST',body:data})},
 acceptRedirect(){if(location.hash.includes('access_token=')){const p=new URLSearchParams(location.hash.slice(1));const token=p.get('access_token');const payload=parse(atob(token.split('.')[1].replace(/-/g,'+').replace(/_/g,'/')));setSession({access_token:token,refresh_token:p.get('refresh_token'),expires_at:Number(p.get('expires_at'))||Math.floor(Date.now()/1000)+Number(p.get('expires_in')||3600),user:{id:payload.sub,email:payload.email}});location.hash=p.get('type')==='recovery'?'account':'home';return p.get('type');}return null;}
};
