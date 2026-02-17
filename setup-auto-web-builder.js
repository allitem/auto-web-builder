const { exec } = require("child_process");
const fs = require("fs");

const REPO_URL = "https://github.com/<USERNAME_JEWN_JAI>/auto-web-builder.git";
const LOCAL_PATH = "./auto-web-builder";

console.log("เริ่ม Setup ระบบ Auto Web Builder ครบวงจร...");

// 1. Clone Repo เจ้านาย (ถ้ายังไม่มี)
if(!fs.existsSync(LOCAL_PATH)){
    console.log("Cloning Repo...");
    exec(`git clone ${REPO_URL} ${LOCAL_PATH}`, (err, stdout, stderr)=>{
        if(err) return console.error("Clone Error:", stderr);
        console.log(stdout);
        installDependencies();
    });
} else {
    console.log("Repo มีอยู่แล้ว, ทำการ Pull ล่าสุด...");
    exec(`cd ${LOCAL_PATH} && git pull`, (err, stdout, stderr)=>{
        if(err) return console.error("Pull Error:", stderr);
        console.log(stdout);
        installDependencies();
    });
}

// 2. ติดตั้ง Dependencies
function installDependencies(){
    console.log("ติดตั้ง Dependencies...");
    exec(`cd ${LOCAL_PATH} && npm install`, (err, stdout, stderr)=>{
        if(err) return console.error("Install Error:", stderr);
        console.log(stdout);
        startServer();
    });
}

// 3. รัน Server
function startServer(){
    console.log("รัน Server...");
    exec(`cd ${LOCAL_PATH} && npm start`, (err, stdout, stderr)=>{
        if(err) return console.error("Server Error:", stderr);
        console.log(stdout);
        console.log("ระบบพร้อมใช้งาน! เปิดหน้าเว็บ: http://localhost:3000/client/index.html");
    });
}

// 4. Push ทุกไฟล์เข้า Repo เจ้านาย
function pushAllFiles(){
    console.log("Push ทุกไฟล์เข้า Repo เจ้านาย...");
    exec(`cd ${LOCAL_PATH} && git add . && git commit -m "Setup Full Auto Web Builder" && git branch -M main && git push -u origin main --force`,
    (err, stdout, stderr)=>{
        if(err) return console.error("Push Error:", stderr);
        console.log(stdout);
        console.log("Push สำเร็จ! Repo พร้อมใช้งานและ Clone ได้ทันที");
    });
}

// เรียก push หลัง setup เสร็จ
setTimeout(pushAllFiles, 15000); // รอ 15 วิ ให้ npm start เริ่มทำงานก่อน
