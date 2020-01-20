let fillStatTable = require('../../../scripts/fillStatTable.js');

module.exports = {
  inputs: {

    name: {
      required: true,
      type: 'string',
    },
  },

  exits: {
    userNotFound:{
      statusCode: 404,
      description: 'User not found.',
    },
    invalid:{
      statusCode: 400,
      description: 'Invalid user id or character name.',
    },
    hasACharacter:{
      statusCode: 400,
      description: 'You already has a character. Each user can has only one character.',
    }
  },

  fn: async function(inputs){
    /// Find current user
    let thisUser = await User.findOne({
      id: this.req.session.userId,
    }).intercept({},'userNotFound');

    /// Check this user already has a character
    if(thisUser.character !== null){
      throw 'hasACharacter';
    }

    let statTable = await StatTable.create().fetch();

    await fillStatTable(statTable);

    /// Create new character
    let newCharacter = await Character.create({
      name: inputs.name,
      user: thisUser.id,
      stats: statTable.id,
    }).intercept({name: 'UsageError'},'invalid')
      .intercept('E_MISSING_OR_INVALID_PARAMS','invalid')
      .fetch();

    await User.updateOne({id: thisUser.id}).set({character: newCharacter.id});

  }
};
