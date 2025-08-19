import sys
import mrflagly
from pathlib import Path


def main():
    filename = sys.argv[1] if len(sys.argv) > 1 else "features-v2.json"
    print(f"🔍 Validating feature flag file: {filename}")
    try:
        file_text = Path(filename).read_text()
    except Exception as e:
        print(f"❌ Could not read file '{filename}': {e}")
        sys.exit(1)
    try:
        mrflagly.FlagService(data=file_text)
    except Exception as e:
        print(
            "🚫 Validation failed: features file is not valid for mrflagly.FlagService!"
        )
        print(f"   Error: {e}")
        sys.exit(1)
    print("✅ Features file loaded successfully with mrflagly! 🎉")


if __name__ == "__main__":
    main()
