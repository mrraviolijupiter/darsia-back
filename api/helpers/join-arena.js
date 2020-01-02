class Arena{
  constructor(character){
    if (character){
      this.charactersList = [character];
    }else{
      this.charactersList = [];
    }
    this.roomName = '';
  }
  joinCharacter(character){
    if (character){
      this.charactersList.push(character);
    }else{
      // Throw error
      throw 'character is null in function joinCharacter';
    }
  }
  isFull(){
    return this.charactersList.length === sails.config.custom.arena.size;
  }
  setRoomNameId(name){
    if (name || name === 0){
      this.roomName = 'arena_' + name;
    }else{
      // Throw error
      throw 'id Name is null in setRoomNameId function';
    }

  }
  getRoomName(){
    return this.roomName;
  }
}

//Rename variable
let activeArenas = sails.config.custom.activeArenas;

// TODO: Set Stat table to character. Currently only id is sent
let getCharacterToSend = function(character,isArray= false){
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

module.exports = {

  inputs: {
    character:{
      type:'ref',
      required: true
    },
    socket:{
      type:'ref',
      required: true
    }
  },

  // Receives a character with a socket attribute to join rooms and arena
  fn: async function (inputs,exits) {
    // Check if there are no arenas created
    // If its tha case, create the first arena and join current character to them
    if(activeArenas.currentArenas[activeArenas.currentArenas.length-1] === null){
      let tmp;
      // Create new arena with current character inside
      tmp = new Arena(inputs.character);

      // Remove null arena
      activeArenas.currentArenas.pop();
      // Push new arena into activeArenas
      activeArenas.currentArenas.push(tmp);

      // Join socket to corresponding arena room
      tmp.setRoomNameId(activeArenas.currentArenas.length-1);

      await sails.sockets.join(inputs.character.socket,tmp.getRoomName());

      sails.log.debug('New user joined to first arena');

      // Move player to the arena environment
      sails.sockets.broadcast(inputs.character.socket,'goto',{ where: 'arena', id: tmp.getRoomName() });
      // inputs.character.socket.emit('goto', ); remove

      // Notify other players in arena that a new player joined
      sails.sockets.broadcast(tmp.getRoomName(),'new_join',getCharacterToSend(inputs.character));

      // TODO: Create events
      // Create events to listen on this socket
      inputs.socket.on('request_map_info', payload => {
        let playersList = activeArenas.currentArenas.find(arena => arena.roomName === payload.id).charactersList;
        sails.sockets.broadcast(inputs.character.socket,'map_info',{ characters: getCharacterToSend(playersList,true) });
      });
    }
    else{
      // There are an active arena
      // Check if it's full
      if(activeArenas.currentArenas[activeArenas.currentArenas.length-1].isFull()){
        // Join character and socket to this non-full arena
        activeArenas.currentArenas[activeArenas.currentArenas.length-1].joinCharacter(inputs.character);
        await sails.sockets.join(inputs.character.socket,activeArenas.currentArenas[activeArenas.currentArenas.length-1].getRoomName());

        sails.log.debug('New user joined to arena '+ (activeArenas.currentArenas.length-1));

        // Move player to the arena environment
        sails.sockets.broadcast(inputs.character.socket,'goto',{ where: 'arena', id: activeArenas.currentArenas[activeArenas.currentArenas.length-1].getRoomName() });
        // inputs.character.socket.emit('goto', { where: 'arena', id: activeArenas.currentArenas[activeArenas.currentArenas.length-1].getRoomName()}); remove

        // Notify other players in arena that a new player joined
        sails.sockets.broadcast(activeArenas.currentArenas[activeArenas.currentArenas.length-1].getRoomName(),'new_join',getCharacterToSend(inputs.character));

        // TODO: Check if this arena is full now.
        // In that case, send a map_info message to indicate that arena is full and start fight

        // TODO: Create events
        // Create events to listen on this socket
        // Create events to listen on this socket
        inputs.socket.on('request_map_info', payload => {
          let playersList = activeArenas.currentArenas.find(arena => arena.roomName === payload.id).charactersList;
          sails.sockets.broadcast(inputs.character.socket,'map_info',{ characters: getCharacterToSend(playersList,true) });
        });
      }
      else{ // Exist active arenas but are full, so create a new one
        let tmp = new Arena(inputs.character);
        activeArenas.currentArenas.push(tmp);
        tmp.setRoomNameId(activeArenas.currentArenas.length-1);
        await sails.sockets.join(inputs.character.socket,tmp.getRoomName());
        sails.log.debug('New user joined to new arena ' + (activeArenas.currentArenas.length-1));
        // Move player to the arena environment
        sails.sockets.broadcast(inputs.character.socket,'goto',{ where: 'arena', id: tmp.getRoomName() });

        // Notify other players in arena that a new player joined
        sails.sockets.broadcast(tmp.getRoomName(),'new_join',getCharacterToSend(inputs.character));

        // TODO: Create events
        // Create events to listen on this socket
        inputs.socket.on('request_map_info', payload => {
          let playersList = activeArenas.currentArenas.find(arena => arena.roomName === payload.id).charactersList;
          sails.sockets.broadcast(inputs.character.socket,'map_info',{ characters: getCharacterToSend(playersList,true) });
        });
      }
    }
    return exits.success(activeArenas.currentArenas.length-1);
  },
};
