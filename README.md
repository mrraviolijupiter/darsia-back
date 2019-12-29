# Darsia

Darsia is an mmorpg striped down to its core mechanics for midcore to casual
mobile players with a battle system heavily inspired in games like final fantasy
tactics.

# Arena movement protocol

The idea is to have an initial protocol for moving around in the arena map, such
that we test out the front-back communication

*Note: `1` is a 1 to 1 message while ` * ` is a room broadcast*

# Client emitted messages

| Event | Payload |
| - | - |
| `request_map_info` 1 | `EMPTY_PAYLOAD` |
| `try_move` 1 | `{ targetLocation: BOARD_COORDINATE }` |
| `try_attack` 1 | `{ targetId: int }` |
| `try_leave` 1 | `EMPTY_PAYLOAD ` |

# Server emitted messages

| Event | Payload |
| - | - |
| `goto` 1 | `{ where: MAP }` |`
| `map_info` 1 | `{ characters: [CHARACTER] }` |`
| `move` 1 / * | `{ characterId: int, path: [BOARD_COORDINATE] }` |`
| `attack` * | `{ aggressorId: int, targetId: int, type: HIT_TYPE, damage: float }` |`
| `leave` * | `{ characterId: int }` |`

# Type definitions
- `MAP := "arena" | "menu"`
- `EMPTY_PAYLOAD := "" or null or {}` *(be consistent)*
- `DIRECTION := "N" | "E" | "S" | "W"`
- `BOARD_COORDINATE := { x: int, y: int }`
- `CHARACTER := { pawn: CHARACTER_PAWN, baseStats: STATS, color: int, id: int }`
- `CHARACTER_PAWN :=
  { location: BOARD_COORDINATE, front: DIRECTION, currentStats: STATS }`
- ```js
  STATS := {
    health: float,
    damage: float,
    movementRadius: int,
    range: [BOARD_COORDINATE],
    evasionRate:  float[0, 1],
    criticalRate: float[0, 1],
    criticalMultiplier: float,
  }
  ```
- `HIT_TYPE := "hit" | "miss" | "critical"`
