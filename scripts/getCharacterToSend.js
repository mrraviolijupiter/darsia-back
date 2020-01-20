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
    return ret;
  }
};
