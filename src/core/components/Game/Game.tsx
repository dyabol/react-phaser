import React, { useEffect, useRef, useState } from "react";
import GameContext from "./GameContext";

const Game: React.FC<Phaser.Types.Core.GameConfig> = ({
  children,
  ...config
}) => {
  const [booting, setBooting] = useState(true);
  const game = useRef<Phaser.Game>();
  const parent = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const gameInstance = new Phaser.Game({
      parent: parent.current ?? undefined,
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
      <div id="game" ref={parent}>
        {booting ? null : children}
      </div>
    </GameContext.Provider>
  );
};

export default Game;
