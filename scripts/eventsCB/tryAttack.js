module.exports = function (payload, startTurnPayload, arena, character) {
  let attackedCharacter = arena.charactersList.find(cha => cha.id === payload.targetId);
  if (!arena.turn.canAttack){
    return;
  }
  if (!attackedCharacter){
    sails.log.debug('This id does not correspond to any character.');
    return;
  }
  let attackLocation = attackedCharacter.pawn.location;
  if (character.pawn.getStats().attackRange.find(element => element.x + character.pawn.location.x === attackLocation.x && element.y + character.pawn.location.y === attackLocation.y)){
    // Check if moved earlier. Using initial turn location
    if (arena.turn.initialCharacterLocation !== character.pawn.location){
      arena.turn.canMove = false;
      arena.turn.canAttack = false;


    }
  }
};
