import {
    LEVEL_THEMES,
    PLACEMENT_TYPE_FLOUR,
    PLACEMENT_TYPE_GOAL,
    PLACEMENT_TYPE_HERO,
    PLACEMENT_TYPE_WALL,
}
    from "../helpers/consts";

const level = {

    theme: LEVEL_THEMES.BLUE,
    tilesWidth: 10,
    tilesHeight: 8,

    // PERSONAL PLACEMENT TEST!

    placements: [
        { x: 1, y: 1, type: PLACEMENT_TYPE_HERO },
        { x: 10, y: 8, type: PLACEMENT_TYPE_GOAL },

        { x: 2, y: 1, type: PLACEMENT_TYPE_WALL },
        { x: 2, y: 2, type: PLACEMENT_TYPE_WALL },
        { x: 2, y: 3, type: PLACEMENT_TYPE_WALL },
        { x: 2, y: 4, type: PLACEMENT_TYPE_WALL },
        { x: 2, y: 5, type: PLACEMENT_TYPE_WALL },
        { x: 2, y: 6, type: PLACEMENT_TYPE_WALL },
        { x: 2, y: 7, type: PLACEMENT_TYPE_WALL},

        { x: 4, y: 2, type: PLACEMENT_TYPE_WALL },
        { x: 4, y: 3, type: PLACEMENT_TYPE_WALL },
        { x: 4, y: 4, type: PLACEMENT_TYPE_WALL },
        { x: 4, y: 5, type: PLACEMENT_TYPE_WALL },
        { x: 4, y: 6, type: PLACEMENT_TYPE_WALL },
        { x: 4, y: 7, type: PLACEMENT_TYPE_WALL },
        { x: 4, y: 8, type: PLACEMENT_TYPE_WALL },

        { x: 6, y: 1, type: PLACEMENT_TYPE_WALL },
        { x: 6, y: 2, type: PLACEMENT_TYPE_WALL },
        { x: 6, y: 3, type: PLACEMENT_TYPE_WALL },
        { x: 6, y: 4, type: PLACEMENT_TYPE_WALL },
        { x: 6, y: 5, type: PLACEMENT_TYPE_WALL },
        { x: 6, y: 6, type: PLACEMENT_TYPE_WALL },
        { x: 6, y: 7, type: PLACEMENT_TYPE_WALL },

        { x: 8, y: 2, type: PLACEMENT_TYPE_WALL },
        { x: 8, y: 3, type: PLACEMENT_TYPE_WALL },
        { x: 8, y: 4, type: PLACEMENT_TYPE_WALL },
        { x: 8, y: 5, type: PLACEMENT_TYPE_WALL },
        { x: 8, y: 6, type: PLACEMENT_TYPE_WALL },
        { x: 8, y: 7, type: PLACEMENT_TYPE_WALL },
        { x: 8, y: 8, type: PLACEMENT_TYPE_WALL },

        { x: 9, y: 2, type: PLACEMENT_TYPE_WALL },
        { x: 10, y: 4, type: PLACEMENT_TYPE_WALL },
        { x: 9, y: 6, type: PLACEMENT_TYPE_WALL },

        { x: 1, y: 5, type: PLACEMENT_TYPE_FLOUR },
        { x: 3, y: 4, type: PLACEMENT_TYPE_FLOUR },
        { x: 5, y: 3, type: PLACEMENT_TYPE_FLOUR },
        { x: 7, y: 4, type: PLACEMENT_TYPE_FLOUR },
        { x: 9, y: 5, type: PLACEMENT_TYPE_FLOUR },
    ],
};

export default level;