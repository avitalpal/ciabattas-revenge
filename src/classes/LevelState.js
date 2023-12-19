import { PLACEMENT_TYPE_HERO } from '../helpers/consts';
import { GameLoop } from './GameLoop';
import { placementFactory } from './PlacementFactory';
import { DirectionControls } from './DirectionControls';
import LevelsMap from '../levels/LevelsMap';

// level state class that holds all the information about the level
export class LevelState {
    constructor(levelId, onEmit) {
        this.levelId = levelId;
        this.onEmit = onEmit;

        this.directionControls = new DirectionControls();

        // start the level
        this.start();
    }

    start() {
        // set completed level flag to false to start
        this.isCompleted = false;

        // get the level data from the levels map
        const levelData = LevelsMap[this.levelId];

        this.theme = levelData.theme;
        this.tilesWidth = levelData.tilesWidth;
        this.tilesHeight = levelData.tilesHeight;
        this.placements = levelData.placements.map(config => {
            return placementFactory.createPlacement(config, this);
        })

        // Cache a reference to the hero
        this.heroRef = this.placements.find(p => p.type === PLACEMENT_TYPE_HERO)

        this.startGameLoop();
    }

    // start the game loop
    startGameLoop() {
        this.gameLoop?.stop();
        this.gameLoop = new GameLoop(() => {
            this.tick();
        })
    }

    // add a placement to the level
    addPlacement(config) {
        this.placements.push(placementFactory.createPlacement(config, this));
    }

    // remove a placement from the level (used for items like flour)
    deletePlacement(placementToRemove) {
        this.placements = this.placements.filter((p) => {
            return p.id !== placementToRemove.id;
        })
    }

    tick() {

        // Check for movement here...
        if (this.directionControls.direction) {
            this.heroRef.controllerMoveRequested(this.directionControls.direction);
        }

        // Call 'tick' on any Placement that wants to update
        this.placements.forEach(placement => {
            placement.tick();
        })

        // Emit any changes to React
        this.onEmit(this.getState());
    }

    // check if a position is out of bounds (used for map boundaries so that the hero can't move off the map)
    isPositionOutOfBounds(x, y) {
        return (
            x === 0 ||
            y === 0 ||
            x >= this.tilesWidth + 1 ||
            y >= this.tilesHeight + 1
        )
    }

    // set level to completed
    completeLevel() {
        this.isCompleted = true;
        this.gameLoop.stop();
      }

    // getter for the current state of the level
    getState() {
        return {
            theme: this.theme,
            tilesWidth: this.tilesWidth,
            tilesHeight: this.tilesHeight,
            placements: this.placements,
            isCompleted: this.isCompleted,
        }
    }

    destroy() {
        // Tear down the level.
        this.gameLoop.stop();
        this.directionControls.unbind();
    }
}