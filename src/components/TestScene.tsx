import React from "react";
import { Scene } from "../core";

const TestScene: React.FC = () => {
  const create = (scene: Phaser.Scene) => {
    scene.add.image(400, 300, "sky");

    const particles = scene.add.particles("red");

    const emitter = particles.createEmitter({
      speed: 100,
      scale: { start: 1, end: 0 },
      blendMode: "ADD",
    });

    const logo = scene.physics.add.image(400, 100, "logo");

    logo.setVelocity(100, 200);
    logo.setBounce(1, 1);
    logo.setCollideWorldBounds(true);

    emitter.startFollow(logo);
  };

  const preload = (scene: Phaser.Scene) => {
    scene.load.setBaseURL("http://labs.phaser.io");

    scene.load.image("sky", "assets/skies/space3.png");
    scene.load.image("logo", "assets/sprites/phaser3-logo.png");
    scene.load.image("red", "assets/particles/red.png");
  };
  return <Scene name="TestScene" preload={preload} create={create} />;
};

export default TestScene;
