import { useRecoilState } from "recoil"
import { currentLevelIdAtom } from "../../atoms/currentLevelIdAtom"
import LevelsMap from "../../levels/LevelsMap"

// display level complete message and a button to move on when done, only renders when levelCompleted flag is true
export default function LevelCompleteMessage() {

    const [currentId, setCurrentId] = useRecoilState(currentLevelIdAtom);

    return (
        <p style={{
            position: "absolute",
            top: 64,
            left: 0,
            color: "lime"
        }}>
            LEVEL COMPLETE!
            <button
            onClick={() => {
                const levelsArray = Object.keys(LevelsMap);
                const currentIndex = levelsArray.findIndex((id) => {
                    return id === currentId;
                });
                const nextLevelId = levelsArray[currentIndex + 1] ?? levelsArray[0];
                setCurrentId(nextLevelId);
            }}
            >Next Level</button>
        </p>
    )
}