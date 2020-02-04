

module.exports = function(targetLocation, currentLocation, availableLocations) {
  let ret = [];

  ret.push(currentLocation);
  currentLocation.distance = 0;
  let tmpLocation;

  while (ret.length !== 0){
    tmpLocation = ret.pop();
    if (!tmpLocation.label){
      tmpLocation.label = 1;
      let adjacentLocations = availableLocations.filter(location => (
        (tmpLocation.x === location.x && (location.y === tmpLocation.y+1 || location.y === tmpLocation.y-1) )||
        (tmpLocation.y === location.y && (location.x === tmpLocation.x+1 || location.x === tmpLocation.x-1) )
      ));
      adjacentLocations.forEach(location => {
        ret.push(location);
        if (location.distance === undefined){
          location.distance = tmpLocation.distance + 1;
        }
      });
    }
  }

  ret.push(targetLocation);
  tmpLocation = targetLocation;
  while (tmpLocation.distance !== 0){
    let adjacentLocations = availableLocations.filter(location => (
      (tmpLocation.x === location.x && (location.y === tmpLocation.y+1 || location.y === tmpLocation.y-1) )||
      (tmpLocation.y === location.y && (location.x === tmpLocation.x+1 || location.x === tmpLocation.x-1) )
    ));

    tmpLocation = adjacentLocations[0];

    adjacentLocations.forEach(location => {
      if (location.distance < tmpLocation.distance){
        tmpLocation = location;
      }
    });
    ret.push(tmpLocation);
  }

  ret = ret.reverse();
  ret.forEach(location => {
    delete location.distance;
    delete location.label;
  });

  return ret;
};
