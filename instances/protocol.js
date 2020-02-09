let requestMapInfoCallback = require('../scripts/eventsCB/requestMapInfo.js');
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
    mapInfo:{
      message:'map_info',
      payload:{
        turn: {},
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
    leave:{
      message: 'leave',
      payload:{
        characterId: 0,
      }
    },
  },
  clientMessages:{
    requestMapInfo: {
      eventName: 'request_map_info',
      callback: requestMapInfoCallback,
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
