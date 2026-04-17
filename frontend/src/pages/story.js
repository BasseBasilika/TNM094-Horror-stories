import { useParams, useNavigate } from "react-router-dom";
import "../story.css";
import storyData from '../data/books.json';
import { useEffect, useState } from "react"; // används för filereading


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
function splitChapter(text, ArbitrarySize, pagenr) {

  const words = text.split(" ")
  const noEmptyStrsArr = words.filter(item => item.length > 0)

  const start = ArbitrarySize * (pagenr - 1)

  const pageoftext = [];
  for (let i = 0; i < ArbitrarySize; i++) {
    const chunk = noEmptyStrsArr.slice(i + start, i + ArbitrarySize + start);
    pageoftext.push(chunk);
  }

  return pageoftext;
}

export default function Story() {
  const { id } = useParams();
  const navigate = useNavigate();

  // ladda kapitel och bookmark info. 
  const userInfo = Bookmark.find(b => b.id === Number(id));
  const bookmark = Bookmark.find(b => b.id === Number(id));
  const [pageNr, setPageNr] = useState(bookmark?.currentPage || 1);

  const chapternr = userInfo?.currentChapter || 1;

  
  // läs in Story data
  const theStory = storyData.books.find(s => s.id === Number(id));
  const [chapterText, setChapterText] = useState("");

  useEffect(() => {
  if (!theStory) return;

  fetch(`/books/${theStory.filename}/${chapternr}.txt`)   // kanske behövs ändras senare story.filename/chapter/pagenr
    .then(res => res.text())
    .then(text => setChapterText(text))
    .catch(() => setChapterText("Detta är placeholder text för storyn."));

  }, [theStory]);

  // nuvarande hur många ord per sida
  // jag tycker vi väljer 2 st storlekar. En för webbsida och en för mobil (och kanske 1 för ipad) så får man konsekvent storlek på allt, vilket underlättar kodning senare
  const ArbitrarySize = 400

  const textVector = splitChapter(chapterText, ArbitrarySize, pageNr)

  console.log(chapterText)


  const textOnPage = textVector
    .slice(0, 1)
    .flat()
    .join(" ");

  return (
    <div className="page">
      <div className="footer">
        <button className="btn" onClick={() => navigate("/")}>← Hem</button>
      </div>

      <div className="story-content">
        <h1 className="story-headning">{theStory.title}</h1>
        <h2 className="story-headning">{theStory.author}</h2>
        <div className="story-box">
          <div className="story-text">{textOnPage}</div>
        </div>
      </div>

    <div className="footer">
      <button 
          className="btn"
          onClick={() => setPageNr(p => Math.max(1, p - 1))} > ←
      </button>
      <button 
          className="btn"
          onClick={() => setPageNr(p => Math.max(1, p + 1))} > → 
      </button>
    </div>
      
    </div>
  );
}