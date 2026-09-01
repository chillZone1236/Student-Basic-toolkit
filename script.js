/* =========================
   OPEN TOOL
========================= */

function openTool(toolName) {

    const calculators =
        document.querySelectorAll(".calculator");


    calculators.forEach(function(calculator) {

        calculator.classList.add("hidden");

    });


    const selectedTool =
        document.getElementById(toolName);


    selectedTool.classList.remove("hidden");


    document
        .getElementById("calculatorArea")
        .scrollIntoView({
            behavior: "smooth"
        });
}


/* =========================
   PERCENTAGE
========================= */

function calculatePercentage() {

    const obtained =
        Number(
            document.getElementById("obtained").value
        );


    const total =
        Number(
            document.getElementById("total").value
        );


    const result =
        document.getElementById(
            "percentageResult"
        );


    if (!obtained || !total) {

        result.textContent =
            "Please enter both marks.";

        return;
    }


    if (
        obtained < 0 ||
        total <= 0 ||
        obtained > total
    ) {

        result.textContent =
            "Please enter valid marks.";

        return;
    }


    const percentage =
        (obtained / total) * 100;


    result.textContent =
        "Your Percentage: " +
        percentage.toFixed(2) +
        "%";
}


/* =========================
   REQUIRED MARKS
========================= */

function calculateRequired() {

    const current =
        Number(
            document.getElementById(
                "currentMarks"
            ).value
        );


    const remaining =
        Number(
            document.getElementById(
                "remainingMarks"
            ).value
        );


    const target =
        Number(
            document.getElementById(
                "targetPercentage"
            ).value
        );


    const result =
        document.getElementById(
            "requiredResult"
        );


    if (
        current < 0 ||
        remaining <= 0 ||
        target <= 0
    ) {

        result.textContent =
            "Please enter valid values.";

        return;
    }


    const totalMarks =
        current + remaining;


    const requiredTotal =
        (target / 100) * totalMarks;


    const required =
        requiredTotal - current;


    if (required <= 0) {

        result.textContent =
            "You have already reached your target.";

    }

    else if (required > remaining) {

        result.textContent =
            "This target is not possible.";

    }

    else {

        result.textContent =
            "You need approximately " +
            required.toFixed(2) +
            " marks.";
    }
}


/* =========================
   AVERAGE
========================= */

function calculateAverage() {

    const input =
        document.getElementById(
            "marksList"
        ).value;


    const result =
        document.getElementById(
            "averageResult"
        );


    if (!input.trim()) {

        result.textContent =
            "Please enter your marks.";

        return;
    }


    const marks =
        input
            .split(",")
            .map(Number)
            .filter(function(number) {

                return !isNaN(number);

            });


    if (marks.length === 0) {

        result.textContent =
            "Please enter valid numbers.";

        return;
    }


    const sum =
        marks.reduce(
            function(total, number) {

                return total + number;

            },
            0
        );


    const average =
        sum / marks.length;


    result.textContent =
        "Average: " +
        average.toFixed(2);
}


/* =========================
   CGPA
========================= */

function calculateCGPA() {

    const cgpa =
        Number(
            document.getElementById(
                "cgpaValue"
            ).value
        );


    const result =
        document.getElementById(
            "cgpaResult"
        );


    if (
        cgpa < 0 ||
        cgpa > 10 ||
        isNaN(cgpa)
    ) {

        result.textContent =
            "Please enter a CGPA between 0 and 10.";

        return;
    }


    /*
        This is a common conversion:
        Percentage = CGPA × 9.5

        Different boards/institutions
        may use different formulas.
    */


    const percentage =
        cgpa * 9.5;


    result.textContent =
        "Approx. Percentage: " +
        percentage.toFixed(2) +
        "%";
}


/* =========================
   AGE CALCULATOR
========================= */

function calculateAge() {

    const birthDate =
        document.getElementById(
            "birthDate"
        ).value;


    const result =
        document.getElementById(
            "ageResult"
        );


    if (!birthDate) {

        result.textContent =
            "Please select your date of birth.";

        return;
    }


    const birth =
        new Date(birthDate);


    const today =
        new Date();


    let years =
        today.getFullYear() -
        birth.getFullYear();


    let months =
        today.getMonth() -
        birth.getMonth();


    let days =
        today.getDate() -
        birth.getDate();


    if (days < 0) {

        months--;


        const previousMonth =
            new Date(
                today.getFullYear(),
                today.getMonth(),
                0
            );


        days +=
            previousMonth.getDate();
    }


    if (months < 0) {

        years--;

        months += 12;
    }


    result.textContent =
        "Your age is " +
        years +
        " years, " +
        months +
        " months, and " +
        days +
        " days.";
}


/* =========================
   STUDY TIMER
========================= */

let timeLeft = 0;

let timerInterval = null;


/* UPDATE TIMER */

function updateTimerDisplay() {

    const hours =
        Math.floor(
            timeLeft / 3600
        );


    const minutes =
        Math.floor(
            (timeLeft % 3600) / 60
        );


    const seconds =
        timeLeft % 60;


    const h =
        String(hours).padStart(
            2,
            "0"
        );


    const m =
        String(minutes).padStart(
            2,
            "0"
        );


    const s =
        String(seconds).padStart(
            2,
            "0"
        );


    document.getElementById(
        "timerDisplay"
    ).textContent =
        h + ":" + m + ":" + s;
}


/* SET CUSTOM TIMER */

function setCustomTimer() {

    const hours =
        Number(
            document.getElementById(
                "studyHours"
            ).value
        );


    const minutes =
        Number(
            document.getElementById(
                "studyMinutes"
            ).value
        );


    if (
        hours === 0 &&
        minutes === 0
    ) {

        alert(
            "Please enter study time."
        );

        return;
    }


    if (
        hours < 0 ||
        hours > 23 ||
        minutes < 0 ||
        minutes > 59
    ) {

        alert(
            "Please enter a valid time."
        );

        return;
    }


    pauseTimer();


    timeLeft =
        (hours * 3600) +
        (minutes * 60);


    updateTimerDisplay();
}


/* QUICK PRESETS */

function setStudyTime(minutes) {

    pauseTimer();


    timeLeft =
        minutes * 60;


    updateTimerDisplay();
}


/* START TIMER */

function startTimer() {

    if (timeLeft <= 0) {

        alert(
            "Set your study time first."
        );

        return;
    }


    if (timerInterval !== null) {

        return;
    }


    timerInterval =
        setInterval(
            function() {

                if (timeLeft > 0) {

                    timeLeft--;

                    updateTimerDisplay();

                }

                else {

                    clearInterval(
                        timerInterval
                    );

                    timerInterval = null;


                    alert(
                        "🎉 Study session completed!"
                    );
                }

            },
            1000
        );
}


/* PAUSE */

function pauseTimer() {

    clearInterval(
        timerInterval
    );

    timerInterval = null;
}


/* RESET TIMER */

function resetTimer() {

    pauseTimer();


    timeLeft = 0;


    updateTimerDisplay();


    document.getElementById(
        "studyHours"
    ).value = "";


    document.getElementById(
        "studyMinutes"
    ).value = "";
}


/* INITIAL TIMER */

updateTimerDisplay();


/* =========================
   RESET OTHER TOOLS
========================= */

function resetTool(toolName) {

    const tool =
        document.getElementById(
            toolName
        );


    const inputs =
        tool.querySelectorAll(
            "input"
        );


    inputs.forEach(
        function(input) {

            input.value = "";

        }
    );


    const result =
        tool.querySelector(
            ".result"
        );


    if (result) {

        result.textContent = "";

    }
}