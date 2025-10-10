import quizCompleteImg from "../assets/quiz-complete.png";
import QUESTION from "../questions.js";

import QuestionTimer from "./QuestionTimer.jsx";

import { useState, useCallback } from "react";

export default function Quiz() {
    const [userAnswers, setUserAnswers] = useState([]);
    const [answerState, setAnswerState] = useState("");

    const activeQuestionIndex =
        answerState === "" ? userAnswers.length : userAnswers.length - 1;

    const quizIsComplete = activeQuestionIndex === QUESTION.length;

    const handleSelectAnswer = useCallback(
        function handleSelectAnswer(selectedAnswer) {
            setAnswerState("answered");

            setUserAnswers((prevUserAnswers) => {
                return [...prevUserAnswers, selectedAnswer];
            });

            setTimeout(() => {
                if (
                    selectedAnswer === QUESTION[activeQuestionIndex].answers[0]
                ) {
                    setAnswerState("correct");
                } else {
                    setAnswerState("wrong");
                }

                setTimeout(() => {
                    setAnswerState("");
                }, 2000);
            }, 1000);
        },
        [activeQuestionIndex]
    );

    const handleSkipAnswer = useCallback(
        () => handleSelectAnswer(null),
        [handleSelectAnswer]
    );

    if (quizIsComplete) {
        return (
            <div id="summary">
                <h2>Quiz Completed</h2>
                <img src={quizCompleteImg} alt="Congrats! Quiz is complete!" />
            </div>
        );
    }

    const shuffledAnswers = [...QUESTION[activeQuestionIndex].answers];
    shuffledAnswers.sort(() => Math.random() - 0.5);

    return (
        <div id="quiz">
            <div id="question">
                <QuestionTimer
                    key={activeQuestionIndex}
                    timeout={15000}
                    onTimeout={handleSkipAnswer}
                />
                <h2>{QUESTION[activeQuestionIndex].text}</h2>
                <ul id="answers">
                    {shuffledAnswers.map((answer) => {
                        const isSelected =
                            userAnswers[userAnswers.length - 1] === answer;

                        let cssClass = "";

                        if (answerState === "answered" && isSelected) {
                            cssClass = "selected";
                        }

                        if (
                            (answerState === "correct" ||
                                answerState === "wrong") &&
                            isSelected
                        ) {
                            cssClass = answerState;
                        }
                        return (
                            <li key={answer} className="answer">
                                <button
                                    onClick={() => handleSelectAnswer(answer)}
                                    className={cssClass}>
                                    {answer}
                                </button>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
}
