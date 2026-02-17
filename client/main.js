import {NanoFrame} from "./nanoFrame.js";

let macro = [];

async function loadModules(){
  const res = await fetch("http://localhost:3000/api/modules");
  const data = await res.json();

  document.getElementById("modules").innerHTML =
    data.map(m=>`
      <button onclick="select('${m.id}')">
        ${m.name} ${m.price===0?"FREE":"$"+m.price}
      </button>
    `).join("");
}

window.select = async(id)=>{
  const r = await fetch("http://localhost:3000/api/check-module",{
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify({id})
  });

  const m = await r.json();
  macro.push({select:m});

  if(m.price>0){
    alert("ต้องชำระเงิน");
  }
};

window.build = async()=>{
  const prompt = document.getElementById("prompt").value;

  const r = await fetch("http://localhost:3000/api/ai-build",{
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify({prompt})
  });

  const data = await r.json();
  NanoFrame.mount(data.html);

  macro.push({prompt});

  await fetch("http://localhost:3000/api/record",{
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify(macro)
  });
};

loadModules();
import { makeDraggable } from "./dragDrop.js";

// ตัวอย่างให้ทุก element ที่สร้างสามารถลากได้
NanoFrame.mount(data.html);
data.html.split('><').forEach((_,i)=>{
  const el = document.querySelectorAll('*')[i];
  if(el) makeDraggable(el);
});
window.autoClick = async(selector)=>{
  const el = document.querySelector(selector);
  if(el){ 
    el.click();
    macro.push({action:"click", selector});
    await fetch("http://localhost:3000/api/record",{method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify(macro)});
  }
};
// สร้างเว็บสมบูรณ์ + Deploy
window.buildFull = async()=>{
  const prompt = document.getElementById("prompt").value;

  // ดึงโมดูลที่เลือก
  const modulesSelected = macro.filter(m=>m.select).map(m=>m.select);

  // Generate AI Template
  const r = await fetch("http://localhost:3000/api/ai-template/generate",{
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify({prompt, modules:modulesSelected})
  });

  const data = await r.json();
  NanoFrame.mount(data.html);

  // Auto Deploy
  const dep = await fetch("http://localhost:3000/api/deploy/deploy",{
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify({html:data.html})
  });

  const deployed = await dep.json();
  alert("Website deployed at: "+deployed.url);

  macro.push({fullBuild:{prompt, modules:modulesSelected, url:deployed.url}});
  await fetch("http://localhost:3000/api/record",{method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify(macro)});
};
window.syncRepo = async()=>{
  const r = await fetch("http://localhost:3000/api/repo/sync");
  const data = await r.json();
  alert("Repo status: "+data.status);
};
