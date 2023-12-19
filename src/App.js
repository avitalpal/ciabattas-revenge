import { useEffect } from "react";
import { SPRITE_SHEET_SRC } from "./helpers/consts";
import RenderLevel from "./components/level-layout/RenderLevel";
import { useRecoilState } from "recoil";
import { spriteSheetImageAtom } from "./atoms/spriteSheetImageAtom";

function App() {

  // updates the page whenever the sprite sheet image is loaded/changed
  const [spriteSheetImage, setSpriteSheetImage] = useRecoilState(spriteSheetImageAtom);

  useEffect(() => {
    const image = new Image();
    image.src = SPRITE_SHEET_SRC;
    image.onload = () => {
      setSpriteSheetImage(image);
    };
  }, [setSpriteSheetImage]);

  if (!spriteSheetImage) {
    return null;
  }

  return (
      <RenderLevel />
  );
}

export default App;
