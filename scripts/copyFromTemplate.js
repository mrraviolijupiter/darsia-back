const _ = require("lodash");

const isInteger = _.isInteger;
const isFloat = _.isNumber;
const isFloatInRange = (min, max) => t => _.isNumber(t) && min <= t && t <= max;
const isBoolean = _.isBoolean;
const isString = _.isString;
const isArray = _.isArray;
const isArrayAndEveryElement = isValid => array => isArray(array) && array.every(isValid);
const isOneOf = options => e => options.includes(e);

const isDirection = isOneOf(["N", "E", "S", "W"]);
const isItemName = isOneOf(["sword", "bow"]);
const isSkillName = isOneOf(["dash", "dodge", "augmentedAttack", "spinAttack"]);
const isStartTurnReason = isOneOf(["timeout", "pass", "start_match"]);

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
const CHARACTER = {
  id: isInteger,
  name: isString,
  pawn: CHARACTER_PAWN,
  color: isInteger,
  baseStats: STATS,
  initialItems: [isItemName],
  initialSkills: [isSkillName]
}
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
const EVENT_MATCH_INFO = {
  characters: [CHARACTER],
  turn: TURN,
}

const copyFromTemplate = (source, template) => {
  if (_.isFunction(template)) {
    if(!template(source)) throw `value=${source} does not pass validator=${template}`;
    return source;
  } else if (_.isArray(template)) {
    if (template.length != 1) throw `template array.length != 1, array=${template}`;
    if (!_.isArray(source)) throw `template is array but source is not, source=${source}, tempate=${template}`
    let elementTemplate = template[0];
    return source.map(element => copyFromTemplate(element, elementTemplate));
  } else if (_.isObject(template)) {
    let built = {};
    let prettySource = JSON.stringify(source, null, "  ");
    for (let [k, v] of Object.entries(template)) {
      if (!(k in source)) throw `key=${k} is not in source=${prettySource}`;
      built[k] = copyFromTemplate(source[k], v);
    }
    return built;
  } else throw `invalid template=${template}`;
}


const matchInfoExample = {
  sarasa: 123,
  farafa: 232,
  // turnOrder: ["a", 3, 1],
  turn: {
    ja: 2,
    a: () => 3,
    startReason: "pass",
    remainingSeconds: 10.3,
    turnNumber: 3,
    characterInTurn: 2,
    canMove: true,
    canAttack: true,
    canUseSkill: true,
    canPass: true
  },
  characters: [
    {
      id: 1,
      name: "Reddish1",
      initialItems: ["bow", "bow", "sword"],
      initialSkills: ["dodge", "augmentedAttack"],
      pawn: {
        location: { x: 1, y: 1 },
        front: "N",
        currentStats: {
          health: 10,
          damage: 3,
          movementSteps: 3,
          jumpHeight: 1,
          attackRange: [{ x: 0, y: 1 }, { x: 0, y: 2 }],
          evasionRate:  0.2,
          criticalRate: 0.17,
          criticalMultiplier: 1.5,
          turnInitiative: 1,
          turnSpeed: 20,
          turnCharge: 20,
        },
        equipedItems: ["bow", "bow", "sword"],
        carriedSkills: ["dodge", "augmentedAttack"]
      },
      color: 1,
      baseStats: {
        health: 20,
        damage: 3,
        movementSteps: 3,
        jumpHeight: 1,
        attackRange: [{ x: 0, y: 1 }, { x: 0, y: 2 }],
        evasionRate:  0.2,
        criticalRate: 0.17,
        criticalMultiplier: 1.5,
        turnInitiative: 1,
        turnSpeed: 20,
        turnCharge: 100
      }
    },
    {
      id: 2,
      name: "Blubble2",
      initialItems: ["bow", "bow", "sword"],
      initialSkills: ["dodge", "augmentedAttack"],
      pawn: {
        location: { x: 8, y: 8 },
        front: "S",
        currentStats: {
          health: 15,
          damage: 4,
          movementSteps: 2,
          jumpHeight: 2,
          attackRange: [{ x: 0, y: 3 }, { x: 0, y: 2 }, { x: 1, y: 2 }],
          evasionRate:  0.3,
          criticalRate: 0.27,
          criticalMultiplier: 1.6,
          turnInitiative: 2,
          turnSpeed: 30,
          turnCharge: 50
        },
        equipedItems: [],
        carriedSkills: [],
      },
      color: 2,
      baseStats: {
        health: 15,
        damage: 4,
        movementSteps: 2,
        jumpHeight: 2,
        attackRange: [{ x: 0, y: 3 }, { x: 0, y: 2 }, { x: 1, y: 2 }],
        evasionRate:  0.3,
        criticalRate: 0.27,
        criticalMultiplier: 1.6,
        turnInitiative: 2,
        turnSpeed: 30,
        turnCharge: 100
      }
    },
    {
      id: 3,
      name: "Greenish3",
      initialItems: ["bow", "bow", "sword"],
      initialSkills: ["dodge", "augmentedAttack"],
      pawn: {
        location: { x: 1, y: 8 },
        front: "S",
        currentStats: {
          health: 30,
          damage: 4,
          movementSteps: 2,
          jumpHeight: 2,
          attackRange: [{ x: 0, y: 3 }, { x: 0, y: 2 }, { x: 1, y: 2 }],
          evasionRate:  0.3,
          criticalRate: 0.27,
          criticalMultiplier: 1.6,
          turnInitiative: 2,
          turnSpeed: 30,
          turnCharge: 50,
        },
        equipedItems: [],
        carriedSkills: ["dodge"]
      },
      color: 3,
      baseStats: {
        health: 30,
        damage: 4,
        movementSteps: 2,
        jumpHeight: 2,
        attackRange: [{ x: 0, y: 3 }, { x: 0, y: 2 }, { x: 1, y: 2 }],
        evasionRate:  0.3,
        criticalRate: 0.27,
        criticalMultiplier: 1.6,
        turnInitiative: 2,
        turnSpeed: 30,
        turnCharge: 100
      }
    },
  ]
};
console.log(JSON.stringify(copyFromTemplate(matchInfoExample, EVENT_MATCH_INFO), null, "  "));
