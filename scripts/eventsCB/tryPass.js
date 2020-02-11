let timersHandler = require('../../instances/timersHandler.js');

module.exports = function (payload, startTurnPayload, arena, character) {
  if(character.id === arena.charactersList[arena.turn.characterInTurn].id){
    sails.log.debug('Is your turn. Mm, was it');
    timersHandler.clearTimeout(arena.turn.timer);

    // TODO: Increase charge turn bar
    arena.nextTurn('pass',arena.turn.characterInTurn+1);
  }else{
    sails.log.debug('It´s not your turn, you could not pass the turn');
  }
};
