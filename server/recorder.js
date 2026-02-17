let macros = [];

function recordAction(action){
  macros.push({...action, timestamp: Date.now()});
}

function saveMacro(){
  const fs = require("fs");
  const {v4: uuid} = require("uuid");
  fs.writeFileSync(`./server/macro-${uuid()}.json`, JSON.stringify(macros,null,2));
  macros = [];
}

module.exports = {recordAction, saveMacro};
