import React, { useEffect, useRef, useState } from "react";
import GameContext from "./GameContext";

const Game: React.FC<Phaser.Types.Core.GameConfig> = ({
  children,
  ...config
}) => {
  const [booting, setBooting] = useState(true);
  const game = useRef<Phaser.Game>();

  useEffect(() => {
    const gameInstance = new Phaser.Game({
      ...config,
    });
    gameInstance.events.on("ready", () => {
      setBooting(false);
    });
    game.current = gameInstance;
    return () => {
      gameInstance.destroy(true);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <GameContext.Provider value={game.current}>
      {booting ? null : children}
    </GameContext.Provider>
  );
};

export default Game;
