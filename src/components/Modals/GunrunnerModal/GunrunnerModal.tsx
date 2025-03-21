import React from "react";
import s from "./GunrunnerModal.module.css";
import shop from "../../../assets/shop.jpg";

type Weapon = {
  id: number;
  name: string;
  damage: number;
  weapon_type: string;
  price: number;
};

type GunrunnerModalProps = {
  weapons: Weapon[];
  currentWeapon: Weapon | null;
  onClose: () => void;
  onBuy: (weaponId: number) => void;
  onSell: () => void;
};

const GunrunnerModal: React.FC<GunrunnerModalProps> = ({
  weapons,
  currentWeapon,
  onClose,
  onBuy,
  onSell,
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
        {currentWeapon && (
          <div>
            <p>You already have a weapon: {currentWeapon.name}. </p>
            <div onClick={onSell} className={s.weaponItem}>
              Sell for {currentWeapon.price / 2} ⛃
            </div>
          </div>
        )}
        <button onClick={onClose} className={s.closeButton}>
          Close
        </button>
      </div>
    </div>
  );
};

export default GunrunnerModal;
