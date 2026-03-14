import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

const STORIES = [
  { id: 1, title: "Mycket Läskig",  image: "/images/bild1.jpg" },
  { id: 2, title: "Ganska Läskig", image: "/images/bild2.jpg" },
  { id: 3, title: "Mellan Läskig", image: "/images/bild3.jpg" },
  { id: 4, title: "Lite Läskig",   image: "/images/bild4.jpg" },
];


export default function Home() {
  const [selected, setSelected] = useState(null);
  const [showHelp, setShowHelp] = useState(false);
  const navigate = useNavigate();

  const handleNext = () => {
    if (selected) navigate(`/story/${selected.id}`);
  };
  return (
    <div className="page">
      <h1 className="heading">Skräck Historier</h1>

      <div className="grid">
        {STORIES.map(story => (
          <div
            key={story.id}
            className={`box ${selected?.id === story.id ? "active" : ""}`}
            onClick={() => setSelected(story)}
          >
            <p className="box-title">{story.title}</p>
            <div className="box-image">
            <img src={story.image} alt={story.title} />
          </div>
        </div>
        ))}
      </div>

     <div className="footer">
        <button className="btn" onClick={() => setShowHelp(true)}>Hjälp</button>
        <button
          className="btn btn-next"
          disabled={!selected}
          onClick={handleNext}
        >
          Nästa
        </button>
      </div>
    {showHelp && (
        <div className="modal-backdrop" onClick={() => setShowHelp(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <h2 className="modal-title">Hjälp</h2>
            <ul className="modal-list">
              <li>Välj en historia genom att klicka på en bild,
              Den valda bilden markeras med en röd ram
              tryck på "Nästa" för att fortsätta</li>
            </ul>
            <button className="btn" onClick={() => setShowHelp(false)}>Stäng</button>
          </div>
        </div>
      )}

    </div>
  );
}