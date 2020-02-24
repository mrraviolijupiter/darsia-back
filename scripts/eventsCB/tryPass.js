let timersHandler = require('../../instances/timersHandler.js');

module.exports = function (payload, startTurnPayload, arena, character) {
  if(character.id === arena.charactersList.find(i => i.id === arena.turn.characterInTurn).id){
    sails.log.debug('Is your turn. Mm, it was your turn');
    timersHandler.clearTimeout(arena.turn.timer);

    arena.nextTurn('pass',arena.endTurn());
  }else{
    sails.log.debug('It´s not your turn, you could not pass the turn');
  }
};
