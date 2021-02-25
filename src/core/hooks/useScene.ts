import { useContext } from "react";
import SceneContext from "../components/Scene/SceneContext";

const useScene = () => {
  const ctx = useContext(SceneContext);
  if (!ctx) {
    throw new Error("Hook 'useScene' is out of 'Scene' provider.");
  }
  return ctx;
};

export default useScene;
