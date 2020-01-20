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

    range: {
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
