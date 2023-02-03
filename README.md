# fvtt-module-pf2e-AdjustMonsterLevel
A Foundry VTT module designed for Pathfinder 2E System that allows scaling a monster's level using the creature building tables from the [Gamemastery Guide](https://2e.aonprd.com/Rules.aspx?ID=995).

Once the module is active, an Adjust Level button will appear below the creature level on NPC sheets. This opens a new window that lets you set a new name and level, and lets you preview the inferred tiers of the creature's statistics. Both individual tokens and actors can be scaled. 

Statistics between two tiers (e.g. 25% between Moderate and High) will have their values interpolated to remain between those tiers. Statistics that fall below the minimum tier or above the maximum tier will have their values extrapolated similarly. These values are flagged with the ⚠️ symbol.

Statistics that this module will scale:
- All ability modifiers.
- Hit points, AC, all saves, and perception
- All skills
- Spellcasting modifier and DC for any spellcasting entries
- Attack modifier and damage for any Strikes
- Resistances and Weaknesses
- Inline check DCs and damage rolls on most non-strike abilities, e.g. breath weapons, frightening presence, swallow whole
- Untyped damage on non-strike abilities _if the label contains the word damage_
- the DamageDice Rule Element (e.g. on Sneak Attack etc.)

Statistics not currently scaled by this module:
- Spell heightening or spell level
- Rule Elements other than DamageDice
- Any text for strikes that should scale but isn't part of the damage roll, e.g. persistent damage or splash damage
- Inventory items

Known Issues:
- Strike die roll adjustments are very heuristic at the moment so always double-check them. They accurately preserve the relative amount of damage, fraction of the damage coming from each roll when there is more than one damage type, and fraction of each roll coming from flat modifier vs. dice, but the die size selected may sometimes not be ideal.
- Related, certain spell-like strikes may have their die size changed where strictly speaking you'd want to keep it the same but adjust the number of dice instead. As above, always double check strike damage to make sure the numbers match what you want.
- Certain strikes from items like alchemical bombs may be scaled where it would be better to replace them with a strike from the higher-level item.
- Actions / passives where an inline roll in the text interacts with the DamageDice Rule Element may be scaled incorrectly, e.g. the Giant Flytrap's Focused Assault. You can always uncheck these and adjust them by hand.
- A few bits of text do not use the localization system. However, english is only currently supported