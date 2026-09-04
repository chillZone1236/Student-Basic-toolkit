/* =========================================================
   STUDENT TOOLKIT
   ========================================================= */


/* CURSOR */

const cursorGlow =
    document.querySelector(".cursor-glow");

document.addEventListener("mousemove", e => {

    if (!cursorGlow) return;

    cursorGlow.style.left =
        e.clientX + "px";

    cursorGlow.style.top =
        e.clientY + "px";

});


/* THEME */

const themeToggle =
    document.getElementById("themeToggle");

if (localStorage.getItem("theme") === "light") {

    document.body.classList.add("light");

    themeToggle.textContent = "☀";

}

themeToggle.addEventListener("click", () => {

    document.body.classList.toggle("light");

    const light =
        document.body.classList.contains("light");

    localStorage.setItem(
        "theme",
        light ? "light" : "dark"
    );

    themeToggle.textContent =
        light ? "☀" : "☾";

});


/* =========================================================
   TOOL MODAL
   ========================================================= */

const modal =
    document.getElementById("toolModal");

const toolContent =
    document.getElementById("toolContent");


function openTool(tool) {

    const tools = {

        gpa: {
            title:"GPA Calculator",
            description:"Enter total grade points and credits for your courses.",
            html:`
                <div class="tool-form">
                    <label>Total Grade Points</label>
                    <input id="gpaPoints" type="number" placeholder="Example: 34">

                    <label>Total Credits</label>
                    <input id="gpaCredits" type="number" placeholder="Example: 10">

                    <button onclick="calculateGPA()">
                        Calculate GPA
                    </button>

                    <div id="toolResult"></div>
                </div>
            `
        },

        cgpa: {
            title:"CGPA Calculator",
            description:"Enter your semester GPAs to calculate average CGPA.",
            html:`
                <div class="tool-form">
                    <label>Semester GPAs</label>
                    <input id="cgpaValues"
                           placeholder="Example: 8.2, 8.5, 9.0">

                    <button onclick="calculateCGPA()">
                        Calculate CGPA
                    </button>

                    <div id="toolResult"></div>
                </div>
            `
        },

        sgpa: {
            title:"SGPA Calculator",
            description:"Calculate your semester GPA.",
            html:`
                <div class="tool-form">
                    <label>Grade points × credits</label>
                    <input id="sgpaValues"
                           placeholder="Example: 8*4, 9*3, 7*3">

                    <button onclick="calculateSGPA()">
                        Calculate SGPA
                    </button>

                    <div id="toolResult"></div>
                </div>
            `
        },

        percentage: {
            title:"Percentage Calculator",
            description:"Calculate marks percentage.",
            html:`
                <div class="tool-form">

                    <label>Obtained Marks</label>
                    <input id="obtained"
                           type="number">

                    <label>Total Marks</label>
                    <input id="total"
                           type="number">

                    <button onclick="calculatePercentage()">
                        Calculate Percentage
                    </button>

                    <div id="toolResult"></div>
                </div>
            `
        },

        grade: {
            title:"Grade Calculator",
            description:"Calculate percentage and a basic grade.",
            html:`
                <div class="tool-form">

                    <label>Obtained Marks</label>
                    <input id="gradeObtained"
                           type="number">

                    <label>Total Marks</label>
                    <input id="gradeTotal"
                           type="number">

                    <button onclick="calculateGrade()">
                        Calculate Grade
                    </button>

                    <div id="toolResult"></div>

                </div>
            `
        },

        final: {
            title:"Final Exam Calculator",
            description:"Find the final-exam percentage required for your target overall percentage.",
            html:`
                <div class="tool-form">

                    <label>Current Percentage</label>
                    <input id="currentPercent"
                           type="number">

                    <label>Current Weight (%)</label>
                    <input id="currentWeight"
                           type="number"
                           placeholder="Example: 60">

                    <label>Target Overall Percentage</label>
                    <input id="targetPercent"
                           type="number">

                    <label>Final Exam Weight (%)</label>
                    <input id="finalWeight"
                           type="number"
                           placeholder="Example: 40">

                    <button onclick="calculateFinal()">
                        Calculate Required Marks
                    </button>

                    <div id="toolResult"></div>

                </div>
            `
        },

        attendance: {
            title:"Attendance Calculator",
            description:"Calculate your current attendance percentage.",
            html:`
                <div class="tool-form">

                    <label>Classes Attended</label>
                    <input id="attended"
                           type="number">

                    <label>Total Classes</label>
                    <input id="classes"
                           type="number">

                    <button onclick="calculateAttendance()">
                        Calculate Attendance
                    </button>

                    <div id="toolResult"></div>

                </div>
            `
        },

        target: {
            title:"Target GPA Calculator",
            description:"Estimate the average GPA required in remaining semesters.",
            html:`
                <div class="tool-form">

                    <label>Current CGPA</label>
                    <input id="currentCGPA"
                           type="number"
                           step="0.01">

                    <label>Completed Semesters</label>
                    <input id="completedSemesters"
                           type="number">

                    <label>Target CGPA</label>
                    <input id="targetCGPA"
                           type="number"
                           step="0.01">

                    <label>Total Semesters</label>
                    <input id="totalSemesters"
                           type="number">

                    <button onclick="calculateTarget()">
                        Calculate Required GPA
                    </button>

                    <div id="toolResult"></div>

                </div>
            `
        },

        pomodoro: {
            title:"Pomodoro Focus Timer",
            description:"A simple 25-minute focus timer.",
            html:`
                <div class="timer-display"
                     id="timerDisplay">
                    25:00
                </div>

                <div class="timer-buttons">

                    <button class="review-submit"
                            onclick="startTimer()">
                        Start
                    </button>

                    <button class="review-submit"
                            onclick="pauseTimer()">
                        Pause
                    </button>

                    <button class="review-submit"
                            onclick="resetTimer()">
                        Reset
                    </button>

                </div>
            `
        },

        countdown: {
            title:"Exam Countdown",
            description:"Choose your exam date.",
            html:`
                <div class="tool-form">

                    <label>Exam Date</label>

                    <input id="examDate"
                           type="datetime-local">

                    <button onclick="startCountdown()">
                        Start Countdown
                    </button>

                    <div id="toolResult"></div>

                </div>
            `
        },

        studyhours: {
            title:"Study Hours Calculator",
            description:"Calculate weekly study time.",
            html:`
                <div class="tool-form">

                    <label>Hours per day</label>

                    <input id="dailyHours"
                           type="number">

                    <label>Study days per week</label>

                    <input id="studyDays"
                           type="number">

                    <button onclick="calculateStudyHours()">
                        Calculate
                    </button>

                    <div id="toolResult"></div>

                </div>
            `
        },

        scientific: {
            title:"Scientific Calculator",
            description:"Quick mathematical calculations.",
            html:`
                <div class="tool-form">

                    <label>Expression</label>

                    <input id="expression"
                           placeholder="Example: 25 * 4 + 10">

                    <button onclick="calculateExpression()">
                        Calculate
                    </button>

                    <div id="toolResult"></div>

                </div>
            `
        },

        unit: {
            title:"Unit Converter",
            description:"Convert kilometres to miles.",
            html:`
                <div class="tool-form">

                    <label>Kilometres</label>

                    <input id="km"
                           type="number">

                    <button onclick="convertKM()">
                        Convert
                    </button>

                    <div id="toolResult"></div>

                </div>
            `
        },

        age: {
            title:"Age Calculator",
            description:"Calculate your age.",
            html:`
                <div class="tool-form">

                    <label>Date of birth</label>

                    <input id="birthDate"
                           type="date">

                    <button onclick="calculateAge()">
                        Calculate Age
                    </button>

                    <div id="toolResult"></div>

                </div>
            `
        },

        budget: {
            title:"Student Budget",
            description:"Calculate your remaining monthly budget.",
            html:`
                <div class="tool-form">

                    <label>Monthly budget</label>

                    <input id="budget"
                           type="number">

                    <label>Total expenses</label>

                    <input id="expenses"
                           type="number">

                    <button onclick="calculateBudget()">
                        Calculate
                    </button>

                    <div id="toolResult"></div>

                </div>
            `
        },

        words: {
            title:"Word Counter",
            description:"Count words and characters.",
            html:`
                <div class="tool-form">

                    <label>Your text</label>

                    <textarea id="wordText"
                              style="min-height:180px"
                              placeholder="Type or paste text..."></textarea>

                    <button onclick="countWords()">
                        Count
                    </button>

                    <div id="toolResult"></div>

                </div>
            `
        },

        date: {
            title:"Date Calculator",
            description:"Find the number of days between two dates.",
            html:`
                <div class="tool-form">

                    <label>Start date</label>

                    <input id="date1"
                           type="date">

                    <label>End date</label>

                    <input id="date2"
                           type="date">

                    <button onclick="calculateDays()">
                        Calculate Days
                    </button>

                    <div id="toolResult"></div>

                </div>
            `
        },

        notes: {
            title:"Quick Notes",
            description:"Notes are saved in this browser.",
            html:`
                <div class="tool-form">

                    <textarea id="notesArea"
                              style="min-height:250px"
                              placeholder="Write your notes..."></textarea>

                    <button onclick="saveNotes()">
                        Save Notes
                    </button>

                    <div id="toolResult"></div>

                </div>
            `
        },

        todo: {
            title:"Study To-Do List",
            description:"Add tasks for your study session.",
            html:`
                <div class="tool-form">

                    <input id="todoInput"
                           placeholder="Example: Revise AOD">

                    <button onclick="addTodo()">
                        Add Task
                    </button>

                    <div id="todoList"
                         class="result-box">
                    </div>

                </div>
            `
        },

        flashcards: {
            title:"Flashcard",
            description:"Use this simple flashcard for revision.",
            html:`
                <div class="tool-form">

                    <input id="question"
                           placeholder="Question">

                    <input id="answer"
                           placeholder="Answer">

                    <button onclick="showFlashcard()">
                        Show Flashcard
                    </button>

                    <div id="toolResult"></div>

                </div>
            `
        }

    };


    const selected = tools[tool];

    if (!selected) return;


    toolContent.innerHTML = `

        <h2 class="tool-title">
            ${selected.title}
        </h2>

        <p class="tool-description">
            ${selected.description}
        </p>

        ${selected.html}

    `;


    modal.classList.add("show");

}


function closeTool() {

    modal.classList.remove("show");

}


/* CLOSE WHEN CLICKING OUTSIDE */

modal.addEventListener("click", e => {

    if (e.target === modal) {
        closeTool();
    }

});


/* =========================================================
   CALCULATORS
   ========================================================= */

function result(message) {

    document.getElementById("toolResult").innerHTML =
        `<div class="result-box">${message}</div>`;

}


function calculateGPA() {

    const points =
        Number(document.getElementById("gpaPoints").value);

    const credits =
        Number(document.getElementById("gpaCredits").value);

    if (!credits) {
        result("Please enter valid values.");
        return;
    }

    result(
        `<strong>GPA: ${(points / credits).toFixed(2)}</strong>`
    );

}


function calculateCGPA() {

    const values =
        document.getElementById("cgpaValues")
        .value
        .split(",")
        .map(Number)
        .filter(Number.isFinite);

    if (!values.length) {
        result("Enter GPAs separated by commas.");
        return;
    }

    const average =
        values.reduce((a,b) => a+b,0) / values.length;

    result(
        `<strong>CGPA: ${average.toFixed(2)}</strong>`
    );

}


function calculateSGPA() {

    const values =
        document.getElementById("sgpaValues")
        .value
        .split(",");

    let totalPoints = 0;
    let totalCredits = 0;

    values.forEach(item => {

        const parts =
            item.split("*").map(Number);

        if (parts.length === 2 &&
            parts.every(Number.isFinite)) {

            totalPoints += parts[0] * parts[1];
            totalCredits += parts[1];

        }

    });

    if (!totalCredits) {

        result(
            "Use format: 8*4, 9*3, 7*3"
        );

        return;
    }

    result(
        `<strong>SGPA: ${(totalPoints / totalCredits).toFixed(2)}</strong>`
    );

}


function calculatePercentage() {

    const obtained =
        Number(document.getElementById("obtained").value);

    const total =
        Number(document.getElementById("total").value);

    if (!total) {

        result("Enter a valid total.");
        return;

    }

    const percentage =
        obtained / total * 100;

    result(
        `<strong>${percentage.toFixed(2)}%</strong>`
    );

}


function calculateGrade() {

    const obtained =
        Number(document.getElementById("gradeObtained").value);

    const total =
        Number(document.getElementById("gradeTotal").value);

    if (!total) {

        result("Enter valid marks.");
        return;

    }

    const p =
        obtained / total * 100;

    let grade;

    if (p >= 90) grade = "A+";
    else if (p >= 80) grade = "A";
    else if (p >= 70) grade = "B";
    else if (p >= 60) grade = "C";
    else if (p >= 50) grade = "D";
    else grade = "F";

    result(
        `<strong>${p.toFixed(2)}% — Grade ${grade}</strong>`
    );

}


function calculateFinal() {

    const current =
        Number(document.getElementById("currentPercent").value);

    const currentWeight =
        Number(document.getElementById("currentWeight").value);

    const target =
        Number(document.getElementById("targetPercent").value);

    const finalWeight =
        Number(document.getElementById("finalWeight").value);

    if (!finalWeight) {

        result("Enter valid weights.");
        return;

    }

    const needed =
        (
            target -
            current * currentWeight / 100
        ) /
        (finalWeight / 100);

    result(
        `<strong>You need approximately ${needed.toFixed(2)}% in the final.</strong>`
    );

}


function calculateAttendance() {

    const attended =
        Number(document.getElementById("attended").value);

    const classes =
        Number(document.getElementById("classes").value);

    if (!classes) {

        result("Enter valid class numbers.");
        return;

    }

    const percentage =
        attended / classes * 100;

    result(
        `<strong>Attendance: ${percentage.toFixed(2)}%</strong>`
    );

}


function calculateTarget() {

    const current =
        Number(document.getElementById("currentCGPA").value);

    const completed =
        Number(document.getElementById("completedSemesters").value);

    const target =
        Number(document.getElementById("targetCGPA").value);

    const total =
        Number(document.getElementById("totalSemesters").value);

    const remaining =
        total - completed;

    if (remaining <= 0) {

        result("Enter valid semester numbers.");
        return;

    }

    const required =
        (target * total -
        current * completed) /
        remaining;

    result(
        `<strong>Required average GPA: ${required.toFixed(2)}</strong>`
    );

}


function calculateStudyHours() {

    const daily =
        Number(document.getElementById("dailyHours").value);

    const days =
        Number(document.getElementById("studyDays").value);

    result(
        `<strong>${(daily * days).toFixed(1)} hours/week</strong>`
    );

}


function calculateExpression() {

    const expression =
        document.getElementById("expression").value;

    try {

        /*
         * Basic calculator.
         * Do not use for untrusted code.
         */

        if (!/^[0-9+\-*/().%\s]+$/.test(expression)) {

            result("Only basic mathematical operators are allowed.");
            return;

        }

        const value =
            Function(
                `"use strict"; return (${expression})`
            )();

        result(
            `<strong>${value}</strong>`
        );

    } catch {

        result("Invalid expression.");

    }

}


function convertKM() {

    const km =
        Number(document.getElementById("km").value);

    result(
        `<strong>${km} km = ${(km * 0.621371).toFixed(4)} miles</strong>`
    );

}


function calculateAge() {

    const input =
        document.getElementById("birthDate").value;

    if (!input) {

        result("Choose your birth date.");
        return;

    }

    const birth =
        new Date(input);

    const today =
        new Date();

    let age =
        today.getFullYear() -
        birth.getFullYear();

    const month =
        today.getMonth() -
        birth.getMonth();

    if (
        month < 0 ||
        (month === 0 &&
        today.getDate() < birth.getDate())
    ) {

        age--;

    }

    result(
        `<strong>You are ${age} years old.</strong>`
    );

}


function calculateBudget() {

    const budget =
        Number(document.getElementById("budget").value);

    const expenses =
        Number(document.getElementById("expenses").value);

    const remaining =
        budget - expenses;

    result(
        `<strong>Remaining: ₹${remaining.toFixed(2)}</strong>`
    );

}


function countWords() {

    const text =
        document.getElementById("wordText").value.trim();

    const words =
        text ? text.split(/\s+/).length : 0;

    const characters =
        text.length;

    const sentences =
        text ?
        (text.match(/[.!?]+/g) || []).length :
        0;

    result(
        `<strong>
        Words: ${words}<br>
        Characters: ${characters}<br>
        Sentences: ${sentences}
        </strong>`
    );

}


function calculateDays() {

    const first =
        new Date(
            document.getElementById("date1").value
        );

    const second =
        new Date(
            document.getElementById("date2").value
        );

    if (
        Number.isNaN(first.getTime()) ||
        Number.isNaN(second.getTime())
    ) {

        result("Choose both dates.");
        return;

    }

    const difference =
        Math.abs(second - first);

    const days =
        Math.round(
            difference /
            (1000 * 60 * 60 * 24)
        );

    result(
        `<strong>${days} days</strong>`
    );

}


/* NOTES */

const savedNotes =
    localStorage.getItem("studentNotes");

function loadNotes() {

    const area =
        document.getElementById("notesArea");

    if (area && savedNotes) {
        area.value = savedNotes;
    }

}

function saveNotes() {

    const notes =
        document.getElementById("notesArea").value;

    localStorage.setItem(
        "studentNotes",
        notes
    );

    result("Notes saved in this browser ✓");

}

loadNotes();


/* TODO */

function addTodo() {

    const input =
        document.getElementById("todoInput");

    const task =
        input.value.trim();

    if (!task) return;

    const list =
        document.getElementById("todoList");

    const item =
        document.createElement("div");

    item.style.padding = "8px 0";

    item.innerHTML = `
        <label>
            <input type="checkbox">
            ${escapeHTML(task)}
        </label>
    `;

    list.appendChild(item);

    input.value = "";

}


function escapeHTML(text) {

    const div =
        document.createElement("div");

    div.textContent = text;

    return div.innerHTML;

}


/* FLASHCARD */

function showFlashcard() {

    const question =
        document.getElementById("question").value;

    const answer =
        document.getElementById("answer").value;

    result(`
        <strong>Question:</strong><br>
        ${escapeHTML(question)}
        <br><br>
        <strong>Answer:</strong><br>
        ${escapeHTML(answer)}
    `);

}


/* =========================================================
   POMODORO
   ========================================================= */

let timerSeconds = 1500;

let timerInterval = null;


function updateTimer() {

    const display =
        document.getElementById("timerDisplay");

    if (!display) return;

    const minutes =
        Math.floor(timerSeconds / 60);

    const seconds =
        timerSeconds % 60;

    display.textContent =
        `${String(minutes).padStart(2,"0")}:${String(seconds).padStart(2,"0")}`;

}


function startTimer() {

    if (timerInterval) return;

    timerInterval =
        setInterval(() => {

            if (timerSeconds <= 0) {

                clearInterval(timerInterval);

                timerInterval = null;

                alert("Focus session complete! 🎉");

                return;

            }

            timerSeconds--;

            updateTimer();

        },1000);

}


function pauseTimer() {

    clearInterval(timerInterval);

    timerInterval = null;

}


function resetTimer() {

    pauseTimer();

    timerSeconds = 1500;

    updateTimer();

}


/* =========================================================
   COUNTDOWN
   ========================================================= */

let countdownInterval = null;


function startCountdown() {

    clearInterval(countdownInterval);

    const date =
        new Date(
            document.getElementById("examDate").value
        );

    if (Number.isNaN(date.getTime())) {

        result("Choose an exam date.");
        return;

    }

    function update() {

        const now =
            new Date();

        const difference =
            date - now;

        if (difference <= 0) {

            result("<strong>Your exam time has arrived.</strong>");

            clearInterval(countdownInterval);

            return;

        }

        const days =
            Math.floor(
                difference /
                (1000*60*60*24)
            );

        const hours =
            Math.floor(
                difference /
                (1000*60*60)
            ) % 24;

        const minutes =
            Math.floor(
                difference /
                (1000*60)
            ) % 60;

        const seconds =
            Math.floor(
                difference / 1000
            ) % 60;

        result(
            `<strong>
            ${days} days ${hours}h ${minutes}m ${seconds}s
            </strong>`
        );

    }

    update();

    countdownInterval =
        setInterval(update,1000);

}


/* =========================================================
   REVIEWS
   ========================================================= */

let selectedRating = 0;


const stars =
    document.querySelectorAll(
        "#starRating button"
    );


stars.forEach(star => {

    star.addEventListener("click", () => {

        selectedRating =
            Number(star.dataset.rating);

        stars.forEach(s => {

            s.classList.toggle(
                "active",
                Number(s.dataset.rating)
                <= selectedRating
            );

        });

    });

});


function getReviews() {

    try {

        return JSON.parse(
            localStorage.getItem(
                "studentReviews"
            )
        ) || [];

    } catch {

        return [];

    }

}


function renderReviews() {

    const container =
        document.getElementById(
            "reviewsContainer"
        );

    const reviews =
        getReviews();

    container.innerHTML = "";

    if (!reviews.length) {

        container.innerHTML = `
            <div class="no-reviews">
                No reviews yet.<br>
                Be the first one! ✨
            </div>
        `;

        document.getElementById(
            "averageRating"
        ).textContent = "★ 0.0";

        return;

    }


    let total = 0;


    reviews
        .slice()
        .reverse()
        .forEach(review => {

            total += review.rating;

            const starsText =
                "★".repeat(review.rating) +
                "☆".repeat(5-review.rating);

            const item =
                document.createElement("div");

            item.className =
                "review-item";

            item.innerHTML = `

                <div class="review-top">

                    <span class="reviewer-name">
                        ${escapeHTML(review.name)}
                    </span>

                    <span class="review-stars">
                        ${starsText}
                    </span>

                </div>

                <p class="review-text">
                    ${escapeHTML(review.text)}
                </p>

            `;

            container.appendChild(item);

        });


    document.getElementById(
        "averageRating"
    ).textContent =
        "★ " +
        (total / reviews.length).toFixed(1);

}


document.getElementById(
    "submitReview"
).addEventListener("click", () => {

    /*
     * One review per browser.
     */

    if (
        localStorage.getItem(
            "hasReviewed"
        ) === "true"
    ) {

        showReviewMessage(
            "You have already submitted a review from this Device."
        );

        return;

    }


    const name =
        document.getElementById(
            "reviewName"
        ).value.trim();

    const text =
        document.getElementById(
            "reviewText"
        ).value.trim();


    if (!name) {

        showReviewMessage(
            "Please enter your name."
        );

        return;

    }


    if (!selectedRating) {

        showReviewMessage(
            "Please select a rating."
        );

        return;

    }


    if (!text) {

        showReviewMessage(
            "Please write a review."
        );

        return;

    }


    const reviews =
        getReviews();


    reviews.push({

        name:name.substring(0,40),

        rating:selectedRating,

        text:text.substring(0,300),

        date:new Date().toISOString()

    });


    localStorage.setItem(
        "studentReviews",
        JSON.stringify(reviews)
    );


    localStorage.setItem(
        "hasReviewed",
        "true"
    );


    document.getElementById(
        "reviewName"
    ).value = "";

    document.getElementById(
        "reviewText"
    ).value = "";


    selectedRating = 0;


    stars.forEach(star => {

        star.classList.remove("active");

    });


    showReviewMessage(
        "Thanks for your feedback! ❤️"
    );


    renderReviews();

});


function showReviewMessage(message) {

    const element =
        document.getElementById(
            "reviewMessage"
        );

    element.textContent = message;

    setTimeout(() => {

        element.textContent = "";

    },4000);

}


renderReviews();
