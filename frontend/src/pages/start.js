import { useNavigate } from "react-router-dom";
import "../start.css";

export default function Start() {
  const navigate = useNavigate();

  return (
    <div className="start-page">
      <h1 className="start-heading">Välkommen</h1>

      <div className="start-cards">

        <div className="start-card start-card-scary" onClick={() => navigate("/home/skrack")}>
          <div className="start-card-icon start-card-icon-scary">🕷️</div>
          <div className="start-card-body">
            <p className="start-card-title start-card-title-scary">Skräckhistorier</p>
            <p className="start-card-desc start-card-desc-scary">Mörka, spännande berättelser</p>
            <button className="start-btn start-btn-scary">Välj</button>
          </div>
        </div>

        <div className="start-card start-card-children" onClick={() => navigate("/home/barn")}>
          <div className="start-card-icon start-card-icon-children">🌟</div>
          <div className="start-card-body">
            <p className="start-card-title start-card-title-children">Barnberättelser</p>
            <p className="start-card-desc start-card-desc-children">Roliga, varma äventyr</p>
            <button className="start-btn start-btn-children">Välj</button>
          </div>
        </div>

      </div>
    </div>
  );
}