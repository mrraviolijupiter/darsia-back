module.exports = function(pawn, map, blocked) {
  // TODO: Calculate attack range.
  let characterPawn = require('../classes/characterPawn.js');
  let ret = new characterPawn();
  Object.assign(ret,pawn);
  return ret.getStats().attackRange;
};
