let global = require('../instances/constants.js');
let turn = require('./turn.js');

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
    this.characterIdList = [];
    for (let character in this.charactersList){
      this.characterIdList.push(this.charactersList[character].id);
    }
    let protocol = require('../instances/protocol.js');
    let payload = protocol.serverMessages.matchReady.payload;
    payload.turnOrder = this.characterIdList;

    // Send startMatch message with characterIdList ordered by initiative.
    sails.sockets.broadcast(this.getRoomName(),protocol.serverMessages.startMatch.message,payload);
    this.state = 'matchStarted';

    this.nextTurn('start_match',this.characterIdList[0]);

  }
  async nextTurn(reason,nextTurnCharacterID){
    let protocol = require('../instances/protocol.js');
    let global = require('../instances/constants.js');

    // Restart turns roulette
    if (nextTurnCharacterID >= this.charactersList.length){
      nextTurnCharacterID = 0;
    }

    let turnCharacter = this.charactersList[nextTurnCharacterID];

    // TODO: Increase charge turn bar

    await this.turn.next(reason,nextTurnCharacterID);


    let payload = protocol.serverMessages.startTurn.payload;
    payload.turn = this.turn;

    let getMovementRange = require('../scripts/getMovementRange.js');

    let obstacles = [];
    // Obstacles must contain all obstacles in map and other pawn positions.
    this.charactersList.forEach(character => obstacles.push(character.pawn.location));
    // TODO: Add other obstacles
    payload.inTurnMovementRange = getMovementRange(turnCharacter.pawn,global.arenaMap,obstacles);

    payload.inTurnAttackRange = turnCharacter.pawn.currentStats.attackRange;
    // TODO: Set map updates types
    // Map updates probably are gonna be set when a skill is used or when a chest is opened. So, updates must be loaded in respective callback function.
    payload.mapUpdates = this.mapUpdates;

    sails.sockets.broadcast(this.getRoomName(),protocol.serverMessages.startTurn.message,payload);

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
    this.turn.timer = setTimeout(()=>{this.nextTurn('timeout',nextTurnCharacterID+1);},global.turnDuration);
  }
}

module.exports = arena;
