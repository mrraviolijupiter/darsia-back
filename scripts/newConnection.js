let characterPawn = require('../classes/characterPawn.js');
let joinArena = require('./joinArena.js');
let activeArenas = require('../instances/activeArenas.js');
let protocol = require('../instances/protocol.js');

////////////////////////////////////////////////////////////
// This function does:
// - First find user by userId
// - Then create a character pawn for this user's character
// - Store socket id in character
// - Lastly join character to a new arena
////////////////////////////////////////////////////////////
let matchCharacter = async function(userId, socket, setup) {
  // Find logged user id
  let user;
  try{
    user = await User.findOne({id:userId}).populate('character');
  }catch(e){
    sails.log.error('User not found. Exception: ' + e);
    return;
  }

  let character;
  // Update character adding a new characterPawn
  try{
    if(setup !== undefined){
      await Character.updateOne({
        id:user.character.id
      }).set({
        pawn: new characterPawn(setup)
      });
    }else{
      await Character.updateOne({
        id:user.character.id
      }).set({
        pawn: new characterPawn()
      });
    }
    character = await Character.findOne({id:user.character.id}).populate('baseStats');
  }catch (e) {
    sails.log.error('Character not found. Exception: ' + e);
    return;
  }

  // Character instance contain its socket. Useful later probably
  character.socket = socket.id;

  // Join character and socket to a non-full arena
  try {
    let arena = await joinArena(character,socket);

    if (arena.isFull()){
      // Notify all players that match can start
      sails.sockets.broadcast(arena.getRoomName(),protocol.serverMessages.matchReady.message,protocol.serverMessages.matchReady.payload);
      arena.state = 'readyToStart';
    }

    // Create events to listen on this socket
    socket.on(protocol.clientMessages.matchReadyConfirm.eventName, payload => { protocol.clientMessages.matchReadyConfirm.callback(payload, character, arena);});
    socket.on(protocol.clientMessages.requestMatchInfo.eventName, payload => { protocol.clientMessages.requestMatchInfo.callback(payload, character, arena);});
  }catch (e) {
    sails.log.error('Fail joining arena. Exception: ' + e);
  }
};

module.exports = async function (socket) {
  let sid;

  // Parse sid from header sent by client
  // This header is taken by session returned in response HTTP login

  if(socket.client.request.url.includes('force-user')){
    let uid = socket.client.request.url
      .split('force-user=')[1]
      .split('&')[0];
    if(socket.client.request.url.includes('setup')){
      let setup = socket.client.request.url
        .split('setup=')[1]
        .split('&')[0];
      matchCharacter(uid, socket, setup);
    }else{
      matchCharacter(uid, socket);
    }
    return;
  }

  try{
    sid = socket.handshake.headers.sid.split('.')[0].slice(4);
  }catch(e){
    // Bad sid format
    sails.log.debug(e);
    return;
  }

  let userId;

  // Get userId from session to match this new connection with a logged user character.
  sails.session.get(sid,function () {
    // Check if a valid header sid was sent
    try{
      userId = arguments[1].userId;
    }catch(e){
      sails.log.debug(e);
    }
    try{
      matchCharacter(userId,socket);
    }catch (e) {
      sails.log.error('Error in matchCharacter. Exception: ' + e);
    }
  });

};
