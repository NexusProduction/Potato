const cat=u=>{try{const x=new URL(u),h=x.hostname;
if(/(^|\.)youtube\.com$/.test(h))return x.pathname.startsWith('/shorts')?'ys':'yt';
if(/(^|\.)(x|twitter)\.com$/.test(h))return'x';
if(/(^|\.)facebook\.com$/.test(h))return'fb';if(/(^|\.)instagram\.com$/.test(h))return'ig';if(/(^|\.)tiktok\.com$/.test(h))return'tt'}catch(e){}};
chrome.alarms.create('t',{periodInMinutes:1});
chrome.alarms.onAlarm.addListener(async()=>{
 if(await chrome.idle.queryState(60)!=='active')return;
 const[t]=await chrome.tabs.query({active:true,lastFocusedWindow:true});
 const c=t&&cat(t.url);if(!c)return;
 const d=new Date().toLocaleDateString('en-CA');
 const{usage={}}=await chrome.storage.local.get('usage');
 (usage[d]=usage[d]||{})[c]=(usage[d][c]||0)+60;
 await chrome.storage.local.set({usage});});
