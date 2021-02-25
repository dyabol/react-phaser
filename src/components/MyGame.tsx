import React, { useRef } from "react";
import { Scene, SceneType } from "../core";
import useFrame from "../core/hooks/useFrame";

const TestScene: React.FC = () => {
  const sceneRef = useRef<SceneType>(null);
  const catRef = useRef<Phaser.Types.Physics.Arcade.SpriteWithDynamicBody>();

  const initKeyBoard = () => {
    const scene = sceneRef.current;
    const cat = catRef.current;

    if (scene && cat) {
      const cursors = scene.input.keyboard.createCursorKeys();
      if (cursors.left.isDown) {
        cat.setVelocityX(-160);

        cat.anims.play("left", true);
      } else if (cursors.right.isDown) {
        cat.setVelocityX(160);

        cat.anims.play("right", true);
      } else {
        cat.setVelocityX(0);

        cat.anims.play("turn");
      }

      if (cursors.up.isDown && cat.body.touching.down) {
        cat.setVelocityY(-330);
      }
    }
  };

  useFrame(initKeyBoard);

  const createCat = (scene: Phaser.Scene) => {
    const cat = scene.physics.add
      .sprite(100, 450, "cat")
      .setScale(3)
      .refreshBody();
    cat.setBounce(0.2);
    cat.setCollideWorldBounds(true);
    scene.anims.create({
      key: "left",
      frames: scene.anims.generateFrameNumbers("cat", { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1,
    });

    scene.anims.create({
      key: "turn",
      frames: [{ key: "cat", frame: 4 }],
      frameRate: 20,
    });

    scene.anims.create({
      key: "right",
      frames: scene.anims.generateFrameNumbers("cat", { start: 5, end: 8 }),
      frameRate: 10,
      repeat: -1,
    });

    catRef.current = cat;
    return cat;
  };

  const createPlatforms = (scene: Phaser.Scene) => {
    const platforms = scene.physics.add.staticGroup();
    const r1 = scene.add.rectangle(400, 580, 800, 40, 0x00ff00);
    platforms.add(r1);
    return platforms;
  };

  const create = (scene: Phaser.Scene) => {
    scene.add.image(400, 300, "sky");
    const cat = createCat(scene);
    const platforms = createPlatforms(scene);
    scene.physics.add.collider(cat, platforms);
  };

  const preload = (scene: Phaser.Scene) => {
    scene.load.image("sky", "http://labs.phaser.io/assets/skies/sky4.png");
    scene.load.spritesheet("cat", "assets/cat_pixel.png", {
      frameWidth: 18,
      frameHeight: 18,
    });
  };

  return (
    <Scene name="MyGame" preload={preload} create={create} ref={sceneRef} />
  );
};

export default TestScene;
