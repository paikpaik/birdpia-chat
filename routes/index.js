const express = require("express");
const {
  renderMain,
  renderRoom,
  createRoom,
  enterRoom,
  removeRoom,
  sendChat,
  sendGif,
} = require("../controllers");
const multer = require("multer");
const fs = require("fs");
const path = require("path");

const router = express.Router();

router.get("/", renderMain);
router.get("/room", renderRoom);
router.post("/room", createRoom);
router.get("/room/:id", enterRoom);
router.delete("/room/:id", removeRoom);
router.post("/room/:id/chat", sendChat);
try {
  fs.readdirSync("uploads");
} catch (error) {
  console.log("uploads 폴더가 없어 uploads 폴더를 생성합니다.");
  fs.mkdirSync("uploads");
}
const uploads = multer({
  storage: multer.diskStorage({
    destination(req, file, done) {
      done(null, "uploads/");
    },
    filename(req, file, done) {
      const ext = path.extname(file.originalname);
      done(null, path.basename(file.originalname, ext) + Date.now() + ext);
    },
  }),
  limits: { fileSize: 20 * 1024 * 1024 },
});
router.post("/room/:id/gif", uploads.single("gif"), sendGif);

module.exports = router;
