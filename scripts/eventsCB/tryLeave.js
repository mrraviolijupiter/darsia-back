module.exports = function (payload, startTurnPayload, arena, character) {
  if (character.id === arena.charactersList.find(i => i.id === arena.turn.characterInTurn).id){
    arena.nextTurn('pass',arena.turn.characterInTurn+1);
  }

  let protocol = require('../../instances/protocol.js');

  let socket = sails.sockets.get(character.socket);
  socket.off(protocol.clientMessages.tryMove.eventName,character.tryMove);
  socket.off(protocol.clientMessages.tryAttack.eventName,character.tryAttack);
  socket.off(protocol.clientMessages.tryLeave.eventName,character.tryLeave);
  socket.off(protocol.clientMessages.tryPass.eventName,character.tryPass);
  socket.off(protocol.clientMessages.matchReadyConfirm.eventName, payload => { protocol.clientMessages.matchReadyConfirm.callback(payload, character, arena);});
  socket.off(protocol.clientMessages.requestMatchInfo.eventName, payload => { protocol.clientMessages.requestMatchInfo.callback(payload, character, arena);});

  // Remove character from list
  arena.charactersList.splice(arena.charactersList.indexOf(character), 1);
  sails.sockets.leave(socket,arena.getRoomName());

  let leavePayload = protocol.serverMessages.leave.payload;
  leavePayload.characterId = character.id;

  sails.sockets.broadcast(arena.getRoomName(),protocol.serverMessages.leave.message,leavePayload);
};
