import { useParams, useNavigate } from "react-router-dom";
import "../story.css";
import storyData from '../data/books.json';
import { useEffect, useState, useRef } from "react";
import renderStoryText from "../keywords/text_button.js"; 
import musicInfo from "../soundManager/songInfo.js";
import playMusic from "../soundManager/playSong.js";
import soundData from '../data/soundData.json'

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

// Actar som en sorts save function för användaren för nu, mer test än riktig (ksk json fil senare?).
const Bookmark = [
  { id: 1, currentChapter: 1,  currentPage: 1 },
  { id: 2, currentChapter: 1,  currentPage: 2 },
];

// Make a page of text
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

  // hitta id från URL
  const { id } = useParams();
  const navigate = useNavigate();

  // ladda kapitel och bookmark info. 
  const bookmark = Bookmark.find(b => b.id === Number(id));
  const [chapterNr, setChapterNr] = useState(bookmark?.currentChapter || 1)

  // läs in Story data
  const theStory = storyData.books.find(s => s.id === Number(id));
  const [chapterText, setChapterText] = useState("");

  // mängden kapitel i historien
  const maxChapter = theStory.chapteramt;

  // ladda info om story
  useEffect(() => {
    if (!theStory) return;

    fetch(`/books/${theStory.filename}/${chapterNr}.txt`)
      .then(res => res.text())
      .then(text => setChapterText(text));

}, [theStory, chapterNr]); // 👈 chapternr must be here


  // för tracking om vilken music som ska spelas
  const [thisstartat, setStartat] = useState("");
  const audioEnabledRef = useRef(false);
  const storyBoxRef = useRef(null);

  const musicRef = useRef({
    musicArray: [],
    startPoints: [],
    endPoints: [],
    hasPlayed: []
  });

  useEffect(() => {
    const [musicArray, startPoints, endPoints] = musicInfo(id, chapterNr);

    musicRef.current = {
      musicArray,
      startPoints,
      endPoints,
      hasPlayed: musicArray.map(() => false)
    };
  }, [id, chapterNr]);

  const enableAudio = () => {
    audioEnabledRef.current = true;
    playMusic(
      storyBoxRef,
      audioEnabledRef,
      musicRef
    );
  };

  const textVector = splitChapter(chapterText)

  return (
    <div className="page">
      <div className="footer">
        <button className="btn" onClick={() => navigate("/")}>← Hem</button>
        <button className="btn" onClick={() => enableAudio()}> SÄTT PÅ MUSIK </button>
      </div>

      <div className="story-content">
        <h1 className="story-headning">{theStory.title}</h1>
        <h2 className="story-headning">{theStory.author}</h2>
        <div
          className="story-box"
          ref={storyBoxRef}
          onScroll={() =>
            playMusic(
              storyBoxRef,
              audioEnabledRef,
              musicRef
            )
          }
        >
          <div className="story-text">
            {renderStoryText(chapterText)}
          </div>
        </div>
      </div>

    <div className="footer">
      <button 
          className="btn"
          disabled={chapterNr <= 1}
          onClick={() => 
            setChapterNr(p => Math.max(1, p - 1))
          } > Förra kapitel
      </button>
      <button 
          className="btn"
          disabled={chapterNr >= maxChapter}
          onClick={() => 
            setChapterNr(p => Math.max(1, p + 1))
          } > Nästa kapitel 
      </button>
    </div>
      
    </div>
  );
}

