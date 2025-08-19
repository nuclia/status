import sys
import mrflagly
from pathlib import Path


def main():
    filename = sys.argv[1] if len(sys.argv) > 1 else "features-v2.json"
    file_text = Path(filename).read_text()
    mrflagly.FlagService(data=file_text)


if __name__ == "__main__":
    main()
