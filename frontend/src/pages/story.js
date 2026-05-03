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
  const audioEnabledRef = useRef(null);
  
  

  const [musicArray, startPoints, endPoints] = musicInfo(id, chapterNr);
  
  const hasPlayed = musicArray.map(() => false);  
  
  const enableAudio = () => {
    audioEnabledRef.current = true;
    handleScroll() // starts any music that might be active at that time
  };

  // scroll tracking
  const storyBoxRef = useRef(null);

  // idea is to change currentstartat and return it to see if you need ot go into this function when scrolling
  function handleScroll(){

    if(audioEnabledRef.current !== true) return;

    const box = storyBoxRef.current;

    if (!box) return;

    const scrollTop = box.scrollTop;
    const maxScroll = box.scrollHeight - box.clientHeight;

    const scrollPercent = scrollTop / maxScroll;
    
    for (let i = 0; i < startPoints.length; i++) {

      const nextStart = startPoints[i + 1];

      // start a new song
      if (
        scrollPercent >= startPoints[i] &&
        (!nextStart || scrollPercent < nextStart)
      ) {
        //console.log("Play track:", i);

        // start music
        setStartat(startPoints[i])
        playMusic(musicArray, startPoints, i, thisstartat, endPoints, hasPlayed)
        hasPlayed[i] = true;
        break;
      }
      
      //console.log("Startat: " + thisstartat);
    }
  }

  // nuvarande hur många ord per sida
  // jag tycker vi väljer 2 st storlekar. En för webbsida och en för mobil (och kanske 1 för ipad) så får man konsekvent storlek på allt, vilket underlättar kodning senare

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
          onScroll={handleScroll}
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

