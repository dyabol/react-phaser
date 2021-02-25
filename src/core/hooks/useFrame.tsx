import { useEffect } from "react";
import useGame from "./useGame";

const useFrame = (frameCallback: (time: number, delta: number) => void) => {
  const game = useGame();

  useEffect(() => {
    const callback = (time: number, delta: number) => {
      frameCallback(time, delta);
    };
    game.events.on("step", callback);
    return () => {
      game.events.off("step", callback);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [frameCallback]);
};

export default useFrame;
