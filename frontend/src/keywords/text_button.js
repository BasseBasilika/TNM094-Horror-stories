 import triggers from "./triggers.js"
 
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
    const words = text.split(/\s+/); //split on space

    return words.map((word) => {
      const triggers = trigger(word);

      if (triggers) {
        return (
          <button
            onClick={() => play(triggers.sound)}
            className="word-button">
            {word}{" "}
          </button>
        );
      }

      return <span>{word} </span>;
    });
  }

  export default renderStoryText;