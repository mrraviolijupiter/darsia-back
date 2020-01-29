module.exports = function (payload, startTurnPayload, arena, character) {
  if(character.id === arena.charactersList[arena.turn.characterInTurn].id){
    sails.log.debug('Is your turn. Mm, was it');
    clearTimeout(arena.turn.timer);
    arena.nextTurn('pass',arena.turn.characterInTurn+1);
  }else{
    sails.log.debug('It´s not your turn, you could not pass the turn');
  }
};
