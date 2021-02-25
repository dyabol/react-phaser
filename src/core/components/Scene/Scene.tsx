import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useMemo,
  useState,
} from "react";
import Phaser from "phaser";
import SceneContext from "./SceneContext";
import useGame from "../../hooks/useGame";

export type SceneType = {
  create?: (() => void) | null;
  preload?: (() => void) | null;
  init?: (() => void) | null;
} & Phaser.Scene;

type Props = {
  name: string;
  create?: (scene: Phaser.Scene) => void;
  preload?: (scene: Phaser.Scene) => void;
  init?: (scene: Phaser.Scene) => void;
  renderLoading?: (progress: number) => React.ReactNode;
} & Omit<
  Phaser.Types.Scenes.CreateSceneFromObjectConfig,
  "create" | "preload" | "init"
>;

const Scene = forwardRef<SceneType, Props>(
  (
    { name, children, create, preload, init, renderLoading, ...config },
    ref
  ) => {
    const [loading, setloading] = useState(!!preload);
    const [loadingProgress, setLoadingProgress] = useState(0);
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
          }
        : null;
      sceneInstance.create = create ? () => create(sceneInstance) : null;
      sceneInstance.init = init ? () => init(sceneInstance) : null;
      return sceneInstance;
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
      const listeners: Phaser.Events.EventEmitter[] = [];
      game.scene.add(name, scene, true);
      listeners.push(
        scene.load.once("start", () => {
          setloading(!!preload);
        }),
        scene.load.on("progress", (progress: number) => {
          setLoadingProgress(progress);
        })
      );

      return () => {
        game.scene.remove(name);
        listeners.forEach((listener) =>
          listener.eventNames().forEach((event) => listener.off(event))
        );
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useImperativeHandle(ref, () => scene, [scene]);

    return (
      <SceneContext.Provider value={scene}>
        {loading && renderLoading ? renderLoading(loadingProgress) : children}
      </SceneContext.Provider>
    );
  }
);

export default Scene;
