const { exec } = require("child_process");
const fs = require("fs");
const express = require("express");
const router = express.Router();

// Config ของ Repo เจ้านาย
const REPO_URL = "https://github.com/<USERNAME_JEWN_JAI>/<REPO_NAME>.git";
const LOCAL_PATH = "./server/repo";

router.get("/sync", (req,res)=>{
  if(!fs.existsSync(LOCAL_PATH)){
    exec(`git clone ${REPO_URL} ${LOCAL_PATH}`, (err,stdout,stderr)=>{
      if(err) return res.json({status:"error",err});
      res.json({status:"cloned"});
    });
  } else {
    exec(`cd ${LOCAL_PATH} && git pull`, (err,stdout,stderr)=>{
      if(err) return res.json({status:"error",err});
      res.json({status:"updated"});
    });
  }
});

module.exports = router;
