const TH={yt:['#ff0000','#fff','YouTube is eating your time'],ys:['#c4001a','#fff','Shorts rot your brain'],x:['#000','#fff','X is frying your focus'],fb:['#1877f2','#fff','Facebook is draining you']};
const NAME={yt:'YouTube',ys:'YouTube Shorts',x:'X',fb:'Facebook'};
const cat=()=>{const h=location.hostname;if(/youtube\.com$/.test(h))return location.pathname.startsWith('/shorts')?'ys':'yt';return/facebook/.test(h)?'fb':'x'};
const hm=s=>{const[a,b]=s.split(':');return a*60+ +b};
const inSched=l=>{const n=new Date(),m=n.getHours()*60+n.getMinutes(),a=hm(l.from),b=hm(l.to);return a<b?m>=a&&m<b:m>=a||m<b};
const active=(l,c)=>(l.app==c||(l.app=='yt'&&c=='ys'))&&((l.until&&l.until>Date.now())||(l.from&&inSched(l)));
let bn,lk;
async function tick(){
 if(!chrome.runtime?.id)return;
 const c=cat(),[{usage={}},{locks=[]}]=await Promise.all([chrome.storage.local.get('usage'),chrome.storage.sync.get('locks')]);
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
