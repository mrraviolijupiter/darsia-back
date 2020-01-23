let global = require('../instances/constants.js');

class arena{
  constructor(character){
    if (character){
      this.charactersList = [character];
    }else{
      this.charactersList = [];
    }
    this.roomName = '';
    this.state = 'unfilled';
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
    let characterIdList = [];
    for (let character in this.charactersList){
      characterIdList.push(this.charactersList[character].id);
    }

    let protocol = require('../instances/protocol.js');
    let payload = protocol.serverMessages.matchReady.payload;
    payload.turnOrder = characterIdList;
    sails.sockets.broadcast(this.getRoomName(),protocol.serverMessages.startMatch.message,payload);
    this.state = 'matchStarted';
  }
}

module.exports = arena;
