let global = require('../instances/constants.js');
let timersHandler = require('../instances/timersHandler.js');

class turn{
  constructor() {
    this.startReason = 'start_match';
    this.remainingSeconds = 0.0;
    this.turnNumber = 0;
    this.characterInTurn = 0;
    this.canMove = false;
    this.canAttack = false;
    this.canUseSkill = false;
    this.canPass = false;
    this.timer = 0;
    this.initialCharacterLocation = {x: 0, y: 0};
  }
  next(reason, turnCharacter, characterId){
    this.turnNumber++;
    this.startReason = reason;
    this.canAttack = true;
    this.canMove = true;
    this.canPass = true;
    this.canUseSkill = true;
    this.characterInTurn = characterId;
    this.remainingSeconds = global.turnDuration;
    this.initialCharacterLocation = turnCharacter.pawn.location;
    timersHandler.clearTimeout(this.timer);
  }
}

module.exports = turn;
