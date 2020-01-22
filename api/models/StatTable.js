/**
 * StatTable.js
 *
 * StatTable has all possible stats for items and character
 *
 */
module.exports = {
  attributes: {

    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝

    health: {
      type: 'number',
      defaultsTo: 0,
    },

    damage: {
      type: 'number',
      defaultsTo: 0,
    },

    movement: {
      type: 'number',
      defaultsTo: 0,
    },

    jumpHeight:{
      type: 'number',
      defaultsTo: 0,
    },

    movementSteps:{
      type: 'number',
      defaultsTo: 0,
    },

    attackRange: {
      type: 'json',
      defaultsTo: 0,
    },

    evasionRate: {
      type: 'number',
      defaultsTo: 0,
    },

    criticalRate: {
      type: 'number',
      defaultsTo: 0,
    },

    criticalMultiplier: {
      type: 'number',
      defaultsTo: 0,
    },

    turnInitiative:{
      type: 'number',
      defaultsTo: 0,
    },

    turnSpeed:{
      type: 'number',
      defaultsTo: 0,
    },

    turnCharge:{
      type: 'number',
      defaultsTo: 0,
    },

    //etc,etc


    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝
    // n/a

    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝
    // n/a

  },


};
