let activeArenas = require('../../instances/activeArenas.js');
let getCharacterToSend = require('../getCharacterToSend.js');
let getTurnToSend = require('../getTurnToSend.js');
let {copyAsMatchInfo} = require('../protocolTemplates.js');

module.exports = function (payload, character, arena) {
  try {
    let playersList = activeArenas.currentArenas.find(aren => aren.getRoomName() === arena.getRoomName()).charactersList;
    let ret = {
      characters: playersList.map(getCharacterToSend),
      turn: getTurnToSend(arena.turn),
      turnOrder: arena.characterInitiativeList
    };
    sails.sockets.broadcast(character.socket,'match_info',copyAsMatchInfo(ret));
  }catch (e) {
    sails.log.error('Error in requestMatchInfo: ' + e);
  }
};
