export const Setting = {
    namespace: 'pf2e-adjust-monster-level', // must be the same as the module id
    expandFoldout: 'expandFoldout',
    testMode: 'testMode'
}

export const Levels: String[] = ['-1', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14',
    '15', '16', '17', '18', '19', '20', '21', '22', '23', '24']

export enum Statistics {
    name = 'PF2EADJUSTMONSTERLEVEL.name',
    level = 'PF2EADJUSTMONSTERLEVEL.level',
    // Ability Scores
    str = 'PF2EADJUSTMONSTERLEVEL.str',
    dex = 'PF2EADJUSTMONSTERLEVEL.dex',
    con = 'PF2EADJUSTMONSTERLEVEL.con',
    int = 'PF2EADJUSTMONSTERLEVEL.int',
    wis = 'PF2EADJUSTMONSTERLEVEL.wis',
    cha = 'PF2EADJUSTMONSTERLEVEL.cha',

    hp = 'PF2EADJUSTMONSTERLEVEL.hp',

    perception = 'PF2EADJUSTMONSTERLEVEL.perception',

    ac = 'PF2EADJUSTMONSTERLEVEL.ac',

    resistWeak = 'PF2EADJUSTMONSTERLEVEL.resistWeak',

    // Saves
    fortitude = 'PF2EADJUSTMONSTERLEVEL.fortitude',
    reflex = 'PF2EADJUSTMONSTERLEVEL.reflex',
    will = 'PF2EADJUSTMONSTERLEVEL.will',

    // Strikes
    strikeBonus = 'PF2EADJUSTMONSTERLEVEL.strikeBonus',
    strikeDamage = 'PF2EADJUSTMONSTERLEVEL.strikeDamage',

    // Spells
    spellcasting = 'PF2EADJUSTMONSTERLEVEL.spellcasting',
    spellDC = 'PF2EADJUSTMONSTERLEVEL.spellDC',

    // Skills
    acrobatics = 'PF2EADJUSTMONSTERLEVEL.acrobatics',
    arcana = 'PF2EADJUSTMONSTERLEVEL.arcana',
    athletics = 'PF2EADJUSTMONSTERLEVEL.athletics',
    crafting = 'PF2EADJUSTMONSTERLEVEL.crafting',
    deception = 'PF2EADJUSTMONSTERLEVEL.deception',
    diplomacy = 'PF2EADJUSTMONSTERLEVEL.diplomacy',
    intimidation = 'PF2EADJUSTMONSTERLEVEL.intimidation',
    medicine = 'PF2EADJUSTMONSTERLEVEL.medicine',
    nature = 'PF2EADJUSTMONSTERLEVEL.nature',
    occultism = 'PF2EADJUSTMONSTERLEVEL.occultism',
    performance = 'PF2EADJUSTMONSTERLEVEL.performance',
    religion = 'PF2EADJUSTMONSTERLEVEL.religion',
    society = 'PF2EADJUSTMONSTERLEVEL.society',
    stealth = 'PF2EADJUSTMONSTERLEVEL.stealth',
    survival = 'PF2EADJUSTMONSTERLEVEL.survival',
    thievery = 'PF2EADJUSTMONSTERLEVEL.thievery',

    // text inside an item entry
    description = 'PF2EADJUSTMONSTERLEVEL.description',
    areaDamage = 'PF2EADJUSTMONSTERLEVEL.areaDamage'
}

export enum Dice {
    d4= 'd4',
    d6= 'd6',
    d8= 'd8',
    d10= 'd10',
    d12= 'd12',
}

export const Skills: Statistics[] = [Statistics.acrobatics, Statistics.arcana, Statistics.athletics, Statistics.crafting,
    Statistics.deception, Statistics.diplomacy, Statistics.intimidation, Statistics.medicine, Statistics.nature,
    Statistics.occultism, Statistics.performance, Statistics.religion, Statistics.society, Statistics.stealth,
    Statistics.survival, Statistics.thievery]

export const AbilityModifiers: Statistics[] = [Statistics.str, Statistics.dex, Statistics.con, Statistics.int,
    Statistics.wis, Statistics.cha]

export const defenseFields ={
    [Statistics.hp]: 'system.attributes.hp.max',
    [Statistics.ac]: 'system.attributes.ac.value',
}

export const abilityFields = {
    [Statistics.str]: 'system.abilities.str.mod',
    [Statistics.dex]: 'system.abilities.dex.mod',
    [Statistics.con]: 'system.abilities.con.mod',
    [Statistics.int]: 'system.abilities.int.mod',
    [Statistics.wis]: 'system.abilities.wis.mod',
    [Statistics.cha]: 'system.abilities.cha.mod',
}

export const savesFields = {
    [Statistics.perception]: 'system.attributes.perception.value',
    [Statistics.fortitude]: 'system.saves.fortitude.value',
    [Statistics.reflex]: 'system.saves.reflex.value',
    [Statistics.will]: 'system.saves.will.value',
}

export enum Tiers {
    extreme = 'PF2EADJUSTMONSTERLEVEL.extreme',
    high = 'PF2EADJUSTMONSTERLEVEL.high',
    moderate = 'PF2EADJUSTMONSTERLEVEL.moderate',
    low = 'PF2EADJUSTMONSTERLEVEL.low',
    terrible = 'PF2EADJUSTMONSTERLEVEL.terrible',
    none = 'PF2EADJUSTMONSTERLEVEL.none',
}

export enum ResistTiers {
    minimum = 'PF2EADJUSTMONSTERLEVEL.minimum',
    maximum = 'PF2EADJUSTMONSTERLEVEL.maximum',
}

export enum AreaDamageTiers {
    unlimited = 'PF2EADJUSTMONSTERLEVEL.unlimited',
    limited = 'PF2EADJUSTMONSTERLEVEL.limited'
}

export enum AllowDice {
    any = 'any',
    above = 'above',
    below = 'below',
    sameOnly = 'sameOnly'
}