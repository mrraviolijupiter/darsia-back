const global = sails.config.custom;

class characterPawn{
  constructor() {
    this.location = global.defaultPawnStats.location;
    this.direction = global.defaultPawnStats.direction;
    this.currentStats = global.stats;
  }
}

module.exports = {
  inputs: {
    socket:{
      type:'ref',
      required: true
    }
  },

  fn: async function (inputs,exits) {
    let sid;
    // Extract sid from header
    try{
      sid = inputs.socket.handshake.headers.sid.split('.')[0].slice(4);
    }catch(e){
      // Bad sid format
      sails.log.debug(e);
      return exits.failed(e);
    }

    let matchCharacter = async function(userId) {
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
        character = await Character.updateOne({
          id:user.character.id
        }).set({
          characterPawn: new characterPawn()
        });
      }catch (e) {
        sails.log.error('Character not found. Exception: ' + e);
        return;
      }

      // Character instance contain its socket id. Useful later probably
      character.socket = inputs.socket.id;

      // Join character and socket to a non-full arena
      try {
        let arenaID = await sails.helpers.joinArena(character,inputs.socket);
      }catch (e) {
        sails.log.error('Fail joining arena. Exception: ' + e);
      }
    };

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
        matchCharacter(userId);
      }catch (e) {
        sails.log.error('Error in matchCharacter. Exception: ' + e);
      }
    });
  },
};

