import storyData from '../data/books.json';
import soundData from '../data/soundData.json'

// function to manage the music in each chapter
export default function musicInfo(id, chapterNr){

    // load related things to find the right audio
    const theStory = storyData.books.find(s => s.id === Number(id));
    const fileName = theStory.filename;

    const storySounds = soundData.soundData.find(
         s => s.id === Number(id)
    );

    const chapterSounds = storySounds?.chapters.find(
    c => c.chapter === chapterNr
    );

    const songs = chapterSounds?.music || [];

    let songArray = []
    let startPoints = []
    let endPoints = []


    // currently experimental to see if the correct thing plays
    for (var i = 0; i < songs.length; i++){
        const audio = new Audio(`/books/${fileName}/${songs[i].src}`)
        const startpoint = songs[i].startAt
        const endpoint = songs[i].stopAt

        songArray.push(audio);
        startPoints.push(startpoint);
        endPoints.push(endpoint);
    }

    return [songArray, startPoints, endPoints];
}


