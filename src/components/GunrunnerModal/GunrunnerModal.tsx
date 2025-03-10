import React from "react";
import s from "./GunrunnerModal.module.css";
import shop from "../../assets/shop.jpg";

type Weapon = {
  id: number;
  name: string;
  damage: number;
  weapon_type: string;
  price: number;
};

type GunrunnerModalProps = {
  weapons: Weapon[];
  onClose: () => void;
  onBuy: (weaponId: number) => void;
};

const GunrunnerModal: React.FC<GunrunnerModalProps> = ({
  weapons,
  onClose,
  onBuy,
}) => {
  return (
    <div className={s.modalOverlay}>
      <div className={s.modalContent}>
        <h2>Local gunrunner</h2>
        <img src={shop} alt="Shop" className={s.shopImage} />
        <p>Hi! I currently has only one weapon in stock:</p>
        <ul className={s.weaponList}>
          {weapons.map((weapon, index) => (
            <li
              key={index}
              className={s.weaponItem}
              onClick={() => onBuy(weapon.id)}
            >
              <strong>{weapon.name}</strong>
              <div>Price: {weapon.price} ⛃</div>
            </li>
          ))}
        </ul>
        <button onClick={onClose} className={s.closeButton}>
          Close
        </button>
      </div>
    </div>
  );
};

export default GunrunnerModal;
