
module.exports = function(pawn, map, blocked) {
  let tmpMap = JSON.parse(JSON.stringify(map));
  let ret = [];
  function calculate(position,movementSteps) {
    if (undefined !== blocked.find(element => element.x === position.x && element.y === position.y)) {return;}
    tmpMap[position.x][position.y] = 100;
    ret.push(position);
    if (movementSteps <= 0) {return;}

    let height = map[position.x][position.y] + pawn.currentStats.jumpHeight;
    if (position.y < map[position.x].length-1 && height >= tmpMap[position.x][position.y+1]){
      calculate({x:position.x,y:position.y+1},movementSteps-1);
    }
    if ( position.x < map.length-1 && height >= tmpMap[position.x+1][position.y]){
      calculate({x:position.x+1,y:position.y},movementSteps-1);
    }
    if ( position.y > 0 && height >= tmpMap[position.x][position.y-1]){
      calculate({x:position.x,y:position.y-1},movementSteps-1);
    }
    if ( position.x > 0 && height >= tmpMap[position.x-1][position.y]){
      calculate({x:position.x-1,y:position.y},movementSteps-1);
    }
  }
  calculate(pawn.location, Math.floor(pawn.currentStats.movementSteps));
  return ret;
};
