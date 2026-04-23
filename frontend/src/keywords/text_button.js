 import triggers from "./triggers.js";
 // import { useRef } from "react";


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

    function handlePointerMove(e) {
      const element = document.elementFromPoint(e.clientX, e.clientY); // get element where finger is

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
      onPointerMove={handlePointerMove}
      //onPointerUp={handlePointerEnd}
      //onPointerLeave={handlePointerEnd}
      style={{ touchAction: "none" }} // prevents scroll interfering
    >
      {words.map((word, i) => {
        const triggers = trigger(word);
        if (triggers) {
          return (
            <span
              key={i}
              data-trigger={triggers.sound} // store sound path in DOM
              className="word-button"
            >
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