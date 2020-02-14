module.exports = function(turn){
  let ret;
  ret = JSON.parse(JSON.stringify(turn));
  delete ret.timer;
  delete ret.initialCharacterLocation;
  return ret;
};
