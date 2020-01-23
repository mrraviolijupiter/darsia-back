let cb_requestMapInfo = require('../scripts/eventsCB/requestMapInfo.js');
let cb_matchReadyConfirm = require('../scripts/eventsCB/matchReadyConfirm.js');
let cb_tryPass = require('../scripts/eventsCB/tryPass.js');
let cb_tryMove = require('../scripts/eventsCB/tryMove.js');
let cb_tryAttack = require('../scripts/eventsCB/tryAttack.js');
let cb_tryLeave = require('../scripts/eventsCB/tryLeave.js');

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
  },
  clientMessages:{
    requestMapInfo: {
      eventName: 'request_map_info',
      callback: cb_requestMapInfo,
    },
    matchReadyConfirm: {
      eventName: 'match_ready_confirm',
      callback: cb_matchReadyConfirm,
    },
    tryPass: {
      eventName: 'try_pass',
      callback: cb_tryPass,
    },
    tryMove: {
      eventName: 'try_move',
      callback: cb_tryMove,
    },
    tryAttack: {
      eventName: 'try_attack',
      callback: cb_tryAttack,
    },
    tryLeave: {
      eventName: 'try_leave',
      callback: cb_tryLeave,
    },
  },
};
