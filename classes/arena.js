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
    return;
  }
}

module.exports = arena;
