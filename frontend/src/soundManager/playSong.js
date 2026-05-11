export default function playMusic(
  storyBoxRef,
  audioEnabledRef,
  musicRef
) {

  if (!audioEnabledRef.current) return;

  const box = storyBoxRef.current;

  if (!box) return;

  const maxScroll =
    box.scrollHeight - box.clientHeight;

  const scrollPercent =
    maxScroll <= 0
      ? 0
      : box.scrollTop / maxScroll;

  const {
    musicArray,
    startPoints,
    endPoints,
    hasPlayed
  } = musicRef.current;

  for (let i = 0; i < musicArray.length; i++) {

    const shouldPlay =
      scrollPercent >= startPoints[i] &&
      scrollPercent < endPoints[i];

    // PLAY
    if (shouldPlay && !hasPlayed[i]) {

      console.log()
      fadeIn(musicArray[i].audio, musicArray[i].volume);

      hasPlayed[i] = true;
    }

    // STOP
    if (!shouldPlay && hasPlayed[i]) {

      //musicArray[i].pause();

      fadeOut(musicArray[i].audio, musicArray[i].volume);
      //musicArray[i].currentTime = 0;

      hasPlayed[i] = false;
    }
  }
}

function fadeIn(audio, targetVolume, speed = 0.05) {

  audio.volume = 0;

  audio.play();

  const fade = setInterval(() => {

    if (audio.volume < targetVolume - speed) {
      audio.volume += speed * targetVolume;
    }

    else {
      audio.volume = targetVolume;
      clearInterval(fade);
    }

  }, 50);
}


function fadeOut(audio, targetVolume, speed = 0.035) {

  const fade = setInterval(() => {

    if (audio.volume > speed) {
      audio.volume -= targetVolume * speed;
    }

    else {
      audio.volume = 0;
      audio.pause();
      audio.currentTime = 0;

      clearInterval(fade);
    }

  }, 50);
}