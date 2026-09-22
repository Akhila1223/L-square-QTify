import "./App.css";
import Hero from "./components/Hero/Hero.jsx";
import Navbar from "./components/Navbar/Navbar.jsx";
import Section from "./components/Section/Section.jsx";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Hero />
      <Section />
    </div>
  );
}

export default App;