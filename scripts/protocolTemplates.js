const _ = require("lodash");

const assert = (condition, message) => { if (!condition) throw message };

const copyFromTemplate = (source, template) => {
  if (_.isFunction(template)) {
    assert(template(source), `value=${JSON.stringify(source, null, "  ")} does not pass validator=${template}`);
    return source;
  } else if (_.isArray(template)) {
    assert(template.length == 1, `template array.length != 1, array=${template}`);
    assert(_.isArray(source), `template is array but source is not, source=${source}, template=${JSON.stringify(template, null, "  ")}`);
    let elementTemplate = template[0];
    return source.map(element => copyFromTemplate(element, elementTemplate));
  } else if (_.isObject(template)) {
    let built = {};
    let prettySource = JSON.stringify(source, null, "  ");
    for (let [k, v] of Object.entries(template)) {
      assert(k in source, `key=${k} is not in source=${prettySource}`);
      built[k] = copyFromTemplate(source[k], v);
    }
    return built;
  } else throw `invalid template=${template}`;
}

const conformsTo = template => source => {
  if (_.isFunction(template)) {
    assert(template(source), `value=${source} does not pass validator=${template}`);
  } else if (_.isArray(template)) {
    assert(template.length == 1, `template array.length != 1, array=${template}`);
    assert(_.isArray(source), `source is not an array, source=${source}, tempate=${template}`);
    return source.every(conformsTo(template[0]));
  } else if (_.isObject(template)) {
    let prettySource = JSON.stringify(source, null, "  ");
    for (let [prop, valueTemplate] of Object.entries(template)) {
      assert(prop in source, `prop=${prop} not in source=${prettySource}`);
      assert(conformsTo(valueTemplate)(source[prop]), `prop=${prop} is not valid in source=${prettySource}`);
    }
    for (var key of Object.keys(source))
      assert(key in template, `key=${key} not in template`);
  } else throw `invalid template=${template}`;
  return true;
}

const isInteger = _.isInteger;
const isFloat = _.isNumber;
const isFloatInRange = (min, max) => t => isFloat(t) && min <= t && t <= max;
const isBoolean = _.isBoolean;
const isString = _.isString;
const isArray = _.isArray;
const isArrayAndEveryElement = isValid => array => isArray(array) && array.every(isValid);
const isOneOf = options => e => options.includes(e);

const isDirection = isOneOf(["N", "E", "S", "W"]);
const isItemName = isOneOf(["sword", "bow"]);
const isSkillName = isOneOf(["dash", "dodge", "augmentedAttack", "spinAttack"]);
const isStartTurnReason = isOneOf(["timeout", "pass", "start_match"]);
const isMatchState = isOneOf(["lobby", "ready", "started", "finished"]);

const BOARD_COORDINATE = { x: isInteger, y: isInteger };
const STATS = {
  health: isFloat,
  damage: isFloat,
  movementSteps: isInteger,
  jumpHeight: isInteger,
  attackRange: [BOARD_COORDINATE],
  evasionRate:  isFloatInRange(0, 1),
  criticalRate: isFloatInRange(0, 1),
  criticalMultiplier: isFloat,
  turnInitiative: isFloat,
  turnSpeed: isFloat,
  turnCharge: isFloat
};
const CHARACTER_PAWN = {
  location: BOARD_COORDINATE,
  front: isDirection,
  currentStats: STATS,
  equipedItems: [isItemName],
  carriedSkills: [isSkillName]
};
const CHEST = {
  location: BOARD_COORDINATE,
  droppedBy: isInteger, // 0 if not a dropped chest
  turnsToOpen: isInteger // 0 means it is open
};


const CHARACTER = {
  id: isInteger,
  name: isString,
  pawn: CHARACTER_PAWN,
  color: isInteger,
  baseStats: STATS,
  initialItems: [isItemName],
  initialSkills: [isSkillName]
};
const copyAsCharacter = source => copyFromTemplate(source, CHARACTER);
const isCharacter = conformsTo(CHARACTER);

const TURN = {
  startReason: isStartTurnReason,
  remainingSeconds: isFloat,
  turnNumber: isInteger,
  characterInTurn: isInteger,
  canMove: isBoolean,
  canAttack: isBoolean,
  canUseSkill: isBoolean,
  canPass: isBoolean
};
const copyAsTurn = source => copyFromTemplate(source, TURN);
const isTurn = conformsTo(TURN);

// Event templates

const EVENT_START_TURN = {
  inTurnMovementRange: [BOARD_COORDINATE],
  inTurnAttackRange: [BOARD_COORDINATE],
  turn: TURN,
}
const copyAsStartTurn = source => copyFromTemplate(source, EVENT_START_TURN);
const isStartTurn = conformsTo(EVENT_START_TURN);

const EVENT_MATCH_INFO = {
  turn: TURN,
  turnOrder: [isInteger],
  chests: [CHEST],
  characters: [CHARACTER],
  numberOfPlayers: isInteger,
  state: isMatchState
};

const copyAsMatchInfo = source => copyFromTemplate(source, EVENT_MATCH_INFO);
const isMatchInfo = conformsTo(EVENT_MATCH_INFO);

module.exports = {
  copyAsCharacter,
  isCharacter,
  copyAsTurn,
  isTurn,
  copyAsMatchInfo,
  isMatchInfo,
  copyAsStartTurn,
  isStartTurn,
};
