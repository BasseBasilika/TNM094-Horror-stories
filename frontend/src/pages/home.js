import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../home.css";

const SCARY_STORIES = [
  { id: 1, title: "Mycket Läskig",  image: "/images/bild1.jpg" },
  { id: 2, title: "Ganska Läskig", image: "/images/bild2.jpg" },
  { id: 3, title: "Mellan Läskig", image: "/images/bild3.jpg" },
  { id: 4, title: "Lite Läskig",   image: "/images/bild4.jpg" },
  { id: 5, title: "Superläskig",   image: "/images/bild3.jpg" },
  { id: 6, title: "Dödsskräck",    image: "/images/bild4.jpg" },
  { id: 7, title: "Mardröm",       image: "/images/bild1.jpg" },
  { id: 8, title: "Mörker",        image: "/images/bild2.jpg" },
];

const CHILDREN_STORIES = [
  { id: 9,  title: "Trollet i skogen",  image: "/images/bild8.jpg" },
  { id: 10, title: "Enhörningens resa", image: "/images/bild6.jpg" },
  { id: 11, title: "Magiska havet",     image: "/images/bild7.jpg" },
  { id: 12, title: "Draken",            image: "/images/bild5.jpg" },
  { id: 13, title: "Trollet",           image: "/images/bild8.jpg" },
  { id: 14, title: "Resa",              image: "/images/bild6.jpg" },
  { id: 15, title: "Magiska",           image: "/images/bild7.jpg" },
  { id: 16, title: "Pyro",              image: "/images/bild5.jpg" },
];



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
            onClick={() => navigate(`/story/${story.id}`)}
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
              <li>Klicka på en bild för att öppna historien. Bläddra mellan sidor med pilarna.</li>
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