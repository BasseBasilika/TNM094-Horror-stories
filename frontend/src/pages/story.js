import { useParams, useNavigate } from "react-router-dom";
import "../story.css";
import storyData from "../data/books.json";
import { useEffect, useState } from "react";
import renderStoryText from "../keywords/text_button.js"; 

const STORIES = [renderStoryText,
  { id: 1, title: "Mycket Läskig", description: "En mycket läskig historia..." },
  { id: 2, title: "Ganska Läskig", description: "En ganska läskig historia..." },
  { id: 3, title: "Mellan Läskig", description: "En mellan läskig historia..." },
  { id: 4, title: "Lite Läskig", description: "En lite läskig historia..." },
  { id: 5, title: "Mycket Läskig", description: "En mycket läskig historia..." },
  { id: 6, title: "Ganska Läskig", description: "En ganska läskig historia..." },
  { id: 7, title: "Mellan Läskig", description: "En mellan läskig historia..." },
  { id: 8, title: "Lite Läskig", description: "En lite läskig historia..." },
];



export default function Story() {
  const { id } = useParams();
  const navigate = useNavigate();
  const story = STORIES.find(s => s.id === Number(id));

  // läs in Story data
  const theStory = storyData.books.find(s => s.id === Number(id));
  //console.log(theStory)
  const [chapterText, setChapterText] = useState("");

  useEffect(() => {
    if (!theStory) return;

    fetch(`/books/${theStory.filename}/1.txt`)
      .then(res => res.text())
      .then(text => setChapterText(text));
  }, [theStory]);

  // måste vara efter useState useEffect, React flippar ut annars
  if (!story) return <div className="page"><p>Historien hittades inte.</p></div>;

  return (
    <div className="page">
      <div className="story-content">
        <h1 className="story-headning">{theStory.title}</h1>
        <h2 className="story-headning">{theStory.author}</h2>

        <div className="story-box">
          <div className="story-text">
            {renderStoryText(chapterText)}
          </div>
        </div>
      </div>

      <div className="footer">
        <button className="btn" onClick={() => navigate("/")}>← Hem</button>
      </div>

    </div>
  );
}