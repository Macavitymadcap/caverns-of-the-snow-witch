# Caverns of the Snow Witch - Game Mechanics Implementation Guide

## Table of Contents

1. [Core Data Structures](#core-data-structures)
2. [Character Management](#character-management)
3. [Combat System](#combat-system)
4. [Testing System (Luck, Skill, Dice)](#testing-system)
5. [Inventory and Equipment](#inventory-and-equipment)
6. [Node Navigation](#node-navigation)
7. [Special Mechanics](#special-mechanics)
8. [Save/Load System](#saveload-system)
9. [Game State Management](#game-state-management)

---

## Core Data Structures

### Character Statistics

```typescript
/**
 * Core character attributes following Fighting Fantasy rules
 */
interface CharacterStats {
  skill: number;          // Current SKILL score
  stamina: number;        // Current STAMINA score
  luck: number;           // Current LUCK score
  initialSkill: number;   // Starting SKILL (max cap)
  initialStamina: number; // Starting STAMINA (max cap)
  initialLuck: number;    // Starting LUCK (max cap)
}

/**
 * Initialize character stats using Fighting Fantasy dice rules
 * SKILL = 1d6 + 6 (range: 7-12)
 * STAMINA = 2d6 + 12 (range: 14-24)
 * LUCK = 1d6 + 6 (range: 7-12)
 */
function rollCharacterStats(): CharacterStats {
  const rollDie = () => Math.floor(Math.random() * 6) + 1;
  const roll2d6 = () => rollDie() + rollDie();
  
  const skill = rollDie() + 6;
  const stamina = roll2d6() + 12;
  const luck = rollDie() + 6;
  
  return {
    skill,
    stamina,
    luck,
    initialSkill: skill,
    initialStamina: stamina,
    initialLuck: luck
  };
}

/**
 * Modify character stat with bounds checking
 * Stats cannot exceed initial values (except when specifically instructed)
 */
function modifyStat(
  stats: CharacterStats,
  stat: 'skill' | 'stamina' | 'luck',
  change: number,
  allowExceedInitial: boolean = false
): CharacterStats {
  const newStats = { ...stats };
  const currentValue = newStats[stat];
  const initialValue = newStats[`initial${stat.charAt(0).toUpperCase() + stat.slice(1)}` as keyof CharacterStats] as number;
  
  newStats[stat] = currentValue + change;
  
  // Enforce minimum of 0
  if (newStats[stat] < 0) {
    newStats[stat] = 0;
  }
  
  // Enforce maximum (initial value) unless explicitly allowed
  if (!allowExceedInitial && newStats[stat] > initialValue) {
    newStats[stat] = initialValue;
  }
  
  return newStats;
}
```

### Potion Types

```typescript
/**
 * Three starting potion choices
 */
enum PotionType {
  SKILL = 'skill',      // Restores SKILL to initial
  STRENGTH = 'strength', // Restores STAMINA to initial
  FORTUNE = 'fortune'    // Restores LUCK to initial +1, increases initial LUCK
}

interface Potion {
  type: PotionType;
  used: boolean;
}

/**
 * Use potion to restore stat to initial value
 * Fortune potion permanently increases initial LUCK by 1
 */
function usePotion(stats: CharacterStats, potion: Potion): CharacterStats {
  if (potion.used) {
    throw new Error('Potion already used');
  }
  
  const newStats = { ...stats };
  
  switch (potion.type) {
    case PotionType.SKILL:
      newStats.skill = newStats.initialSkill;
      break;
      
    case PotionType.STRENGTH:
      newStats.stamina = newStats.initialStamina;
      break;
      
    case PotionType.FORTUNE:
      newStats.initialLuck += 1;
      newStats.luck = newStats.initialLuck;
      break;
  }
  
  potion.used = true;
  return newStats;
}
```

### Provisions System

```typescript
/**
 * Provisions restore 4 STAMINA when consumed
 * Cannot be used during combat
 */
interface ProvisionsState {
  remaining: number; // Start with 10
  maxCapacity: number; // Usually 10
}

function eatProvisions(
  stats: CharacterStats,
  provisions: ProvisionsState,
  inCombat: boolean
): { stats: CharacterStats; provisions: ProvisionsState } {
  if (inCombat) {
    throw new Error('Cannot eat provisions during combat');
  }
  
  if (provisions.remaining <= 0) {
    throw new Error('No provisions remaining');
  }
  
  const newStats = modifyStat(stats, 'stamina', 4);
  const newProvisions = {
    ...provisions,
    remaining: provisions.remaining - 1
  };
  
  return { stats: newStats, provisions: newProvisions };
}
```

---

## Character Management

### Complete Player State

```typescript
/**
 * Complete player character state
 */
interface PlayerCharacter {
  stats: CharacterStats;
  provisions: ProvisionsState;
  potion: Potion;
  inventory: InventoryState;
  currentNode: number;
  visitedNodes: Set<number>;
  companions: CompanionState[];
  flags: GameFlags;
}

/**
 * Companion characters (Redswift and Stubb)
 */
interface CompanionState {
  name: string;
  type: 'elf' | 'dwarf';
  isAlive: boolean;
  isPresent: boolean; // With player or separated
  hasObedienceCollar: boolean;
}

/**
 * Game state flags for tracking story progression
 */
interface GameFlags {
  yetiFought: boolean;
  snowWitchDefeated: boolean;
  hasDeathSpell: boolean;
  deathSpellCured: boolean;
  metHealer: boolean;
  wearingMaskOfLife: boolean;
  freedSlaves: boolean;
  // Add more flags as needed for story progression
  [key: string]: boolean;
}

/**
 * Check if character is dead
 */
function isCharacterDead(stats: CharacterStats): boolean {
  return stats.stamina <= 0;
}

/**
 * Check if character can afford LUCK test
 */
function canTestLuck(stats: CharacterStats): boolean {
  return stats.luck > 0;
}
```

---

## Combat System

### Monster Data

```typescript
/**
 * Monster definition
 */
interface Monster {
  name: string;
  skill: number;
  stamina: number;
  initialStamina: number; // For tracking damage
  specialRules?: CombatModifier[];
}

/**
 * Special combat modifiers
 */
interface CombatModifier {
  type: 'attackStrength' | 'damage' | 'special';
  value: number;
  description: string;
  appliesTo: 'player' | 'monster' | 'both';
  condition?: (state: CombatState) => boolean;
}

/**
 * Examples of special combat rules from the game
 */
const COMBAT_MODIFIERS = {
  fightingInDark: {
    type: 'attackStrength' as const,
    value: -2,
    description: 'Fighting in darkness',
    appliesTo: 'player' as const
  },
  unarmedCombat: {
    type: 'attackStrength' as const,
    value: -3,
    description: 'Fighting without sword',
    appliesTo: 'player' as const
  },
  winded: {
    type: 'attackStrength' as const,
    value: -2,
    description: 'Winded from exertion',
    appliesTo: 'player' as const
  },
  iceDemonGas: {
    type: 'special' as const,
    value: 1,
    description: 'Freezing gas attack',
    appliesTo: 'player' as const
  }
};
```

### Combat State Management

```typescript
/**
 * Combat encounter state
 */
interface CombatState {
  monsters: Monster[];
  currentMonsterIndex: number;
  roundNumber: number;
  canEscape: boolean;
  escapeAfterRounds?: number; // Some combats allow escape after N rounds
  simultaneousCombat: boolean; // Fighting multiple enemies at once
  combatLog: CombatLogEntry[];
}

interface CombatLogEntry {
  round: number;
  actor: string;
  action: string;
  damage: number;
  playerStamina: number;
  monsterStamina: number;
}

/**
 * Combat round result
 */
interface CombatRoundResult {
  playerAttackStrength: number;
  monsterAttackStrength: number;
  winner: 'player' | 'monster' | 'draw';
  damage: number;
  logEntry: CombatLogEntry;
}

/**
 * Calculate attack strength
 */
function calculateAttackStrength(
  baseSkill: number,
  modifiers: CombatModifier[] = []
): number {
  const roll = Math.floor(Math.random() * 6) + 1 + Math.floor(Math.random() * 6) + 1; // 2d6
  let attackStrength = baseSkill + roll;
  
  // Apply modifiers
  for (const modifier of modifiers) {
    if (modifier.type === 'attackStrength') {
      attackStrength += modifier.value;
    }
  }
  
  return Math.max(0, attackStrength);
}

/**
 * Execute single combat round
 */
function executeCombatRound(
  playerStats: CharacterStats,
  monster: Monster,
  playerModifiers: CombatModifier[] = [],
  monsterModifiers: CombatModifier[] = [],
  roundNumber: number
): CombatRoundResult {
  const playerAttackStrength = calculateAttackStrength(playerStats.skill, playerModifiers);
  const monsterAttackStrength = calculateAttackStrength(monster.skill, monsterModifiers);
  
  let winner: 'player' | 'monster' | 'draw';
  let damage = 2; // Default damage in Fighting Fantasy
  
  if (playerAttackStrength > monsterAttackStrength) {
    winner = 'player';
  } else if (monsterAttackStrength > playerAttackStrength) {
    winner = 'monster';
  } else {
    winner = 'draw';
    damage = 0;
  }
  
  return {
    playerAttackStrength,
    monsterAttackStrength,
    winner,
    damage,
    logEntry: {
      round: roundNumber,
      actor: winner === 'player' ? 'Player' : monster.name,
      action: winner === 'draw' ? 'Both miss' : 'Hit',
      damage: winner === 'draw' ? 0 : damage,
      playerStamina: playerStats.stamina,
      monsterStamina: monster.stamina
    }
  };
}

/**
 * Apply combat damage
 */
function applyCombatDamage(
  result: CombatRoundResult,
  playerStats: CharacterStats,
  monster: Monster
): { playerStats: CharacterStats; monster: Monster } {
  let newPlayerStats = { ...playerStats };
  let newMonster = { ...monster };
  
  if (result.winner === 'player') {
    newMonster.stamina = Math.max(0, newMonster.stamina - result.damage);
  } else if (result.winner === 'monster') {
    newPlayerStats = modifyStat(newPlayerStats, 'stamina', -result.damage);
  }
  
  return { playerStats: newPlayerStats, monster: newMonster };
}
```

### Luck in Combat

```typescript
/**
 * Use luck to modify combat damage
 */
enum LuckInCombatType {
  INCREASE_DAMAGE = 'increase', // When you wound monster
  REDUCE_DAMAGE = 'reduce'      // When monster wounds you
}

interface LuckInCombatResult {
  wasLucky: boolean;
  newDamage: number;
  newLuck: number;
}

/**
 * Test luck to modify combat outcome
 * When lucky on offense: +2 damage (total 4)
 * When unlucky on offense: -1 damage (total 1)
 * When lucky on defense: -1 damage (total 1)
 * When unlucky on defense: +1 damage (total 3)
 */
function useLuckInCombat(
  currentLuck: number,
  type: LuckInCombatType,
  baseDamage: number = 2
): LuckInCombatResult {
  const testResult = testLuck(currentLuck);
  let newDamage = baseDamage;
  
  if (type === LuckInCombatType.INCREASE_DAMAGE) {
    newDamage = testResult.success ? baseDamage + 2 : baseDamage - 1;
  } else {
    newDamage = testResult.success ? baseDamage - 1 : baseDamage + 1;
  }
  
  return {
    wasLucky: testResult.success,
    newDamage: Math.max(0, newDamage),
    newLuck: testResult.newLuck
  };
}
```

### Simultaneous Combat

```typescript
/**
 * Handle fighting multiple opponents simultaneously
 * Player chooses one to attack, but both attack player
 */
interface SimultaneousCombatRound {
  targetMonsterIndex: number;
  results: CombatRoundResult[];
}

function executeSimultaneousCombatRound(
  playerStats: CharacterStats,
  monsters: Monster[],
  targetIndex: number,
  playerModifiers: CombatModifier[] = [],
  roundNumber: number
): SimultaneousCombatRound {
  const results: CombatRoundResult[] = [];
  
  for (let i = 0; i < monsters.length; i++) {
    const monster = monsters[i];
    
    if (i === targetIndex) {
      // Normal combat with chosen target
      results.push(executeCombatRound(
        playerStats,
        monster,
        playerModifiers,
        [],
        roundNumber
      ));
    } else {
      // Defensive only - player doesn't wound this monster
      const result = executeCombatRound(
        playerStats,
        monster,
        playerModifiers,
        [],
        roundNumber
      );
      
      // Override: player can't wound non-targeted monster
      if (result.winner === 'player') {
        result.winner = 'draw';
        result.damage = 0;
      }
      
      results.push(result);
    }
  }
  
  return {
    targetMonsterIndex: targetIndex,
    results
  };
}
```

### Escape from Combat

```typescript
/**
 * Attempt to escape from combat
 * Monster automatically deals 2 damage when escaping
 */
function escapeFromCombat(
  playerStats: CharacterStats,
  allowEscape: boolean,
  useLuckToReduce: boolean = false
): { success: boolean; playerStats: CharacterStats } {
  if (!allowEscape) {
    return {
      success: false,
      playerStats
    };
  }
  
  let damage = 2;
  let newStats = { ...playerStats };
  
  // Player can use luck to reduce escape damage
  if (useLuckToReduce && newStats.luck > 0) {
    const luckResult = useLuckInCombat(
      newStats.luck,
      LuckInCombatType.REDUCE_DAMAGE,
      damage
    );
    damage = luckResult.newDamage;
    newStats.luck = luckResult.newLuck;
  }
  
  newStats = modifyStat(newStats, 'stamina', -damage);
  
  return {
    success: true,
    playerStats: newStats
  };
}
```

---

## Testing System

### Test Your Luck

```typescript
/**
 * Test Your Luck result
 */
interface TestLuckResult {
  roll: number;
  requiredRoll: number;
  success: boolean;
  newLuck: number;
}

/**
 * Roll 2d6 against current LUCK
 * Success if roll ≤ current LUCK
 * Always reduces LUCK by 1
 */
function testLuck(currentLuck: number): TestLuckResult {
  const roll = Math.floor(Math.random() * 6) + 1 + Math.floor(Math.random() * 6) + 1;
  const success = roll <= currentLuck;
  const newLuck = Math.max(0, currentLuck - 1);
  
  return {
    roll,
    requiredRoll: currentLuck,
    success,
    newLuck
  };
}
```

### Test Your Skill

```typescript
/**
 * Test Your Skill result
 */
interface TestSkillResult {
  roll: number;
  requiredRoll: number;
  success: boolean;
  modifier?: number; // Some tests add modifiers (+2, etc.)
}

/**
 * Roll 2d6 against current SKILL
 * Success if roll ≤ current SKILL (+ any modifiers)
 * Does not reduce SKILL
 */
function testSkill(
  currentSkill: number,
  modifier: number = 0
): TestSkillResult {
  const roll = Math.floor(Math.random() * 6) + 1 + Math.floor(Math.random() * 6) + 1;
  const requiredRoll = currentSkill + modifier;
  const success = roll <= requiredRoll;
  
  return {
    roll,
    requiredRoll,
    success,
    modifier: modifier !== 0 ? modifier : undefined
  };
}
```

### Generic Dice Rolling

```typescript
/**
 * Generic dice roller for various game situations
 */
interface DiceRollResult {
  rolls: number[];
  total: number;
  modifier: number;
  finalTotal: number;
}

function rollDice(
  numDice: number,
  sides: number = 6,
  modifier: number = 0
): DiceRollResult {
  const rolls: number[] = [];
  
  for (let i = 0; i < numDice; i++) {
    rolls.push(Math.floor(Math.random() * sides) + 1);
  }
  
  const total = rolls.reduce((sum, roll) => sum + roll, 0);
  const finalTotal = total + modifier;
  
  return {
    rolls,
    total,
    modifier,
    finalTotal
  };
}

/**
 * Common dice roll scenarios
 */
function roll1d6(): number {
  return rollDice(1, 6).total;
}

function roll2d6(): number {
  return rollDice(2, 6).total;
}
```

### Outcome-Based Dice Rolls

```typescript
/**
 * Many nodes require dice rolls that map to different outcomes
 */
interface DiceOutcome<T> {
  minRoll: number;
  maxRoll: number;
  result: T;
}

/**
 * Roll dice and return outcome based on result
 */
function rollForOutcome<T>(
  outcomes: DiceOutcome<T>[],
  numDice: number = 1
): T {
  const roll = rollDice(numDice, 6).total;
  
  for (const outcome of outcomes) {
    if (roll >= outcome.minRoll && roll <= outcome.maxRoll) {
      return outcome.result;
    }
  }
  
  throw new Error(`No outcome defined for roll ${roll}`);
}

/**
 * Example: Node 313 - Summoned Warrior
 */
enum WarriorType {
  KNIGHT = 'knight',
  BARBARIAN = 'barbarian',
  DWARF = 'dwarf',
  ELF = 'elf',
  NINJA = 'ninja',
  AXEMAN = 'axeman'
}

interface SummonedWarrior {
  type: WarriorType;
  skill: number;
  stamina: number;
}

function summonWarrior(): SummonedWarrior {
  const outcomes: DiceOutcome<SummonedWarrior>[] = [
    { minRoll: 1, maxRoll: 1, result: { type: WarriorType.KNIGHT, skill: 9, stamina: 10 } },
    { minRoll: 2, maxRoll: 2, result: { type: WarriorType.BARBARIAN, skill: 9, stamina: 8 } },
    { minRoll: 3, maxRoll: 3, result: { type: WarriorType.DWARF, skill: 7, stamina: 6 } },
    { minRoll: 4, maxRoll: 4, result: { type: WarriorType.ELF, skill: 7, stamina: 5 } },
    { minRoll: 5, maxRoll: 5, result: { type: WarriorType.NINJA, skill: 6, stamina: 6 } },
    { minRoll: 6, maxRoll: 6, result: { type: WarriorType.AXEMAN, skill: 6, stamina: 7 } }
  ];
  
  return rollForOutcome(outcomes, 1);
}
```

---

## Inventory and Equipment

### Item System

```typescript
/**
 * Item categories
 */
enum ItemCategory {
  WEAPON = 'weapon',
  ARMOR = 'armor',
  MAGIC = 'magic',
  PUZZLE = 'puzzle',
  CONSUMABLE = 'consumable',
  TOOL = 'tool',
  QUEST = 'quest',
  MISCELLANEOUS = 'misc'
}

/**
 * Item effects
 */
interface ItemEffect {
  type: 'skill' | 'stamina' | 'luck' | 'special';
  value?: number;
  description: string;
  permanent: boolean;
  condition?: string; // e.g., "Only while wearing"
}

/**
 * Base item definition
 */
interface Item {
  id: string;
  name: string;
  category: ItemCategory;
  description: string;
  effects: ItemEffect[];
  isEquipped?: boolean;
  isConsumable?: boolean;
  usedUp?: boolean;
  foundAtNode?: number;
  requiredForNodes?: number[];
  criticalForVictory?: boolean;
}

/**
 * Example items from the game
 */
const ITEMS: Record<string, Item> = {
  warHammer: {
    id: 'war_hammer',
    name: 'War-hammer',
    category: ItemCategory.WEAPON,
    description: 'Heavy hammer required to defeat Crystal Warrior',
    effects: [],
    foundAtNode: 255,
    requiredForNodes: [59],
    criticalForVictory: false
  },
  
  swordOfSpeed: {
    id: 'sword_of_speed',
    name: 'Sword of Speed',
    category: ItemCategory.WEAPON,
    description: 'An almost weightless yet strong and sharp sword',
    effects: [
      { type: 'skill', value: 1, description: '+1 SKILL', permanent: false }
    ],
    foundAtNode: 88,
    criticalForVictory: false
  },
  
  goldRing: {
    id: 'gold_ring',
    name: 'Gold Ring',
    category: ItemCategory.MAGIC,
    description: 'Protects from freezing cold',
    effects: [
      { type: 'luck', value: 1, description: '+1 LUCK', permanent: true },
      { type: 'special', description: 'Protects from freezing cold', permanent: false, condition: 'Wearing ring' }
    ],
    foundAtNode: 12,
    requiredForNodes: [223],
    criticalForVictory: false
  },
  
  carvedRuneStick: {
    id: 'carved_rune_stick',
    name: 'Carved Rune Stick',
    category: ItemCategory.QUEST,
    description: 'Wooden stick with blue and yellow hoops, required to stake Snow Witch',
    effects: [],
    foundAtNode: 194,
    requiredForNodes: [7, 34],
    criticalForVictory: true
  },
  
  garlic: {
    id: 'garlic',
    name: 'Garlic',
    category: ItemCategory.CONSUMABLE,
    description: 'Weakens vampires',
    effects: [],
    isConsumable: true,
    foundAtNode: 200,
    requiredForNodes: [210, 297],
    criticalForVictory: true
  },
  
  squareDisc: {
    id: 'square_disc',
    name: 'Square Metal Disc',
    category: ItemCategory.PUZZLE,
    description: 'Required for Snow Witch\'s final game',
    effects: [],
    foundAtNode: 101,
    requiredForNodes: [113],
    criticalForVictory: true
  },
  
  circularDisc: {
    id: 'circular_disc',
    name: 'Circular Metal Disc',
    category: ItemCategory.PUZZLE,
    description: 'Required for Snow Witch\'s final game',
    effects: [],
    foundAtNode: 207,
    requiredForNodes: [113],
    criticalForVictory: true
  },
  
  starDisc: {
    id: 'star_disc',
    name: 'Star Metal Disc',
    category: ItemCategory.PUZZLE,
    description: 'Required for Snow Witch\'s final game',
    effects: [],
    foundAtNode: 141,
    requiredForNodes: [113],
    criticalForVictory: true
  },
  
  potionOfHealth: {
    id: 'potion_of_health',
    name: 'Potion of Health',
    category: ItemCategory.CONSUMABLE,
    description: 'Green liquid that restores health and boosts abilities',
    effects: [
      { type: 'skill', value: 1, description: '+1 SKILL', permanent: true },
      { type: 'stamina', value: 4, description: '+4 STAMINA', permanent: false },
      { type: 'luck', value: 1, description: '+1 LUCK', permanent: true }
    ],
    isConsumable: true,
    foundAtNode: 289,
    criticalForVictory: false
  }
};
```

### Inventory Management

```typescript
/**
 * Player inventory state
 */
interface InventoryState {
  items: Item[];
  equippedWeapon?: Item;
  equippedArmor?: Item;
  equippedAccessories: Item[];
  gold: number;
  maxItems?: number; // Some games have carrying capacity
}

/**
 * Add item to inventory
 */
function addItem(inventory: InventoryState, item: Item): InventoryState {
  // Check if item already exists (for stackable items)
  const existingItem = inventory.items.find(i => i.id === item.id);
  
  if (existingItem && !item.isConsumable) {
    return inventory; // Already have this item
  }
  
  return {
    ...inventory,
    items: [...inventory.items, item]
  };
}

/**
 * Remove item from inventory
 */
function removeItem(inventory: InventoryState, itemId: string): InventoryState {
  return {
    ...inventory,
    items: inventory.items.filter(i => i.id !== itemId)
  };
}

/**
 * Check if player has item
 */
function hasItem(inventory: InventoryState, itemId: string): boolean {
  return inventory.items.some(i => i.id === itemId && !i.usedUp);
}

/**
 * Use consumable item
 */
function useItem(
  inventory: InventoryState,
  stats: CharacterStats,
  itemId: string
): { inventory: InventoryState; stats: CharacterStats } {
  const item = inventory.items.find(i => i.id === itemId);
  
  if (!item) {
    throw new Error(`Item ${itemId} not found in inventory`);
  }
  
  if (!item.isConsumable) {
    throw new Error(`Item ${itemId} is not consumable`);
  }
  
  if (item.usedUp) {
    throw new Error(`Item ${itemId} already used`);
  }
  
  let newStats = { ...stats };
  
  // Apply item effects
  for (const effect of item.effects) {
    if (effect.type === 'skill') {
      newStats = modifyStat(newStats, 'skill', effect.value || 0, effect.permanent);
    } else if (effect.type === 'stamina') {
      newStats = modifyStat(newStats, 'stamina', effect.value || 0);
    } else if (effect.type === 'luck') {
      newStats = modifyStat(newStats, 'luck', effect.value || 0, effect.permanent);
    }
  }
  
  // Mark item as used
  const updatedItems = inventory.items.map(i =>
    i.id === itemId ? { ...i, usedUp: true } : i
  );
  
  return {
    inventory: { ...inventory, items: updatedItems },
    stats: newStats
  };
}

/**
 * Equip weapon or armor
 * Only one weapon can provide bonus at a time
 */
function equipItem(
  inventory: InventoryState,
  stats: CharacterStats,
  itemId: string
): { inventory: InventoryState; stats: CharacterStats } {
  const item = inventory.items.find(i => i.id === itemId);
  
  if (!item) {
    throw new Error(`Item ${itemId} not found`);
  }
  
  let newInventory = { ...inventory };
  let newStats = { ...stats };
  
  // Unequip previous item of same type
  if (item.category === ItemCategory.WEAPON && inventory.equippedWeapon) {
    const unequipResult = unequipItem(inventory, stats, inventory.equippedWeapon.id);
    newInventory = unequipResult.inventory;
    newStats = unequipResult.stats;
  }
  
  // Apply item effects
  for (const effect of item.effects) {
    if (!effect.permanent && effect.value) {
      if (effect.type === 'skill') {
        newStats = modifyStat(newStats, 'skill', effect.value, true); // Allow exceeding initial while equipped
      }
    }
  }
  
  // Mark item as equipped
  if (item.category === ItemCategory.WEAPON) {
    newInventory.equippedWeapon = { ...item, isEquipped: true };
  } else if (item.category === ItemCategory.ARMOR) {
    newInventory.equippedArmor = { ...item, isEquipped: true };
  } else {
    newInventory.equippedAccessories = [...newInventory.equippedAccessories, { ...item, isEquipped: true }];
  }
  
  return { inventory: newInventory, stats: newStats };
}

/**
 * Unequip item
 */
function unequipItem(
  inventory: InventoryState,
  stats: CharacterStats,
  itemId: string
): { inventory: InventoryState; stats: CharacterStats } {
  const item = inventory.items.find(i => i.id === itemId);
  
  if (!item) {
    throw new Error(`Item ${itemId} not found`);
  }
  
  let newInventory = { ...inventory };
  let newStats = { ...stats };
  
  // Remove item effects
  for (const effect of item.effects) {
    if (!effect.permanent && effect.value) {
      if (effect.type === 'skill') {
        newStats = modifyStat(newStats, 'skill', -effect.value);
      }
    }
  }
  
  // Unmark item as equipped
  if (item.category === ItemCategory.WEAPON) {
    newInventory.equippedWeapon = undefined;
  } else if (item.category === ItemCategory.ARMOR) {
    newInventory.equippedArmor = undefined;
  } else {
    newInventory.equippedAccessories = newInventory.equippedAccessories.filter(i => i.id !== itemId);
  }
  
  return { inventory: newInventory, stats: newStats };
}
```

### Gold and Carrying Capacity

```typescript
/**
 * Special rule from Node 171: For every 50 Gold Pieces, must drop 1 item
 */
function adjustInventoryForGold(inventory: InventoryState): {
  inventory: InventoryState;
  itemsToRemove: number;
} {
  const goldPieces = inventory.gold;
  const itemsToRemove = Math.floor(goldPieces / 50);
  
  return {
    inventory,
    itemsToRemove
  };
}

/**
 * Add gold to inventory
 */
function addGold(inventory: InventoryState, amount: number): InventoryState {
  return {
    ...inventory,
    gold: inventory.gold + amount
  };
}
```

---

## Node Navigation

### Node Structure

```typescript
/**
 * Node/paragraph in the gamebook
 */
interface GameNode {
  number: number;
  text: string;
  choices: NodeChoice[];
  autoTransition?: number; // Some nodes auto-transition
  events: NodeEvent[];
  requirements?: NodeRequirement[];
}

/**
 * Player choice at a node
 */
interface NodeChoice {
  text: string;
  targetNode: number;
  requirements?: NodeRequirement[];
  immediateEffects?: NodeEffect[];
}

/**
 * Requirements to access a choice or node
 */
interface NodeRequirement {
  type: 'item' | 'stat' | 'flag' | 'companion';
  itemId?: string;
  stat?: keyof CharacterStats;
  minValue?: number;
  maxValue?: number;
  flag?: string;
  flagValue?: boolean;
  companionName?: string;
}

/**
 * Events that occur at a node
 */
interface NodeEvent {
  type: 'combat' | 'test' | 'itemFound' | 'statChange' | 'storyFlag' | 'special';
  data: any;
  autoExecute: boolean;
}

/**
 * Effects that occur immediately
 */
interface NodeEffect {
  type: 'stat' | 'item' | 'flag';
  stat?: keyof CharacterStats;
  change?: number;
  itemId?: string;
  itemAction?: 'add' | 'remove';
  flag?: string;
  flagValue?: boolean;
}
```

### Node Navigation System

```typescript
/**
 * Check if player meets requirements for choice
 */
function meetsRequirements(
  player: PlayerCharacter,
  requirements: NodeRequirement[]
): boolean {
  for (const req of requirements) {
    switch (req.type) {
      case 'item':
        if (req.itemId && !hasItem(player.inventory, req.itemId)) {
          return false;
        }
        break;
        
      case 'stat':
        if (req.stat) {
          const statValue = player.stats[req.stat];
          if (req.minValue !== undefined && statValue < req.minValue) {
            return false;
          }
          if (req.maxValue !== undefined && statValue > req.maxValue) {
            return false;
          }
        }
        break;
        
      case 'flag':
        if (req.flag && player.flags[req.flag] !== req.flagValue) {
          return false;
        }
        break;
        
      case 'companion':
        if (req.companionName) {
          const companion = player.companions.find(c => c.name === req.companionName);
          if (!companion || !companion.isPresent || !companion.isAlive) {
            return false;
          }
        }
        break;
    }
  }
  
  return true;
}

/**
 * Get available choices at current node
 */
function getAvailableChoices(
  node: GameNode,
  player: PlayerCharacter
): NodeChoice[] {
  return node.choices.filter(choice =>
    !choice.requirements || meetsRequirements(player, choice.requirements)
  );
}

/**
 * Execute node events
 */
function executeNodeEvents(
  node: GameNode,
  player: PlayerCharacter
): PlayerCharacter {
  let updatedPlayer = { ...player };
  
  for (const event of node.events) {
    if (event.autoExecute) {
      switch (event.type) {
        case 'statChange':
          if (event.data.stat && event.data.change) {
            updatedPlayer.stats = modifyStat(
              updatedPlayer.stats,
              event.data.stat,
              event.data.change
            );
          }
          break;
          
        case 'itemFound':
          if (event.data.itemId) {
            const item = ITEMS[event.data.itemId];
            if (item) {
              updatedPlayer.inventory = addItem(updatedPlayer.inventory, item);
            }
          }
          break;
          
        case 'storyFlag':
          if (event.data.flag !== undefined) {
            updatedPlayer.flags[event.data.flag] = event.data.value;
          }
          break;
      }
    }
  }
  
  return updatedPlayer;
}

/**
 * Navigate to new node
 */
function navigateToNode(
  player: PlayerCharacter,
  targetNode: number,
  nodes: Map<number, GameNode>
): PlayerCharacter {
  const node = nodes.get(targetNode);
  
  if (!node) {
    throw new Error(`Node ${targetNode} not found`);
  }
  
  let updatedPlayer = {
    ...player,
    currentNode: targetNode,
    visitedNodes: new Set([...player.visitedNodes, targetNode])
  };
  
  // Execute auto-events at new node
  updatedPlayer = executeNodeEvents(node, updatedPlayer);
  
  return updatedPlayer;
}
```

---

## Special Mechanics

### Death Spell Progression

```typescript
/**
 * Death Spell state tracking
 */
interface DeathSpellState {
  infected: boolean;
  infectionNode: number;
  progressionLevel: number; // 0-10, increases over time
  nextDamageNode?: number;
  cureStarted: boolean;
  cured: boolean;
}

/**
 * Death Spell progression
 */
function progressDeathSpell(
  state: DeathSpellState,
  currentNode: number
): DeathSpellState {
  if (!state.infected || state.cured) {
    return state;
  }
  
  // Death Spell causes periodic STAMINA loss
  const newState = { ...state };
  
  // Specific nodes where Death Spell progresses
  const damageNodes = [30, 46, 119, 205, 269, 355, 364, 377, 385];
  
  if (damageNodes.includes(currentNode)) {
    newState.progressionLevel += 1;
  }
  
  return newState;
}

/**
 * Check if Death Spell kills player
 */
function checkDeathSpellFatal(
  stats: CharacterStats,
  deathSpell: DeathSpellState,
  currentNode: number
): boolean {
  // Node 302: Death Spell completes
  if (deathSpell.infected && !deathSpell.cured && currentNode === 302) {
    return true;
  }
  
  return false;
}
```

### Obedience Collar System

```typescript
/**
 * Obedience collar mechanics
 */
interface ObedienceCollar {
  active: boolean;
  canRemove: boolean; // Only after Snow Witch dies
}

function updateObedienceCollars(
  companions: CompanionState[],
  snowWitchDefeated: boolean
): CompanionState[] {
  if (!snowWitchDefeated) {
    return companions;
  }
  
  // Collars stop working when Snow Witch dies
  return companions.map(companion => ({
    ...companion,
    hasObedienceCollar: false
  }));
}
```

### Environmental Hazards

```typescript
/**
 * Special environmental damage
 */
interface EnvironmentalHazard {
  type: 'avalanche' | 'acid' | 'fire' | 'cold' | 'poison' | 'fall';
  baseDamage: number;
  canTestLuck?: boolean;
  canTestSkill?: boolean;
  protection?: string[]; // Item IDs that protect
}

/**
 * Apply environmental damage
 */
function applyEnvironmentalDamage(
  stats: CharacterStats,
  inventory: InventoryState,
  hazard: EnvironmentalHazard
): CharacterStats {
  // Check for protective items
  if (hazard.protection) {
    for (const protectionId of hazard.protection) {
      if (hasItem(inventory, protectionId)) {
        return stats; // Protected
      }
    }
  }
  
  // Apply damage
  return modifyStat(stats, 'stamina', -hazard.baseDamage);
}
```

---

## Save/Load System

### Save Game State

```typescript
/**
 * Complete save game state
 */
interface SaveGame {
  version: string;
  timestamp: number;
  player: PlayerCharacter;
  gameProgress: GameProgress;
}

interface GameProgress {
  startTime: number;
  totalPlayTime: number;
  deathCount: number;
  nodesVisited: number;
  combatsWon: number;
  combatsLost: number;
}

/**
 * Serialize game state to JSON
 */
function saveGame(player: PlayerCharacter, progress: GameProgress): string {
  const saveData: SaveGame = {
    version: '1.0.0',
    timestamp: Date.now(),
    player: {
      ...player,
      visitedNodes: Array.from(player.visitedNodes) as any // Convert Set to Array
    },
    gameProgress: progress
  };
  
  return JSON.stringify(saveData);
}

/**
 * Deserialize game state from JSON
 */
function loadGame(saveData: string): SaveGame {
  const data = JSON.parse(saveData) as SaveGame;
  
  // Convert Array back to Set
  data.player.visitedNodes = new Set(data.player.visitedNodes as any);
  
  return data;
}

/**
 * Auto-save at each node
 */
function autoSave(player: PlayerCharacter, progress: GameProgress): void {
  const saveData = saveGame(player, progress);
  
  // Save to localStorage or database
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem('caverns_autosave', saveData);
  }
}

/**
 * Load auto-save
 */
function loadAutoSave(): SaveGame | null {
  if (typeof localStorage !== 'undefined') {
    const saveData = localStorage.getItem('caverns_autosave');
    if (saveData) {
      return loadGame(saveData);
    }
  }
  
  return null;
}
```

---

## Game State Management

### Complete Game Engine

```typescript
/**
 * Main game state manager
 */
class CavernsGameEngine {
  private player: PlayerCharacter;
  private nodes: Map<number, GameNode>;
  private progress: GameProgress;
  private combatState?: CombatState;
  
  constructor(nodes: Map<number, GameNode>) {
    this.nodes = nodes;
    this.player = this.initializePlayer();
    this.progress = {
      startTime: Date.now(),
      totalPlayTime: 0,
      deathCount: 0,
      nodesVisited: 0,
      combatsWon: 0,
      combatsLost: 0
    };
  }
  
  private initializePlayer(): PlayerCharacter {
    const stats = rollCharacterStats();
    
    return {
      stats,
      provisions: {
        remaining: 10,
        maxCapacity: 10
      },
      potion: {
        type: PotionType.STRENGTH, // Player chooses this
        used: false
      },
      inventory: {
        items: [],
        gold: 0,
        equippedAccessories: []
      },
      currentNode: 1,
      visitedNodes: new Set([1]),
      companions: [],
      flags: {
        yetiFought: false,
        snowWitchDefeated: false,
        hasDeathSpell: false,
        deathSpellCured: false,
        metHealer: false,
        wearingMaskOfLife: false,
        freedSlaves: false
      }
    };
  }
  
  /**
   * Get current node data
   */
  getCurrentNode(): GameNode {
    const node = this.nodes.get(this.player.currentNode);
    if (!node) {
      throw new Error(`Current node ${this.player.currentNode} not found`);
    }
    return node;
  }
  
  /**
   * Get available choices at current node
   */
  getAvailableChoices(): NodeChoice[] {
    const node = this.getCurrentNode();
    return getAvailableChoices(node, this.player);
  }
  
  /**
   * Make a choice and navigate
   */
  makeChoice(choiceIndex: number): void {
    const choices = this.getAvailableChoices();
    const choice = choices[choiceIndex];
    
    if (!choice) {
      throw new Error(`Invalid choice index ${choiceIndex}`);
    }
    
    // Apply immediate effects
    if (choice.immediateEffects) {
      for (const effect of choice.immediateEffects) {
        this.applyEffect(effect);
      }
    }
    
    // Navigate to target node
    this.player = navigateToNode(this.player, choice.targetNode, this.nodes);
    this.progress.nodesVisited++;
    
    // Auto-save
    autoSave(this.player, this.progress);
  }
  
  /**
   * Apply an effect to player
   */
  private applyEffect(effect: NodeEffect): void {
    switch (effect.type) {
      case 'stat':
        if (effect.stat && effect.change) {
          this.player.stats = modifyStat(
            this.player.stats,
            effect.stat as 'skill' | 'stamina' | 'luck',
            effect.change
          );
        }
        break;
        
      case 'item':
        if (effect.itemId && effect.itemAction === 'add') {
          const item = ITEMS[effect.itemId];
          if (item) {
            this.player.inventory = addItem(this.player.inventory, item);
          }
        } else if (effect.itemId && effect.itemAction === 'remove') {
          this.player.inventory = removeItem(this.player.inventory, effect.itemId);
        }
        break;
        
      case 'flag':
        if (effect.flag !== undefined && effect.flagValue !== undefined) {
          this.player.flags[effect.flag] = effect.flagValue;
        }
        break;
    }
  }
  
  /**
   * Start combat encounter
   */
  startCombat(monsters: Monster[], canEscape: boolean = false): void {
    this.combatState = {
      monsters,
      currentMonsterIndex: 0,
      roundNumber: 1,
      canEscape,
      simultaneousCombat: monsters.length > 1,
      combatLog: []
    };
  }
  
  /**
   * Execute combat round
   */
  executeCombatRound(targetMonsterIndex?: number): CombatRoundResult | SimultaneousCombatRound {
    if (!this.combatState) {
      throw new Error('No active combat');
    }
    
    if (this.combatState.simultaneousCombat) {
      if (targetMonsterIndex === undefined) {
        throw new Error('Must specify target for simultaneous combat');
      }
      
      const result = executeSimultaneousCombatRound(
        this.player.stats,
        this.combatState.monsters,
        targetMonsterIndex,
        [],
        this.combatState.roundNumber
      );
      
      // Apply damage
      for (let i = 0; i < result.results.length; i++) {
        const roundResult = result.results[i];
        const damageResult = applyCombatDamage(
          roundResult,
          this.player.stats,
          this.combatState.monsters[i]
        );
        
        this.player.stats = damageResult.playerStats;
        this.combatState.monsters[i] = damageResult.monster;
      }
      
      this.combatState.roundNumber++;
      return result;
      
    } else {
      const monster = this.combatState.monsters[this.combatState.currentMonsterIndex];
      const result = executeCombatRound(
        this.player.stats,
        monster,
        [],
        [],
        this.combatState.roundNumber
      );
      
      // Apply damage
      const damageResult = applyCombatDamage(result, this.player.stats, monster);
      this.player.stats = damageResult.playerStats;
      this.combatState.monsters[this.combatState.currentMonsterIndex] = damageResult.monster;
      
      this.combatState.roundNumber++;
      this.combatState.combatLog.push(result.logEntry);
      
      return result;
    }
  }
  
  /**
   * Check if combat is over
   */
  isCombatOver(): { over: boolean; playerWon?: boolean } {
    if (!this.combatState) {
      return { over: true };
    }
    
    // Check if player is dead
    if (isCharacterDead(this.player.stats)) {
      this.progress.combatsLost++;
      this.progress.deathCount++;
      return { over: true, playerWon: false };
    }
    
    // Check if all monsters are dead
    const allMonstersDead = this.combatState.monsters.every(m => m.stamina <= 0);
    if (allMonstersDead) {
      this.progress.combatsWon++;
      this.combatState = undefined;
      return { over: true, playerWon: true };
    }
    
    return { over: false };
  }
  
  /**
   * Attempt to escape combat
   */
  escapeCombat(): boolean {
    if (!this.combatState) {
      return false;
    }
    
    const result = escapeFromCombat(this.player.stats, this.combatState.canEscape);
    
    if (result.success) {
      this.player.stats = result.playerStats;
      this.combatState = undefined;
    }
    
    return result.success;
  }
  
  /**
   * Use provisions
   */
  eatProvisions(): void {
    const result = eatProvisions(
      this.player.stats,
      this.player.provisions,
      !!this.combatState
    );
    
    this.player.stats = result.stats;
    this.player.provisions = result.provisions;
  }
  
  /**
   * Use potion
   */
  usePotion(): void {
    this.player.stats = usePotion(this.player.stats, this.player.potion);
  }
  
  /**
   * Test luck
   */
  testLuck(): TestLuckResult {
    const result = testLuck(this.player.stats.luck);
    this.player.stats.luck = result.newLuck;
    return result;
  }
  
  /**
   * Test skill
   */
  testSkill(modifier: number = 0): TestSkillResult {
    return testSkill(this.player.stats.skill, modifier);
  }
  
  /**
   * Get game state snapshot
   */
  getGameState(): {
    player: PlayerCharacter;
    currentNode: GameNode;
    combat?: CombatState;
    progress: GameProgress;
  } {
    return {
      player: { ...this.player },
      currentNode: this.getCurrentNode(),
      combat: this.combatState ? { ...this.combatState } : undefined,
      progress: { ...this.progress }
    };
  }
  
  /**
   * Save game
   */
  save(): string {
    return saveGame(this.player, this.progress);
  }
  
  /**
   * Load game
   */
  load(saveData: string): void {
    const loaded = loadGame(saveData);
    this.player = loaded.player;
    this.progress = loaded.gameProgress;
  }
}
```

### Usage Example

```typescript
/**
 * Example game flow
 */
function exampleGameFlow() {
  // Initialize game
  const nodes = new Map<number, GameNode>(); // Load nodes from data
  const game = new CavernsGameEngine(nodes);
  
  // Get current state
  const state = game.getGameState();
  console.log(`Current node: ${state.currentNode.number}`);
  console.log(`Player SKILL: ${state.player.stats.skill}`);
  console.log(`Player STAMINA: ${state.player.stats.stamina}`);
  console.log(`Player LUCK: ${state.player.stats.luck}`);
  
  // Show available choices
  const choices = game.getAvailableChoices();
  choices.forEach((choice, index) => {
    console.log(`${index + 1}. ${choice.text}`);
  });
  
  // Make a choice
  game.makeChoice(0); // Choose first option
  
  // Example combat
  const yeti: Monster = {
    name: 'Yeti',
    skill: 11,
    stamina: 12,
    initialStamina: 12
  };
  
  game.startCombat([yeti], false);
  
  // Combat loop
  while (!game.isCombatOver().over) {
    const result = game.executeCombatRound() as CombatRoundResult;
    console.log(`Round ${result.logEntry.round}`);
    console.log(`Player: ${result.playerAttackStrength} vs Monster: ${result.monsterAttackStrength}`);
    console.log(`Winner: ${result.winner}`);
    
    // Check if player is dead
    if (game.isCombatOver().over) {
      console.log('Combat ended!');
      console.log(`Player won: ${game.isCombatOver().playerWon}`);
      break;
    }
  }
  
  // Use provisions if needed
  if (state.player.stats.stamina < 10) {
    game.eatProvisions();
  }
  
  // Save game
  const saveData = game.save();
  localStorage.setItem('my_save', saveData);
  
  // Load game later
  const loadedData = localStorage.getItem('my_save');
  if (loadedData) {
    game.load(loadedData);
  }
}
```

---

## Summary of Core Mechanics

### Essential Systems to Implement

1. **Character Stats System**
   - SKILL, STAMINA, LUCK with initial/current values
   - Stat modification with bounds checking
   - Death detection

2. **Combat System**
   - Attack strength calculation (2d6 + SKILL)
   - Damage application (2 points default)
   - Simultaneous combat for multiple opponents
   - Luck usage in combat (damage modification)
   - Escape mechanics

3. **Testing System**
   - Test Your Luck (2d6 ≤ LUCK, reduces LUCK by 1)
   - Test Your Skill (2d6 ≤ SKILL, no stat reduction)
   - Generic dice rolling for various outcomes

4. **Inventory System**
   - Item management (add/remove/has)
   - Equipment effects (stat bonuses)
   - Consumable items
   - Gold tracking
   - Carrying capacity

5. **Node Navigation**
   - Node structure with choices
   - Requirement checking
   - Event execution
   - Auto-transitions

6. **Special Mechanics**
   - Death Spell progression
   - Obedience collars
   - Companion management
   - Environmental hazards

7. **Save/Load System**
   - State serialization
   - Auto-save functionality
   - Progress tracking

### Key Implementation Notes

- **Always enforce bounds**: Stats cannot exceed initial values (except when specified)
- **Combat is deterministic**: Same rolls will produce same results
- **Luck is consumable**: Each test reduces LUCK by 1
- **Death is permanent**: STAMINA ≤ 0 ends the game
- **Items have conditions**: Some require specific situations or stats
- **Story flags track progress**: Essential for multi-stage quests
- **Save often**: Fighting Fantasy is designed for trial-and-error

This implementation provides a complete framework for building a digital version of "Caverns of the Snow Witch" that faithfully reproduces the Fighting Fantasy game mechanics.
