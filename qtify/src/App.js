import "./App.css";
import Hero from "./components/Hero/Hero.jsx";
import Navbar from "./components/Navbar/Navbar.jsx";
import Section from "./components/Section/Section.jsx";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Hero />

      <Section
        title="Top Albums"
        endpoint="https://qtify-backend.labs.crio.do/albums/top"
      />

      <Section
        title="New Albums"
        endpoint="https://qtify-backend.labs.crio.do/albums/new"
      />

      <Section
        title="Songs"
        endpoint="https://qtify-backend.labs.crio.do/songs"
        isSongs
      />
    </div>
  );
}

export default App;