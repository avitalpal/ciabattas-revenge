import {
    DIRECTION_UP,
    DIRECTION_DOWN,
    DIRECTION_RIGHT,
    DIRECTION_LEFT,
} from "../helpers/consts";

export class DirectionControls {

    // direction control keybinds
    constructor() {
        this.directionKeys = {
            ArrowDown: DIRECTION_DOWN,
            ArrowUp: DIRECTION_UP,
            ArrowLeft: DIRECTION_LEFT,
            ArrowRight: DIRECTION_RIGHT,

            s: DIRECTION_DOWN,
            w: DIRECTION_UP,
            a: DIRECTION_LEFT,
            d: DIRECTION_RIGHT,
        };
        this.heldDirections = [];

        // adds direction to the front of the array
        this.directionKeyDownHandler = (e) => {
            const dir = this.directionKeys[e.key];
            if (dir && this.heldDirections.indexOf(dir) === -1) {
                this.heldDirections.unshift(dir);
            }
        };

        // removes the direction from the array
        this.directionKeyUpHandler = (e) => {
            const dir = this.directionKeys[e.key];
            const index = this.heldDirections.indexOf(dir);
            if (index > -1) {
                this.heldDirections.splice(index, 1);
            }
        };

        document.addEventListener("keydown", this.directionKeyDownHandler);
        document.addEventListener("keyup", this.directionKeyUpHandler);
    }

    // returns the first direction in the array (latest key pressed)
    get direction() {
        return this.heldDirections[0];
    }

    // clean up event listeners
    unbind() {
        document.removeEventListener("keydown", this.directionKeyDownHandler);
        document.removeEventListener("keyup", this.directionKeyUpHandler);
    }
}