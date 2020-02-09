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
1 request_map_info EMPTY_PAYLOAD
1 match_ready_confirm EMPTY_PAYLOAD
1 try_pass EMPTY_PAYLOAD
1 try_move { targetLocation: BOARD_COORDINATE }
1 try_attack { targetId: int }
1 try_leave EMPTY_PAYLOAD
```

# Server emitted messages

```js
1 goto { where: MAP }
* join { character: CHARACTER }
1 map_info {
  turn: TURN,
  characters: [CHARACTER]
}
* match_ready EMPTY_PAYLOAD
* start_match { turnOrder: [int] }
* start_turn {
  turn: TURN,
  inTurnMovementRange: [BOARD_COORDINATE],
  inTurnAttackRange: [BOARD_COORDINATE],
  mapUpdates: [MAP_UPDATE],
}
* move {
  characterId: int,
  path: [BOARD_COORDINATE],
  availableAttackRange [BOARD_COORDINATE]
}
* attack { aggressorId: int, targetId: int, type: HIT_TYPE, damage: float }
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
  baseStats: STATS
}
CHARACTER_PAWN := {
  location: BOARD_COORDINATE,
  front: DIRECTION,
  currentStats: STATS
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

// TODO: Create update_map_info event and
// TODO: Specify map updates
MAP_UPDATE := { type: MAP_UPDATE_TYPE, ...}
MAP_UPDATE_TYPE := ...

// TODO: Where should initial items and skill go?
```
