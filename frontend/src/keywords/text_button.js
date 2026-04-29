 import triggers from "./triggers.js";
 // import { useRef } from "react";


let audioUnlocked = false;

function unlockAudio() {
  if (audioUnlocked) return;
  const silence = new Audio();
  silence.play().then(() => {
    audioUnlocked = true;
  }).catch(() => {});
}

  //hitta triggers
function trigger(word) {
  return triggers.find(trigger => trigger.keyword === word.toLowerCase().replace(/[.,!?;:()"']/g, ""));
}

  //spela upp ljudeffekt 
function play(soundFile) {
  const audio = new Audio(soundFile);
  audio.play();
}


  function renderStoryText(text) {
    // const lastTriggered = useRef(null); // avoid re-triggering same word
    
    function handleMove(e) {
      let element
      if (e.touches && e.touches.length > 0) {
        element = document.elementFromPoint(e.touches[0].clientX, e.touches[0].clientY);
      }
      else {
        element =  document.elementFromPoint(e.clientX, e.clientY);
      }
      
      if (element?.dataset?.trigger) { // && element.dataset.trigger !== lastTriggered.current maybe
      //lastTriggered.current = element.dataset.trigger; maybe add later
      play(element.dataset.trigger);
    }
    }
    
    /*function handlePointerEnd() {
      lastTriggered.current = null; // reset when finger lifts
    }*/


    const words = text.split(/\s+/); //split on space

    return (
    <div
      onPointerMove={handleMove}
      onTouchMove={handleMove}
      onTouchStart={unlockAudio}
      style={{ touchAction: "none" }} // prevents scroll interfering
    >
      {words.map((word, i) => {
        const triggers = trigger(word);
        if (triggers) {
          return (
            <span key={i} data-trigger={triggers.sound} className="word-button">
              {word}{" "}
            </span>
          );
        }
        return <span key={i}>{word} </span>;
      })}
    </div>
  );
}

  export default renderStoryText;