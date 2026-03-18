import { useParams, useNavigate } from "react-router-dom";
import "../App.css";

const STORIES = [
  { id: 1, title: "Mycket Läskig",  description: "En mycket läskig historia..." },
  { id: 2, title: "Ganska Läskig", description: "En ganska läskig historia..." },
  { id: 3, title: "Mellan Läskig", description: "En mellan läskig historia..." },
  { id: 4, title: "Lite Läskig",   description: "En lite läskig historia..." },
  { id: 5, title: "Mycket Läskig",  description: "En mycket läskig historia..." },
  { id: 6, title: "Ganska Läskig", description: "En ganska läskig historia..." },
  { id: 7, title: "Mellan Läskig", description: "En mellan läskig historia..." },
  { id: 8, title: "Lite Läskig",   description: "En lite läskig historia..." },
];

export default function Story() {
  const { id } = useParams();
  const navigate = useNavigate();
  const story = STORIES.find(s => s.id === Number(id));

  if (!story) return <div className="page"><p>Historien hittades inte.</p></div>;

  return (
    <div className="page">
      <div className="story-content">
        <h1 className="story-headning">{story.title}</h1>
        <div className="story-box">
          <p className="story-text">{story.description}</p>
        </div>
      </div>

      <div className="footer">
        <button className="btn" onClick={() => navigate("/")}>← Hem</button>
      </div>

    </div>
  );
}