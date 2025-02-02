import React from "react";

const Result = ({ score, total, restartQuiz }) => {
    // Calculate the percentage score
    const percentage = ((score / total) * 100).toFixed(2);

    // Determine performance message based on score
    let message;
    if (percentage === "100.00") {
        message = "🏆 Perfect Score! You're a quiz master!";
    } else if (percentage >= 75) {
        message = "🎉 Great job! You did really well!";
    } else if (percentage >= 50) {
        message = "😊 Good effort! Keep practicing!";
    } else {
        message = "😕 Keep trying! You'll get better!";
    }

    return (
        <div className="result-container">
            <h2>Quiz Completed! 🎯</h2>
            <p><strong>Your Score:</strong> {score} / {total}</p>
            <p><strong>Percentage:</strong> {percentage}%</p>
            <p><strong>Performance:</strong> {message}</p>
            <button className="restart-btn" onClick={restartQuiz}>Restart Quiz</button>
        </div>
    );
};

export default Result;
