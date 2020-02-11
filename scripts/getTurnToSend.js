module.exports = function(turn){
  let ret;
  ret = JSON.parse(JSON.stringify(turn));
  delete ret.timer;
  return ret;
};
