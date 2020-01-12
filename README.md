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
1 try_move { targetLocation: BOARD_COORDINATE }
1 try_attack { targetId: int }
1 try_leave EMPTY_PAYLOAD
```

# Server emitted messages

```js
1 goto { where: MAP }
1 map_info { characters: [CHARACTER] }
1|* move { characterId: int, path: [BOARD_COORDINATE] }
* attack { aggressorId: int, targetId: int, type: HIT_TYPE, damage: float }
* leave { characterId: int }
```

# Type definitions

```js
EMPTY_PAYLOAD := "" or null or {} // be consistent
MAP := "arena" | "menu"
DIRECTION := "N" | "E" | "S" | "W"
BOARD_COORDINATE := { x: int, y: int }
CHARACTER := {
  pawn: CHARACTER_PAWN,
  baseStats: STATS,
  name: string,
  color: int,
  id: int
}
CHARACTER_PAWN := {
  location: BOARD_COORDINATE,
  front: DIRECTION,
  currentStats: STATS
}
STATS := {
  health: float,
  damage: float,
  movementRadius: int,
  range: [BOARD_COORDINATE],
  evasionRate:  float[0, 1],
  criticalRate: float[0, 1],
  criticalMultiplier: float,
}
HIT_TYPE := "regular" | "miss" | "critical"
```
