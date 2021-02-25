import { useContext } from "react";
import GameContext from "../components/Game/GameContext";

const useGame = () => {
  const ctx = useContext(GameContext);
  if (!ctx) {
    throw new Error("Hook 'useGame' is out of 'Game' provider.");
  }
  return ctx;
};

export default useGame;
