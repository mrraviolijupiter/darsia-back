module.exports = function (payload, startTurnPayload, arena, character) {
  if (character.id === arena.charactersList[arena.turn.characterInTurn].id){
    arena.nextTurn('pass',arena.turn.characterInTurn+1);
  }

  let protocol = require('../../instances/protocol.js');

  // socket.off(protocol.clientMessages.tryMove.eventName,this.charactersList[i].tryMove);
  // socket.off(protocol.clientMessages.tryAttack.eventName,this.charactersList[i].tryAttack);
  // socket.off(protocol.clientMessages.tryLeave.eventName,this.charactersList[i].tryLeave);
  // socket.off(protocol.clientMessages.tryPass.eventName,this.charactersList[i].tryPass);

  // Remove character from list
  arena.charactersList.splice(arena.charactersList.indexOf(character), 1);

  let leavePayload = protocol.serverMessages.leave.payload;
  leavePayload.characterId = character.id;

  sails.sockets.broadcast(arena.getRoomName(),protocol.serverMessages.leave.message,leavePayload);
};
