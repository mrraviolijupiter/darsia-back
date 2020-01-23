module.exports = {
  // Game design constants
  stats:{
    health: 100.6,
    damage: 4.6,
    movement: 4,
    jumpHeight: 1,
    movementSteps: 1,
    attackRange: null,
    evasionRate:  0.1,
    criticalRate: 0.2,
    criticalMultiplier: 1.5,
    turnInitiative: 1,
    turnSpeed: 1,
    turnCharge: 5,
  },

  arena:{
    size: 2,
  },

  defaultPawnStats:{
    location:{
      x: 1,
      y: 1,
    },
    direction: 'north',
  },

  //
  // Functionality constants
  // Don't touch if not sure
  //
  DIRECTION: {
    N: 'north',
    S: 'south',
    E: 'east',
    W: 'west',
  },

  connectedPlayers: [null],
};
