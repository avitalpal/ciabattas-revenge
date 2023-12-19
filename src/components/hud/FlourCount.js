import { PLACEMENT_TYPE_FLOUR } from "../../helpers/consts"

// display how much flour is left for the hero to collect
export default function FlourCount({ level }) {

    const count = level.placements.filter(p => {
        return p.type === PLACEMENT_TYPE_FLOUR && !p.hasBeenCollected
    }).length;

    return (
        <p style={{
            position: "absolute",
            top: 0,
            left: 0,
            color: "#FFFFFF"
        }}>
            Flour Remaining: {count}
        </p>
    )
}