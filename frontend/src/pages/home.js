import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

const STORIES = [
  { id: 1, title: "Mycket Läskig",  image: "/images/bild1.jpg" },
  { id: 2, title: "Ganska Läskig", image: "/images/bild2.jpg" },
  { id: 3, title: "Mellan Läskig", image: "/images/bild3.jpg" },
  { id: 4, title: "Lite Läskig",   image: "/images/bild4.jpg" },
  { id: 5, title: "Superläskig",   image: "/images/bild3.jpg" },
  { id: 6, title: "Dödsskräck",    image: "/images/bild4.jpg" },
  { id: 7, title: "Mardröm",       image: "/images/bild1.jpg" },
  { id: 8, title: "Mörker",        image: "/images/bild2.jpg" },
];

const PER_PAGE = 4;

export default function Home() {
  const [showHelp, setShowHelp] = useState(false);
  const [page, setPage] = useState(0);
  const navigate = useNavigate();

  const totalPages = Math.ceil(STORIES.length / PER_PAGE);
  const visible = STORIES.slice(page * PER_PAGE, page * PER_PAGE + PER_PAGE);

  return (
    <div className="page">

      {/* Title row with help button */}
      <div className="heading-row">
        <h1 className="heading">Skräck Historier</h1>
        <button className="help-btn" onClick={() => setShowHelp(true)}>?</button>
      </div>

      {/* Page dots */}
      <div className="dots">
        {Array.from({ length: totalPages }).map((_, i) => (
          <div
            key={i}
            className={`dot ${page === i ? "dot-active" : ""}`}
            onClick={() => setPage(i)}
          />
        ))}
      </div>

      {/* Grid */}
      <div className="grid">
        {visible.map(story => (
          <div
            key={story.id}
            className="box"
            onClick={() => navigate(`/story/${story.id}`)}  // storyid/chapter/page --> gör bättre senare när bookmark function ska jobbas på
          >
            <p className="box-title">{story.title}</p>
            <div className="box-image">
              <img src={story.image} alt={story.title} />
            </div>
          </div>
        ))}
      </div>

      
      {/* Arrow navigation */}
<div className="pagination">
  <button
    className="page-btn"
    disabled={page === 0}
    onClick={() => setPage(p => p - 1)}
  >
    ← Föregående
  </button>
  <button
    className="page-btn"
    disabled={page === totalPages - 1}
    onClick={() => setPage(p => p + 1)}
  >
    Nästa sida →
  </button>
</div>

      {/* Help modal */}
      {showHelp && (
        <div className="modal-backdrop" onClick={() => setShowHelp(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <h2 className="modal-title">Hjälp</h2>
            <ul className="modal-list">
              <li>Klicka på en bild för att öppna historien,
              Bläddra mellan sidor med pilarna</li>
            </ul>
            <button className="btn" onClick={() => setShowHelp(false)}>Stäng</button>
          </div>
        </div>
      )}
    </div>
  );
}