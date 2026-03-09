import { useState } from "react";
import "./App.css";

const BOOKS = [
  { id: 1, title: "Mycket läskig", color: "#2d6a4f" },
  { id: 2, title: "Ganska läskig", color: "#1d3557" },
  { id: 3, title: "Mellan Läskig", color: "#6b0f1a" },
  
];

export default function App() {
  const [selected, setSelected] = useState(null);

  return (
    <div className="page">
      <h1 className="heading">Välj en Book</h1>

      <div className="grid">
        {BOOKS.map(book => (
          <div
            key={book.id}
            className={`box ${selected?.id === book.id ? "active" : ""}`}
            style={{ borderColor: book.color, background: selected?.id === book.id ? book.color : "" }}
            onClick={() => setSelected(book)}
          >
            <h2 className="box-title">{book.title}</h2>
            <p className="box-author">{book.author}</p>
          </div>
        ))}
      </div>

      {selected && (
        <p className="selection">
          You selected: <strong>{selected.title}</strong>
        </p>
      )}
    </div>
  );
}