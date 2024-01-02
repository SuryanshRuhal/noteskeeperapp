const express = require("express");
const {createnote, allnotes,deletenote} = require("../controllers/notescontroller");
const {protect} = require("../middleware.js/authorizationmiddleware");
const router= express.Router();

router.route("/").post(protect,createnote);
router.route("/:userId").get(protect,allnotes);
router.route("/delete/:noteId").get(protect,deletenote);

module.exports= router;
