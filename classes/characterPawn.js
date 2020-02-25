let global = require('../instances/constants.js');

class characterPawn{
  constructor(item) {
    this.location = global.defaultPawnStats.location;
    this.front = global.defaultPawnStats.front;
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
  hit(attackObject){
    let dice = Math.random();
    let stats = this.getStats();
    if (dice < stats.evasionRate){
      return {
        type: 'miss',
        damage: 0.0
      };
    }
    this.currentStats.health -= attackObject.damage;

    return attackObject;
  }
  attack(attacked){
    let attackLocation = attacked.pawn.location;
    let stats = this.getStats();
    if (stats.attackRange.find(element => element.x + this.location.x === attackLocation.x && element.y + this.location.y === attackLocation.y)){
      let ret = {
        damage: stats.damage,
        type: 'regular'
      };
      let dice = Math.random();
      if (dice < stats.criticalRate){
        ret.damage *= (1 + stats.criticalMultiplier);
        ret.type = 'critical';
      }

      let attackedPawn = new characterPawn();
      Object.assign(attackedPawn,attacked.pawn);
      ret = attackedPawn.hit(ret);

      return ret;
    }
  }
}

module.exports = characterPawn;
