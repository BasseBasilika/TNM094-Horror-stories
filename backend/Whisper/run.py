import sys
import demo  # your script file name without .py

sys.argv = [
    "demo.py",
    "--model", "small",
    "--non_english"
]

demo.main()



