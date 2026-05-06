/* eslint-disable no-unused-vars */
import { useParams, useNavigate } from "react-router-dom";
import "../story.css";
import storyData from '../data/books.json';
import { useEffect, useState } from "react";
import RenderStoryText from "../keywords/text_button.js"; 

const STORIES = [
  { id: 1, title: "Mycket Läskig", description: "En mycket läskig historia..." },
  { id: 2, title: "Ganska Läskig", description: "En ganska läskig historia..." },
  { id: 3, title: "Mellan Läskig", description: "En mellan läskig historia..." },
  { id: 4, title: "Lite Läskig", description: "En lite läskig historia..." },
  { id: 5, title: "Mycket Läskig", description: "En mycket läskig historia..." },
  { id: 6, title: "Ganska Läskig", description: "En ganska läskig historia..." },
  { id: 7, title: "Mellan Läskig", description: "En mellan läskig historia..." },
  { id: 8, title: "Lite Läskig", description: "En lite läskig historia..." },
];

const Bookmark = [
  { id: 1, currentChapter: 1, currentPage: 1 },
  { id: 2, currentChapter: 1, currentPage: 2 },
];

function splitChapter(text) {
  const words = text.split(" ").filter(word => word.length > 0);
  const pages = [];
  let index = 0;
  while (index < words.length) {
    pages.push(words[index]);
    index++;
  }
  return pages.join(" ");
}

export default function Story() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [started, setStarted] = useState(false);

  const bookmark = Bookmark.find(b => b.id === Number(id));
  const [chapterNr, setChapterNr] = useState(bookmark?.currentChapter || 1);

  const theStory = storyData.books.find(s => s.id === Number(id));
  const [chapterText, setChapterText] = useState("");

  const maxChapter = theStory.chapteramt;

  useEffect(() => {
    if (!theStory) return;
    fetch(`/books/${theStory.filename}/${chapterNr}.txt`)
      .then(res => res.text())
      .then(text => setChapterText(text));
  }, [theStory, chapterNr]);

  const textVector = splitChapter(chapterText);

  return (
    <div className="page">

      {!started && (
        <div
          onClick={() => setStarted(true)}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 10,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "rgba(0,0,0,0.7)",
            cursor: "pointer"
          }}
        >
          <p style={{ color: "#f0f0f0", fontFamily: "Georgia", fontSize: "22px", letterSpacing: "0.1em" }}>
            Tryck för att börja
          </p>
        </div>
      )}

      <div className="footer">
        <button className="btn" onClick={() => navigate("/")}>← Hem</button>
      </div>

      <div className="story-content">
        <h1 className="story-headning">{theStory.title}</h1>
        <h2 className="story-headning">{theStory.author}</h2>
        <div className="story-box">
          <div className="story-text">
            <RenderStoryText text={chapterText} />
          </div>
        </div>
      </div>

      <div className="footer">
        <button
          className="btn"
          disabled={chapterNr <= 1}
          onClick={() => setChapterNr(p => Math.max(1, p - 1))}
        >
          Förra kapitel
        </button>
        <button
          className="btn"
          disabled={chapterNr >= maxChapter}
          onClick={() => setChapterNr(p => Math.max(1, p + 1))}
        >
          Nästa kapitel
        </button>
      </div>
    </div>
  );
}