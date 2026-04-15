#This is a file for finding the keywords in the story
from keywords import triggers 
from Whisper.demo import transcription

def keyfinder_function(transcription, triggers):
    transcripts_word = transcription.lower().split()
    if triggers["keyword"].lower() in transcripts_word:
        return True
    return False

    

