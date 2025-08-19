import mrflagly
from pathlib import Path

FILE = "features-v2.json"

file_text = Path(FILE).read_text()
flag_service = mrflagly.FlagService(data=file_text)
