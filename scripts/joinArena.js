let getCharacterToSend = require('../scripts/getCharacterToSend.js');
let activeArenas = require('../instances/activeArenas.js');
let protocol = require('../instances/protocol.js');

module.exports = async function (character, socket){
  // Join character to correspondent arena
  let arena = activeArenas.joinCharacter(character);

  await sails.sockets.join(character.socket,arena.getRoomName());

  sails.log.debug('New user joined arena');

  // Set initial pawn locations
  character.pawn.location = arena.initialLocationsAvailable.pop();

  // Move player to the arena environment
  let payload = protocol.serverMessages.goto.payload;
  payload.where = 'arena';
  sails.sockets.broadcast(character.socket, protocol.serverMessages.goto.message, payload);

  // Notify other players in arena that a new player joined
  sails.sockets.broadcast(arena.getRoomName(),protocol.serverMessages.join.message,getCharacterToSend(character));

  return arena;
};
