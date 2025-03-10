import { Character } from "../Home/Home";
import s from "./CharacterCard.module.css";

type Props = {
  characterData: Character | null;
};

const CharacterCard: React.FC<Props> = ({ characterData }) => {
  const experience = characterData?.experience || 0;
  const health = characterData?.health || 0;

  const progress = experience % 10;
  const progressPercentage = (progress / 10) * 100;

  const maxHealth = 100;
  const healthProgressPercentage = (health / maxHealth) * 100;

  return (
    <div className={s.characterCard}>
      <h2 className={s.title}>Character Stats</h2>

      <div className={s.container}>
        <div className={s.health}>
          <strong>Health:</strong> {health}/{maxHealth}
        </div>
        <div className={s.progressBar}>
          <div
            className={s.progressFill}
            style={{ width: `${healthProgressPercentage}%` }}
          ></div>
        </div>

        <div className={s.level}>
          <strong>Level:</strong> <strong>{characterData?.level}</strong>
        </div>
        <div className={s.progressBar}>
          <div
            className={s.progressFill}
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
      </div>

      <div className={s.statsGrid}>
        <div className={s.statItem}>
          <strong>Strength:</strong> {characterData?.strength}
        </div>
        <div className={s.statItem}>
          <strong>Intelligence:</strong> {characterData?.intelligence}
        </div>
        <div className={s.statItem}>
          <strong>Dexterity:</strong> {characterData?.dexterity}
        </div>
        <div className={s.statItem}>
          <strong>Charisma:</strong> {characterData?.charisma}
        </div>
        <div className={s.status}>
          <strong>{characterData?.status}</strong>
        </div>
        <div className={s.status}>
          <strong>
            {characterData?.weapon ? characterData.weapon.name : "No weapon"}
          </strong>
        </div>
        <div className={s.fullWidthStat}>
          <strong>Credits:</strong> {characterData?.credits} ⛃
        </div>
      </div>
    </div>
  );
};

export default CharacterCard;
