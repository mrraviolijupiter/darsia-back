let getCharacterToSend = require('../scripts/getCharacterToSend.js');
let activeArenas = require('../instances/activeArenas.js');

module.exports = async function (character, socket){
  // Join character to correspondent arena
  let arena = activeArenas.joinCharacter(character);

  await sails.sockets.join(character.socket,arena.getRoomName());

  sails.log.debug('New user joined arena');

  // Move player to the arena environment
  sails.sockets.broadcast(character.socket,'goto',{ where: 'arena' });

  // Notify other players in arena that a new player joined
  sails.sockets.broadcast(arena.getRoomName(),'join',getCharacterToSend(character));

  return arena;
};
