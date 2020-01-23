let activeArenas = require('../../instances/activeArenas.js');

module.exports = function (payload, character, arena) {
  let currentArena = activeArenas.currentArenas.find(aren => aren.getRoomName() === arena.getRoomName());
  if (currentArena.charactersList.find(char => char.id === character.id).pawn.isReadyToStart !== true){
    currentArena.charactersList.find(char => char.id === character.id).pawn.isReadyToStart = true;
    if(currentArena.isReadyToStart()){
      currentArena.start();
    }
  }
};
