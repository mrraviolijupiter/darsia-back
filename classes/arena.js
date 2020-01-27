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

    this.turn.next(reason,nextTurnCharacterID);

    let payload = protocol.serverMessages.startTurn.payload;
    payload.turn = this.turn;

    // TODO: Calculate movement range in board coordinates based on obstacles in arena
    payload.inTurnMovementRange = [{x:0,y:0},{x:1,y:0},{x:-1,y:0},{x:0,y:1},{x:0,y:-1},{x:-1,y:-1},{x:-1,y:1},{x:1,y:-1},{x:1,y:1}];
    // TODO: Calculate available attack range based on obstacles in arena
    payload.inTurnAttackRange = [{x:1,y:0},{x:-1,y:0},{x:0,y:1},{x:0,y:-1}];
    // TODO: Set map updates types
    payload.mapUpdates = [];


    sails.sockets.broadcast(this.getRoomName(),protocol.serverMessages.startTurn.message,payload);

    // TODO: Set callbacks (Think if its possible to create all callbacks in newConnection function)
    // TODO: Set timer for turn

    // In callbacks or if time is gone, a new next turn must be called.
  }
}

module.exports = arena;
