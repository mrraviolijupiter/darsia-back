let global = require('../instances/constants.js');

class characterPawn{
  constructor(item) {
    this.location = global.defaultPawnStats.location;
    this.front = global.defaultPawnStats.direction;
    this.currentStats = global.stats;
    this.isReadyToStart = false;
    this.equipedItems = [];
    this.carriedSkills = [];
    if (item !== undefined) {
      switch (item) {
        case '1':
          this.equipedItems.push(global.sword);
          break;
        case '2':
          this.equipedItems.push(global.bow);
          break;
        case '3':
          break;
        default:
          break;
      }
    }
  }
  getStats(){
    let ret = JSON.parse(JSON.stringify(this.currentStats));

    this.equipedItems.forEach(item => {
      ret.health += item.stats.health;
      ret.damage += item.stats.damage;
      ret.jumpHeight += item.stats.jumpHeight;
      ret.movementSteps += item.stats.movementSteps;
      ret.evasionRate += item.stats.evasionRate;
      ret.criticalRate += item.stats.criticalRate;
      ret.criticalMultiplier += item.stats.criticalMultiplier;
      ret.turnInitiative += item.stats.turnInitiative;
      ret.turnCharge += item.stats.turnCharge;
      ret.turnSpeed += item.stats.turnSpeed;
      ret.criticalRate += item.stats.criticalRate;
      if (ret.attackRange === null){
        ret.attackRange = [item.stats.attackRange[0]];
      }
      item.stats.attackRange.forEach(range => {
        if(ret.attackRange.find(element => element === range)){
        }else{
          ret.attackRange.push(range);
        }
      });
    });
    return ret;
  }
}

module.exports = characterPawn;
