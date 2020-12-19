const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  res.status(200).json({
    message: "Res Employee Get Request",
  });
});

router.post("/", (req, res, next) => {
  res.status(200).json({
    message: "Res Employee Post Request",
  });
});

module.exports = router;
