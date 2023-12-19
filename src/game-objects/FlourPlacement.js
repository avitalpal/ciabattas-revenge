import { Placement } from "./Placement";
import { TILES } from "../helpers/tiles";
import ElevatedSprite from "../components/object-graphics/ElevatedSprite";
import { PLACEMENT_TYPE_FLOUR } from "../helpers/consts";

// flour object
export class FlourPlacement extends Placement {

    addsItemToInventoryOnCollide() {
        return PLACEMENT_TYPE_FLOUR;
    }

    renderComponent() {
        return <ElevatedSprite frameCoord={TILES.FLOUR} />;
    }
}