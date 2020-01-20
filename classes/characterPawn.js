let global = require('../instances/constants.js');

class characterPawn{
  constructor() {
    this.location = global.defaultPawnStats.location;
    this.direction = global.defaultPawnStats.direction;
    this.currentStats = global.stats;
  }
}

module.exports = characterPawn;
