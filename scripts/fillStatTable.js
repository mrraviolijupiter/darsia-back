let global = require('../instances/constants.js');

module.exports = async function (statTable) {
  await StatTable.updateOne({id:statTable.id}).set({
    health: global.stats.health,
    damage: global.stats.damage,
    movement: global.stats.movement,
    jumpHeight: global.stats.jumpHeight,
    movementSteps: global.stats.movementSteps,
    attackRange: global.stats.attackRange,
    evasionRate: global.stats.evasionRate,
    criticalRate: global.stats.criticalRate,
    criticalMultiplier: global.stats.criticalMultiplier,
    turnInitiative: global.stats.turnInitiative,
    turnSpeed: global.stats.turnSpeed,
    turnCharge: global.stats.turnCharge
  });
};
