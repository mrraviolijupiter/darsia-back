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
      defaultsTo: sails.config.custom.stats.health,
    },

    damage: {
      type: 'number',
      defaultsTo: sails.config.custom.stats.damage,
    },

    movement: {
      type: 'number',
      defaultsTo: sails.config.custom.stats.movement,
    },

    range: {
      type: 'json',
      defaultsTo: sails.config.custom.stats.range,
    },

    evasionRate: {
      type: 'number',
      defaultsTo: sails.config.custom.stats.evasionRate,
    },

    criticalRate: {
      type: 'number',
      defaultsTo: sails.config.custom.stats.criticalRate,
    },

    criticalMultiplier: {
      type: 'number',
      defaultsTo: sails.config.custom.stats.criticalMultiplier,
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
