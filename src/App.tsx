import "./App.css";
import { Game } from "./core";
import { Switch, Route } from "react-router-dom";
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
      <Switch>
        <Route exact path="/">
          <TestScene />
        </Route>
        <Route path="/test">
          <TestScene />
        </Route>
      </Switch>
    </Game>
  );
}

export default App;
