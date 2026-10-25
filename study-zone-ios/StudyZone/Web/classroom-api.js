const config={url:'https://igotuhaxmvtzpjhfkskc.supabase.co',key:'sb_publishable_QiCAZ9S2qoE5P4iW9kLxoQ__pp5S3ag'};
const SESSION_KEY='study-zone-account';
let session=null,refreshing=null;
try{session=JSON.parse(sessionStorage.getItem(SESSION_KEY)||'null')}catch{}
const remember=value=>{session=value;try{value?sessionStorage.setItem(SESSION_KEY,JSON.stringify(value)):sessionStorage.removeItem(SESSION_KEY)}catch{}};
function acceptSession(data){if(!data?.access_token||!data?.refresh_token)throw Error('The sign-in response was incomplete. Please try again.');remember({access_token:data.access_token,refresh_token:data.refresh_token,expires_at:data.expires_at||Math.floor(Date.now()/1000)+Number(data.expires_in||3600),user:data.user||null})}
async function raw(path,{method='GET',body,headers={},auth=true}={}){
 if(auth&&session&&session.expires_at*1000<Date.now()+60000){
  if(!refreshing)refreshing=raw('/auth/v1/token?grant_type=refresh_token',{method:'POST',auth:false,body:{refresh_token:session.refresh_token}}).then(acceptSession).catch(error=>{remember(null);throw Error('Your session has expired. Please sign in again.')}).finally(()=>{refreshing=null});
  await refreshing;
 }
 const binary=body instanceof Blob;
 const h={apikey:config.key,...(!binary?{'Content-Type':'application/json'}:{}),...headers};
 if(auth&&session?.access_token)h.Authorization='Bearer '+session.access_token;
 const controller=new AbortController();const timeout=setTimeout(()=>controller.abort(),30000);
 let response;try{response=await fetch(config.url+path,{method,headers:h,body:body===undefined?undefined:binary?body:JSON.stringify(body),signal:controller.signal})}catch{throw Error('Could not connect. Check your internet connection and try again.')}finally{clearTimeout(timeout)}
 const text=await response.text();let data;try{data=text?JSON.parse(text):null}catch{data=null}
 if(!response.ok){const message=data?.msg||data?.error_description||data?.message||data?.error||'The request could not be completed.';throw Error(message)}return data;
}
const table=(name,query='',options={})=>raw('/rest/v1/'+name+query,options);
const upsert=(name,row,conflict)=>table(name,'?on_conflict='+conflict,{method:'POST',body:row,headers:{Prefer:'resolution=merge-duplicates,return=representation'}});
const encode=encodeURIComponent;
export const classroomAPI={
 get user(){return session?.user||null},
 get recovering(){return !!session?.recovery},
 async init(){
  const hash=typeof location==='object'?new URLSearchParams(location.hash.slice(1)):null;
  if(hash?.get('access_token')){const expires=Number(hash.get('expires_in')||3600);remember({access_token:hash.get('access_token'),refresh_token:hash.get('refresh_token'),expires_at:Number(hash.get('expires_at'))||Math.floor(Date.now()/1000)+expires,user:null,recovery:hash.get('type')==='recovery'});history.replaceState(null,'',location.pathname+location.search+'#account')}
  if(!session)return null;
  try{const user=await raw('/auth/v1/user');session.user=user;remember(session);return user}catch{remember(null);return null}
 },
 async login(email,password){const result=await raw('/auth/v1/token?grant_type=password',{method:'POST',auth:false,body:{email,password}});acceptSession(result);return session.user},
 async signup(email,password,name){const redirect=encode('https://cosmicbubblegumgirl.github.io/four-bright-ideas/study-zone/');const result=await raw('/auth/v1/signup?redirect_to='+redirect,{method:'POST',auth:false,body:{email,password,data:{display_name:name}}});if(result?.access_token)acceptSession(result);return result},
 async recover(email){return raw('/auth/v1/recover?redirect_to='+encode('https://cosmicbubblegumgirl.github.io/four-bright-ideas/study-zone/'),{method:'POST',auth:false,body:{email}})},
 async verifyRecovery(email,token,password){const result=await raw('/auth/v1/verify',{method:'POST',auth:false,body:{email,token,type:'recovery'}});acceptSession(result);return this.password(password)},
 async password(password){const user=await raw('/auth/v1/user',{method:'PUT',body:{password}});session.user=user;session.recovery=false;remember(session);return user},
 async verify(email,token){const result=await raw('/auth/v1/verify',{method:'POST',auth:false,body:{email,token,type:'signup'}});acceptSession(result);return session.user},
 async logout(){try{if(session)await raw('/auth/v1/logout?scope=local',{method:'POST'})}catch{}finally{remember(null)}},
 async role(){if(!session?.user)return'guest';const rows=await table('sz_roles','?select=role&user_id=eq.'+encode(session.user.id));return rows?.[0]?.role||'learner'},
 async sessions(){return table('sz_sessions','?select=*&order=starts_at.asc&limit=300')},
 async saveSession(row){if(!session?.user)throw Error('Sign in to publish a session.');return row.id?table('sz_sessions','?id=eq.'+encode(row.id),{method:'PATCH',body:row,headers:{Prefer:'return=representation'}}):table('sz_sessions','',{method:'POST',body:{...row,owner_id:session.user.id},headers:{Prefer:'return=representation'}})},
 async sessionStatus(id,published){return table('sz_sessions','?id=eq.'+encode(id),{method:'PATCH',body:{published},headers:{Prefer:'return=representation'}})},
 async resources(){return table('sz_resources','?select=*&order=created_at.desc&limit=400')},
 async saveResource(row){if(!session?.user)throw Error('Sign in to submit a resource.');return table('sz_resources','',{method:'POST',body:{...row,owner_id:session.user.id},headers:{Prefer:'return=representation'}})},
 async reviewResource(id,published){return table('sz_resources','?id=eq.'+encode(id),{method:'PATCH',body:{published},headers:{Prefer:'return=representation'}})},
 async removeResource(id){return table('sz_resources','?id=eq.'+encode(id),{method:'DELETE'})},
 async upload(file){if(!session?.user)throw Error('Sign in to upload a file.');if(file.size>20*1024*1024)throw Error('Choose a file smaller than 20 MB.');const allowed=['application/pdf','application/vnd.openxmlformats-officedocument.presentationml.presentation','application/vnd.openxmlformats-officedocument.wordprocessingml.document','image/png','image/jpeg','text/plain'];if(!allowed.includes(file.type))throw Error('Choose a PDF, PowerPoint, Word document, PNG, JPEG or text file.');const name=file.name.replace(/[^a-zA-Z0-9._-]/g,'_').slice(-160);const id=typeof crypto.randomUUID==='function'?crypto.randomUUID():Date.now().toString(36)+'-'+Math.random().toString(36).slice(2);const path=session.user.id+'/'+id+'-'+name;await raw('/storage/v1/object/study-zone-resources/'+path,{method:'POST',body:file,headers:{'Content-Type':file.type}});return path},
 async removeFile(path){if(path)await raw('/storage/v1/object/study-zone-resources',{method:'DELETE',body:{prefixes:[path]}})},
 async fileURL(path){const result=await raw('/storage/v1/object/sign/study-zone-resources/'+path,{method:'POST',body:{expiresIn:600}});if(!result?.signedURL)throw Error('The download link could not be created.');return config.url+'/storage/v1'+result.signedURL},
 async rsvps(){return session?.user?table('sz_rsvps','?select=*&order=created_at.desc&limit=1000'):[]},
 async rsvp(session_id,display_name,share_progress,status='going'){if(!session?.user)throw Error('Sign in to register for a session.');const query='?session_id=eq.'+encode(session_id)+'&user_id=eq.'+encode(session.user.id);const body={display_name,share_progress,status};const found=await table('sz_rsvps',query,{method:'PATCH',body,headers:{Prefer:'return=representation'}});if(found.length)return found;return table('sz_rsvps','',{method:'POST',body:{...body,session_id,user_id:session.user.id},headers:{Prefer:'return=representation'}})},
 async attendance(){return session?.user?table('sz_attendance','?select=*&limit=1000'):[]},
 async markAttendance(session_id,user_id,status){return upsert('sz_attendance',{session_id,user_id,status,recorded_by:session.user.id,updated_at:new Date().toISOString()},'session_id,user_id')},
 async feedback(){return session?.user?table('sz_feedback','?select=*&order=created_at.desc&limit=300'):[]},
 async sendFeedback(row){return table('sz_feedback','',{method:'POST',body:{...row,user_id:session.user.id},headers:{Prefer:'return=representation'}})},
 async tutorRequests(){return session?.user?table('sz_tutor_requests','?select=*&order=created_at.desc&limit=200'):[]},
 async requestTutor(row){return upsert('sz_tutor_requests',{...row,user_id:session.user.id},'user_id')},
 async roles(){return table('sz_roles','?select=user_id,role')},
 async approveTutor(user_id){return upsert('sz_roles',{user_id,role:'tutor'},'user_id')},
 async revokeTutor(user_id){return table('sz_roles','?user_id=eq.'+encode(user_id)+'&role=eq.tutor',{method:'DELETE'})},
 async saveProgress(rows){if(!rows.length)return[];return upsert('sz_progress',rows.map(row=>({...row,user_id:session.user.id,updated_at:new Date().toISOString()})),'user_id,subject')},
 async progress(){return session?.user?table('sz_progress','?select=*&limit=1000'):[]},
 async loadState(){return table('sz_study_state','?select=data,updated_at&user_id=eq.'+encode(session.user.id))},
 async saveState(data){return upsert('sz_study_state',{user_id:session.user.id,data,updated_at:new Date().toISOString()},'user_id')},
 async deleteState(){return table('sz_study_state','?user_id=eq.'+encode(session.user.id),{method:'DELETE'})}
};
