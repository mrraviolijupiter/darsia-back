let arena = require('../classes/arena.js');

module.exports = {
  currentArenas: [null],
  joinCharacter: function (character) {
    if (this.currentArenas[0] === null || this.currentArenas[this.currentArenas.length-1].isFull()){
      this.currentArenas.pop();
      this.currentArenas.push(new arena(character));
      this.currentArenas[this.currentArenas.length-1].setRoomNameId(0);
      this.currentArenas[this.currentArenas.length-1].joinCharacter(character);
    }else{
      this.currentArenas[this.currentArenas.length-1].joinCharacter(character);
    }
    return this.currentArenas[this.currentArenas.length-1];
  },
};
