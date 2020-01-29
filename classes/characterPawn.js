let global = require('../instances/constants.js');

class characterPawn{
  constructor(setup) {
    this.location = global.defaultPawnStats.location;
    this.direction = global.defaultPawnStats.direction;
    this.currentStats = global.stats;
    this.isReadyToStart = false;
    if (setup !== undefined) {
      switch (setup) {
        case '1':
          // Tank
          this.currentStats.health = global.stats.health + 0.3*global.stats.health;
          this.currentStats.criticalMultiplier = global.stats.criticalMultiplier - 0.3*global.stats.criticalMultiplier;
          this.currentStats.turnInitiative = global.stats.turnInitiative - 0.3*global.stats.turnInitiative;
          this.currentStats.turnSpeed = global.stats.turnSpeed + 0.2*global.stats.turnSpeed;
          this.location = {x: 4,y: 4};
          this.currentStats.attackRange = [
            {x:0,y:1},
            {x:0,y:-1},
            {x:1,y:0},
            {x:-1,y:0}
          ];
          break;
        case '2':
          // Assassin
          this.currentStats.health = global.stats.health - 0.2*global.stats.health;
          this.currentStats.criticalMultiplier = global.stats.criticalMultiplier + 0.3*global.stats.criticalMultiplier;
          this.currentStats.turnInitiative = global.stats.turnInitiative + 0.3*global.stats.turnInitiative;
          this.currentStats.turnSpeed = global.stats.turnSpeed + 0.2*global.stats.turnSpeed;
          this.currentStats.damage = global.stats.damage + 0.2*global.stats.damage;
          this.currentStats.turnCharge = global.stats.turnCharge - 0.2*global.stats.turnCharge;
          this.currentStats.criticalRate = global.stats.criticalRate + 0.2*global.stats.criticalRate;
          this.location = {x: 5,y: 1};
          this.currentStats.attackRange = [
            {x:0,y:1},
            {x:0,y:-1},
            {x:1,y:0},
            {x:-1,y:0}
          ];
          break;
        case '3':
          break;
        default:
          break;
      }
    }
  }
}

module.exports = characterPawn;
