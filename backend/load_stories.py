from pathlib import Path

BASE_DIR = Path(__file__).parent
STORIES_DIR = BASE_DIR / "books_backend"

#Read a story form backend
def load_story(story):
    #open file in read mode "r"and utf-8 for Swedish characters
    story_path = STORIES_DIR / story
    with open(story_path, "r", encoding="utf-8") as file:
    #stores the whole story currently
        text = file.read()
        print(text)
    return text

#control så det funkar
#load_story("text.txt")


