

export default function playMusic(songArray, startPoints, songindex, thisstartat, endPoints, hasPlayed){

  console.log(songindex);

  console.log(hasPlayed)

  if(thisstartat === startPoints[songindex]){
    console.log("same song")
    return;
  }

  endPoints.forEach((element, index) => {
    //console.log("element: "+ element)
    //console.log("index: "+ index)
    //console.log("startIndex: "+ startPoints[index])

    console.log("element: "+ element + ", startIndex: "+ startPoints[songindex])
    console.log(element === startPoints[songindex])

    if(element === startPoints[songindex]){
      console.log("herehere")
      songArray[index].pause()
      return;
    }
  });

  console.log("new song playing: " + songindex)
  songArray[songindex].play()

  // arbitrary test
  if(songindex == 2){
    console.log("truetrue")
    songArray[0].pause() // doesn't work
  }

}