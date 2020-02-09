module.exports = function (payload, startTurnPayload, arena, character) {
  if(character.id === arena.charactersList[arena.turn.characterInTurn].id){
    const targetLocation = JSON.parse(payload).targetLocation;
    sails.log.debug('location: '+ targetLocation + ' payload: '+JSON.parse(payload));
    if (startTurnPayload.inTurnMovementRange.find(location => location.x===targetLocation.x && location.y===targetLocation.y)){
      let protocol = require('../../instances/protocol.js');
      let getPath = require('../getPath.js');

      let payload = protocol.serverMessages.move.payload;

      payload.characterId = character.id;
      payload.path = getPath(targetLocation,character.pawn.location,startTurnPayload.inTurnMovementRange);
      payload.availableAttackRange = startTurnPayload.inTurnAttackRange;
      sails.sockets.broadcast(arena.getRoomName(),protocol.serverMessages.move.message,payload);

      character.pawn.location = targetLocation;
    }else{
      sails.log.debug('You are trying to move outside your range');
    }

  }else{
    sails.log.debug('It´s not your turn, you could not move your pawn');
  }
};
