import React from "react";

const Question = ({ question, questionNumber, totalQuestions, handleAnswerClick, selectedAnswer }) => {
    return (
        <div className="question-container">
            <h2>Question {questionNumber} of {totalQuestions}</h2>
            <p>{question.description}</p> {/* Display the question description */}

            {/* Display options vertically */}
            <div className="options-container">
                {question.options && question.options.map((answer, index) => (
                    <div key={index} className="option-item">
                        <button 
                            className={`option-btn ${selectedAnswer === index ? "selected" : ""}`}
                            onClick={() => handleAnswerClick(index, answer.is_correct)}
                            disabled={selectedAnswer !== null} // Disable button after selection
                        >
                            {answer.description}  {/* Assuming 'description' is the text you want to display */}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Question;
