import {AreaDamageTiers, Dice, Tiers, ResistTiers, Statistics, AllowDice} from "./Keys";

const aliases = {
    abilityScores: {
        "-1": {
            [Tiers.extreme]: "4",
            [Tiers.high]: "3",
            [Tiers.moderate]: "2",
            [Tiers.low]: "0"
        },
        "0": {
            [Tiers.extreme]: "4",
            [Tiers.high]: "3",
            [Tiers.moderate]: "2",
            [Tiers.low]: "0"
        },
        "1": {
            [Tiers.extreme]: "5",
            [Tiers.high]: "4",
            [Tiers.moderate]: "3",
            [Tiers.low]: "1"
        },
        "2": {
            [Tiers.extreme]: "5",
            [Tiers.high]: "4",
            [Tiers.moderate]: "3",
            [Tiers.low]: "1"
        },
        "3": {
            [Tiers.extreme]: "5",
            [Tiers.high]: "4",
            [Tiers.moderate]: "3",
            [Tiers.low]: "1"
        },
        "4": {
            [Tiers.extreme]: "6",
            [Tiers.high]: "5",
            [Tiers.moderate]: "3",
            [Tiers.low]: "2"
        },
        "5": {
            [Tiers.extreme]: "6",
            [Tiers.high]: "5",
            [Tiers.moderate]: "4",
            [Tiers.low]: "2"
        },
        "6": {
            [Tiers.extreme]: "7",
            [Tiers.high]: "5",
            [Tiers.moderate]: "4",
            [Tiers.low]: "2"
        },
        "7": {
            [Tiers.extreme]: "7",
            [Tiers.high]: "6",
            [Tiers.moderate]: "4",
            [Tiers.low]: "2"
        },
        "8": {
            [Tiers.extreme]: "7",
            [Tiers.high]: "6",
            [Tiers.moderate]: "4",
            [Tiers.low]: "3"
        },
        "9": {
            [Tiers.extreme]: "7",
            [Tiers.high]: "6",
            [Tiers.moderate]: "4",
            [Tiers.low]: "3"
        },
        "10": {
            [Tiers.extreme]: "8",
            [Tiers.high]: "7",
            [Tiers.moderate]: "5",
            [Tiers.low]: "3"
        },
        "11": {
            [Tiers.extreme]: "8",
            [Tiers.high]: "7",
            [Tiers.moderate]: "5",
            [Tiers.low]: "3"
        },
        "12": {
            [Tiers.extreme]: "8",
            [Tiers.high]: "7",
            [Tiers.moderate]: "5",
            [Tiers.low]: "4"
        },
        "13": {
            [Tiers.extreme]: "9",
            [Tiers.high]: "8",
            [Tiers.moderate]: "5",
            [Tiers.low]: "4"
        },
        "14": {
            [Tiers.extreme]: "9",
            [Tiers.high]: "8",
            [Tiers.moderate]: "5",
            [Tiers.low]: "4"
        },
        "15": {
            [Tiers.extreme]: "9",
            [Tiers.high]: "8",
            [Tiers.moderate]: "6",
            [Tiers.low]: "4"
        },
        "16": {
            [Tiers.extreme]: "10",
            [Tiers.high]: "9",
            [Tiers.moderate]: "6",
            [Tiers.low]: "5"
        },
        "17": {
            [Tiers.extreme]: "10",
            [Tiers.high]: "9",
            [Tiers.moderate]: "6",
            [Tiers.low]: "4"
        },
        "18": {
            [Tiers.extreme]: "10",
            [Tiers.high]: "9",
            [Tiers.moderate]: "6",
            [Tiers.low]: "5"
        },
        "19": {
            [Tiers.extreme]: "11",
            [Tiers.high]: "10",
            [Tiers.moderate]: "6",
            [Tiers.low]: "5"
        },
        "20": {
            [Tiers.extreme]: "11",
            [Tiers.high]: "10",
            [Tiers.moderate]: "7",
            [Tiers.low]: "6"
        },
        "21": {
            [Tiers.extreme]: "11",
            [Tiers.high]: "10",
            [Tiers.moderate]: "7",
            [Tiers.low]: "6"
        },
        "22": {
            [Tiers.extreme]: "11",
            [Tiers.high]: "10",
            [Tiers.moderate]: "8",
            [Tiers.low]: "6"
        },
        "23": {
            [Tiers.extreme]: "11",
            [Tiers.high]: "10",
            [Tiers.moderate]: "8",
            [Tiers.low]: "6"
        },
        "24": {
            [Tiers.extreme]: "13",
            [Tiers.high]: "12",
            [Tiers.moderate]: "9",
            [Tiers.low]: "7"
        }
    },
    hitPoints: {
        "-1": {
            [Tiers.high]: "9",
            [Tiers.moderate]: "7",
            [Tiers.low]: "5"
        },
        "0": {
            [Tiers.high]: "18",
            [Tiers.moderate]: "15",
            [Tiers.low]: "12"
        },
        "1": {
            [Tiers.high]: "25",
            [Tiers.moderate]: "20",
            [Tiers.low]: "15"
        },
        "2": {
            [Tiers.high]: "38",
            [Tiers.moderate]: "30",
            [Tiers.low]: "23"
        },
        "3": {
            [Tiers.high]: "56",
            [Tiers.moderate]: "45",
            [Tiers.low]: "34"
        },
        "4": {
            [Tiers.high]: "75",
            [Tiers.moderate]: "60",
            [Tiers.low]: "45"
        },
        "5": {
            [Tiers.high]: "94",
            [Tiers.moderate]: "75",
            [Tiers.low]: "56"
        },
        "6": {
            [Tiers.high]: "119",
            [Tiers.moderate]: "95",
            [Tiers.low]: "71"
        },
        "7": {
            [Tiers.high]: "144",
            [Tiers.moderate]: "115",
            [Tiers.low]: "86"
        },
        "8": {
            [Tiers.high]: "169",
            [Tiers.moderate]: "135",
            [Tiers.low]: "101"
        },
        "9": {
            [Tiers.high]: "194",
            [Tiers.moderate]: "155",
            [Tiers.low]: "116"
        },
        "10": {
            [Tiers.high]: "219",
            [Tiers.moderate]: "175",
            [Tiers.low]: "131"
        },
        "11": {
            [Tiers.high]: "244",
            [Tiers.moderate]: "195",
            [Tiers.low]: "146"
        },
        "12": {
            [Tiers.high]: "269",
            [Tiers.moderate]: "215",
            [Tiers.low]: "161"
        },
        "13": {
            [Tiers.high]: "294",
            [Tiers.moderate]: "235",
            [Tiers.low]: "176"
        },
        "14": {
            [Tiers.high]: "319",
            [Tiers.moderate]: "255",
            [Tiers.low]: "191"
        },
        "15": {
            [Tiers.high]: "344",
            [Tiers.moderate]: "275",
            [Tiers.low]: "206"
        },
        "16": {
            [Tiers.high]: "369",
            [Tiers.moderate]: "295",
            [Tiers.low]: "221"
        },
        "17": {
            [Tiers.high]: "394",
            [Tiers.moderate]: "315",
            [Tiers.low]: "236"
        },
        "18": {
            [Tiers.high]: "419",
            [Tiers.moderate]: "335",
            [Tiers.low]: "251"
        },
        "19": {
            [Tiers.high]: "444",
            [Tiers.moderate]: "355",
            [Tiers.low]: "266"
        },
        "20": {
            [Tiers.high]: "469",
            [Tiers.moderate]: "375",
            [Tiers.low]: "281"
        },
        "21": {
            [Tiers.high]: "500",
            [Tiers.moderate]: "400",
            [Tiers.low]: "300"
        },
        "22": {
            [Tiers.high]: "538",
            [Tiers.moderate]: "430",
            [Tiers.low]: "323"
        },
        "23": {
            [Tiers.high]: "575",
            [Tiers.moderate]: "460",
            [Tiers.low]: "345"
        },
        "24": {
            [Tiers.high]: "625",
            [Tiers.moderate]: "500",
            [Tiers.low]: "375"
        }
    },
    perceptionSaves: {
        "-1": {
            [Tiers.extreme]: "9",
            [Tiers.high]: "8",
            [Tiers.moderate]: "5",
            [Tiers.low]: "2",
            [Tiers.terrible]: "0"
        },
        "0": {
            [Tiers.extreme]: "10",
            [Tiers.high]: "9",
            [Tiers.moderate]: "6",
            [Tiers.low]: "3",
            [Tiers.terrible]: "1"
        },
        "1": {
            [Tiers.extreme]: "11",
            [Tiers.high]: "10",
            [Tiers.moderate]: "7",
            [Tiers.low]: "4",
            [Tiers.terrible]: "2"
        },
        "2": {
            [Tiers.extreme]: "12",
            [Tiers.high]: "11",
            [Tiers.moderate]: "8",
            [Tiers.low]: "5",
            [Tiers.terrible]: "3"
        },
        "3": {
            [Tiers.extreme]: "14",
            [Tiers.high]: "12",
            [Tiers.moderate]: "9",
            [Tiers.low]: "6",
            [Tiers.terrible]: "4"
        },
        "4": {
            [Tiers.extreme]: "15",
            [Tiers.high]: "14",
            [Tiers.moderate]: "11",
            [Tiers.low]: "8",
            [Tiers.terrible]: "6"
        },
        "5": {
            [Tiers.extreme]: "17",
            [Tiers.high]: "15",
            [Tiers.moderate]: "12",
            [Tiers.low]: "9",
            [Tiers.terrible]: "7"
        },
        "6": {
            [Tiers.extreme]: "18",
            [Tiers.high]: "17",
            [Tiers.moderate]: "14",
            [Tiers.low]: "11",
            [Tiers.terrible]: "8"
        },
        "7": {
            [Tiers.extreme]: "20",
            [Tiers.high]: "18",
            [Tiers.moderate]: "15",
            [Tiers.low]: "12",
            [Tiers.terrible]: "10"
        },
        "8": {
            [Tiers.extreme]: "21",
            [Tiers.high]: "19",
            [Tiers.moderate]: "16",
            [Tiers.low]: "13",
            [Tiers.terrible]: "11"
        },
        "9": {
            [Tiers.extreme]: "23",
            [Tiers.high]: "21",
            [Tiers.moderate]: "18",
            [Tiers.low]: "15",
            [Tiers.terrible]: "12"
        },
        "10": {
            [Tiers.extreme]: "24",
            [Tiers.high]: "22",
            [Tiers.moderate]: "19",
            [Tiers.low]: "16",
            [Tiers.terrible]: "14"
        },
        "11": {
            [Tiers.extreme]: "26",
            [Tiers.high]: "24",
            [Tiers.moderate]: "21",
            [Tiers.low]: "18",
            [Tiers.terrible]: "15"
        },
        "12": {
            [Tiers.extreme]: "27",
            [Tiers.high]: "25",
            [Tiers.moderate]: "22",
            [Tiers.low]: "19",
            [Tiers.terrible]: "16"
        },
        "13": {
            [Tiers.extreme]: "29",
            [Tiers.high]: "26",
            [Tiers.moderate]: "23",
            [Tiers.low]: "20",
            [Tiers.terrible]: "18"
        },
        "14": {
            [Tiers.extreme]: "30",
            [Tiers.high]: "28",
            [Tiers.moderate]: "25",
            [Tiers.low]: "22",
            [Tiers.terrible]: "19"
        },
        "15": {
            [Tiers.extreme]: "32",
            [Tiers.high]: "29",
            [Tiers.moderate]: "26",
            [Tiers.low]: "23",
            [Tiers.terrible]: "20"
        },
        "16": {
            [Tiers.extreme]: "33",
            [Tiers.high]: "30",
            [Tiers.moderate]: "28",
            [Tiers.low]: "25",
            [Tiers.terrible]: "22"
        },
        "17": {
            [Tiers.extreme]: "35",
            [Tiers.high]: "32",
            [Tiers.moderate]: "29",
            [Tiers.low]: "26",
            [Tiers.terrible]: "23"
        },
        "18": {
            [Tiers.extreme]: "36",
            [Tiers.high]: "33",
            [Tiers.moderate]: "30",
            [Tiers.low]: "27",
            [Tiers.terrible]: "24"
        },
        "19": {
            [Tiers.extreme]: "38",
            [Tiers.high]: "35",
            [Tiers.moderate]: "32",
            [Tiers.low]: "29",
            [Tiers.terrible]: "26"
        },
        "20": {
            [Tiers.extreme]: "39",
            [Tiers.high]: "36",
            [Tiers.moderate]: "33",
            [Tiers.low]: "30",
            [Tiers.terrible]: "27"
        },
        "21": {
            [Tiers.extreme]: "41",
            [Tiers.high]: "38",
            [Tiers.moderate]: "35",
            [Tiers.low]: "32",
            [Tiers.terrible]: "28"
        },
        "22": {
            [Tiers.extreme]: "43",
            [Tiers.high]: "39",
            [Tiers.moderate]: "36",
            [Tiers.low]: "33",
            [Tiers.terrible]: "30"
        },
        "23": {
            [Tiers.extreme]: "44",
            [Tiers.high]: "40",
            [Tiers.moderate]: "37",
            [Tiers.low]: "34",
            [Tiers.terrible]: "31"
        },
        "24": {
            [Tiers.extreme]: "46",
            [Tiers.high]: "42",
            [Tiers.moderate]: "38",
            [Tiers.low]: "36",
            [Tiers.terrible]: "32"
        }
    },
    armorClass: {
        "-1": {
            [Tiers.extreme]: "18",
            [Tiers.high]: "15",
            [Tiers.moderate]: "14",
            [Tiers.low]: "12"
        },
        "0": {
            [Tiers.extreme]: "19",
            [Tiers.high]: "16",
            [Tiers.moderate]: "15",
            [Tiers.low]: "13"
        },
        "1": {
            [Tiers.extreme]: "19",
            [Tiers.high]: "16",
            [Tiers.moderate]: "15",
            [Tiers.low]: "13"
        },
        "2": {
            [Tiers.extreme]: "21",
            [Tiers.high]: "18",
            [Tiers.moderate]: "17",
            [Tiers.low]: "15"
        },
        "3": {
            [Tiers.extreme]: "22",
            [Tiers.high]: "19",
            [Tiers.moderate]: "18",
            [Tiers.low]: "16"
        },
        "4": {
            [Tiers.extreme]: "24",
            [Tiers.high]: "21",
            [Tiers.moderate]: "20",
            [Tiers.low]: "18"
        },
        "5": {
            [Tiers.extreme]: "25",
            [Tiers.high]: "22",
            [Tiers.moderate]: "21",
            [Tiers.low]: "19"
        },
        "6": {
            [Tiers.extreme]: "27",
            [Tiers.high]: "24",
            [Tiers.moderate]: "23",
            [Tiers.low]: "21"
        },
        "7": {
            [Tiers.extreme]: "28",
            [Tiers.high]: "25",
            [Tiers.moderate]: "24",
            [Tiers.low]: "22"
        },
        "8": {
            [Tiers.extreme]: "30",
            [Tiers.high]: "27",
            [Tiers.moderate]: "26",
            [Tiers.low]: "24"
        },
        "9": {
            [Tiers.extreme]: "31",
            [Tiers.high]: "28",
            [Tiers.moderate]: "27",
            [Tiers.low]: "25"
        },
        "10": {
            [Tiers.extreme]: "33",
            [Tiers.high]: "30",
            [Tiers.moderate]: "29",
            [Tiers.low]: "27"
        },
        "11": {
            [Tiers.extreme]: "34",
            [Tiers.high]: "31",
            [Tiers.moderate]: "30",
            [Tiers.low]: "28"
        },
        "12": {
            [Tiers.extreme]: "36",
            [Tiers.high]: "33",
            [Tiers.moderate]: "32",
            [Tiers.low]: "30"
        },
        "13": {
            [Tiers.extreme]: "37",
            [Tiers.high]: "34",
            [Tiers.moderate]: "33",
            [Tiers.low]: "31"
        },
        "14": {
            [Tiers.extreme]: "39",
            [Tiers.high]: "36",
            [Tiers.moderate]: "35",
            [Tiers.low]: "33"
        },
        "15": {
            [Tiers.extreme]: "40",
            [Tiers.high]: "37",
            [Tiers.moderate]: "36",
            [Tiers.low]: "34"
        },
        "16": {
            [Tiers.extreme]: "42",
            [Tiers.high]: "39",
            [Tiers.moderate]: "38",
            [Tiers.low]: "36"
        },
        "17": {
            [Tiers.extreme]: "43",
            [Tiers.high]: "40",
            [Tiers.moderate]: "39",
            [Tiers.low]: "37"
        },
        "18": {
            [Tiers.extreme]: "45",
            [Tiers.high]: "42",
            [Tiers.moderate]: "41",
            [Tiers.low]: "39"
        },
        "19": {
            [Tiers.extreme]: "46",
            [Tiers.high]: "43",
            [Tiers.moderate]: "42",
            [Tiers.low]: "40"
        },
        "20": {
            [Tiers.extreme]: "48",
            [Tiers.high]: "45",
            [Tiers.moderate]: "44",
            [Tiers.low]: "42"
        },
        "21": {
            [Tiers.extreme]: "49",
            [Tiers.high]: "46",
            [Tiers.moderate]: "45",
            [Tiers.low]: "43"
        },
        "22": {
            [Tiers.extreme]: "51",
            [Tiers.high]: "48",
            [Tiers.moderate]: "47",
            [Tiers.low]: "45"
        },
        "23": {
            [Tiers.extreme]: "52",
            [Tiers.high]: "49",
            [Tiers.moderate]: "48",
            [Tiers.low]: "46"
        },
        "24": {
            [Tiers.extreme]: "54",
            [Tiers.high]: "51",
            [Tiers.moderate]: "50",
            [Tiers.low]: "48"
        }
    },
    strikeBonus: {
        "-1": {
            [Tiers.extreme]: "10",
            [Tiers.high]: "8",
            [Tiers.moderate]: "6",
            [Tiers.low]: "4"
        },
        "0": {
            [Tiers.extreme]: "10",
            [Tiers.high]: "8",
            [Tiers.moderate]: "6",
            [Tiers.low]: "4"
        },
        "1": {
            [Tiers.extreme]: "11",
            [Tiers.high]: "9",
            [Tiers.moderate]: "7",
            [Tiers.low]: "5"
        },
        "2": {
            [Tiers.extreme]: "13",
            [Tiers.high]: "11",
            [Tiers.moderate]: "9",
            [Tiers.low]: "7"
        },
        "3": {
            [Tiers.extreme]: "14",
            [Tiers.high]: "12",
            [Tiers.moderate]: "10",
            [Tiers.low]: "8"
        },
        "4": {
            [Tiers.extreme]: "16",
            [Tiers.high]: "14",
            [Tiers.moderate]: "12",
            [Tiers.low]: "9"
        },
        "5": {
            [Tiers.extreme]: "17",
            [Tiers.high]: "15",
            [Tiers.moderate]: "13",
            [Tiers.low]: "11"
        },
        "6": {
            [Tiers.extreme]: "19",
            [Tiers.high]: "17",
            [Tiers.moderate]: "15",
            [Tiers.low]: "12"
        },
        "7": {
            [Tiers.extreme]: "20",
            [Tiers.high]: "18",
            [Tiers.moderate]: "16",
            [Tiers.low]: "13"
        },
        "8": {
            [Tiers.extreme]: "22",
            [Tiers.high]: "20",
            [Tiers.moderate]: "18",
            [Tiers.low]: "15"
        },
        "9": {
            [Tiers.extreme]: "23",
            [Tiers.high]: "21",
            [Tiers.moderate]: "19",
            [Tiers.low]: "16"
        },
        "10": {
            [Tiers.extreme]: "25",
            [Tiers.high]: "23",
            [Tiers.moderate]: "21",
            [Tiers.low]: "17"
        },
        "11": {
            [Tiers.extreme]: "27",
            [Tiers.high]: "24",
            [Tiers.moderate]: "22",
            [Tiers.low]: "19"
        },
        "12": {
            [Tiers.extreme]: "28",
            [Tiers.high]: "26",
            [Tiers.moderate]: "24",
            [Tiers.low]: "20"
        },
        "13": {
            [Tiers.extreme]: "29",
            [Tiers.high]: "27",
            [Tiers.moderate]: "25",
            [Tiers.low]: "21"
        },
        "14": {
            [Tiers.extreme]: "31",
            [Tiers.high]: "29",
            [Tiers.moderate]: "27",
            [Tiers.low]: "23"
        },
        "15": {
            [Tiers.extreme]: "32",
            [Tiers.high]: "30",
            [Tiers.moderate]: "28",
            [Tiers.low]: "24"
        },
        "16": {
            [Tiers.extreme]: "34",
            [Tiers.high]: "32",
            [Tiers.moderate]: "30",
            [Tiers.low]: "25"
        },
        "17": {
            [Tiers.extreme]: "35",
            [Tiers.high]: "33",
            [Tiers.moderate]: "31",
            [Tiers.low]: "27"
        },
        "18": {
            [Tiers.extreme]: "37",
            [Tiers.high]: "35",
            [Tiers.moderate]: "33",
            [Tiers.low]: "28"
        },
        "19": {
            [Tiers.extreme]: "38",
            [Tiers.high]: "36",
            [Tiers.moderate]: "34",
            [Tiers.low]: "29"
        },
        "20": {
            [Tiers.extreme]: "40",
            [Tiers.high]: "38",
            [Tiers.moderate]: "36",
            [Tiers.low]: "31"
        },
        "21": {
            [Tiers.extreme]: "41",
            [Tiers.high]: "39",
            [Tiers.moderate]: "37",
            [Tiers.low]: "32"
        },
        "22": {
            [Tiers.extreme]: "43",
            [Tiers.high]: "41",
            [Tiers.moderate]: "39",
            [Tiers.low]: "33"
        },
        "23": {
            [Tiers.extreme]: "44",
            [Tiers.high]: "42",
            [Tiers.moderate]: "40",
            [Tiers.low]: "35"
        },
        "24": {
            [Tiers.extreme]: "46",
            [Tiers.high]: "44",
            [Tiers.moderate]: "42",
            [Tiers.low]: "36"
        }
    },
    strikeDamage:{
        "-1": {
            [Tiers.extreme]: "4",
            [Tiers.high]: "3",
            [Tiers.moderate]: "3",
            [Tiers.low]: "2"
        },
        "0": {
            [Tiers.extreme]: "6",
            [Tiers.high]: "5",
            [Tiers.moderate]: "4",
            [Tiers.low]: "3"
        },
        "1": {
            [Tiers.extreme]: "8",
            [Tiers.high]: "6",
            [Tiers.moderate]: "5",
            [Tiers.low]: "4"
        },
        "2": {
            [Tiers.extreme]: "11",
            [Tiers.high]: "9",
            [Tiers.moderate]: "8",
            [Tiers.low]: "6"
        },
        "3": {
            [Tiers.extreme]: "15",
            [Tiers.high]: "12",
            [Tiers.moderate]: "10",
            [Tiers.low]: "8"
        },
        "4": {
            [Tiers.extreme]: "18",
            [Tiers.high]: "14",
            [Tiers.moderate]: "12",
            [Tiers.low]: "9"
        },
        "5": {
            [Tiers.extreme]: "20",
            [Tiers.high]: "16",
            [Tiers.moderate]: "13",
            [Tiers.low]: "11"
        },
        "6": {
            [Tiers.extreme]: "23",
            [Tiers.high]: "18",
            [Tiers.moderate]: "15",
            [Tiers.low]: "12"
        },
        "7": {
            [Tiers.extreme]: "25",
            [Tiers.high]: "20",
            [Tiers.moderate]: "17",
            [Tiers.low]: "13"
        },
        "8": {
            [Tiers.extreme]: "28",
            [Tiers.high]: "22",
            [Tiers.moderate]: "18",
            [Tiers.low]: "15"
        },
        "9": {
            [Tiers.extreme]: "30",
            [Tiers.high]: "24",
            [Tiers.moderate]: "20",
            [Tiers.low]: "16"
        },
        "10": {
            [Tiers.extreme]: "33",
            [Tiers.high]: "26",
            [Tiers.moderate]: "22",
            [Tiers.low]: "17"
        },
        "11": {
            [Tiers.extreme]: "35",
            [Tiers.high]: "28",
            [Tiers.moderate]: "23",
            [Tiers.low]: "19"
        },
        "12": {
            [Tiers.extreme]: "38",
            [Tiers.high]: "30",
            [Tiers.moderate]: "25",
            [Tiers.low]: "20"
        },
        "13": {
            [Tiers.extreme]: "40",
            [Tiers.high]: "32",
            [Tiers.moderate]: "27",
            [Tiers.low]: "21"
        },
        "14": {
            [Tiers.extreme]: "43",
            [Tiers.high]: "34",
            [Tiers.moderate]: "28",
            [Tiers.low]: "23"
        },
        "15": {
            [Tiers.extreme]: "45",
            [Tiers.high]: "36",
            [Tiers.moderate]: "30",
            [Tiers.low]: "24"
        },
        "16": {
            [Tiers.extreme]: "48",
            [Tiers.high]: "37",
            [Tiers.moderate]: "31",
            [Tiers.low]: "25"
        },
        "17": {
            [Tiers.extreme]: "50",
            [Tiers.high]: "38",
            [Tiers.moderate]: "32",
            [Tiers.low]: "26"
        },
        "18": {
            [Tiers.extreme]: "53",
            [Tiers.high]: "40",
            [Tiers.moderate]: "33",
            [Tiers.low]: "27"
        },
        "19": {
            [Tiers.extreme]: "55",
            [Tiers.high]: "42",
            [Tiers.moderate]: "35",
            [Tiers.low]: "28"
        },
        "20": {
            [Tiers.extreme]: "58",
            [Tiers.high]: "44",
            [Tiers.moderate]: "37",
            [Tiers.low]: "29"
        },
        "21": {
            [Tiers.extreme]: "60",
            [Tiers.high]: "46",
            [Tiers.moderate]: "38",
            [Tiers.low]: "31"
        },
        "22": {
            [Tiers.extreme]: "63",
            [Tiers.high]: "48",
            [Tiers.moderate]: "40",
            [Tiers.low]: "32"
        },
        "23": {
            [Tiers.extreme]: "65",
            [Tiers.high]: "50",
            [Tiers.moderate]: "42",
            [Tiers.low]: "33"
        },
        "24": {
            [Tiers.extreme]: "68",
            [Tiers.high]: "52",
            [Tiers.moderate]: "44",
            [Tiers.low]: "35"
        }
    },
    strikeDamageRoll: {
        "-1": {
            [Tiers.extreme]: "1d6+1",
            [Tiers.high]: "1d4+1",
            [Tiers.moderate]: "1d4",
            [Tiers.low]: "1d4"
        },
        "0": {
            [Tiers.extreme]: "1d6+3",
            [Tiers.high]: "1d6+2",
            [Tiers.moderate]: "1d4+2",
            [Tiers.low]: "1d4+1"
        },
        "1": {
            [Tiers.extreme]: "1d8+4",
            [Tiers.high]: "1d6+3",
            [Tiers.moderate]: "1d6+2",
            [Tiers.low]: "1d4+2"
        },
        "2": {
            [Tiers.extreme]: "1d12+4",
            [Tiers.high]: "1d10+4",
            [Tiers.moderate]: "1d8+4",
            [Tiers.low]: "1d6+3"
        },
        "3": {
            [Tiers.extreme]: "1d12+8",
            [Tiers.high]: "1d10+6",
            [Tiers.moderate]: "1d8+6",
            [Tiers.low]: "1d6+5"
        },
        "4": {
            [Tiers.extreme]: "2d10+7",
            [Tiers.high]: "2d8+5",
            [Tiers.moderate]: "2d6+5",
            [Tiers.low]: "2d4+4"
        },
        "5": {
            [Tiers.extreme]: "2d12+7",
            [Tiers.high]: "2d8+7",
            [Tiers.moderate]: "2d6+6",
            [Tiers.low]: "2d4+6"
        },
        "6": {
            [Tiers.extreme]: "2d12+10",
            [Tiers.high]: "2d8+9",
            [Tiers.moderate]: "2d6+8",
            [Tiers.low]: "2d4+7"
        },
        "7": {
            [Tiers.extreme]: "2d12+12",
            [Tiers.high]: "2d10+9",
            [Tiers.moderate]: "2d8+8",
            [Tiers.low]: "2d6+6"
        },
        "8": {
            [Tiers.extreme]: "2d12+15",
            [Tiers.high]: "2d10+11",
            [Tiers.moderate]: "2d8+9",
            [Tiers.low]: "2d6+8"
        },
        "9": {
            [Tiers.extreme]: "2d12+17",
            [Tiers.high]: "2d10+13",
            [Tiers.moderate]: "2d8+11",
            [Tiers.low]: "2d6+9"
        },
        "10": {
            [Tiers.extreme]: "2d12+20",
            [Tiers.high]: "2d12+13",
            [Tiers.moderate]: "2d10+11",
            [Tiers.low]: "2d6+10"
        },
        "11": {
            [Tiers.extreme]: "2d12+22",
            [Tiers.high]: "2d12+15",
            [Tiers.moderate]: "2d10+12",
            [Tiers.low]: "2d8+10"
        },
        "12": {
            [Tiers.extreme]: "3d12+19",
            [Tiers.high]: "3d10+14",
            [Tiers.moderate]: "3d8+12",
            [Tiers.low]: "3d6+10"
        },
        "13": {
            [Tiers.extreme]: "3d12+21",
            [Tiers.high]: "3d10+16",
            [Tiers.moderate]: "3d8+14",
            [Tiers.low]: "3d6+11"
        },
        "14": {
            [Tiers.extreme]: "3d12+24",
            [Tiers.high]: "3d10+18",
            [Tiers.moderate]: "3d8+15",
            [Tiers.low]: "3d6+13"
        },
        "15": {
            [Tiers.extreme]: "3d12+26",
            [Tiers.high]: "3d12+17",
            [Tiers.moderate]: "3d10+14",
            [Tiers.low]: "3d6+14"
        },
        "16": {
            [Tiers.extreme]: "3d12+29",
            [Tiers.high]: "3d12+18",
            [Tiers.moderate]: "3d10+15",
            [Tiers.low]: "3d6+15"
        },
        "17": {
            [Tiers.extreme]: "3d12+31",
            [Tiers.high]: "3d12+19",
            [Tiers.moderate]: "3d10+16",
            [Tiers.low]: "3d6+16"
        },
        "18": {
            [Tiers.extreme]: "3d12+34",
            [Tiers.high]: "3d12+20",
            [Tiers.moderate]: "3d10+17",
            [Tiers.low]: "3d6+17"
        },
        "19": {
            [Tiers.extreme]: "4d12+29",
            [Tiers.high]: "4d10+20",
            [Tiers.moderate]: "4d8+17",
            [Tiers.low]: "4d6+14"
        },
        "20": {
            [Tiers.extreme]: "4d12+32",
            [Tiers.high]: "4d10+22",
            [Tiers.moderate]: "4d8+19",
            [Tiers.low]: "4d6+15"
        },
        "21": {
            [Tiers.extreme]: "4d12+34",
            [Tiers.high]: "4d10+24",
            [Tiers.moderate]: "4d8+20",
            [Tiers.low]: "4d6+17"
        },
        "22": {
            [Tiers.extreme]: "4d12+37",
            [Tiers.high]: "4d10+26",
            [Tiers.moderate]: "4d8+22",
            [Tiers.low]: "4d6+18"
        },
        "23": {
            [Tiers.extreme]: "4d12+39",
            [Tiers.high]: "4d12+24",
            [Tiers.moderate]: "4d10+20",
            [Tiers.low]: "4d6+19"
        },
        "24": {
            [Tiers.extreme]: "4d12+42",
            [Tiers.high]: "4d12+26",
            [Tiers.moderate]: "4d10+22",
            [Tiers.low]: "4d6+21"
        }
    },
    spellcasting: {
        "-1": {
            [Tiers.extreme]: "11",
            [Tiers.high]: "8",
            [Tiers.moderate]: "5",
        },
        "0": {
            [Tiers.extreme]: "11",
            [Tiers.high]: "8",
            [Tiers.moderate]: "5",
        },
        "1": {
            [Tiers.extreme]: "12",
            [Tiers.high]: "9",
            [Tiers.moderate]: "6",
        },
        "2": {
            [Tiers.extreme]: "14",
            [Tiers.high]: "10",
            [Tiers.moderate]: "7",
        },
        "3": {
            [Tiers.extreme]: "15",
            [Tiers.high]: "12",
            [Tiers.moderate]: "9",
        },
        "4": {
            [Tiers.extreme]: "17",
            [Tiers.high]: "13",
            [Tiers.moderate]: "10",
        },
        "5": {
            [Tiers.extreme]: "18",
            [Tiers.high]: "14",
            [Tiers.moderate]: "11",
        },
        "6": {
            [Tiers.extreme]: "19",
            [Tiers.high]: "16",
            [Tiers.moderate]: "13",
        },
        "7": {
            [Tiers.extreme]: "21",
            [Tiers.high]: "17",
            [Tiers.moderate]: "14",
        },
        "8": {
            [Tiers.extreme]: "22",
            [Tiers.high]: "18",
            [Tiers.moderate]: "15",
        },
        "9": {
            [Tiers.extreme]: "24",
            [Tiers.high]: "20",
            [Tiers.moderate]: "17",
        },
        "10": {
            [Tiers.extreme]: "25",
            [Tiers.high]: "21",
            [Tiers.moderate]: "18",
        },
        "11": {
            [Tiers.extreme]: "26",
            [Tiers.high]: "22",
            [Tiers.moderate]: "19",
        },
        "12": {
            [Tiers.extreme]: "28",
            [Tiers.high]: "24",
            [Tiers.moderate]: "21",
        },
        "13": {
            [Tiers.extreme]: "29",
            [Tiers.high]: "25",
            [Tiers.moderate]: "22",
        },
        "14": {
            [Tiers.extreme]: "31",
            [Tiers.high]: "26",
            [Tiers.moderate]: "23",
        },
        "15": {
            [Tiers.extreme]: "32",
            [Tiers.high]: "28",
            [Tiers.moderate]: "25",
        },
        "16": {
            [Tiers.extreme]: "33",
            [Tiers.high]: "29",
            [Tiers.moderate]: "26",
        },
        "17": {
            [Tiers.extreme]: "35",
            [Tiers.high]: "30",
            [Tiers.moderate]: "27",
        },
        "18": {
            [Tiers.extreme]: "36",
            [Tiers.high]: "32",
            [Tiers.moderate]: "29",
        },
        "19": {
            [Tiers.extreme]: "38",
            [Tiers.high]: "33",
            [Tiers.moderate]: "30",
        },
        "20": {
            [Tiers.extreme]: "39",
            [Tiers.high]: "34",
            [Tiers.moderate]: "31",
        },
        "21": {
            [Tiers.extreme]: "40",
            [Tiers.high]: "36",
            [Tiers.moderate]: "33",
        },
        "22": {
            [Tiers.extreme]: "42",
            [Tiers.high]: "37",
            [Tiers.moderate]: "34",
        },
        "23": {
            [Tiers.extreme]: "43",
            [Tiers.high]: "38",
            [Tiers.moderate]: "35",
        },
        "24": {
            [Tiers.extreme]: "44",
            [Tiers.high]: "40",
            [Tiers.moderate]: "37",
        }
    },
    spellDC: {
        "-1": {
            [Tiers.extreme]: "19",
            [Tiers.high]: "16",
            [Tiers.moderate]: "13",
        },
        "0": {
            [Tiers.extreme]: "19",
            [Tiers.high]: "16",
            [Tiers.moderate]: "13",
        },
        "1": {
            [Tiers.extreme]: "20",
            [Tiers.high]: "17",
            [Tiers.moderate]: "14",
        },
        "2": {
            [Tiers.extreme]: "22",
            [Tiers.high]: "18",
            [Tiers.moderate]: "15",
        },
        "3": {
            [Tiers.extreme]: "23",
            [Tiers.high]: "20",
            [Tiers.moderate]: "17",
        },
        "4": {
            [Tiers.extreme]: "25",
            [Tiers.high]: "21",
            [Tiers.moderate]: "18",
        },
        "5": {
            [Tiers.extreme]: "26",
            [Tiers.high]: "22",
            [Tiers.moderate]: "19",
        },
        "6": {
            [Tiers.extreme]: "27",
            [Tiers.high]: "24",
            [Tiers.moderate]: "21",
        },
        "7": {
            [Tiers.extreme]: "29",
            [Tiers.high]: "25",
            [Tiers.moderate]: "22",
        },
        "8": {
            [Tiers.extreme]: "30",
            [Tiers.high]: "26",
            [Tiers.moderate]: "23",
        },
        "9": {
            [Tiers.extreme]: "32",
            [Tiers.high]: "28",
            [Tiers.moderate]: "25",
        },
        "10": {
            [Tiers.extreme]: "33",
            [Tiers.high]: "29",
            [Tiers.moderate]: "26",
        },
        "11": {
            [Tiers.extreme]: "34",
            [Tiers.high]: "30",
            [Tiers.moderate]: "27",
        },
        "12": {
            [Tiers.extreme]: "36",
            [Tiers.high]: "32",
            [Tiers.moderate]: "29",
        },
        "13": {
            [Tiers.extreme]: "37",
            [Tiers.high]: "33",
            [Tiers.moderate]: "30",
        },
        "14": {
            [Tiers.extreme]: "39",
            [Tiers.high]: "34",
            [Tiers.moderate]: "31",
        },
        "15": {
            [Tiers.extreme]: "40",
            [Tiers.high]: "36",
            [Tiers.moderate]: "33",
        },
        "16": {
            [Tiers.extreme]: "41",
            [Tiers.high]: "37",
            [Tiers.moderate]: "34",
        },
        "17": {
            [Tiers.extreme]: "43",
            [Tiers.high]: "38",
            [Tiers.moderate]: "35",
        },
        "18": {
            [Tiers.extreme]: "44",
            [Tiers.high]: "40",
            [Tiers.moderate]: "37",
        },
        "19": {
            [Tiers.extreme]: "46",
            [Tiers.high]: "41",
            [Tiers.moderate]: "38",
        },
        "20": {
            [Tiers.extreme]: "47",
            [Tiers.high]: "42",
            [Tiers.moderate]: "39",
        },
        "21": {
            [Tiers.extreme]: "48",
            [Tiers.high]: "44",
            [Tiers.moderate]: "41",
        },
        "22": {
            [Tiers.extreme]: "50",
            [Tiers.high]: "45",
            [Tiers.moderate]: "42",
        },
        "23": {
            [Tiers.extreme]: "51",
            [Tiers.high]: "46",
            [Tiers.moderate]: "43",
        },
        "24": {
            [Tiers.extreme]: "52",
            [Tiers.high]: "48",
            [Tiers.moderate]: "45",
        }
    },
    skills: {
        "-1": {
            [Tiers.extreme]: "8",
            [Tiers.high]: "5",
            [Tiers.moderate]: "4",
            [Tiers.low]: "2"
        },
        "0": {
            [Tiers.extreme]: "9",
            [Tiers.high]: "6",
            [Tiers.moderate]: "5",
            [Tiers.low]: "3"
        },
        "1": {
            [Tiers.extreme]: "10",
            [Tiers.high]: "7",
            [Tiers.moderate]: "6",
            [Tiers.low]: "4"
        },
        "2": {
            [Tiers.extreme]: "11",
            [Tiers.high]: "8",
            [Tiers.moderate]: "7",
            [Tiers.low]: "5"
        },
        "3": {
            [Tiers.extreme]: "13",
            [Tiers.high]: "10",
            [Tiers.moderate]: "9",
            [Tiers.low]: "6"
        },
        "4": {
            [Tiers.extreme]: "15",
            [Tiers.high]: "12",
            [Tiers.moderate]: "10",
            [Tiers.low]: "8"
        },
        "5": {
            [Tiers.extreme]: "16",
            [Tiers.high]: "13",
            [Tiers.moderate]: "12",
            [Tiers.low]: "9"
        },
        "6": {
            [Tiers.extreme]: "18",
            [Tiers.high]: "15",
            [Tiers.moderate]: "13",
            [Tiers.low]: "10"
        },
        "7": {
            [Tiers.extreme]: "20",
            [Tiers.high]: "17",
            [Tiers.moderate]: "15",
            [Tiers.low]: "12"
        },
        "8": {
            [Tiers.extreme]: "21",
            [Tiers.high]: "18",
            [Tiers.moderate]: "16",
            [Tiers.low]: "13"
        },
        "9": {
            [Tiers.extreme]: "23",
            [Tiers.high]: "20",
            [Tiers.moderate]: "18",
            [Tiers.low]: "14"
        },
        "10": {
            [Tiers.extreme]: "25",
            [Tiers.high]: "22",
            [Tiers.moderate]: "19",
            [Tiers.low]: "16"
        },
        "11": {
            [Tiers.extreme]: "26",
            [Tiers.high]: "23",
            [Tiers.moderate]: "21",
            [Tiers.low]: "18"
        },
        "12": {
            [Tiers.extreme]: "28",
            [Tiers.high]: "25",
            [Tiers.moderate]: "22",
            [Tiers.low]: "19"
        },
        "13": {
            [Tiers.extreme]: "30",
            [Tiers.high]: "27",
            [Tiers.moderate]: "24",
            [Tiers.low]: "21"
        },
        "14": {
            [Tiers.extreme]: "31",
            [Tiers.high]: "28",
            [Tiers.moderate]: "25",
            [Tiers.low]: "22"
        },
        "15": {
            [Tiers.extreme]: "33",
            [Tiers.high]: "30",
            [Tiers.moderate]: "27",
            [Tiers.low]: "23"
        },
        "16": {
            [Tiers.extreme]: "35",
            [Tiers.high]: "32",
            [Tiers.moderate]: "28",
            [Tiers.low]: "25"
        },
        "17": {
            [Tiers.extreme]: "36",
            [Tiers.high]: "33",
            [Tiers.moderate]: "30",
            [Tiers.low]: "26"
        },
        "18": {
            [Tiers.extreme]: "38",
            [Tiers.high]: "35",
            [Tiers.moderate]: "31",
            [Tiers.low]: "28"
        },
        "19": {
            [Tiers.extreme]: "40",
            [Tiers.high]: "37",
            [Tiers.moderate]: "33",
            [Tiers.low]: "29"
        },
        "20": {
            [Tiers.extreme]: "41",
            [Tiers.high]: "38",
            [Tiers.moderate]: "34",
            [Tiers.low]: "30"
        },
        "21": {
            [Tiers.extreme]: "43",
            [Tiers.high]: "40",
            [Tiers.moderate]: "36",
            [Tiers.low]: "31"
        },
        "22": {
            [Tiers.extreme]: "45",
            [Tiers.high]: "42",
            [Tiers.moderate]: "37",
            [Tiers.low]: "32"
        },
        "23": {
            [Tiers.extreme]: "46",
            [Tiers.high]: "43",
            [Tiers.moderate]: "38",
            [Tiers.low]: "34"
        },
        "24": {
            [Tiers.extreme]: "48",
            [Tiers.high]: "45",
            [Tiers.moderate]: "40",
            [Tiers.low]: "36"
        }
    },
    resistWeak: {
        "-1": {
            [ResistTiers.minimum]: "1",
            [ResistTiers.maximum]: "1",
        },
        "0": {
            [ResistTiers.minimum]: "1",
            [ResistTiers.maximum]: "3",
        },
        "1": {
            [ResistTiers.minimum]: "2",
            [ResistTiers.maximum]: "3",
        },
        "2": {
            [ResistTiers.minimum]: "2",
            [ResistTiers.maximum]: "5",
        },
        "3": {
            [ResistTiers.minimum]: "3",
            [ResistTiers.maximum]: "6",
        },
        "4": {
            [ResistTiers.minimum]: "4",
            [ResistTiers.maximum]: "7",
        },
        "5": {
            [ResistTiers.minimum]: "4",
            [ResistTiers.maximum]: "8",
        },
        "6": {
            [ResistTiers.minimum]: "5",
            [ResistTiers.maximum]: "9",
        },
        "7": {
            [ResistTiers.minimum]: "5",
            [ResistTiers.maximum]: "10",
        },
        "8": {
            [ResistTiers.minimum]: "6",
            [ResistTiers.maximum]: "11",
        },
        "9": {
            [ResistTiers.minimum]: "6",
            [ResistTiers.maximum]: "12",
        },
        "10": {
            [ResistTiers.minimum]: "7",
            [ResistTiers.maximum]: "13",
        },
        "11": {
            [ResistTiers.minimum]: "7",
            [ResistTiers.maximum]: "14",
        },
        "12": {
            [ResistTiers.minimum]: "8",
            [ResistTiers.maximum]: "15",
        },
        "13": {
            [ResistTiers.minimum]: "8",
            [ResistTiers.maximum]: "16",
        },
        "14": {
            [ResistTiers.minimum]: "9",
            [ResistTiers.maximum]: "17",
        },
        "15": {
            [ResistTiers.minimum]: "9",
            [ResistTiers.maximum]: "18",
        },
        "16": {
            [ResistTiers.minimum]: "9",
            [ResistTiers.maximum]: "19",
        },
        "17": {
            [ResistTiers.minimum]: "10",
            [ResistTiers.maximum]: "19",
        },
        "18": {
            [ResistTiers.minimum]: "10",
            [ResistTiers.maximum]: "20",
        },
        "19": {
            [ResistTiers.minimum]: "11",
            [ResistTiers.maximum]: "21",
        },
        "20": {
            [ResistTiers.minimum]: "11",
            [ResistTiers.maximum]: "22",
        },
        "21": {
            [ResistTiers.minimum]: "12",
            [ResistTiers.maximum]: "23",
        },
        "22": {
            [ResistTiers.minimum]: "12",
            [ResistTiers.maximum]: "24",
        },
        "23": {
            [ResistTiers.minimum]: "13",
            [ResistTiers.maximum]: "25",
        },
        "24": {
            [ResistTiers.minimum]: "13",
            [ResistTiers.maximum]: "26",
        }
    },
    areaDamage: {
        "-1": {
            [AreaDamageTiers.unlimited]: "2",
            [AreaDamageTiers.limited]: "4",
        },
        "0": {
            [AreaDamageTiers.unlimited]: "4",
            [AreaDamageTiers.limited]: "6",
        },
        "1": {
            [AreaDamageTiers.unlimited]: "5",
            [AreaDamageTiers.limited]: "7",
        },
        "2": {
            [AreaDamageTiers.unlimited]: "7",
            [AreaDamageTiers.limited]: "11",
        },
        "3": {
            [AreaDamageTiers.unlimited]: "9",
            [AreaDamageTiers.limited]: "14",
        },
        "4": {
            [AreaDamageTiers.unlimited]: "11",
            [AreaDamageTiers.limited]: "18",
        },
        "5": {
            [AreaDamageTiers.unlimited]: "12",
            [AreaDamageTiers.limited]: "21",
        },
        "6": {
            [AreaDamageTiers.unlimited]: "14",
            [AreaDamageTiers.limited]: "25",
        },
        "7": {
            [AreaDamageTiers.unlimited]: "15",
            [AreaDamageTiers.limited]: "28",
        },
        "8": {
            [AreaDamageTiers.unlimited]: "17",
            [AreaDamageTiers.limited]: "32",
        },
        "9": {
            [AreaDamageTiers.unlimited]: "18",
            [AreaDamageTiers.limited]: "35",
        },
        "10": {
            [AreaDamageTiers.unlimited]: "20",
            [AreaDamageTiers.limited]: "39",
        },
        "11": {
            [AreaDamageTiers.unlimited]: "21",
            [AreaDamageTiers.limited]: "42",
        },
        "12": {
            [AreaDamageTiers.unlimited]: "23",
            [AreaDamageTiers.limited]: "46",
        },
        "13": {
            [AreaDamageTiers.unlimited]: "24",
            [AreaDamageTiers.limited]: "49",
        },
        "14": {
            [AreaDamageTiers.unlimited]: "26",
            [AreaDamageTiers.limited]: "53",
        },
        "15": {
            [AreaDamageTiers.unlimited]: "27",
            [AreaDamageTiers.limited]: "56",
        },
        "16": {
            [AreaDamageTiers.unlimited]: "28",
            [AreaDamageTiers.limited]: "60",
        },
        "17": {
            [AreaDamageTiers.unlimited]: "29",
            [AreaDamageTiers.limited]: "63",
        },
        "18": {
            [AreaDamageTiers.unlimited]: "30",
            [AreaDamageTiers.limited]: "67",
        },
        "19": {
            [AreaDamageTiers.unlimited]: "32",
            [AreaDamageTiers.limited]: "70",
        },
        "20": {
            [AreaDamageTiers.unlimited]: "33",
            [AreaDamageTiers.limited]: "74",
        },
        "21": {
            [AreaDamageTiers.unlimited]: "35",
            [AreaDamageTiers.limited]: "77",
        },
        "22": {
            [AreaDamageTiers.unlimited]: "36",
            [AreaDamageTiers.limited]: "81",
        },
        "23": {
            [AreaDamageTiers.unlimited]: "38",
            [AreaDamageTiers.limited]: "84",
        },
        "24": {
            [AreaDamageTiers.unlimited]: "39",
            [AreaDamageTiers.limited]: "88",
        }
    },
    // I just made this one up. It's intended for flat damage addition like sneak attack or Focused Assault.
    // The tiers are just sneak attack progression with d4, d6, d8, and d10
    additionalDamage: {
        "-1": {
            [Tiers.low]: "2",
            [Tiers.moderate]: "3",
            [Tiers.high]: "4",
            [Tiers.extreme]: "5"
        },
        "0": {
            [Tiers.low]: "3",
            [Tiers.moderate]: "4",
            [Tiers.high]: "5",
            [Tiers.extreme]: "6"
        },
        "1": {
            [Tiers.low]: "3",
            [Tiers.moderate]: "4",
            [Tiers.high]: "5",
            [Tiers.extreme]: "7"
        },
        "2": {
            [Tiers.low]: "4",
            [Tiers.moderate]: "5",
            [Tiers.high]: "6",
            [Tiers.extreme]: "8"
        },
        "3": {
            [Tiers.low]: "4",
            [Tiers.moderate]: "6",
            [Tiers.high]: "7",
            [Tiers.extreme]: "9"
        },
        "4": {
            [Tiers.low]: "5",
            [Tiers.moderate]: "6",
            [Tiers.high]: "8",
            [Tiers.extreme]: "10"
        },
        "5": {
            [Tiers.low]: "5",
            [Tiers.moderate]: "7",
            [Tiers.high]: "9",
            [Tiers.extreme]: "11"
        },
        "6": {
            [Tiers.low]: "5",
            [Tiers.moderate]: "7",
            [Tiers.high]: "10",
            [Tiers.extreme]: "12"
        },
        "7": {
            [Tiers.low]: "6",
            [Tiers.moderate]: "8",
            [Tiers.high]: "10",
            [Tiers.extreme]: "12"
        },
        "8": {
            [Tiers.low]: "6",
            [Tiers.moderate]: "8",
            [Tiers.high]: "11",
            [Tiers.extreme]: "13"
        },
        "9": {
            [Tiers.low]: "6",
            [Tiers.moderate]: "9",
            [Tiers.high]: "11",
            [Tiers.extreme]: "14"
        },
        "10": {
            [Tiers.low]: "7",
            [Tiers.moderate]: "9",
            [Tiers.high]: "12",
            [Tiers.extreme]: "14"
        },
        "11": {
            [Tiers.low]: "7",
            [Tiers.moderate]: "10",
            [Tiers.high]: "12",
            [Tiers.extreme]: "15"
        },
        "12": {
            [Tiers.low]: "7",
            [Tiers.moderate]: "10",
            [Tiers.high]: "13",
            [Tiers.extreme]: "16"
        },
        "13": {
            [Tiers.low]: "8",
            [Tiers.moderate]: "11",
            [Tiers.high]: "14",
            [Tiers.extreme]: "17"
        },
        "14": {
            [Tiers.low]: "8",
            [Tiers.moderate]: "11",
            [Tiers.high]: "14",
            [Tiers.extreme]: "17"
        },
        "15": {
            [Tiers.low]: "8",
            [Tiers.moderate]: "11",
            [Tiers.high]: "15",
            [Tiers.extreme]: "18"
        },
        "16": {
            [Tiers.low]: "8",
            [Tiers.moderate]: "12",
            [Tiers.high]: "15",
            [Tiers.extreme]: "19"
        },
        "17": {
            [Tiers.low]: "9",
            [Tiers.moderate]: "12",
            [Tiers.high]: "16",
            [Tiers.extreme]: "19"
        },
        "18": {
            [Tiers.low]: "9",
            [Tiers.moderate]: "13",
            [Tiers.high]: "16",
            [Tiers.extreme]: "20"
        },
        "19": {
            [Tiers.low]: "9",
            [Tiers.moderate]: "13",
            [Tiers.high]: "17",
            [Tiers.extreme]: "21"
        },
        "20": {
            [Tiers.low]: "10",
            [Tiers.moderate]: "14",
            [Tiers.high]: "17",
            [Tiers.extreme]: "21"
        },
        "21": {
            [Tiers.low]: "10",
            [Tiers.moderate]: "14",
            [Tiers.high]: "18",
            [Tiers.extreme]: "22"
        },
        "22": {
            [Tiers.low]: "10",
            [Tiers.moderate]: "14",
            [Tiers.high]: "19",
            [Tiers.extreme]: "23"
        },
        "23": {
            [Tiers.low]: "11",
            [Tiers.moderate]: "15",
            [Tiers.high]: "19",
            [Tiers.extreme]: "23"
        },
        "24": {
            [Tiers.low]: "11",
            [Tiers.moderate]: "15",
            [Tiers.high]: "20",
            [Tiers.extreme]: "24"
        }
    }
}

export const statisticValues = {
    [Statistics.str]: aliases.abilityScores,
    [Statistics.dex]: aliases.abilityScores,
    [Statistics.con]: aliases.abilityScores,
    [Statistics.int]: aliases.abilityScores,
    [Statistics.wis]: aliases.abilityScores,
    [Statistics.cha]: aliases.abilityScores,

    [Statistics.hp]: aliases.hitPoints,

    [Statistics.perception]: aliases.perceptionSaves,

    [Statistics.ac]: aliases.armorClass,

    [Statistics.resistWeak]: aliases.resistWeak,

    [Statistics.fortitude]: aliases.perceptionSaves,
    [Statistics.reflex]: aliases.perceptionSaves,
    [Statistics.will]: aliases.perceptionSaves,

    [Statistics.strikeBonus]: aliases.strikeBonus,
    [Statistics.strikeDamage]: aliases.strikeDamage,
    [Statistics.spellcasting]: aliases.spellcasting,
    [Statistics.spellDC]: aliases.spellDC,

    [Statistics.acrobatics]: aliases.skills,
    [Statistics.arcana]: aliases.skills,
    [Statistics.athletics]: aliases.skills,
    [Statistics.crafting]: aliases.skills,
    [Statistics.deception]: aliases.skills,
    [Statistics.diplomacy]: aliases.skills,
    [Statistics.intimidation]: aliases.skills,
    [Statistics.medicine]: aliases.skills,
    [Statistics.nature]: aliases.skills,
    [Statistics.occultism]: aliases.skills,
    [Statistics.performance]: aliases.skills,
    [Statistics.religion]: aliases.skills,
    [Statistics.society]: aliases.skills,
    [Statistics.stealth]: aliases.skills,
    [Statistics.survival]: aliases.skills,
    [Statistics.thievery]: aliases.skills,

    [Statistics.areaDamage]: aliases.areaDamage,
    [Statistics.additionalDamage]: aliases.additionalDamage
}

export const diceValues = {
    [Dice.d4]: 2.5,
    [Dice.d6]: 3.5,
    [Dice.d8]: 4.5,
    [Dice.d10]: 5.5,
    [Dice.d12]: 6.5
}

export const inlineAllowDice = {
    [Statistics.strikeDamage]: AllowDice.any,
    [Statistics.areaDamage]: AllowDice.sameOnly,
    [Statistics.additionalDamage]: AllowDice.sameOnly
}

export const inlineDamageLabel = {
    [Statistics.strikeDamage]: "PF2EADJUSTMONSTERLEVEL.inlineStrikeDamage",
    [Statistics.areaDamage]: "PF2EADJUSTMONSTERLEVEL.inlineAreaDamage",
    [Statistics.additionalDamage]: "PF2EADJUSTMONSTERLEVEL.inlineExtraDamage"
}