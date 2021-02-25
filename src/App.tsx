import "./App.css";
import { Game } from "./core";
import TestScene from "./components/TestScene";

function App() {
  return (
    <Game
      type={Phaser.AUTO}
      width={800}
      height={600}
      physics={{
        default: "arcade",
        arcade: {
          gravity: { y: 200 },
        },
      }}
    >
      <TestScene />
    </Game>
  );
}

export default App;
