import Game from "./components/Game";
// https://www.youtube.com/watch?v=yCEIgEOZ36g
export default function App() {
  return (
    <div className="App">
      <Game rows={20} columns={10} />
    </div>
  );
}
