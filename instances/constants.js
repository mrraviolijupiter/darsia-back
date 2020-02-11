module.exports = {
  // Game design constants
  stats:{
    health: 100.6,
    damage: 4.6,
    jumpHeight: 1,
    movementSteps: 2,
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

  // Items
  sword: {
    name: 'sword',
    description: 'The most powerful sword',
    type: 'weapon',
    stats: {
      health: 0,
      damage: 3,
      jumpHeight: 0,
      movementSteps: 0,
      attackRange: [{x: 1,y: 0},{x: -1,y: 0},{x: 0,y: -1},{x: 0,y: 1}],
      evasionRate:  0,
      criticalRate: 0,
      criticalMultiplier: 0.2,
      turnInitiative: 0,
      turnSpeed: 0,
      turnCharge: 0,
    },
  },

  bow: {
    name: 'bow',
    description: 'Robin Hood approved it',
    type: 'weapon',
    stats: {
      health: 0,
      damage: 2,
      jumpHeight: 0,
      movementSteps: 0,
      attackRange: [
        {x: 2,y: 0},{x: 3,y: 0},{x: -2,y: 0},{x: -3,y: 0},
        {x: 0,y: -2},{x: 0,y: 2},{x: 0,y: -3},{x: 0,y: 3},
        {x: 1,y: -1},{x: -1,y: 1},{x: -1,y: -1},{x: 1,y: 1}
      ],
      evasionRate:  0,
      criticalRate: 0,
      criticalMultiplier: 0.1,
      turnInitiative: 0,
      turnSpeed: 0,
      turnCharge: 0,
    },
  },

  defaultPawnStats:{
    location:{
      x: 1,
      y: 1,
    },
    direction: 'north',
  },

  turnDuration: 10000,

  arenaMap:[
    [1,9,1,1,1,1,1,1,1,1],
    [1,1,2,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,3,1,1,1],
    [1,1,1,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,4,1,1],
    [2,2,2,1,1,1,1,1,1,1],
    [2,2,2,1,1,1,1,1,1,1],
    [2,2,2,1,1,1,1,1,1,1],
    [7,5,2,1,1,1,1,1,1,1],
  ],

  startLocations:[{x:3,y:3},{x:7,y:7},{x:6,y:9},{x:5,y:7},{x:7,y:1}],
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
