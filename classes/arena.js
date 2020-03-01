let global = require('../instances/constants.js');
let turn = require('./turn.js');
let {copyAsStartTurn} = require('../scripts/protocolTemplates.js');

class arena{
  constructor(character){
    if (character){
      this.charactersList = [character];
    }else{
      this.charactersList = [];
    }
    this.roomName = '';
    this.state = 'unfilled';
    this.turn = new turn();
    this.mapUpdates = [];
    this.initialLocationsAvailable = global.startLocations;
    this.characterInitiativeList = [];
  }
  joinCharacter(character){
    if (character){
      this.charactersList.push(character);
    }else{
      // Throw error
      throw 'character is null in function joinCharacter';
    }
  }
  isFull(){
    return this.charactersList.length === global.arena.size;
  }
  setRoomNameId(name){
    if (name || name === 0){
      this.roomName = 'arena_' + name;
    }else{
      // Throw error
      throw 'id Name is null in setRoomNameId function';
    }

  }
  getRoomName(){
    return this.roomName;
  }
  isReadyToStart(){
    let character;
    for (character of this.charactersList){
      if(character.pawn.isReadyToStart === false){
        return false;
      }
    }
    return true;
  }
  start(){
    // Order characterList by initiative.
    let flag = true;
    while(flag){
      flag = false;
      for(let i = 1; i < this.charactersList.length; i++){
        if (this.charactersList[i].pawn.currentStats.turnInitiative < this.charactersList[i-1].pawn.currentStats.turnInitiative){
          let tmp = this.charactersList[i];
          this.charactersList[i] = this.charactersList[i-1];
          this.charactersList[i-1] = tmp;
          flag = true;
        }
      }
    }
    for (let character in this.charactersList){
      this.characterInitiativeList.push(this.charactersList[character].id);
    }
    let protocol = require('../instances/protocol.js');
    let payload = protocol.serverMessages.matchReady.payload;
    payload.turnOrder = this.characterInitiativeList;

    // Send startMatch message with characterIdList ordered by initiative.
    sails.sockets.broadcast(this.getRoomName(),protocol.serverMessages.startMatch.message,payload);
    this.state = 'matchStarted';

    this.charactersList[0].pawn.currentStats.turnCharge = 0;
    this.nextTurn('start_match',this.charactersList[0]);

  }
  endTurn(){
    let absoluteTurnCharge = [];
    // Increase turn charge using turnSpeed
    let pawn = require('../classes/characterPawn.js');
    this.charactersList.forEach(character => {
      let tmp = new pawn();
      Object.assign(tmp,character.pawn);
      character.pawn.currentStats.turnCharge += tmp.getStats().turnSpeed;
      if (character.pawn.currentStats.turnCharge > character.baseStats.turnCharge){
        character.pawn.currentStats.turnCharge = character.baseStats.turnCharge;
      }

      // Calculate absolute turn bar for each character
      absoluteTurnCharge.push({
        characterId:character.id,
        charge:character.pawn.currentStats.turnCharge / character.baseStats.turnCharge,
      });
    });

    let aux = absoluteTurnCharge.find(element => element.charge === 1);

    if (aux){
      let ret = this.charactersList.find(element => element.id === aux.characterId);
      // Remove charge turn
      ret.pawn.currentStats.turnCharge = 0;
      return ret;
    }else{
      // TODO: Think about next turn instead of endTurn.
      return this.endTurn();
    }
  }
  async nextTurn(reason,turnCharacter){
    let protocol = require('../instances/protocol.js');
    let global = require('../instances/constants.js');

    await this.turn.next(reason,turnCharacter,turnCharacter.id);

    let payload = protocol.serverMessages.startTurn.payload;

    let getTurnToSend = require('../scripts/getTurnToSend.js');
    payload.turn = getTurnToSend(this.turn);

    let getMovementRange = require('../scripts/getMovementRange.js');
    let getAttackRange = require('../scripts/getAttackRange.js');

    let obstacles = [];
    // Obstacles must contain all obstacles in map and other pawn positions.
    this.charactersList.forEach(character => {
      if(turnCharacter.id !== character.id) {
        obstacles.push(character.pawn.location);
      }
    });

    // TODO: Add other obstacles
    payload.inTurnMovementRange = getMovementRange(turnCharacter.pawn,global.arenaMap,obstacles);

    // TODO: Calculate obstacles in attack range
    payload.inTurnAttackRange = getAttackRange(turnCharacter.pawn, global.arenaMap,obstacles);

    sails.sockets.broadcast(this.getRoomName(),protocol.serverMessages.startTurn.message,copyAsStartTurn(payload));

    for (let i in this.charactersList){
      let socket = sails.sockets.get(this.charactersList[i].socket);

      if (reason !== 'start_match'){
        socket.off(protocol.clientMessages.tryMove.eventName,this.charactersList[i].tryMove);
        socket.off(protocol.clientMessages.tryAttack.eventName,this.charactersList[i].tryAttack);
        socket.off(protocol.clientMessages.tryLeave.eventName,this.charactersList[i].tryLeave);
        socket.off(protocol.clientMessages.tryPass.eventName,this.charactersList[i].tryPass);
      }

      this.charactersList[i].tryLeave = mPayload => { protocol.clientMessages.tryLeave.callback(mPayload, payload, this, this.charactersList[i]);};
      this.charactersList[i].tryMove = mPayload => { protocol.clientMessages.tryMove.callback(mPayload, payload, this, this.charactersList[i]);};
      this.charactersList[i].tryAttack = mPayload => { protocol.clientMessages.tryAttack.callback(mPayload, payload, this, this.charactersList[i]);};
      this.charactersList[i].tryPass = mPayload => { protocol.clientMessages.tryPass.callback(mPayload, payload, this, this.charactersList[i]);};

      socket.on(protocol.clientMessages.tryMove.eventName, this.charactersList[i].tryMove);
      socket.on(protocol.clientMessages.tryAttack.eventName, this.charactersList[i].tryAttack);
      socket.on(protocol.clientMessages.tryPass.eventName, this.charactersList[i].tryPass);
      socket.on(protocol.clientMessages.tryLeave.eventName, this.charactersList[i].tryLeave);
    }

    let timersHandler = require('../instances/timersHandler.js');
    this.turn.timer = timersHandler.newTimer(setTimeout(()=>{
      this.nextTurn('timeout',this.endTurn());
    },global.turnDuration));
  }
}


module.exports = arena;
