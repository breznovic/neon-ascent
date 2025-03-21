import React, { useState } from "react";
import s from "./JobModal.module.css";

type JobModalProps = {
  onClose: () => void;
  onSelectJob: (job: string) => void;
  onNotify: (message: string, isError: boolean) => void;
  characterData: {
    strength: number;
    intelligence: number;
    dexterity: number;
    charisma: number;
  };
};

const JobModal: React.FC<JobModalProps> = ({
  onClose,
  onSelectJob,
  characterData,
  onNotify,
}) => {
  const [step, setStep] = useState<number>(1);
  const [selectedJob, setSelectedJob] = useState<string | null>(null);

  const handleJobSelection = (job: string) => {
    setSelectedJob(job);
    setStep(2);
  };

  const handleCompleteQuest = () => {
    if (selectedJob) {
      onSelectJob(selectedJob);
      onClose();
    }
  };

  return (
    <div className={s.modalOverlay}>
      <div className={s.modalContent}>
        <h2>Find a Job</h2>
        {step === 1 && (
          <>
            <p>Choose your path:</p>
            <div className={s.jobOptions}>
              <button
                className={s.jobButton}
                onClick={() => handleJobSelection("Criminal")}
              >
                Become a Criminal
              </button>
              <button
                className={s.jobButton}
                onClick={() => handleJobSelection("Hacker")}
              >
                Become a Hacker
              </button>
              <button
                className={s.jobButton}
                onClick={() => handleJobSelection("Corporate")}
              >
                Join the Corporation
              </button>
            </div>
          </>
        )}
        {step === 2 && selectedJob && (
          <>
            <p>Prove your worth as a {selectedJob}!</p>
            <div className={s.quest}>
              {selectedJob === "Criminal" && (
                <>
                  <p>
                    A local gang leader tests your strength and dexterity. Can
                    you pass the test?
                  </p>
                  <button
                    onClick={() => {
                      if (
                        characterData.strength >= 1 ||
                        characterData.dexterity >= 1
                      ) {
                        onNotify("You passed the test!", false);
                        handleCompleteQuest();
                      } else {
                        onNotify("You failed the test. Try again later.", true);
                        onClose();
                      }
                    }}
                  >
                    Attempt the Test
                  </button>
                </>
              )}
              {selectedJob === "Hacker" && (
                <>
                  <p>
                    A mysterious figure challenges your intelligence. Can you
                    solve the puzzle?
                  </p>
                  <button
                    onClick={() => {
                      if (characterData.intelligence >= 1) {
                        onNotify("You solved the puzzle!", false);
                        handleCompleteQuest();
                      } else {
                        onNotify(
                          "You failed the puzzle. Try again later.",
                          true
                        );
                        onClose();
                      }
                    }}
                  >
                    Solve the Puzzle
                  </button>
                </>
              )}
              {selectedJob === "Corporate" && (
                <>
                  <p>
                    The corporation evaluates your charisma. Can you impress
                    them?
                  </p>
                  <button
                    onClick={() => {
                      if (characterData.charisma >= 1) {
                        onNotify("You impressed the corporation!", false);
                        handleCompleteQuest();
                      } else {
                        onNotify(
                          "You failed to impress them. Try again later.",
                          true
                        );
                        onClose();
                      }
                    }}
                  >
                    Impress the Corporation
                  </button>
                </>
              )}
            </div>
          </>
        )}
        <button onClick={onClose} className={s.closeButton}>
          Close
        </button>
      </div>
    </div>
  );
};

export default JobModal;
