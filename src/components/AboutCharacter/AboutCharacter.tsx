import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import s from "./AboutCharacter.module.css";
import clsx from "clsx";

type Question = {
  id: number;
  text: string;
  options: {
    text: string;
    modifiers: {
      strength?: number;
      intelligence?: number;
      dexterity?: number;
      charisma?: number;
      credits?: number;
    };
  }[];
};

const AboutCharacter: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [hasCompletedSurvey, setHasCompletedSurvey] = useState(false);
  const [isFinalAnswerSelected, setIsFinalAnswerSelected] = useState(false);
  const [attributes, setAttributes] = useState({
    strength: 0,
    intelligence: 0,
    dexterity: 0,
    charisma: 0,
    credits: 0,
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCharacterStatus = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/characters/me",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (response.data.has_completed_survey) {
          setHasCompletedSurvey(true);
          navigate("/home");
        }
      } catch (err) {
        console.error("Error fetching character status:", err);
      }
    };

    const fetchQuestions = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/questions/");
        setQuestions(response.data);
      } catch (err) {
        console.error("Error fetching questions:", err);
      }
    };

    fetchCharacterStatus();
    fetchQuestions();
  }, [navigate]);

  const handleAnswer = (modifiers: Question["options"][0]["modifiers"]) => {
    setAttributes((prev) => ({
      strength: prev.strength + (modifiers.strength || 0),
      intelligence: prev.intelligence + (modifiers.intelligence || 0),
      dexterity: prev.dexterity + (modifiers.dexterity || 0),
      charisma: prev.charisma + (modifiers.charisma || 0),
      credits: prev.credits + (modifiers.credits || 0),
    }));

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      setIsFinalAnswerSelected(true);
    }
  };

  const finalizeCharacter = async () => {
    try {
      await axios.post(
        "http://127.0.0.1:8000/characters/update-attributes-after-survey/",
        attributes,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setIsFinalAnswerSelected(false);
      navigate("/home");
    } catch (err) {
      console.error("Error updating character:", err);
    }
  };

  if (hasCompletedSurvey) {
    return null;
  }

  return (
    <div className={s.container}>
      {questions.length > 0 && (
        <div className={s.questionCard}>
          <h2 className={s.questionText}>{questions[currentQuestion].text}</h2>
          <div className={s.optionsGrid}>
            {questions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                className={clsx(s.optionButton, {
                  [s.disabled]: isFinalAnswerSelected,
                })}
                onClick={() => handleAnswer(option.modifiers)}
                disabled={isFinalAnswerSelected}
              >
                {option.text}
              </button>
            ))}
          </div>
          <progress
            value={currentQuestion + 1}
            max={questions.length}
            className={s.progressBar}
          />
          {currentQuestion === questions.length - 1 && (
            <button className={s.finalizeButton} onClick={finalizeCharacter}>
              Take 10 ⛃ credits and go to home
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default AboutCharacter;
