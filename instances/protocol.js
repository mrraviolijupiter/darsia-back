let requestMatchInfoCallback = require('../scripts/eventsCB/requestMatchInfo.js');
let matchReadyConfirmCallback = require('../scripts/eventsCB/matchReadyConfirm.js');
let tryPassCallback = require('../scripts/eventsCB/tryPass.js');
let tryMoveCallback = require('../scripts/eventsCB/tryMove.js');
let tryAttackCallback = require('../scripts/eventsCB/tryAttack.js');
let tryLeaveCallback = require('../scripts/eventsCB/tryLeave.js');

module.exports = {
  serverMessages:{
    goto:{
      message:'goto',
      payload:{
        where:'',
      }
    },
    join:{
      message:'join',
      payload: {
        name:'',
        user: null,
        baseStats: null,
        color: 0,
        pawn: {}
      },
    },
    matchInfo:{
      message:'match_info',
      payload:{
        turn: {},
        chests: [],
        turnOrder: [],
        characters:[],
      }
    },
    matchReady:{
      message:'match_ready',
      payload:{}
    },
    startMatch:{
      message:'start_match',
      payload:{
        turnOrder: [],
      }
    },
    startTurn: {
      message: 'start_turn',
      payload:{
        turn: {},
        inTurnMovementRange: [],
        inTurnAttackRange: [],
        mapUpdates: [],
      }
    },
    move:{
      message: 'move',
      payload:{
        characterId: 0,
        path: [],
        availableAttackRange: [],
      }
    },
    attack:{
      message: 'attack',
      payload: {
        aggressorId: 0,
        targetId: 0,
        type: '',
        damage: 0.0,
      },
    },
    leave:{
      message: 'leave',
      payload:{
        characterId: 0,
      }
    },
  },
  clientMessages:{
    requestMatchInfo: {
      eventName: 'request_match_info',
      callback: requestMatchInfoCallback,
    },
    matchReadyConfirm: {
      eventName: 'match_ready_confirm',
      callback: matchReadyConfirmCallback,
    },
    tryPass: {
      eventName: 'try_pass',
      callback: tryPassCallback,
    },
    tryMove: {
      eventName: 'try_move',
      callback: tryMoveCallback,
    },
    tryAttack: {
      eventName: 'try_attack',
      callback: tryAttackCallback,
    },
    tryLeave: {
      eventName: 'try_leave',
      callback: tryLeaveCallback,
    },
  },
};
