let {copyAsTurn} = require('./protocolTemplates.js');
module.exports = function(turn){
  return copyAsTurn(turn);
};
