const express = require("express");
const router = express.Router();
const versionController = require("../controllers/versionController");

router.get("/", versionController.versionList);
router.post("/", versionController.createVersion);
router.put("/:versionId", versionController.updateVersion);
router.get("/:versionId", versionController.versionDetails);
router.delete("/:versionId", versionController.deleteVersion);

module.exports = router;
