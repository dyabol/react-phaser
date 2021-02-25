import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useLayoutEffect,
  useMemo,
  useState,
} from "react";
import Phaser from "phaser";
import SceneContext from "./SceneContext";
import useGame from "../../hooks/useGame";

type SceneType = {
  create?: (() => void) | null;
  preload?: (() => void) | null;
  init?: (() => void) | null;
} & Phaser.Scene;

type Props = {
  name: string;
  create?: (scene: Phaser.Scene) => void;
  preload?: (scene: Phaser.Scene) => void;
  init?: (scene: Phaser.Scene) => void;
} & Omit<
  Phaser.Types.Scenes.CreateSceneFromObjectConfig,
  "create" | "preload" | "init"
>;

const Scene = forwardRef<SceneType, Props>(
  ({ name, children, create, preload, init, ...config }, ref) => {
    const [loading, setloading] = useState(!!preload);
    const game = useGame();

    const scene = useMemo(() => {
      const sceneInstance: SceneType = new Phaser.Scene({
        ...config,
        key: name,
      });
      sceneInstance.preload = preload
        ? () => {
            preload(sceneInstance);
            sceneInstance.load.once("complete", () => {
              setloading(false);
            });
            sceneInstance.load.start();
          }
        : null;
      sceneInstance.create = create ? () => create(sceneInstance) : null;
      sceneInstance.init = init ? () => init(sceneInstance) : null;
      return sceneInstance;
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
      game.scene.add(name, scene, true);
      return () => {
        game.scene.remove(name);
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useImperativeHandle(ref, () => scene, [scene]);

    return (
      <SceneContext.Provider value={scene}>
        {loading ? null : children}
      </SceneContext.Provider>
    );
  }
);

export default Scene;
