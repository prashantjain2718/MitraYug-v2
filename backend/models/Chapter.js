const mongoose = require("mongoose");

const chapterSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    topics: [{
        title: String,
        content: String,
        interactiveElements: [{
            type: {
                type: String,
                enum: ['quiz', 'practice', 'video'],
                required: true
            },
            question: String,
            options: [String],
            correctAnswer: Number,
            explanation: String
        }]
    }],
    difficulty: {
        type: String,
        enum: ['beginner', 'intermediate', 'advanced'],
        default: 'beginner'
    },
    order: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("Chapter", chapterSchema);
