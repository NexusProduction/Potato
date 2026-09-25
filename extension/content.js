const TH={yt:['#ff0000','#fff','YouTube is eating your time'],ys:['#c4001a','#fff','Shorts rot your brain'],x:['#000','#fff','X is frying your focus'],fb:['#1877f2','#fff','Facebook is draining you'],ig:['#d62976','#fff','Instagram is draining your attention'],tt:['#111','#fff','TikTok is draining your attention']};
const NAME={yt:'YouTube',ys:'YouTube Shorts',x:'X',fb:'Facebook',ig:'Instagram',tt:'TikTok'};
const cat=()=>{const h=location.hostname;if(/youtube\.com$/.test(h))return location.pathname.startsWith('/shorts')?'ys':'yt';if(/facebook\.com$/.test(h))return'fb';if(/instagram\.com$/.test(h))return'ig';if(/tiktok\.com$/.test(h))return'tt';return'x'};
const hm=s=>{const[a,b]=s.split(':');return a*60+ +b};
const inSched=l=>{const n=new Date(),m=n.getHours()*60+n.getMinutes(),a=hm(l.from),b=hm(l.to);return a<b?m>=a&&m<b:m>=a||m<b};
const active=(l,c)=>(l.app==c||(l.app=='yt'&&c=='ys'))&&((l.until&&l.until>Date.now())||(l.from&&inSched(l)));
let bn,lk,breakLayer=null,breakStarted=Date.now(),lastCat=cat(),breakOn=false,breakUntil=0;
async function tick(){
 if(!chrome.runtime?.id)return;
 const c=cat();
 const now=Date.now();
 if(c!==lastCat){lastCat=c;breakStarted=now}
 const {breakEnabled=false}=await chrome.storage.sync.get('breakEnabled');breakOn=!!breakEnabled;
 if(breakOn&&now-breakStarted>=3600000&&now>=breakUntil){breakUntil=now+30000;breakStarted=now+30000;document.querySelectorAll('video').forEach(v=>v.pause());showBreak()}
 if(breakLayer&&now<breakUntil){document.querySelectorAll('video').forEach(v=>v.pause());updateBreak();return}
 if(breakLayer&&now>=breakUntil){breakLayer.remove();breakLayer=null}
 if(!chrome.runtime?.id)return;
 const [{usage={}},{locks=[]}]=await Promise.all([chrome.storage.local.get('usage'),chrome.storage.sync.get('locks')]);
 const hit=locks.find(l=>active(l,c));
 if(hit){document.querySelectorAll('video').forEach(v=>v.pause());
  if(!lk){lk=document.createElement('div');lk.style.cssText='position:fixed;inset:0;z-index:2147483647;background:#0b0b10;color:#f3f0e8;display:flex;flex-direction:column;align-items:center;justify-content:center;font:20px system-ui;text-align:center';document.documentElement.append(lk)}
  lk.innerHTML=`<div style="font-size:80px">🥔🔒</div><h1>${NAME[c]} is locked</h1><p style="opacity:.6">${hit.until?'Until '+new Date(hit.until).toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'}):'Locked '+hit.from+' to '+hit.to+' daily'}</p>`;
  if(bn)bn.hidden=true;return}
 if(lk){lk.remove();lk=null}
 const mins=Math.floor(((usage[new Date().toLocaleDateString('en-CA')]||{})[c]||0)/60),[bg,fg,msg]=TH[c];
 if(!bn){bn=document.createElement('div');document.documentElement.append(bn)}
 bn.hidden=false;
 bn.style.cssText=`position:fixed;top:6px;left:50%;transform:translateX(-50%);z-index:2147483646;padding:5px 14px;border-radius:99px;font:600 13px system-ui;pointer-events:none;box-shadow:0 2px 12px #0008;background:${bg};color:${fg};border:1px solid #fff5`;
 bn.textContent='🥔 '+(mins>=10?msg+': '+mins+' min today':'Rots your brain after 10 min. '+mins+' min so far');
}
setInterval(tick,2000);tick();

function showBreak(){if(breakLayer)return;breakLayer=document.createElement('div');breakLayer.style.cssText='position:fixed;inset:0;z-index:2147483647;background:radial-gradient(circle at 50% 35%,#193d7a,#060d20 70%);color:#f4f1e6;display:flex;flex-direction:column;align-items:center;justify-content:center;font:18px system-ui;text-align:center;padding:24px';document.documentElement.append(breakLayer);updateBreak()}
function updateBreak(){if(!breakLayer)return;const left=Math.max(0,Math.ceil((breakUntil-Date.now())/1000));breakLayer.innerHTML='<div style="font-size:72px">🥔</div><h1 style="font-size:28px;margin:8px 0">30-second potato break</h1><p style="opacity:.7;margin:0 0 14px">Pause. Breathe. Then continue.</p><div style="font:800 54px system-ui">'+left+'</div><p style="opacity:.55;font-size:12px">Your video is paused during the break.</p>'}