import React, { useState, useEffect } from "react";
import axios from "axios";
import Question from "./Question";
import Result from "./Result";
import "../App.css";

const Quiz = () => {
    const [questions, setQuestions] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [quizStarted, setQuizStarted] = useState(false);
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [timer, setTimer] = useState(20); // Timer for each question (30 seconds by default)
    const [isTimerActive, setIsTimerActive] = useState(false);

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = await axios.get("/api/Uw5CrX");
                console.log(response.data);
                if (response.data && Array.isArray(response.data.questions)) {
                    setQuestions(response.data.questions);
                } else {
                    throw new Error("Questions not found in the API response.");
                }
            } catch (error) {
                setError("Failed to fetch questions. Please try again later.");
                console.error("Fetch error:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchQuestions();
    }, []);

    useEffect(() => {
        if (isTimerActive) {
            // Set up the timer countdown
            const interval = setInterval(() => {
                setTimer((prevTimer) => {
                    if (prevTimer <= 1) {
                        clearInterval(interval);
                        handleNextClick(); // Automatically move to next question when time is up
                        return 0;
                    }
                    return prevTimer - 1;
                });
            }, 1000);
            return () => clearInterval(interval); // Cleanup interval on unmount
        }
    }, [isTimerActive]);

    const handleAnswerClick = (answerIndex, isCorrect) => {
        if (!(currentQuestion in selectedAnswers)) {
            setSelectedAnswers((prev) => ({
                ...prev,
                [currentQuestion]: answerIndex,
            }));

            if (isCorrect) {
                setScore((prevScore) => prevScore + 1);
            }
        }
    };

    const handleNextClick = () => {
        if (currentQuestion + 1 < questions.length) {
            setCurrentQuestion((prev) => prev + 1);
            setTimer(20); // Reset the timer for the next question
            setIsTimerActive(true); // Start the timer for the new question
        } else {
            setShowResult(true); // Show result when all questions are answered
        }
    };

    const restartQuiz = () => {
        setCurrentQuestion(0);
        setScore(0);
        setShowResult(false);
        setQuizStarted(false);
        setSelectedAnswers({});
        setTimer(30); // Reset the timer
        setIsTimerActive(false); // Stop the timer
    };

    const startTimer = () => {
        setTimer(20); // Start with 30 seconds for each question
        setIsTimerActive(true); // Start the timer
    };

    if (loading) return <p className="loading">Loading...</p>;
    if (error) return <p className="error">{error}</p>;

    return (
        <div className="quiz-container">
            <h1>Quiz App</h1>
            {!quizStarted ? (
                <button className="start-btn" onClick={() => { setQuizStarted(true); startTimer(); }}>
                    Start Quiz
                </button>
            ) : (
                showResult ? (
                    <Result score={score} total={questions.length} restartQuiz={restartQuiz} />
                ) : (
                    <div>
                        <Question
                            question={questions[currentQuestion]}
                            questionNumber={currentQuestion + 1}
                            totalQuestions={questions.length}
                            handleAnswerClick={handleAnswerClick}
                            selectedAnswer={selectedAnswers[currentQuestion] ?? null}
                        />
                        <div className="timer">
                            <p>Time Left: {timer}s</p>
                        </div>
                        {selectedAnswers[currentQuestion] !== undefined && (
                            <button className="next-btn" onClick={handleNextClick}>
                                Next
                            </button>
                        )}
                    </div>
                )
            )}
        </div>
    );
};

export default Quiz;
