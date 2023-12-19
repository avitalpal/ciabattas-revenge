import { PLACEMENT_TYPE_HERO, PLACEMENT_TYPE_GOAL, PLACEMENT_TYPE_WALL, 
         PLACEMENT_TYPE_FLOUR, PLACEMENT_TYPE_CELEBRATION } from "../helpers/consts";
import { HeroPlacement } from "../game-objects/HeroPlacement";
import { GoalPlacement } from "../game-objects/GoalPlacement";
import { WallPlacement } from "../game-objects/WallPlacement";
import { FlourPlacement } from "../game-objects/FlourPlacement";
import { CelebrationPlacement } from "../game-objects/CelebrationPlacement";

const placementTypeClassMap = {
    [PLACEMENT_TYPE_HERO]: HeroPlacement,
    [PLACEMENT_TYPE_GOAL]: GoalPlacement,
    [PLACEMENT_TYPE_WALL]: WallPlacement,
    [PLACEMENT_TYPE_FLOUR]: FlourPlacement,
    [PLACEMENT_TYPE_CELEBRATION]: CelebrationPlacement,
}

// create new instances of placements
class PlacementFactory {
    createPlacement(config, level) {
        const placementClass = placementTypeClassMap[config.type];
        if (!placementClass) {
            console.warn("NO PLACEMENT CLASS FOUND FOR", config.type)
            return null;
        }

        // Make new instance with random ID on the fly, good for levels with a large number of placements 
        const instance = new placementClass(config, level);
        instance.id = Math.floor(Math.random() * 9999999) + 1;
        return instance;
    }
}

export const placementFactory = new PlacementFactory();