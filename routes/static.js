const express = require("express");

const router = express.Router();

const staticController = require("../controllers/static");

router.get("/aboutus", staticController.aboutus);

router.get("/contactus", staticController.contactus);

module.exports = router;