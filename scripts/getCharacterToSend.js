let { copyAsCharacter } = require('../scripts/protocolTemplates.js');
let _ = require('lodash');
// TODO: Set Stat table to character. Currently only id is sent
module.exports = function(initialCharacter){
  let character = _.cloneDeep(initialCharacter);
  character.initialItems = character.initialItems.map(i => i.name);
  character.pawn.equipedItems = character.pawn.equipedItems.map(i => i.name);
  character.initialSkills = []; // TODO: Implement initial skills on character creation(?
  return copyAsCharacter(character);
};
