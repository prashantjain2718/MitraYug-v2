require("dotenv").config();
const mongoose = require("mongoose");
const Chapter = require("./models/Chapter");

const chapters = [
    {
        title: "Introduction to Computers",
        description: "Learn the basics of computers, including what they are, how to use them, and common terminology.",
        difficulty: "beginner",
        order: 1,
        topics: [
            {
                title: "What is a Computer?",
                content: "A computer is an electronic device that helps us perform various tasks. It can process information, store data, and connect us to the internet. Think of it as a smart helper that can do many things to make our lives easier.",
                interactiveElements: [
                    {
                        type: "quiz",
                        question: "What is a computer?",
                        options: [
                            "A device that only makes calls",
                            "An electronic device that helps us perform various tasks",
                            "A type of television",
                            "A kitchen appliance"
                        ],
                        correctAnswer: 1,
                        explanation: "A computer is an electronic device that helps us perform various tasks. It can process information, store data, and connect us to the internet."
                    }
                ]
            },
            {
                title: "Basic Computer Parts",
                content: "A computer has several important parts: the screen (monitor), keyboard, mouse, and the main unit (CPU). Each part has a specific function to help us use the computer effectively.",
                interactiveElements: [
                    {
                        type: "quiz",
                        question: "Which part of the computer do we use to type?",
                        options: [
                            "The mouse",
                            "The keyboard",
                            "The monitor",
                            "The CPU"
                        ],
                        correctAnswer: 1,
                        explanation: "The keyboard is used to type text and enter commands into the computer."
                    }
                ]
            }
        ]
    },
    {
        title: "Microsoft Word",
        description: "Learn how to use Microsoft Word to create and edit documents, including basic formatting and saving files.",
        difficulty: "beginner",
        order: 2,
        topics: [
            {
                title: "Creating a New Document",
                content: "To create a new document in Microsoft Word, click on the 'File' menu, then select 'New'. You'll see a blank page where you can start typing your text.",
                interactiveElements: [
                    {
                        type: "quiz",
                        question: "How do you create a new document in Microsoft Word?",
                        options: [
                            "Click the 'Save' button",
                            "Click 'File' then 'New'",
                            "Click the 'Print' button",
                            "Click the 'Close' button"
                        ],
                        correctAnswer: 1,
                        explanation: "To create a new document, click on the 'File' menu, then select 'New'."
                    }
                ]
            },
            {
                title: "Basic Formatting",
                content: "You can format your text using the toolbar at the top of the screen. You can make text bold, italic, or underlined, and change its size and color.",
                interactiveElements: [
                    {
                        type: "quiz",
                        question: "Where can you find formatting options in Microsoft Word?",
                        options: [
                            "In the bottom menu",
                            "In the toolbar at the top",
                            "In the file menu",
                            "In the help menu"
                        ],
                        correctAnswer: 1,
                        explanation: "Formatting options are found in the toolbar at the top of the screen."
                    }
                ]
            }
        ]
    },
    {
        title: "Internet Basics",
        description: "Learn how to use the internet safely and effectively, including browsing websites and using search engines.",
        difficulty: "beginner",
        order: 3,
        topics: [
            {
                title: "Understanding the Internet",
                content: "The internet is a vast network of connected computers that allows us to access information, communicate with others, and perform many useful tasks from the comfort of our homes.",
                interactiveElements: [
                    {
                        type: "quiz",
                        question: "What is the internet?",
                        options: [
                            "A type of computer",
                            "A vast network of connected computers",
                            "A type of software",
                            "A type of printer"
                        ],
                        correctAnswer: 1,
                        explanation: "The internet is a vast network of connected computers that allows us to access information and communicate with others."
                    }
                ]
            },
            {
                title: "Using a Web Browser",
                content: "A web browser is a program that helps us access websites on the internet. Popular browsers include Google Chrome, Microsoft Edge, and Mozilla Firefox.",
                interactiveElements: [
                    {
                        type: "quiz",
                        question: "What is a web browser?",
                        options: [
                            "A type of computer",
                            "A program to access websites",
                            "A type of printer",
                            "A type of keyboard"
                        ],
                        correctAnswer: 1,
                        explanation: "A web browser is a program that helps us access websites on the internet."
                    }
                ]
            }
        ]
    }
];

async function seedDatabase() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB');

        // Clear existing data
        await Chapter.deleteMany({});
        console.log('Cleared existing chapters');

        // Insert new data
        await Chapter.insertMany(chapters);
        console.log('Seeded new chapters');

        console.log('Database seeding completed successfully');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
}

seedDatabase();
