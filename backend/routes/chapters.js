const express = require("express");
const router = express.Router();
const Chapter = require("../models/Chapter");

// Get all chapters
router.get("/", async (req, res) => {
    try {
        const chapters = await Chapter.find().sort({ order: 1 });
        res.json(chapters);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get a single chapter
router.get("/:id", async (req, res) => {
    try {
        const chapter = await Chapter.findById(req.params.id);
        if (!chapter) {
            return res.status(404).json({ message: "Chapter not found" });
        }
        res.json(chapter);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Add a new chapter
router.post("/", async (req, res) => {
    const { title, description, topics } = req.body;
    if (!title) return res.status(400).json({ message: "Title is required" });

    try {
        const newChapter = new Chapter({ title, description, topics });
        await newChapter.save();
        res.status(201).json(newChapter);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
