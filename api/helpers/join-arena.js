let activeArenas = {
  currentArenas: [null],
};

module.exports = {

  inputs: {
    socket:{
      type:'ref',
      required: true
    }
  },

  fn: async function (inputs,exits) {
    if(activeArenas.currentArenas[activeArenas.currentArenas.length-1] === null){
      activeArenas.currentArenas.push({amountOfPeopleInside: 1, id: 0});
      await sails.sockets.join(inputs.socket,'arena_'+(activeArenas.currentArenas.length-1));
      sails.log.debug('New user joined to first arena');
    }else{
      if(activeArenas.currentArenas[activeArenas.currentArenas.length-1].amountOfPeopleInside < sails.config.custom.arena.size ){
        activeArenas.currentArenas[activeArenas.currentArenas.length-1].amountOfPeopleInside++;
        await sails.sockets.join(inputs.socket,'arena_'+(activeArenas.currentArenas.length-1));
        sails.log.debug('New user joined to arena '+ (activeArenas.currentArenas.length-1));
      }else{
        activeArenas.currentArenas.push({amountOfPeopleInside: 1, id: 0});
        await sails.sockets.join(inputs.socket,'arena_'+(activeArenas.currentArenas.length-1));
        sails.log.debug('New user joined to new arena ' + (activeArenas.currentArenas.length-1));
      }
    }
    return exits.success(activeArenas.currentArenas.length-1);
  },
};
