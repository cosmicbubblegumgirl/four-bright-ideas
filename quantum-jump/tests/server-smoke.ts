// One-time release validation. Run on the backend, never in a student's browser.
// All generated accounts, uploads and rows are removed in finally.
export async function releaseCheck(project:string, service:string, anon:string) {
 const checks:Record<string,boolean|string>={},users:string[]=[];let filePath='';
 async function call(path:string,token=service,method='GET',body?:unknown,extra={}) {
  const r=await fetch(project+path,{method,headers:{apikey:token===service?service:anon,Authorization:`Bearer ${token}`,'Content-Type':'application/json',...extra},body:body===undefined?undefined:JSON.stringify(body)});const text=await r.text();let data;try{data=JSON.parse(text)}catch{data=text}return {ok:r.ok,status:r.status,data};
 }
 const lock=await call('/rest/v1/rpc/qj_release_check',service,'POST',{});if(!lock.ok||lock.data!==true)return;
 function check(name:string,ok:boolean){checks[name]=ok;if(!ok)throw new Error(name)}
 try {
  const settings=await call('/auth/v1/settings',anon);checks.email_confirmation_required=settings.data.mailer_autoconfirm===false;
  const sessions=[];
  for(let i=0;i<2;i++){
   const email=`qj-release-${crypto.randomUUID()}@example.com`,password=crypto.randomUUID()+crypto.randomUUID();
   const created=await call('/auth/v1/admin/users',service,'POST',{email,password,email_confirm:true,user_metadata:{display_name:'Temporary release check'}});check('create_test_account_'+i,created.ok);users.push(created.data.id);
   const login=await call('/auth/v1/token?grant_type=password',anon,'POST',{email,password});check('password_login_'+i,login.ok&&!!login.data.access_token);sessions.push(login.data);
  }
  const a=sessions[0].access_token,b=sessions[1].access_token;
  const profile=await call('/rest/v1/qj_profiles',a,'POST',{user_id:users[0],display_name:'Release check'});check('profile_save',profile.ok);
  const save=await call('/rest/v1/qj_records',a,'POST',{user_id:users[0],kind:'note',record_key:'release-test',data:{text:'temporary'}});check('private_note_save',save.ok);
  const own=await call('/rest/v1/qj_records?record_key=eq.release-test',a);check('own_note_read',own.ok&&own.data.length===1);
  const other=await call('/rest/v1/qj_records?record_key=eq.release-test',b);check('other_student_cannot_read_note',other.ok&&other.data.length===0);
  const forged=await call('/rest/v1/qj_records',b,'POST',{user_id:users[0],kind:'note',record_key:'forged',data:{}});check('other_student_cannot_write_note',!forged.ok);
  const grant=await call('/rest/v1/qj_educators',b,'POST',{user_id:users[1]});check('student_cannot_self_grant_educator',!grant.ok);
  const denied=await call('/rest/v1/qj_resources',b,'POST',{owner_id:users[1],title:'Temporary',paper:1,topic:'forces',kind:'lesson'});check('student_cannot_upload_resource',!denied.ok);
  check('grant_test_educator',(await call('/rest/v1/qj_educators',service,'POST',{user_id:users[0]})).ok);
  filePath=users[0]+'/release-check.txt';
  const upload=await fetch(project+'/storage/v1/object/quantum-jump/'+filePath,{method:'POST',headers:{apikey:anon,Authorization:'Bearer '+a,'Content-Type':'text/plain'},body:'Temporary Quantum Jump release check'});check('educator_file_upload',upload.ok);await upload.text();
  const resource=await call('/rest/v1/qj_resources',a,'POST',{owner_id:users[0],title:'Temporary release check',paper:1,topic:'forces',kind:'lesson',file_path:filePath,published:false},{Prefer:'return=representation'});check('educator_draft_save',resource.ok);const id=resource.data[0].id;
  const hidden=await call('/rest/v1/qj_resources?id=eq.'+id,b);check('draft_hidden_from_students',hidden.ok&&hidden.data.length===0);
  const signDenied=await call('/storage/v1/object/sign/quantum-jump/'+filePath,b,'POST',{expiresIn:60});check('draft_file_not_downloadable_by_students',!signDenied.ok);
  check('educator_publish',(await call('/rest/v1/qj_resources?id=eq.'+id,a,'PATCH',{published:true})).ok);
  const published=await call('/rest/v1/qj_resources?id=eq.'+id,b);check('published_visible_to_students',published.ok&&published.data.length===1);
  const signed=await call('/storage/v1/object/sign/quantum-jump/'+filePath,b,'POST',{expiresIn:60});check('published_file_student_download',signed.ok&&!!signed.data.signedURL);
  const newton=await call('/functions/v1/quantum-jump',b,'POST',{action:'chat',message:'Explain momentum',topic:'momentum'});check('newton_authenticated_response',newton.ok&&typeof newton.data.answer==='string');checks.newton_mode=newton.data.mode;
  const unauth=await call('/functions/v1/quantum-jump',anon,'POST',{action:'chat',message:'momentum'});check('newton_rejects_anonymous',unauth.status===401);
  const cfg=await call('/functions/v1/quantum-jump',b,'POST',{action:'configure'});check('model_settings_educator_only',cfg.status===403);
  const refresh=await call('/auth/v1/token?grant_type=refresh_token',anon,'POST',{refresh_token:sessions[1].refresh_token});check('session_refresh',refresh.ok&&!!refresh.data.access_token);
  check('logout',(await call('/auth/v1/logout',refresh.data.access_token,'POST')).ok);
 }catch(e){checks.failure=e instanceof Error?e.message:'unknown';}
 finally {
  if(filePath)checks.cleanup_file=(await call('/storage/v1/object/quantum-jump',service,'DELETE',{prefixes:[filePath]})).ok;
  for(const id of users)checks['cleanup_user_'+users.indexOf(id)]=(await call('/auth/v1/admin/users/'+id,service,'DELETE')).ok;
  await call('/rest/v1/rpc/qj_release_check',service,'POST',{p_report:checks});
 }
}
