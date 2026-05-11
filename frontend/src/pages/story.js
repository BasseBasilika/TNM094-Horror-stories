import { useParams, useNavigate } from "react-router-dom";
import "../story.css";
import storyData from '../data/books.json';
import { useEffect, useState, useRef } from "react";
import RenderStoryText from "../keywords/text_button.js"; 
import musicInfo from "../soundManager/songInfo.js";
import playMusic from "../soundManager/playSong.js";

// Används ej just nu, sparat som test
const Bookmark = [
  { id: 1, currentChapter: 1 },
  { id: 2, currentChapter: 1 },
]; 


export default function Story() {

  // hitta id från URL
  const { id, currentChapter } = useParams();
  const chapterNr = Number(currentChapter);

  const navigate = useNavigate();
  const [started, setStarted] = useState(false);

  //const bookmark = Bookmark.find(b => b.id === Number(id));
  //const [chapterNr, setChapterNr] = useState(bookmark?.currentChapter || 1)

  // läs in Story data  
  const allStories = [
    ...storyData.horrorbooks,
    ...storyData.childrenbooks
  ];

  const theStory = allStories.find(
    s => s.id === Number(id)
  );

  const [chapterText, setChapterText] = useState("");

  // ladda info om story 
  useEffect(() => {
    if (!theStory) return;
    fetch(`/books/${theStory.filename}/${chapterNr}.txt`)
      .then(res => res.text())
      .then(text => setChapterText(text));

}, [theStory, chapterNr]); // 👈 chapternr must be here

  // mängden kapitel i historien
  const maxChapter = theStory.chapteramt;

  // för tracking om vilken music som ska spelas
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


  return (
    <div className="page">

      {!started && (
        <div
          onClick={() => {
            setStarted(true);
            enableAudio();
          }}
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
        <button className="btn" onClick={() => { // bytte till ladda om så musiken stoppar och ljudobjekt släpps
            window.location.href = `/`;
          }}>← Hem</button>
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
            <RenderStoryText text={chapterText} />
          </div>
        </div>
      </div>

      <div className="footer">
        <button
          className="btn"
          disabled={chapterNr <= 1}
          onClick={() => {
            window.location.href = `/story/${id}/${chapterNr - 1}`;
          }}
        >
          Förra kapitel
        </button>
        <button
          className="btn"
          disabled={chapterNr >= maxChapter}
          onClick={() => {
            window.location.href = `/story/${id}/${chapterNr + 1}`;
          }}
        >
          Nästa kapitel
        </button>
      </div>
    </div>
  );
}

