export const Levels: String[] = ['-1', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14',
    '15', '16', '17', '18', '19', '20', '21', '22', '23', '24']

export enum Statistics {
    name = 'PF2EMONSTERMAKER.name',
    level = 'PF2EMONSTERMAKER.level',
    // Ability Scores
    str = 'PF2EMONSTERMAKER.str',
    dex = 'PF2EMONSTERMAKER.dex',
    con = 'PF2EMONSTERMAKER.con',
    int = 'PF2EMONSTERMAKER.int',
    wis = 'PF2EMONSTERMAKER.wis',
    cha = 'PF2EMONSTERMAKER.cha',

    hp = 'PF2EMONSTERMAKER.hp',

    per = 'PF2EMONSTERMAKER.per',

    ac = 'PF2EMONSTERMAKER.ac',

    resistWeak = 'PF2EMONSTERMAKER.resistWeak',

    // Saves
    fort = 'PF2EMONSTERMAKER.fort',
    ref = 'PF2EMONSTERMAKER.ref',
    wil = 'PF2EMONSTERMAKER.wil',

    // Strikes
    strikeBonus = 'PF2EMONSTERMAKER.strikeBonus',
    strikeDamage = 'PF2EMONSTERMAKER.strikeDamage',
    spellcasting = 'PF2EMONSTERMAKER.spellcasting',

    // Skills
    acrobatics = 'PF2EMONSTERMAKER.acrobatics',
    arcana = 'PF2EMONSTERMAKER.arcana',
    athletics = 'PF2EMONSTERMAKER.athletics',
    crafting = 'PF2EMONSTERMAKER.crafting',
    deception = 'PF2EMONSTERMAKER.deception',
    diplomacy = 'PF2EMONSTERMAKER.diplomacy',
    intimidation = 'PF2EMONSTERMAKER.intimidation',
    medicine = 'PF2EMONSTERMAKER.medicine',
    nature = 'PF2EMONSTERMAKER.nature',
    occultism = 'PF2EMONSTERMAKER.occultism',
    performance = 'PF2EMONSTERMAKER.performance',
    religion = 'PF2EMONSTERMAKER.religion',
    society = 'PF2EMONSTERMAKER.society',
    stealth = 'PF2EMONSTERMAKER.stealth',
    survival = 'PF2EMONSTERMAKER.survival',
    thievery = 'PF2EMONSTERMAKER.thievery',
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
    [Statistics.per]: 'system.attributes.perception.value',
    [Statistics.fort]: 'system.saves.fortitude.value',
    [Statistics.ref]: 'system.saves.reflex.value',
    [Statistics.wil]: 'system.saves.will.value',
}

export const meleeFields = {
    [Statistics.strikeBonus]: 'system.bonus.value',
    [Statistics.strikeDamage]: ''
}

export enum Options {
    extreme = 'PF2EMONSTERMAKER.extreme',
    high = 'PF2EMONSTERMAKER.high',
    moderate = 'PF2EMONSTERMAKER.moderate',
    low = 'PF2EMONSTERMAKER.low',
    terrible = 'PF2EMONSTERMAKER.terrible',
    none = 'PF2EMONSTERMAKER.none',
}

export enum ResistOptions {
    minimum = 'PF2EMONSTERMAKER.minimum',
    maximum = 'PF2EMONSTERMAKER.maximum',
}