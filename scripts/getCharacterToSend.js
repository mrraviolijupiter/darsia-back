// TODO: Set Stat table to character. Currently only id is sent
module.exports = function(character,isArray= false){
  if (isArray){
    let ret = [];
    character.forEach(char=>{
      ret.push(JSON.parse(JSON.stringify(char)));
      delete ret[ret.length-1].socket;
      delete ret[ret.length-1].updatedAt;
      delete ret[ret.length-1].createdAt;
      delete ret[ret.length-1].user;
      delete ret[ret.length-1].tryLeave;
      delete ret[ret.length-1].tryMove;
      delete ret[ret.length-1].tryAttack;
      delete ret[ret.length-1].tryPass;
      delete ret[ret.length-1].pawn.isReadyToStart;
    });
    return ret;
  }
  else{
    let ret;
    ret = JSON.parse(JSON.stringify(character));
    delete ret.socket;
    delete ret.updatedAt;
    delete ret.createdAt;
    delete ret.user;
    delete ret.tryLeave;
    delete ret.tryMove;
    delete ret.tryAttack;
    delete ret.tryPass;
    delete ret.pawn.isReadyToStart;
    return ret;
  }
};
