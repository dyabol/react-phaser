import { createContext } from "react";

const GameContext = createContext<Phaser.Game | undefined>(undefined);

export default GameContext;
