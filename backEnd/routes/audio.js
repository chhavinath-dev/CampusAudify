const express = require("express");
const fetchuser = require("../middleware/fetchuser");
const Audio = require("../models/Audio");
const router = express.Router();
const { body, validationResult } = require("express-validator");
//Route 1: get all the audio : GET 'http://localhost:5000/api/audio/fetchallaudio'. login required
router.get("/fetchallaudio", fetchuser, async (req, res) => {
  try {
    const audio = await Audio.find({ user: req.user.id });
    res.json(audio);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ errors: "Internal Server Error" });
  }
});
//Route 2: add the audio : GET 'http://localhost:5000/api/audio/addaudio'. login required
router.post(
  "/addaudio",
  fetchuser,
  [
    // body("title").isLength({ min: 3 }),
    body("description").isLength({ min: 5 }),
  ],
  async (req, res) => {
    try {
      const { url, description, tag } = req.body;

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      let date = new Date();
      let createdOn = date.toGMTString();
      
      const audio = new Audio({
        createdOn,
        url,
        description,
        tag,
        user: req.user.id,
      });
      const saveAudio = await audio.save();
      res.json(saveAudio);
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ errors: "Internal Server Error" });
    }
  }
);
//Route 3: update the audio : PUT 'http://localhost:5000/api/audio/updateaudio'. login required
router.put("/updateaudio/:id", fetchuser, async (req, res) => {
  const { description, tag } = req.body;

  try {
    const newAudio = {};

    if (description) {
      newAudio.description = description;
    }
    if (tag) {
      newAudio.tag = tag;
    }
    let audio = await Audio.findById(req.params.id);
    if (!audio) {
      return res.status(404).send("Not Found");
    }
    if (audio.user.toString() !== req.user.id) {
      return res.status(401).send("unauthorized");
    }
    audio = await Audio.findByIdAndUpdate(
      req.params.id,
      { $set: newAudio },
      { new: true }
    );
    res.json(audio);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ errors: "Internal Server Error" });
  }
});
//Route 4: delete the audio : DELETE  'http://localhost:5000/api/audio/deleteaudio'. login required
router.delete("/deleteaudio/:id", fetchuser, async (req, res) => {
  try {
    let audio = await Audio.findById(req.params.id);

    if (!audio) {
      return res.status(404).send("Not Found");
    }
    let des = audio.description;
    if (audio.user.toString() !== req.user.id) {
      return res.status(401).send("unauthorized");
    }
    audio = await Audio.findByIdAndDelete(req.params.id);
    res.json({ sucess: "audio deleted", description: des });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ errors: "Internal Server Error" });
  }
});
module.exports = router;
