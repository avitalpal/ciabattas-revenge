import { Placement } from "./Placement";
import Hero from "../components/object-graphics/Hero";
import { BODY_SKINS, DIRECTION_LEFT, DIRECTION_RIGHT, HERO_RUN_1, HERO_RUN_2, Z_INDEX_LAYER_SIZE, directionUpdateMap, PLACEMENT_TYPE_CELEBRATION } from "../helpers/consts";
import { TILES } from "../helpers/tiles";
import { Collision } from "../classes/Collision";

const heroSkinMap = {
    [BODY_SKINS.NORMAL]: [TILES.HERO_LEFT, TILES.HERO_RIGHT],
    [HERO_RUN_1]: [TILES.HERO_RUN_1_LEFT, TILES.HERO_RUN_1_RIGHT],
    [HERO_RUN_2]: [TILES.HERO_RUN_2_LEFT, TILES.HERO_RUN_2_RIGHT],
}

// hero object with skin map, movement, and collision logic
export class HeroPlacement extends Placement {

    controllerMoveRequested(direction) {
        // Attempt to start moving
        if (this.movingPixelsRemaining > 0) {
            // Already moving!
            return;
        }

        // Make sure the next space is available
        const canMove = this.canMoveToNextDestination(direction);
        if (!canMove) {
            return;
        }

        // Start the move
        this.movingPixelsRemaining = 16;
        this.movingPixelDirection = direction;
        this.updateFacingDirection();
        this.updateWalkFrame();
    }

    canMoveToNextDestination(direction) {
        // Is this next space in bounds?
        const { x, y } = directionUpdateMap[direction];
        const nextX = this.x + x;
        const nextY = this.y + y;
        const isOutOfBounds = this.level.isPositionOutOfBounds(nextX, nextY);
        if (isOutOfBounds) {
            return false;
        }

        // Is there a solid thing here?
        const collision = new Collision(this, this.level, {
            x: nextX,
            y: nextY,
        });
        if (collision.withSolidPlacement()) {
            return false;
        }

        return true;
    }

    updateFacingDirection() {
        if (this.movingPixelDirection === DIRECTION_LEFT || this.movingPixelDirection === DIRECTION_RIGHT) {
            this.spriteFacingDirection = this.movingPixelDirection;
        }
    }

    updateWalkFrame() {
        this.spriteWalkFrame = this.spriteWalkFrame === 1 ? 0 : 1;
    }

    tick() {
        this.tickMovingPixelProgress();
    }

    tickMovingPixelProgress() {

        if (this.movingPixelsRemaining === 0) {
            return;
        }

        this.movingPixelsRemaining -= this.travelPixelsPerFrame;
        if (this.movingPixelsRemaining <= 0) {
            this.movingPixelsRemaining = 0;
            // Done moving!
            this.onDoneMoving();
        }
    }

    onDoneMoving() {
        // Update my x/y!
        const { x, y } = directionUpdateMap[this.movingPixelDirection];
        this.x += x;
        this.y += y;
        this.handleCollisions();
    }

    handleCollisions() {
        const collision = new Collision(this, this.level);
        const collideThatAddsToInventory = collision.withPlacementAddsToInventory();
        if (collideThatAddsToInventory) {
            collideThatAddsToInventory.collect();
            this.level.addPlacement({
                type: PLACEMENT_TYPE_CELEBRATION,
                x: this.x,
                y: this.y,
            })
        }

        const completesLevel = collision.withCompletesLevel();
        if (completesLevel) {
            this.level.completeLevel();
        }
    }

    getFrame() {
        // Which frame to show?
        const index = this.spriteFacingDirection === DIRECTION_LEFT ? 0 : 1;

        // Use correct walking frame per direction
        if (this.movingPixelsRemaining > 0) {
            const walkKey = this.spriteWalkFrame === 0 ? HERO_RUN_1 : HERO_RUN_2;
            return heroSkinMap[walkKey][index];
        }

        return heroSkinMap[BODY_SKINS.NORMAL][index];
    }

    getYTranslate() {
        if (this.movingPixelsRemaining === 0) {
            return 0;
        }

        // Elevate ramp up or down at beginning/end of movement
        const PIXELS_FROM_END = 2;
        if (this.movingPixelsRemaining < PIXELS_FROM_END || this.movingPixelsRemaining > 16 - PIXELS_FROM_END) {
            return -1;
        }


        return -2;
    }

    zIndex() {
        return this.y * Z_INDEX_LAYER_SIZE + 1;
    }

    renderComponent() {
        return <Hero frameCoord={this.getFrame()} yTranslate={this.getYTranslate()} />
    }
}