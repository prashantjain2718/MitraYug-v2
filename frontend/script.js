document.addEventListener("DOMContentLoaded", async function () {
    const settingsBtn = document.getElementById("settings-btn");
    const dropdownMenu = document.getElementById("dropdown-menu");
    const lightModeBtn = document.getElementById("light-mode");
    const darkModeBtn = document.getElementById("dark-mode");
    const searchInput = document.getElementById("searchInput");
    const topicsList = document.getElementById("topicsList");
    const chaptersContainer = document.getElementById("chapterList"); // Container for dynamically loaded chapters
    const quizModal = document.getElementById("quizModal");
    const topicModal = document.getElementById("topicModal");
    const closeButtons = document.getElementsByClassName("close");
    const startQuizBtn = document.getElementById("startQuiz");
    const nextTopicBtn = document.getElementById("nextTopic");

    // State management
    let currentChapter = null;
    let currentTopicIndex = 0;
    let currentQuiz = null;

    // Show/hide dropdown menu
    if (settingsBtn) {
        settingsBtn.addEventListener("click", function () {
            dropdownMenu.classList.toggle("show");
        });
    }

    // Apply stored theme on page load
    function applyTheme() {
        if (localStorage.getItem("theme") === "dark") {
            document.body.classList.add("dark-mode");
        } else {
            document.body.classList.remove("dark-mode");
        }
    }
    applyTheme(); // Apply theme when page loads

    // Light Mode
    if (lightModeBtn) {
        lightModeBtn.addEventListener("click", function () {
            document.body.classList.remove("dark-mode");
            localStorage.setItem("theme", "light");
            dropdownMenu.classList.remove("show");
        });
    }

    // Dark Mode
    if (darkModeBtn) {
        darkModeBtn.addEventListener("click", function () {
            document.body.classList.add("dark-mode");
            localStorage.setItem("theme", "dark");
            dropdownMenu.classList.remove("show");
        });
    }

    // Close Modal Buttons
    Array.from(closeButtons).forEach(button => {
        button.addEventListener("click", function() {
            const modal = this.closest(".modal");
            modal.style.display = "none";
        });
    });

    // Close modals when clicking outside
    window.addEventListener("click", function(event) {
        if (event.target.classList.contains("modal")) {
            event.target.style.display = "none";
        }
    });

    // Fetch and display chapters dynamically
    async function fetchChapters() {
        if (!chaptersContainer) return;

        try {
            const response = await fetch("http://localhost:5001/api/chapters");
            const chapters = await response.json();

            chaptersContainer.innerHTML = ""; // Clear previous content
            chapters.forEach(chapter => {
                const chapterElement = document.createElement("div");
                chapterElement.classList.add("chapter");
                chapterElement.innerHTML = `
                    <h2>${chapter.title}</h2>
                    <p>${chapter.description}</p>
                    <div class="difficulty">Difficulty: ${chapter.difficulty}</div>
                    <button class="start-chapter" data-chapter='${JSON.stringify(chapter)}'>
                        Start Chapter
                    </button>
                `;
                chaptersContainer.appendChild(chapterElement);
            });

            // Add event listeners to chapter buttons
            document.querySelectorAll('.start-chapter').forEach(button => {
                button.addEventListener('click', function() {
                    currentChapter = JSON.parse(this.dataset.chapter);
                    currentTopicIndex = 0;
                    showTopicContent(currentChapter.topics[0]);
                });
            });
        } catch (error) {
            console.error("Error fetching chapters:", error);
        }
    }
    fetchChapters(); // Call function to load chapters

    // Search Functionality for Topics
    if (searchInput && topicsList) {
        searchInput.addEventListener("keyup", function () {
            let filter = searchInput.value.toLowerCase();
            let topics = topicsList.getElementsByClassName("topic");

            for (let i = 0; i < topics.length; i++) {
                let topicText = topics[i].textContent.toLowerCase();
                topics[i].style.display = topicText.includes(filter) ? "block" : "none";
            }
        });
    }

    // Show topic content
    function showTopicContent(topic) {
        const topicTitle = document.getElementById("topicTitle");
        const topicContent = document.getElementById("topicContent");
        const currentTopicNumber = document.getElementById("currentTopicNumber");
        const totalTopics = document.getElementById("totalTopics");

        topicTitle.textContent = topic.title;
        topicContent.innerHTML = `<p>${topic.content}</p>`;
        currentTopicNumber.textContent = currentTopicIndex + 1;
        totalTopics.textContent = currentChapter.topics.length;

        // Update button states
        nextTopicBtn.style.display = currentTopicIndex < currentChapter.topics.length - 1 ? "block" : "none";
        startQuizBtn.style.display = topic.interactiveElements.length > 0 ? "block" : "none";

        topicModal.style.display = "block";
    }

    // Show quiz
    function showQuiz(quiz) {
        const quizQuestion = document.getElementById("quizQuestion");
        const quizOptions = document.getElementById("quizOptions");
        const submitButton = document.getElementById("submitAnswer");
        const quizResult = document.getElementById("quizResult");
        const quizExplanation = document.getElementById("quizExplanation");

        currentQuiz = quiz;
        quizQuestion.textContent = quiz.question;
        quizOptions.innerHTML = quiz.options.map((option, index) => `
            <div class="quiz-option">
                <input type="radio" name="quiz" value="${index}" id="option${index}">
                <label for="option${index}">${option}</label>
            </div>
        `).join('');

        submitButton.onclick = function() {
            const selectedAnswer = document.querySelector('input[name="quiz"]:checked');
            if (!selectedAnswer) {
                alert("Please select an answer!");
                return;
            }

            const isCorrect = parseInt(selectedAnswer.value) === quiz.correctAnswer;
            quizResult.innerHTML = isCorrect ? 
                '<p class="correct">Correct! Well done!</p>' : 
                '<p class="incorrect">Incorrect. Try again!</p>';
            
            quizExplanation.innerHTML = `<p>${quiz.explanation}</p>`;
        };

        quizModal.style.display = "block";
    }

    // Event Listeners
    if (startQuizBtn) {
        startQuizBtn.addEventListener('click', function() {
            const currentTopic = currentChapter.topics[currentTopicIndex];
            if (currentTopic.interactiveElements.length > 0) {
                showQuiz(currentTopic.interactiveElements[0]);
            }
        });
    }

    if (nextTopicBtn) {
        nextTopicBtn.addEventListener('click', function() {
            if (currentTopicIndex < currentChapter.topics.length - 1) {
                currentTopicIndex++;
                showTopicContent(currentChapter.topics[currentTopicIndex]);
            }
        });
    }
});
