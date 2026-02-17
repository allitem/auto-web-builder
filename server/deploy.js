const express = require("express");
const fs = require("fs");
const {v4: uuid} = require("uuid");
const router = express.Router();

/* Save HTML template และ Deploy */
router.post("/deploy", (req,res)=>{
  const {html} = req.body;
  const filename = `./server/deploy-${uuid()}.html`;

  fs.writeFileSync(filename, html);
  // สำหรับ VPS สามารถขยายเป็น copy ไป public folder หรือ FTP/SSH deploy
  res.json({status:"deployed", url:`http://localhost:3000/${filename.split("/").pop()}`});
});

module.exports = router;
