export class Collision {

  // constructor for the collision class that takes in the body we're checking collision for, the level, and position (assume null so that collision is custom to the body)
  constructor(forBody, level, position = null) {
    this.forBody = forBody;
    this.level = level;
    this.placementsAtPosition = [];
    this.x = position ? position.x : forBody.x;
    this.y = position ? position.y : forBody.y;
    this.scanPlacementsAtPosition();
  }

  // check whats present within a location
  scanPlacementsAtPosition() {
    this.placementsAtPosition = this.level.placements.filter((p) => {
      const isSelf = p.id === this.forBody.id;
      return !isSelf && p.x === this.x && p.y === this.y;
    });
  }

  // check if the placement found is solid
  withSolidPlacement() {
    return this.placementsAtPosition.find((p) =>
      p.isSolidForBody(this.forBody)
    );
  }

  // check if the placement found adds to inventory
  withPlacementAddsToInventory() {
    return this.placementsAtPosition.find((p) =>
      !p.hasBeenCollected && p.addsItemToInventoryOnCollide(this.forBody)
    );
  }

  // check if the placement found completes the level (enabled goal)
  withCompletesLevel() {
    return this.placementsAtPosition.find((p) => {
      return p.completesLevelOnCollide();
    });
  }
}