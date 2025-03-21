import { useEffect, useState } from "react";
import s from "./Home.module.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import CharacterCard from "../CharacterCard/CharacterCard";
import room from "../../assets/room.png";
import GunrunnerModal from "../Modals/GunrunnerModal/GunrunnerModal";
import NotificationModal from "../Modals/NotificationModal/NotificationModal";
import JobModal from "../Modals/JobModal/JobModal";

type Weapon = {
  id: number;
  name: string;
  damage: number;
  weapon_type: string;
  price: number;
};
export type Character = {
  name: string;
  health: number;
  strength: number;
  intelligence: number;
  dexterity: number;
  charisma: number;
  experience: number;
  credits: number;
  status: string;
  weapon: Weapon | null;
  level: number;
  id: number;
};

const Home: React.FC = () => {
  const navigate = useNavigate();

  const [characterData, setCharacterData] = useState<Character | null>(null);
  const [loading, setLoading] = useState(true);

  const [isGunrunnerModalOpen, setIsGunrunnerModalOpen] = useState(false);
  const [isJobModalOpen, setIsJobModalOpen] = useState(false);
  const [weapons, setWeapons] = useState<Weapon[]>([]);
  const [discountedPrice, setDiscountedPrice] = useState<number | null>(null);
  const [notification, setNotification] = useState<{
    message: string;
    isError: boolean;
  } | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

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
        setCharacterData(response.data);
      } catch (err) {
        if (axios.isAxiosError(err) && err.response?.status === 401) {
          console.error("Unauthorized, redirecting to login");
          navigate("/login");
        } else {
          console.error("Error fetching character status:", err);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCharacterStatus();
  }, [navigate]);

  const handleGunrunnerClick = async () => {
    try {
      const charisma = characterData?.charisma || 0;
      const response = await axios.get(
        "http://127.0.0.1:8000/weapons/random/",
        {
          params: { charisma },
        }
      );
      setWeapons([response.data]);
      setDiscountedPrice(response.data.price);
      setIsGunrunnerModalOpen(true);
    } catch (err) {
      console.error("Error fetching weapons:", err);
    }
  };

  const handleBuyWeapon = async (weaponId: number) => {
    try {
      if (!characterData) return;

      const response = await axios.post(
        `http://127.0.0.1:8000/characters/${characterData.id}/buy-weapon/${weaponId}`,
        { discounted_price: discountedPrice },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setCharacterData(response.data);
      setIsGunrunnerModalOpen(false);
      setNotification({
        message: "Weapon purchased successfully!",
        isError: false,
      });
    } catch (err) {
      console.error("Error buying weapon:", err);
      setNotification({
        message: "Not enough credits to buy the weapon.",
        isError: true,
      });
    }
  };

  const handleSellWeapon = async () => {
    try {
      if (!characterData || !characterData.weapon) return;

      const response = await axios.post(
        `http://127.0.0.1:8000/characters/${characterData.id}/sell-weapon/`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setCharacterData(response.data);
      setNotification({
        message: `Weapon sold for ${characterData.weapon.price / 2} ⛃`,
        isError: false,
      });
    } catch (err) {
      console.error("Error selling weapon:", err);
      setNotification({
        message: "Error selling weapon.",
        isError: true,
      });
    }
  };

  const handleFindJobClick = () => {
    setIsJobModalOpen(true);
  };

  const handleSelectJob = async (job: string) => {
    try {
      if (!characterData) return;

      const response = await axios.post(
        `http://127.0.0.1:8000/characters/${characterData.id}/update-job/`,
        { job },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );

      setCharacterData(response.data);
      setNotification({
        message: `You are now a ${job}!`,
        isError: false,
      });
    } catch (err) {
      console.error("Error updating job:", err);
      setNotification({
        message: "Failed to update job.",
        isError: true,
      });
    }
  };

  const closeNotification = () => {
    setNotification(null);
  };

  const handleNotify = (message: string, isError: boolean) => {
    setNotification({ message, isError });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={s.container}>
      <h1 className={s.neon}>Home, sweet home</h1>
      <div className={s.homeInfo}>
        <div className={s.info}>
          <p>{characterData?.name}, now you are in your dorm room.</p>
          <img src={room} alt="Room" className={s.img} />
        </div>
        <div>
          <CharacterCard characterData={characterData} />
        </div>
      </div>
      <div className={s.buttons}>
        <button onClick={() => {}} className={s.button}>
          Resting
        </button>
        <button onClick={handleFindJobClick} className={s.button}>
          Find a job
        </button>
        <button onClick={handleGunrunnerClick} className={s.button}>
          Go to the gunrunner
        </button>
      </div>
      {isGunrunnerModalOpen && (
        <GunrunnerModal
          weapons={weapons}
          currentWeapon={characterData?.weapon || null}
          onClose={() => setIsGunrunnerModalOpen(false)}
          onBuy={handleBuyWeapon}
          onSell={handleSellWeapon}
        />
      )}
      {isJobModalOpen && (
        <JobModal
          onClose={() => setIsJobModalOpen(false)}
          onSelectJob={handleSelectJob}
          onNotify={handleNotify}
          characterData={{
            strength: characterData?.strength || 0,
            intelligence: characterData?.intelligence || 0,
            dexterity: characterData?.dexterity || 0,
            charisma: characterData?.charisma || 0,
          }}
        />
      )}
      {notification && (
        <NotificationModal
          message={notification.message}
          onClose={closeNotification}
          isError={notification.isError}
        />
      )}
    </div>
  );
};

export default Home;
