# Caverns of the Snow Witch - Game Analysis

## Overview Statistics

**Total Nodes:** 400
**Analysis Date:** Based on complete game documentation

---

## Node Type Distribution

### Combat Nodes
**Total Combat Encounters:** 45

**Combat Frequency:** 11.25% of all nodes contain combat encounters

**Combat Nodes by Type:**
- Single opponent: 28 encounters (62.2%)
- Two opponents (simultaneous): 6 encounters (13.3%)
- Two opponents (sequential): 3 encounters (6.7%)
- Special combat (modified rules): 8 encounters (17.8%)

### Test Nodes Distribution

| Test Type | Count | Percentage |
|-----------|-------|------------|
| Test Your Luck | 33 | 8.25% |
| Skill Test (2d6 vs SKILL) | 15 | 3.75% |
| Single Die Roll (outcomes) | 13 | 3.25% |
| STAMINA Check | 2 | 0.5% |
| Special Tests | 5 | 1.25% |

**Total Nodes with Tests:** 68 (17% of all nodes)

---

## Combat Encounters

### Complete Monster List with Statistics

| Monster | SKILL | STAMINA | Node(s) | Special Rules |
|---------|-------|---------|---------|---------------|
| **Air Elemental** | - | - | 66, 183 | Triggered by taking shield; can be stopped with spell |
| **Asp** | - | - | 73, 196 | Poison attack: -4 STAMINA, -1 SKILL |
| **Banshee** | 12 | 12 | 185 | Before each round: 2d6 vs SKILL or paralyzed |
| **Barbarian** | 9 | 8 | 374 | Standard combat |
| **Bird-Man** | 12 | 8 | 256, 369 | First attack may cause -2 STAMINA before combat |
| **Brain Slayer** | 10 | 10 | 189, 126 | Hypnotic power; releases Redswift and Stubb |
| **Cave-Man** | 8 | 8 | 20 | Can escape after 2 rounds |
| **Centaur** | 10 | 10 | 272 | Leader has spear, shield, helmet |
| **Crystal Warrior** | 11 | 13 | 59 | Immune to edged weapons; needs war-hammer |
| **Dark Elf** | - | - | 26, 289 | Bow attacks with Test Your Luck |
| **Death Hawk** | 4 | 5 | 238, 85 | Combat ends after 2 rounds if you survive |
| **Dwarf Zombie** | 8 | 9 | 262 | Fight both zombies simultaneously |
| **Elf Zombie** | 9 | 9 | 262 | Fight both zombies simultaneously |
| **Frost Giant** | 10 | 10 | 93, 292, 357 | May throw chest; can escape after 2 rounds |
| **Goblin** | 5 | 4-6 | 39, 145, 188, 240, 332, 386 | Often unarmed combat (-3 Attack Strength) |
| **Hill Troll** | 8-9 | 9-10 | 13, 296 | Usually fought in pairs simultaneously |
| **Hobgoblin** | 6 | 7 | 206 | Standard combat |
| **Ice Demon** | 9 | 11 | 108, 143 | Gas attack each round: 1d6, hit on 1-3 (-1 STAMINA) |
| **Illusionist** | Varies | Varies | 156 | Three images; must find real one |
| **Mammoth** | 10 | 11 | 310 | Standard combat |
| **Man-Orc** | 8 | 6 | 398 | Standard combat |
| **Mountain Elf** | 6 | 6-12 | 17, 305, 351, 382 | May surrender at 2 STAMINA (node 17) |
| **Neanderthal** | 7 | 8 | 187 | Standard combat |
| **Night Stalker** | 11 | 8 | 37 | Reduce Attack Strength by 2 (fighting in dark) |
| **Sentinel (Golden)** | 9 | 9 | 235 | Guardian of treasure |
| **Snow Wolf** | 7-8 | 7 | 212 | Two wolves fought sequentially |
| **Summoned Warrior** | 6-9 | 5-10 | 313 | Roll 1d6 for type: Knight/Barbarian/Dwarf/Elf/Ninja/Axeman |
| **Werewolf** | 8 | 10 | 251 | Standard combat |
| **White Dragon** | 12 | 14 | 223, 313 | Breath weapon: 1d6, damage on 1-2 unless wearing gold ring |
| **Wild Hill Man** | 6 | 5 | 50 | Can escape after 2 rounds |
| **Yeti** | 10-11 | 9-12 | 190, 195, 219, 378 | Various nodes with different starting conditions |
| **Zombie** | 6 | 6 | 62 | Can escape after 2 rounds |

### Combat Statistics

**Difficulty Distribution (by SKILL):**
- Easy (SKILL 4-6): 12 encounters (26.7%)
- Medium (SKILL 7-9): 19 encounters (42.2%)
- Hard (SKILL 10-12): 14 encounters (31.1%)

**Most Common Opponents:**
1. Goblins - 8 encounters
2. Hill Trolls - 3 encounters
3. Frost Giants - 3 encounters
4. Mountain Elves - 4 encounters
5. Yeti - 4 encounters

**Special Combat Mechanics:**
- Simultaneous combat (2 opponents): 6 encounters
- Modified Attack Strength: 8 encounters
- Conditional damage (breath weapons, gas): 4 encounters
- Escape options: 8 encounters
- Surrender conditions: 2 encounters

---

## Items and Equipment

### Weapons and Combat Equipment

| Item | Effect | Found At | Required For | Criticality |
|------|--------|----------|--------------|-------------|
| **War-hammer** | Required to defeat Crystal Warrior | Node 255 | Node 59 (Crystal Warrior) | CRITICAL |
| **Sword of Speed** | +1 SKILL | Nodes 88, 237 | General combat | HIGH |
| **Magnificent Sword** | +1 SKILL | Node 164 | General combat | MEDIUM |
| **Spear** | Combat weapon; can throw at Yeti | Nodes 88, 255 | Node 249 (Yeti throw) | MEDIUM |
| **Spear of Terror** | -1 SKILL (cursed) | Node 250 | None | AVOID |
| **Daggers** | Can be thrown | Nodes 43, 347, 366 | Node 49 (door mechanism) | HIGH |
| **Shield** | +1 SKILL | Node 298 | Node 230 (acid protection) | MEDIUM |
| **Sling + Iron Balls** | Ranged attack | Node 376 | Nodes 216, 282, 352, 373 | MEDIUM |
| **Copper Armband** | +1 SKILL (engraved "Strength is Power") | Node 286 | None | MEDIUM |
| **Horned Helmet** | +1 SKILL | Node 362 (Centaur leader) | None | MEDIUM |

### Magic Items and Rings

| Item | Effect | Found At | Required For | Criticality |
|------|--------|----------|--------------|-------------|
| **Gold Ring** | +1 LUCK, protects from freezing cold | Nodes 12, 45, 182 | Node 223 (White Dragon breath) | CRITICAL |
| **Silver Ring** | Cursed: lose SKILL and STAMINA | Nodes 12, 45, 182 | None | AVOID |
| **Copper Ring** | +1 LUCK, summons warrior once | Nodes 12, 45, 182 | Node 313 (White Dragon fight) | HIGH |
| **Carved Rune Stick** | Required to kill Snow Witch (Vampire) | Node 194 | Nodes 7, 34 (Snow Witch) | CRITICAL |
| **Magic Flute** | Plays tune automatically; tricks followers | Node 74 | Nodes 31, 299 (bypass guards) | HIGH |
| **Amulet of Courage (Jade Frog)** | +2 SKILL | Node 97 | Node 189 (Brain Slayer) | HIGH |
| **Elfin Boots** | Silent movement | Node 259 | Nodes 128, 374 (stealth) | MEDIUM |
| **Silver Flute** | Musical instrument | Node 194 | None | LOW |
| **Old Withered Rose** | +3 STAMINA when smelled | Node 194 | None | MEDIUM |

### Puzzle Items (Metal Discs)

| Item | Effect | Found At | Required For | Criticality |
|------|--------|----------|--------------|-------------|
| **Square Metal Disc** | Required for final game | Node 101 | Node 113 (Snow Witch's game) | CRITICAL |
| **Circular Metal Disc** | Required for final game | Node 207 | Node 113 (Snow Witch's game) | CRITICAL |
| **Star Metal Disc** | Required for final game | Node 141 | Node 113 (Snow Witch's game) | CRITICAL |

### Potions and Consumables

| Item | Effect | Found At | Required For | Criticality |
|------|--------|----------|--------------|-------------|
| **Potion of Health (Green)** | +1 SKILL, +4 STAMINA, +1 LUCK | Node 289 | Node 30 (Death Spell survival) | HIGH |
| **Yellow Potion** | +3 STAMINA, cures frostbite | Node 24 | Frostbite recovery | MEDIUM |
| **Ground Minotaur Horn** | Stops metamorphosis spell | Node 200 | Node 52 (White Rat) | HIGH |
| **Garlic** | Weakens Vampire | Node 200 | Nodes 210, 297 (Snow Witch) | CRITICAL |
| **Dragon Eggs** | Used by Healer for concoction | Node 200 | Node 359 (Healer's ritual) | MEDIUM |
| **Salted Fish** | Food | Nodes 43, 347, 366 | None | LOW |
| **Provisions** | +STAMINA when resting | Starting equipment | Various rest nodes | MEDIUM |
| **Warm Stew** | +3 STAMINA | Node 118 | None | LOW |

### Key Items and Tools

| Item | Effect | Found At | Required For | Criticality |
|------|--------|----------|--------------|-------------|
| **Iron Key** | Opens locked door | Node 247 (inside loaf) | Node 165 (iron door) | MEDIUM |
| **Candle + Tinder-box** | Light source | Nodes 43, 342, 347, 366 | Node 54 (cross pit) | HIGH |
| **Silver Object** | Summons Pegasus | Various | Node 328 (Healer's ritual) | CRITICAL |
| **Mask of Life** | Halts Death Spell | Node 75 (given by Healer) | Endgame ritual | CRITICAL |
| **Air Elemental Scroll** | Protection spell "Gul Sang Abi Daar" | Node 344 | Node 183 (shield trap) | HIGH |
| **Book "Secrets of Toads"** | Contains jade frog talisman | Node 194 | None | MEDIUM |

### Miscellaneous Items

| Item | Effect | Found At | Required For | Criticality |
|------|--------|----------|--------------|-------------|
| **Perfume Bottle** | No effect (cracked) | Nodes 12, 45, 182 | None | LOW |
| **Gold Pieces** | Currency | Nodes 43, 171, 347, 366 | Various purchases | MEDIUM |
| **Obedience Collar** | Enslaves wearer | Various slaves | None | AVOID |
| **Three Silver Arrowheads** | Projectiles | Node 286 | None | LOW |
| **Stuffed Rat** | No use | Node 354 | None | LOW |
| **Box of Teeth** | Ingredient | Node 200 | None | LOW |
| **Pickled Lizards' Tails** | Ingredient | Node 200 | None | LOW |

---

## Critical Path Items

### Essential for Completing the Game

1. **Carved Rune Stick** (Node 194) - Required to kill Snow Witch in vampire form
2. **Garlic** (Node 200) - Required to weaken Snow Witch before staking
3. **Three Metal Discs** (Nodes 101, 141, 207) - Required for final game with Snow Witch
4. **Mask of Life** (Node 75) - Given by Healer; required for final ritual
5. **Silver Object** (any) - Required to summon Pegasus (or must walk to Firetop Mountain)

### Highly Recommended

1. **War-hammer** (Node 255) - Required to defeat Crystal Warrior (otherwise need Genie)
2. **Gold Ring** (Nodes 12, 45, 182) - Essential protection against White Dragon
3. **Potion of Health** (Node 289) - Helps survive Death Spell effects
4. **Candle + Tinder-box** (Nodes 43, 342) - Makes pit crossing much easier
5. **Iron Key** (Node 247) - Opens shortcut through iron door

---

## Test Statistics

### Test Your Luck Frequency

**Total Test Your Luck Nodes:** 33 nodes (8.25% of game)

**Nodes Requiring Test Your Luck:**
- 3, 
- 9, 
- 15, 
- 16, 
- 26, 
- 31, 
- 54, 
- 60, 
- 82, 
- 89, 
- 100, 
- 110, 
- 172, 
- 181, 
- 201, 
- 227, 
- 234, 
- 236, 
- 246, 
- 273, 
- 279, 
- 284, 
- 291, 
- 292, 
- 300, 
- 314, 
- 335, 
- 348, 
- 371, 
- 377, 
- 379, 
- 384, 
- 389

**Luck Test Outcomes:**
- Life or death: 8 tests (24.2%)
- Significant damage/loss: 12 tests (36.4%)
- Minor consequences: 13 tests (39.4%)

### Skill Test Distribution

**2d6 vs SKILL Tests:** 15 nodes

| Node | Test Purpose | Success | Failure |
|------|-------------|---------|---------|
| 5 | Resist Banshee | Turn to 68 | Turn to 185 (fight) |
| 54 | Cross log with light | Turn to 91 | Turn to 78 (death) |
| 60 | Resist Snow Witch mind control | Turn to 8 | Turn to 116 (enslaved) |
| 85 | Ash shoots Death Hawk | Turn to 175 | Turn to 238 |
| 91 | Cross log successfully | Turn to 91 cont. | Turn to 78 (death) |
| 102 | Daggers hit you | Varies | Varies |
| 109 | Reach avalanche shelter | Turn to 81 | Turn to 371 |
| 114 | Resist Snow Witch | Turn to 114 cont. | Turn to 134 (enslaved) |
| 123 | Resist Snow Witch | Turn to 114 | Turn to 134 (enslaved) |
| 224 | Read scroll before fading | Turn to 147 | Turn to 396 |
| 282 | Sling hits globe | Turn to 282 cont. | Turn to 375 |
| 333 | Resist Banshee (harder) | Turn to 68 | Turn to 185 (fight) |
| 343 | Cross log without light | Turn to 91 | Turn to 78 (death) |
| 352 | Sling hits Frost Giant | Turn to 12 | Turn to 352 cont. |
| 373 | Sling hits Frost Giant | Turn to 12 | Turn to 352 |

### Single Die Roll Outcomes

**1d6 Decision Rolls:** 13 nodes

| Node | Purpose | Outcomes |
|------|---------|----------|
| 73 | Drawing lots (who opens casket) | 1-2: You / 3-4: Stubb / 5-6: Redswift |
| 102 | Dagger accuracy | 1-2: both hit / 3-4: one hits / 5-6: both miss |
| 124 | Slip on rocks | 1-3: fall in river / 4-6: safe |
| 196 | Stubb draws lots | Continuation of lot drawing |
| 197 | Fall damage | Deduct 1d6 from STAMINA |
| 203 | Who gets elfin boots | Lot drawing result |
| 220 | Stumble direction | 1-2: white / 3-4: black / 5-6: neither |
| 222 | Flesh Grubs attached | Lose 1 STAMINA per grub |
| 249 | Spear throw accuracy | 1: miss / 2+: hit |
| 254 | Fall damage from pit | Deduct 1d6 from STAMINA |
| 259 | Drawing lots (casket) | 1-2: You / 3-4: Stubb / 5-6: Redswift |
| 265 | Who gets elfin boots | Redswift gets them |
| 268 | Slip crossing rocks | 1-3: fall / 4-6: safe |
| 313 | Which warrior summoned | 1: Knight / 2: Barbarian / 3: Dwarf / 4: Elf / 5: Ninja / 6: Axeman |
| 318 | Exploding orb damage | Roll 2d6, lose that much STAMINA |
| 321 | Ice pit fall damage | Deduct 1d6 from STAMINA |
| 340 | Odd/even for attacks | Odd: whip hits / Even: dart hits |
| 353 | Redswift draws lots | Further lot drawing |
| 379 | You get elfin boots | Success in lot drawing |

### STAMINA Checks

| Node | Check | Result if Pass | Result if Fail |
|------|-------|----------------|----------------|
| 287 | STAMINA ≤ 10? | Turn to 151 | Turn to 82 |
| 394 | STAMINA ≤ 6? | Turn to 191 (death) | Turn to 222 |

---

## Damage and Loss Statistics

### Instant Death Nodes

**Total Instant Death Scenarios:** 42 nodes (10.5% of game)

**Categories:**
- Combat defeat: 28 scenarios
- Failed critical tests: 8 scenarios
- Wrong choices/traps: 6 scenarios

**Notable Instant Death Situations:**
- Node 10: Fail to kill Vampire properly - enslaved forever
- Node 35: Wild dagger kills you
- Node 44: Energy bolt from Snow Witch's globe (if STAMINA ≤ 10)
- Node 64: Buried in avalanche
- Node 78: Fall from log into pit
- Node 116: Mind-controlled by Snow Witch
- Node 121: Fail to stake Vampire
- Node 134: Mind-controlled by Snow Witch
- Node 153: Trapped in mountain forever
- Node 191: Flesh Grubs feast (if STAMINA ≤ 6)
- Node 228: Fail to recognize Phoenix - die in sleep
- Node 244: Sword trapped by globe - death
- Node 277: Swept away in rapids
- Node 302: Death Spell completes
- Node 316: Enslaved by Minstrel's music
- Node 360: Drown with heavy gold
- Node 367: Death Spell completes
- Node 380: Snow Witch overpowers you
- Node 393: Trapped and enslaved
- Node 397: Elf's arrow kills you instantly

### STAMINA Loss Nodes

**Nodes with Guaranteed STAMINA Loss:**
- Minor (1-2): 18 nodes
- Moderate (3-4): 12 nodes
- Major (5-6): 4 nodes
- Variable: 8 nodes

**Highest STAMINA Loss Scenarios:**
- Node 79: Acid waterfall (-4 STAMINA)
- Node 160: Air Elemental (-4 STAMINA, -1 SKILL)
- Node 186: Energy bolt (-4 STAMINA, -1 SKILL)
- Node 318: Exploding orb (2d6 STAMINA)

### SKILL Loss Nodes

**Permanent SKILL Loss:**
- Node 73: Asp bite (-1 SKILL)
- Node 87: Black footprints (-1 SKILL)
- Node 140: Dagger hits (-1 SKILL)
- Node 159: Cursed silver ring (1d6 SKILL)
- Node 225: Frostbite (-3 SKILL)
- Node 250: Spear of Terror (-1 SKILL)
- Node 257: Avalanche injury (-1 SKILL)
- Node 261: Broken sword (-1 SKILL)
- Node 308: Frostbite (-1 SKILL)

**Temporary SKILL Reductions (combat only):**
- Node 37: Fighting in dark (-2 Attack Strength)
- Node 39: Unarmed combat (-3 Attack Strength)
- Node 332: Injured by fireball (-3 SKILL during combat)
- Node 357: Winded (-2 Attack Strength)

---

## Path Analysis

### Minimum Combat Path

**Theoretical Minimum Combats:** 3
1. Final Snow Witch encounter (unavoidable)
2. Crystal Warrior (can be avoided with Genie OR war-hammer)
3. At least one combat is practically unavoidable

**Optimal Low-Combat Route:**
- Avoid mountain encounters (Yeti, Wolves)
- Use stealth options (elfin boots)
- Use magic flute to bypass Ice Demon
- Escape from optional encounters
- Use Genie for Crystal Warrior

### Critical Decision Points

**Node 88 - Weapon Choice:**
- Sword of Speed (+1 SKILL) - RECOMMENDED
- Spear (can be thrown at Yeti) - SITUATIONAL
- Neither (risky but possible)

**Node 65 - Ring Choice:**
- Gold Ring (+1 LUCK, cold protection) - BEST CHOICE
- Copper Ring (+1 LUCK, summon warrior) - GOOD
- Silver Ring (cursed) - AVOID

**Node 200 - Storeroom (Pick 3 items):**
- Garlic - ESSENTIAL
- Ground Minotaur Horn - RECOMMENDED
- Dragon Egg - USEFUL
- Others - SKIP

**Node 194 - Gnome's Cupboard:**
- Carved Rune Stick - ESSENTIAL
- Magic Flute - VERY USEFUL
- Old Rose - USEFUL
- Others - OPTIONAL

### Multiple Path Nodes

**Nodes with 3+ Exits:**
- Node 1: 2 paths (bridge or around)
- Node 46: 3 paths (pull vine, climb vine, or continue)
- Node 72: 3 paths (three tunnel choices)
- Node 88: 3 paths (sword, spear, or neither)
- Node 113: 3 paths (disc choices)
- Node 156: 3 paths (which Illusionist image)
- Node 194: 5 paths (multiple items to examine)
- Node 303: 3 paths (attack, talk, or leave)

---

## Statistical Summary

### Game Difficulty Indicators

**Combat Intensity:** Medium-High
- 11.25% of nodes involve combat
- Average opponent SKILL: 8.2
- Toughest opponents: Banshee (12), Bird-Man (12), White Dragon (12)

**Luck Dependency:** Medium
- 8.25% of nodes require luck tests
- Many critical moments depend on luck
- Recommended starting LUCK: 10+

**Item Dependency:** High
- 5 critical items required for completion
- 10+ items significantly improve survival odds
- Multiple puzzle items (3 discs) required

**Skill Test Frequency:** Low-Medium
- 3.75% of nodes involve skill tests
- Most tests have significant consequences
- Recommended starting SKILL: 10+

### Survival Statistics

**Death Rate by Category:**
- Combat deaths: 66.7%
- Failed tests: 19.0%
- Trap deaths: 9.5%
- Puzzle failures: 4.8%

**Most Dangerous Areas:**
1. Snow Witch's Final Chamber (multiple ways to die)
2. Ice Caverns (numerous traps and ambushes)
3. Mountain Ascent (avalanches, Yeti, environmental)
4. Pagan Plain crossing (Bird-men, Hill Trolls)
5. Death Spell sequence (timed threat)

**Most Valuable Items for Survival:**
1. Carved Rune Stick (required to win)
2. Garlic (required to win)
3. Three Metal Discs (required to win)
4. War-hammer (defeats Crystal Warrior)
5. Gold Ring (protects from dragon)

---

## Special Mechanics

### The Death Spell

- **Introduced:** Node 38 (Redswift reads parchment)
- **Effect:** Progressive STAMINA and SKILL loss
- **Cure:** Complete Healer's ritual sequence
- **Critical Nodes:** 30, 38, 75, 91, 146, 154, 217, 258, 271, 359, 400

**Progression:**
1. Initial infection (Node 38)
2. Symptoms worsen (Nodes 30, 46, 119, etc.)
3. Meet the Healer (Node 75)
4. Mask of Life ritual (Node 258)
5. Pit crossing (Node 91)
6. Banshee encounter (Node 154)
7. Cave exit and Pegasus/climb (Nodes 19, 206)
8. Firetop Mountain ascent (Nodes 172, 206)
9. Sleeping Grass dream (Node 217)
10. Sunrise cure (Node 400)

### Companion Characters

**Redswift (Mountain Elf):**
- Joins: Node 171
- Skills: Multi-lingual, combat capable
- Story: Escaped slave, seeking home in Moonstone Hills
- Fate: Dies from Death Spell (Node 30) OR survives to Stonebridge

**Stubb (Dwarf):**
- Joins: Node 171
- Skills: Foraging, combat capable, cheerful
- Story: Escaped slave, from Stonebridge village
- Fate: Survives to return home (Node 211)

**Ash (Elf):**
- Joins: Node 100 (temporarily)
- Skills: Archery, tracking
- Relationship: Redswift's brother
- Role: Guides player to Healer

### Obedience Collars

- **Function:** Magical enslavement device
- **Wearers:** All Snow Witch's slaves
- **Effect:** Forces obedience, causes pain if resisted
- **Removal:** Only when Snow Witch dies
- **Seen at nodes:** 17, 39, 70, 86, 103, 145, 188, 262, 274, 316, 339, 347, 366

### The Snow Witch

- **First Appearance:** Node 113 (in globe)
- **True Form:** Vampire (Node 297)
- **Weaknesses:** Garlic, Stake through heart
- **Powers:** Mind control, Ice magic, Necromancy
- **Final Battle:** Node 262 (Zombies), Node 113 (Disc game)
- **Death:** Node 4 (staked) OR various other game-over scenarios

---

## Location Breakdown

### Major Areas

1. **Icefinger Mountains** (Nodes 1-67)
   - Outdoor mountain climbing
   - Yeti encounter
   - Fur trapper's hut
   - Cave entrance finding

2. **Crystal Caves - Upper Levels** (Nodes 68-171)
   - Ice tunnels
   - Frost Giants' lairs
   - Goblin patrols
   - Minstrel's cave
   - Worship cavern

3. **Crystal Caves - Deep Levels** (Nodes 172-262)
   - Brain Slayer chamber
   - Metal disc locations
   - Snow Witch's final chamber
   - Escape tunnels

4. **Pagan Plain** (Nodes 263-315)
   - River Kok crossing
   - Dark Elf encounter
   - Centaur patrols
   - Bird-men attacks
   - Stonebridge approach

5. **Moonstone Hills** (Nodes 316-385)
   - Healer's cave
   - Death Spell cure sequence
   - Wilderness survival

6. **Firetop Mountain** (Nodes 386-400)
   - Final ascent
   - Sleeping Grass
   - Phoenix dream
   - Sunrise cure

### Key Locations

- **Node 194 - Gnome's Cupboard:** Contains carved rune stick (CRITICAL)
- **Node 200 - Zombie's Storeroom:** Contains garlic (CRITICAL)
- **Node 101, 141, 207 - Metal Discs:** Required for final game
- **Node 75 - Healer's Cave:** Death Spell cure begins
- **Node 113 - Snow Witch's Chamber:** Final confrontation
- **Node 171 - Treasure Room:** Meet Redswift and Stubb
- **Node 255 - Fur Trapper's Hut:** War-hammer location

---

## Recommended Strategy

### Optimal Route Summary

1. **Mountain Phase:**
   - Take ice bridge (safer than walking around)
   - Fight Yeti to continue story
   - Get war-hammer from hut (Node 255)
   - Find cave entrance

2. **Crystal Caves:**
   - Get Sword of Speed (Node 237 or 88)
   - Collect all three metal discs (101, 141, 207)
   - Visit Gnome's cupboard (Node 194) - get rune stick
   - Visit Zombie's storeroom (Node 200) - get garlic + horn + egg
   - Choose Gold Ring when offered
   - Free Redswift and Stubb (Node 171)

3. **Snow Witch Battle:**
   - Fight Zombies (Node 262)
   - Win disc game (Node 113)
   - Use garlic on Vampire (Node 210)
   - Stake with rune stick (SKILL > 10 required)

4. **Escape and Cure:**
   - Survive cavern collapse
   - Cross Pagan Plain (avoid Centaurs if possible)
   - Find Healer in Moonstone Hills
   - Complete Death Spell cure ritual
   - Reach Firetop Mountain before dawn
   - Recognize Phoenix in dream
   - Watch sunrise - VICTORY

### Item Priority Checklist

**Must Have:**
- [ ] Carved Rune Stick (Node 194)
- [ ] Garlic (Node 200)
- [ ] Square Metal Disc (Node 101)
- [ ] Circular Metal Disc (Node 207)
- [ ] Star Metal Disc (Node 141)

**Should Have:**
- [ ] War-hammer (Node 255)
- [ ] Gold Ring (Nodes 12, 45, or 182)
- [ ] Sword of Speed (Nodes 88 or 237)
- [ ] Candle + Tinder-box (Nodes 43, 342, or 347)
- [ ] Potion of Health (Node 289)

**Nice to Have:**
- [ ] Ground Minotaur Horn (Node 200)
- [ ] Dragon Egg (Node 200)
- [ ] Magic Flute (Node 194)
- [ ] Amulet of Courage (Node 97)
- [ ] Elfin Boots (Node 259)
- [ ] Shield (Node 298 - but beware Air Elemental!)

### Starting Statistics Recommendations

**Minimum for Success:**
- SKILL: 9
- STAMINA: 18
- LUCK: 9

**Recommended:**
- SKILL: 10-11
- STAMINA: 20-22
- LUCK: 10-11

**Optimal:**
- SKILL: 11-12
- STAMINA: 22-24
- LUCK: 11-12

---

## Conclusion

*Caverns of the Snow Witch* is a moderately difficult adventure with:
- High item dependency (5 critical items)
- Medium combat frequency (45 encounters across 400 nodes)
- Significant luck elements (33 luck tests)
- Complex multi-phase structure (Snow Witch battle → Escape → Death Spell cure)
- Multiple companions (adding story depth)
- Time-pressure elements (Death Spell progression)

Success requires careful item collection, smart combat choices, and understanding the multi-stage endgame sequence. The adventure is notable for having a "second quest" after defeating the main villain (the Death Spell cure), making it longer and more complex than many Fighting Fantasy books.

- **Estimated Playthrough Length:** 45-60 minutes
- **Difficulty Rating:** 7/10
- **Replayability:** High (multiple paths, item combinations)
- **Story Quality:** High (complex plot, memorable villain, companion characters)

