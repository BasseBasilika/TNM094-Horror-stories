import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../home.css";
import storyData from '../data/books.json';



const SCARY_STORIES = storyData.horrorbooks;

const CHILDREN_STORIES = storyData.childrenbooks;



export default function Home({ category }) {
  const [showHelp, setShowHelp] = useState(false);
  
  const navigate = useNavigate();

  const isScary = category === "skrack";
  const stories = isScary ? SCARY_STORIES : CHILDREN_STORIES;
  const themeClass = isScary ? "home-scary" : "home-children";
  const title = isScary ? "Skräck Historier" : "Barnberättelser";
  const visible = stories;
  
  return (
    <div className={`home-page ${themeClass}`}>

     
      <div className="home-heading-row">

        <button 
          className="home-back-btn"
          onClick={() => navigate("/")}
        >
          ← Byt kategori
        </button>

        <h1 className="home-heading">{title}</h1>

        <button 
          className="home-help-btn" 
          onClick={() => setShowHelp(true)}
        >
          ?
        </button>

      </div>

     

      {/* Grid */}
      <div className="home-grid">
        {visible.map(story => (
          <div
            key={story.id}
            className="home-box"
            onClick={() => {
            window.location.href = `/story/${story.id}/1`;
          }}
          >
            <p className="home-box-title">{story.title}</p>
            <div className="home-box-image">
              <img src={story.image} alt={story.title} />
            </div>
          </div>
        ))}
      </div>

     
      {/* Help modal */}
      {showHelp && (
        <div className="home-modal-backdrop" onClick={() => setShowHelp(false)}>
          <div className={`home-modal ${themeClass}`} onClick={e => e.stopPropagation()}>
            <h2 className="home-modal-title">Hjälp</h2>
            <ul className="home-modal-list">
              <li>Klicka på en bild för att öppna historien. Scrolla för att hitta fler historier.</li>
            </ul>
            <button className="home-close-btn" onClick={() => setShowHelp(false)}>
              Stäng
            </button>
          </div>
        </div>
      )}

    </div>
  );
}