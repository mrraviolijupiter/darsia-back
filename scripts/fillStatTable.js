let global = require('../instances/constants.js');

module.exports = async function (statTable) {
  await StatTable.updateOne({id:statTable.id}).set({
    health: global.stats.health,
    damage: global.stats.damage,
    movement: global.stats.movement,
    range: global.stats.range,
    evasionRate: global.stats.evasionRate,
    criticalRate: global.stats.criticalRate,
    criticalMultiplier: global.stats.criticalMultiplier
  });
};
