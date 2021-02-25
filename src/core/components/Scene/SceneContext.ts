import { createContext } from "react";

const SceneContext = createContext<Phaser.Scene | undefined>(undefined);

export default SceneContext;
