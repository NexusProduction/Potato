addEventListener('message',async e=>{
 const d=e.data;if(e.source!==window||!d||!d.potato)return;
 if(d.potato==='get'){const u=await chrome.storage.local.get('usage'),l=await chrome.storage.sync.get('locks');
  window.postMessage({potatoRes:1,usage:u.usage||{},locks:l.locks||[]},'*')}
 if(d.potato==='locks')chrome.storage.sync.set({locks:d.locks});
 if(d.potato==='break')chrome.storage.sync.set({breakEnabled:!!d.enabled});
 if(d.potato==='restore')chrome.storage.local.set({usage:d.days});
});
