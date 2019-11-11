module.exports = {

  inputs: {
    fullName: {
      type: 'string'
    },
    id:{
      type:'number'
    },
    emailAddress: {
      type: 'string'
    },
  },
  exits: {
    badRequest:{
      statusCode: 400,
      description: 'Not filter sent.',
    },
    internalError:{
      statusCode: 500,
      description: 'Internal server error searching for a user.',
    },

  },

  fn: async function(inputs){

    if(!inputs){
      throw 'badRequest';
    }

    let user;

    if(inputs.fullName){
      user = await User.findOne({
        fullName: inputs.fullName,
      }).intercept({},'internalError');
    }

    return {user};
  }
};
