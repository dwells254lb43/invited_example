const express = require("express");
const router = express.Router();
const {list,create} =require("../controllers/user");


router.get("/api/users", list);
router.post("/api/users", create);

module.exports = router;