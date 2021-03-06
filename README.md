# Darsia

Darsia is an mmorpg striped down to its core mechanics for midcore to casual
mobile players with a battle system heavily inspired in games like final fantasy
tactics.

# Arena movement protocol

The idea is to have an initial protocol for moving around in the arena map, such
that we test out the front-back communication

*Note: `1` is a 1 to 1 message while ` * ` is a room broadcast*

# Client emitted messages

```js
1 request_match_info EMPTY_PAYLOAD
1 match_ready_confirm EMPTY_PAYLOAD
1 try_pass EMPTY_PAYLOAD
1 try_move { targetLocation: BOARD_COORDINATE }
1 try_attack { targetId: int }
1 try_leave EMPTY_PAYLOAD
1 try_open_chest { chestLocation: BOARD_COORDINATE }
1 try_use_skill { skillName: SKILL_NAME }
1 confirm_use_dash { targetLocation: BOARD_COORDINATE }
1 confirm_use_spin_attack EMPTY_PAYLOAD
```

# Server emitted messages

```js
1 goto { where: MAP }
* join { character: CHARACTER }
1 match_info {
  turn: TURN,
  turnOrder: [int],
  chests: [CHEST],
  characters: [CHARACTER],
  clientCharacterId: int, // of the client whom requested the match_info
  numberOfPlayers: int,
  state: MATCH_STATE
}
* match_ready EMPTY_PAYLOAD
* start_match { turnOrder: [int] }
* start_turn {
  turn: TURN,
  inTurnMovementRange: [BOARD_COORDINATE],
  inTurnAttackRange: [BOARD_COORDINATE]
}
* move {
  characterId: int,
  path: [BOARD_COORDINATE],
  availableAttackRange [BOARD_COORDINATE]
}
* attack { aggressorId: int, targetId: int, type: HIT_TYPE, damage: float }
* kill {
  killerCharacterId: int, // 0 if none
  killedCharacterId: int,
  droppedChest: CHEST
}
* open_chest { receiverId: int, chest: CHEST }
1 private_open_chest { receiverId: int, chest: CHEST, skillName: SKILL_NAME }
1 use_dash_info { dashRange: [BOARD_COORDINATE] }
1 use_spin_attack_info { spinRange: [BOARD_COORDINATE] }
* use_skill { casterId: int, skillName: SKILL_NAME, skill: CASTING_INFO }
* leave { characterId: int }
* end_match { winnerId: int }
```

# Type definitions

```js
EMPTY_PAYLOAD := "" or null or {} // be consistent
MAP := "arena" | "menu"
DIRECTION := "N" | "E" | "S" | "W"
BOARD_COORDINATE := { x: int, y: int }
CHARACTER := {
  id: int,
  name: string,
  pawn: CHARACTER_PAWN,
  color: int, // TODO: Will be replaced with initial outfits
  baseStats: STATS,
  initialItems: [ITEM_NAME],
  initialSkills: [SKILL_NAME]
}
CHARACTER_PAWN := {
  location: BOARD_COORDINATE,
  front: DIRECTION,
  currentStats: STATS,
  equipedItems: [ITEM_NAME],
  carriedSkills: [SKILL_NAME]
}
STATS := {
  health: float,
  damage: float,
  movementSteps: int,
  jumpHeight: int,
  attackRange: [BOARD_COORDINATE],
  evasionRate:  float[0, 1],
  criticalRate: float[0, 1],
  criticalMultiplier: float,
  turnInitiative: float,
  turnSpeed: float,
  turnCharge: float
}
HIT_TYPE := "regular" | "miss" | "critical"
MATCH_STATE := "lobby" | "ready" | "started" | "finished"
START_TURN_REASON := "start_match" | "timeout" | "pass"
TURN := {
  startReason: START_TURN_REASON,
  remainingSeconds: float,
  turnNumber: int,
  characterInTurn: int,
  canMove: bool,
  canAttack: bool,
  canUseSkill: bool,
  canPass: bool
}
ITEM := {
  name: ITEM_NAME,
  description: string,
  type: ITEM_TYPE,
  stats: STATS,
}
ITEM_NAME := "sword" | "bow"
ITEM_TYPE := "weapon" | "outfit" | "accessory"
CHEST := {
  location: BOARD_COORDINATE,
  droppedBy: int, // 0 if not a dropped chest
  turnsToOpen: int // 0 means it is open
}
SKILL := {
  name: SKILL_NAME,
  description: string
}

CASTING_INFO := DODGE_SKILL | DASH_SKILL | AUGMENTED_ATTACK_SKILL | SPIN_ATTACK_SKILL
DODGE_CASTING_INFO := EMPTY_PAYLOAD
AUGMENTED_ATTACK_CASTING_INFO := EMPTY_PAYLOAD
SPIN_ATTACK_CASTING_INFO := EMPTY_PAYLOAD
DASH_CASTING_INFO := { targetLocation: BOARD_COORDINATE }
SKILL_NAME := "dodge" | "dash" | "augmentedAttack" | "spinAttack"
```
