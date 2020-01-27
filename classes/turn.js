let global = require('../instances/constants.js');

class turn{
  constructor() {
    this.startReason = '';
    this.remainingSeconds = 0.0;
    this.turnNumber = 0;
    this.characterInTurn = 0;
    this.canMove = false;
    this.canAttack = false;
    this.canUseSkill = false;
    this.canPass = false;
  }
  next(reason, nextTurnCharacterID){
    this.turnNumber++;
    this.startReason = reason;
    this.canAttack = true;
    this.canMove = true;
    this.canPass = true;
    this.canUseSkill = true;
    this.characterInTurn = nextTurnCharacterID;
    this.remainingSeconds = global.turnDuration;
  }
}

module.exports = turn;
