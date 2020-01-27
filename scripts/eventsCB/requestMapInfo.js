let activeArenas = require('../../instances/activeArenas.js');
let getCharacterToSend = require('../getCharacterToSend.js');

module.exports = function (payload, character, arena) {
  try {
    let playersList = activeArenas.currentArenas.find(aren => aren.getRoomName() === arena.getRoomName()).charactersList;
    sails.sockets.broadcast(character.socket,'map_info',{ characters: getCharacterToSend(playersList,true) ,turn: arena.turn });
  }catch (e) {
    sails.log.error('Error in requestMapInfo: ' + e);
  }
};
