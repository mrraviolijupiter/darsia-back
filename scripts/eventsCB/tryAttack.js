let pawn = require('../../classes/characterPawn.js');

module.exports = function (payload, startTurnPayload, arena, character) {
  if(character.id === arena.charactersList.find(i => i.id === arena.turn.characterInTurn).id){
    let attackedCharacter = arena.charactersList.find(cha => cha.id === JSON.parse(payload).targetId);
    if (!arena.turn.canAttack){
      return;
    }
    if (!attackedCharacter){
      sails.log.debug('This id does not correspond to any character.');
      return;
    }
    if (arena.turn.initialCharacterLocation !== character.pawn.location){
      arena.turn.canMove = false;
    }
    arena.turn.canAttack = false;
    let attackerPawn = new pawn();
    Object.assign(attackerPawn,character.pawn);
    let attackedPawn = new pawn();
    Object.assign(attackedPawn,attackedCharacter.pawn);

    let attackPayload = attackerPawn.attack(attackedCharacter);
    if (!attackPayload){
      sails.log.debug('Out of range.');
      return;
    }
    attackPayload.aggressorId = character.id;
    attackPayload.targetId = attackedCharacter.id;

    let protocol = require('../../instances/protocol.js');
    sails.sockets.broadcast(arena.getRoomName(),protocol.serverMessages.attack.message,attackPayload);

    if (attackedPawn.getStats().health <= 0){
      // TODO: Send die message
      console.log('character die!');
    }
  }else{
    sails.log.debug('It´s not your turn, you could not attack');
  }
};
