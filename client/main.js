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
