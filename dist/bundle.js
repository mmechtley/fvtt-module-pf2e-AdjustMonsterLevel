(()=>{"use strict";const e="pf2e-adjust-monster-level",t="testMode",i=["-1","0","1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24"];var m,r;!function(e){e.name="PF2EADJUSTMONSTERLEVEL.name",e.level="PF2EADJUSTMONSTERLEVEL.level",e.str="PF2EADJUSTMONSTERLEVEL.str",e.dex="PF2EADJUSTMONSTERLEVEL.dex",e.con="PF2EADJUSTMONSTERLEVEL.con",e.int="PF2EADJUSTMONSTERLEVEL.int",e.wis="PF2EADJUSTMONSTERLEVEL.wis",e.cha="PF2EADJUSTMONSTERLEVEL.cha",e.hp="PF2EADJUSTMONSTERLEVEL.hp",e.per="PF2EADJUSTMONSTERLEVEL.per",e.ac="PF2EADJUSTMONSTERLEVEL.ac",e.resistWeak="PF2EADJUSTMONSTERLEVEL.resistWeak",e.fort="PF2EADJUSTMONSTERLEVEL.fort",e.ref="PF2EADJUSTMONSTERLEVEL.ref",e.wil="PF2EADJUSTMONSTERLEVEL.wil",e.strikeBonus="PF2EADJUSTMONSTERLEVEL.strikeBonus",e.strikeDamage="PF2EADJUSTMONSTERLEVEL.strikeDamage",e.spellcasting="PF2EADJUSTMONSTERLEVEL.spellcasting",e.spellDC="PF2EADJUSTMONSTERLEVEL.spellDC",e.acrobatics="PF2EADJUSTMONSTERLEVEL.acrobatics",e.arcana="PF2EADJUSTMONSTERLEVEL.arcana",e.athletics="PF2EADJUSTMONSTERLEVEL.athletics",e.crafting="PF2EADJUSTMONSTERLEVEL.crafting",e.deception="PF2EADJUSTMONSTERLEVEL.deception",e.diplomacy="PF2EADJUSTMONSTERLEVEL.diplomacy",e.intimidation="PF2EADJUSTMONSTERLEVEL.intimidation",e.medicine="PF2EADJUSTMONSTERLEVEL.medicine",e.nature="PF2EADJUSTMONSTERLEVEL.nature",e.occultism="PF2EADJUSTMONSTERLEVEL.occultism",e.performance="PF2EADJUSTMONSTERLEVEL.performance",e.religion="PF2EADJUSTMONSTERLEVEL.religion",e.society="PF2EADJUSTMONSTERLEVEL.society",e.stealth="PF2EADJUSTMONSTERLEVEL.stealth",e.survival="PF2EADJUSTMONSTERLEVEL.survival",e.thievery="PF2EADJUSTMONSTERLEVEL.thievery",e.description="PF2EADJUSTMONSTERLEVEL.description",e.areaDamage="PF2EADJUSTMONSTERLEVEL.areaDamage"}(m||(m={})),function(e){e.d4="d4",e.d6="d6",e.d8="d8",e.d10="d10",e.d12="d12"}(r||(r={})),m.acrobatics,m.arcana,m.athletics,m.crafting,m.deception,m.diplomacy,m.intimidation,m.medicine,m.nature,m.occultism,m.performance,m.religion,m.society,m.stealth,m.survival,m.thievery;const a={[m.hp]:"system.attributes.hp.max",[m.ac]:"system.attributes.ac.value"},l={[m.str]:"system.abilities.str.mod",[m.dex]:"system.abilities.dex.mod",[m.con]:"system.abilities.con.mod",[m.int]:"system.abilities.int.mod",[m.wis]:"system.abilities.wis.mod",[m.cha]:"system.abilities.cha.mod"},o={[m.per]:"system.attributes.perception.value",[m.fort]:"system.saves.fortitude.value",[m.ref]:"system.saves.reflex.value",[m.wil]:"system.saves.will.value"};var h,d,s,g;!function(e){e.extreme="PF2EADJUSTMONSTERLEVEL.extreme",e.high="PF2EADJUSTMONSTERLEVEL.high",e.moderate="PF2EADJUSTMONSTERLEVEL.moderate",e.low="PF2EADJUSTMONSTERLEVEL.low",e.terrible="PF2EADJUSTMONSTERLEVEL.terrible",e.none="PF2EADJUSTMONSTERLEVEL.none"}(h||(h={})),function(e){e.minimum="PF2EADJUSTMONSTERLEVEL.minimum",e.maximum="PF2EADJUSTMONSTERLEVEL.maximum"}(d||(d={})),function(e){e.unlimited="PF2EADJUSTMONSTERLEVEL.unlimited",e.limited="PF2EADJUSTMONSTERLEVEL.limited"}(s||(s={})),function(e){e.any="any",e.above="above",e.below="below",e.sameOnly="sameOnly"}(g||(g={}));const n={abilityScores:{"-1":{[h.extreme]:"4",[h.high]:"3",[h.moderate]:"2",[h.low]:"0"},0:{[h.extreme]:"4",[h.high]:"3",[h.moderate]:"2",[h.low]:"0"},1:{[h.extreme]:"5",[h.high]:"4",[h.moderate]:"3",[h.low]:"1"},2:{[h.extreme]:"5",[h.high]:"4",[h.moderate]:"3",[h.low]:"1"},3:{[h.extreme]:"5",[h.high]:"4",[h.moderate]:"3",[h.low]:"1"},4:{[h.extreme]:"6",[h.high]:"5",[h.moderate]:"3",[h.low]:"2"},5:{[h.extreme]:"6",[h.high]:"5",[h.moderate]:"4",[h.low]:"2"},6:{[h.extreme]:"7",[h.high]:"5",[h.moderate]:"4",[h.low]:"2"},7:{[h.extreme]:"7",[h.high]:"6",[h.moderate]:"4",[h.low]:"2"},8:{[h.extreme]:"7",[h.high]:"6",[h.moderate]:"4",[h.low]:"3"},9:{[h.extreme]:"7",[h.high]:"6",[h.moderate]:"4",[h.low]:"3"},10:{[h.extreme]:"8",[h.high]:"7",[h.moderate]:"5",[h.low]:"3"},11:{[h.extreme]:"8",[h.high]:"7",[h.moderate]:"5",[h.low]:"3"},12:{[h.extreme]:"8",[h.high]:"7",[h.moderate]:"5",[h.low]:"4"},13:{[h.extreme]:"9",[h.high]:"8",[h.moderate]:"5",[h.low]:"4"},14:{[h.extreme]:"9",[h.high]:"8",[h.moderate]:"5",[h.low]:"4"},15:{[h.extreme]:"9",[h.high]:"8",[h.moderate]:"6",[h.low]:"4"},16:{[h.extreme]:"10",[h.high]:"9",[h.moderate]:"6",[h.low]:"5"},17:{[h.extreme]:"10",[h.high]:"9",[h.moderate]:"6",[h.low]:"4"},18:{[h.extreme]:"10",[h.high]:"9",[h.moderate]:"6",[h.low]:"5"},19:{[h.extreme]:"11",[h.high]:"10",[h.moderate]:"6",[h.low]:"5"},20:{[h.extreme]:"11",[h.high]:"10",[h.moderate]:"7",[h.low]:"6"},21:{[h.extreme]:"11",[h.high]:"10",[h.moderate]:"7",[h.low]:"6"},22:{[h.extreme]:"11",[h.high]:"10",[h.moderate]:"8",[h.low]:"6"},23:{[h.extreme]:"11",[h.high]:"10",[h.moderate]:"8",[h.low]:"6"},24:{[h.extreme]:"13",[h.high]:"12",[h.moderate]:"9",[h.low]:"7"}},hitPoints:{"-1":{[h.high]:"9",[h.moderate]:"7",[h.low]:"5"},0:{[h.high]:"18",[h.moderate]:"15",[h.low]:"12"},1:{[h.high]:"25",[h.moderate]:"20",[h.low]:"15"},2:{[h.high]:"38",[h.moderate]:"30",[h.low]:"23"},3:{[h.high]:"56",[h.moderate]:"45",[h.low]:"34"},4:{[h.high]:"75",[h.moderate]:"60",[h.low]:"45"},5:{[h.high]:"94",[h.moderate]:"75",[h.low]:"56"},6:{[h.high]:"119",[h.moderate]:"95",[h.low]:"71"},7:{[h.high]:"144",[h.moderate]:"115",[h.low]:"86"},8:{[h.high]:"169",[h.moderate]:"135",[h.low]:"101"},9:{[h.high]:"194",[h.moderate]:"155",[h.low]:"116"},10:{[h.high]:"219",[h.moderate]:"175",[h.low]:"131"},11:{[h.high]:"244",[h.moderate]:"195",[h.low]:"146"},12:{[h.high]:"269",[h.moderate]:"215",[h.low]:"161"},13:{[h.high]:"294",[h.moderate]:"235",[h.low]:"176"},14:{[h.high]:"319",[h.moderate]:"255",[h.low]:"191"},15:{[h.high]:"344",[h.moderate]:"275",[h.low]:"206"},16:{[h.high]:"369",[h.moderate]:"295",[h.low]:"221"},17:{[h.high]:"394",[h.moderate]:"315",[h.low]:"236"},18:{[h.high]:"419",[h.moderate]:"335",[h.low]:"251"},19:{[h.high]:"444",[h.moderate]:"355",[h.low]:"266"},20:{[h.high]:"469",[h.moderate]:"375",[h.low]:"281"},21:{[h.high]:"500",[h.moderate]:"400",[h.low]:"300"},22:{[h.high]:"538",[h.moderate]:"430",[h.low]:"323"},23:{[h.high]:"575",[h.moderate]:"460",[h.low]:"345"},24:{[h.high]:"625",[h.moderate]:"500",[h.low]:"375"}},perceptionSaves:{"-1":{[h.extreme]:"9",[h.high]:"8",[h.moderate]:"5",[h.low]:"2",[h.terrible]:"0"},0:{[h.extreme]:"10",[h.high]:"9",[h.moderate]:"6",[h.low]:"3",[h.terrible]:"1"},1:{[h.extreme]:"11",[h.high]:"10",[h.moderate]:"7",[h.low]:"4",[h.terrible]:"2"},2:{[h.extreme]:"12",[h.high]:"11",[h.moderate]:"8",[h.low]:"5",[h.terrible]:"3"},3:{[h.extreme]:"14",[h.high]:"12",[h.moderate]:"9",[h.low]:"6",[h.terrible]:"4"},4:{[h.extreme]:"15",[h.high]:"14",[h.moderate]:"11",[h.low]:"8",[h.terrible]:"6"},5:{[h.extreme]:"17",[h.high]:"15",[h.moderate]:"12",[h.low]:"9",[h.terrible]:"7"},6:{[h.extreme]:"18",[h.high]:"17",[h.moderate]:"14",[h.low]:"11",[h.terrible]:"8"},7:{[h.extreme]:"20",[h.high]:"18",[h.moderate]:"15",[h.low]:"12",[h.terrible]:"10"},8:{[h.extreme]:"21",[h.high]:"19",[h.moderate]:"16",[h.low]:"13",[h.terrible]:"11"},9:{[h.extreme]:"23",[h.high]:"21",[h.moderate]:"18",[h.low]:"15",[h.terrible]:"12"},10:{[h.extreme]:"24",[h.high]:"22",[h.moderate]:"19",[h.low]:"16",[h.terrible]:"14"},11:{[h.extreme]:"26",[h.high]:"24",[h.moderate]:"21",[h.low]:"18",[h.terrible]:"15"},12:{[h.extreme]:"27",[h.high]:"25",[h.moderate]:"22",[h.low]:"19",[h.terrible]:"16"},13:{[h.extreme]:"29",[h.high]:"26",[h.moderate]:"23",[h.low]:"20",[h.terrible]:"18"},14:{[h.extreme]:"30",[h.high]:"28",[h.moderate]:"25",[h.low]:"22",[h.terrible]:"19"},15:{[h.extreme]:"32",[h.high]:"29",[h.moderate]:"26",[h.low]:"23",[h.terrible]:"20"},16:{[h.extreme]:"33",[h.high]:"30",[h.moderate]:"28",[h.low]:"25",[h.terrible]:"22"},17:{[h.extreme]:"35",[h.high]:"32",[h.moderate]:"29",[h.low]:"26",[h.terrible]:"23"},18:{[h.extreme]:"36",[h.high]:"33",[h.moderate]:"30",[h.low]:"27",[h.terrible]:"24"},19:{[h.extreme]:"38",[h.high]:"35",[h.moderate]:"32",[h.low]:"29",[h.terrible]:"26"},20:{[h.extreme]:"39",[h.high]:"36",[h.moderate]:"33",[h.low]:"30",[h.terrible]:"27"},21:{[h.extreme]:"41",[h.high]:"38",[h.moderate]:"35",[h.low]:"32",[h.terrible]:"28"},22:{[h.extreme]:"43",[h.high]:"39",[h.moderate]:"36",[h.low]:"33",[h.terrible]:"30"},23:{[h.extreme]:"44",[h.high]:"40",[h.moderate]:"37",[h.low]:"34",[h.terrible]:"31"},24:{[h.extreme]:"46",[h.high]:"42",[h.moderate]:"38",[h.low]:"36",[h.terrible]:"32"}},armorClass:{"-1":{[h.extreme]:"18",[h.high]:"15",[h.moderate]:"14",[h.low]:"12"},0:{[h.extreme]:"19",[h.high]:"16",[h.moderate]:"15",[h.low]:"13"},1:{[h.extreme]:"19",[h.high]:"16",[h.moderate]:"15",[h.low]:"13"},2:{[h.extreme]:"21",[h.high]:"18",[h.moderate]:"17",[h.low]:"15"},3:{[h.extreme]:"22",[h.high]:"19",[h.moderate]:"18",[h.low]:"16"},4:{[h.extreme]:"24",[h.high]:"21",[h.moderate]:"20",[h.low]:"18"},5:{[h.extreme]:"25",[h.high]:"22",[h.moderate]:"21",[h.low]:"19"},6:{[h.extreme]:"27",[h.high]:"24",[h.moderate]:"23",[h.low]:"21"},7:{[h.extreme]:"28",[h.high]:"25",[h.moderate]:"24",[h.low]:"22"},8:{[h.extreme]:"30",[h.high]:"27",[h.moderate]:"26",[h.low]:"24"},9:{[h.extreme]:"31",[h.high]:"28",[h.moderate]:"27",[h.low]:"25"},10:{[h.extreme]:"33",[h.high]:"30",[h.moderate]:"29",[h.low]:"27"},11:{[h.extreme]:"34",[h.high]:"31",[h.moderate]:"30",[h.low]:"28"},12:{[h.extreme]:"36",[h.high]:"33",[h.moderate]:"32",[h.low]:"30"},13:{[h.extreme]:"37",[h.high]:"34",[h.moderate]:"33",[h.low]:"31"},14:{[h.extreme]:"39",[h.high]:"36",[h.moderate]:"35",[h.low]:"33"},15:{[h.extreme]:"40",[h.high]:"37",[h.moderate]:"36",[h.low]:"34"},16:{[h.extreme]:"42",[h.high]:"39",[h.moderate]:"38",[h.low]:"36"},17:{[h.extreme]:"43",[h.high]:"40",[h.moderate]:"39",[h.low]:"37"},18:{[h.extreme]:"45",[h.high]:"42",[h.moderate]:"41",[h.low]:"39"},19:{[h.extreme]:"46",[h.high]:"43",[h.moderate]:"42",[h.low]:"40"},20:{[h.extreme]:"48",[h.high]:"45",[h.moderate]:"44",[h.low]:"42"},21:{[h.extreme]:"49",[h.high]:"46",[h.moderate]:"45",[h.low]:"43"},22:{[h.extreme]:"51",[h.high]:"48",[h.moderate]:"47",[h.low]:"45"},23:{[h.extreme]:"52",[h.high]:"49",[h.moderate]:"48",[h.low]:"46"},24:{[h.extreme]:"54",[h.high]:"51",[h.moderate]:"50",[h.low]:"48"}},strikeBonus:{"-1":{[h.extreme]:"10",[h.high]:"8",[h.moderate]:"6",[h.low]:"4"},0:{[h.extreme]:"10",[h.high]:"8",[h.moderate]:"6",[h.low]:"4"},1:{[h.extreme]:"11",[h.high]:"9",[h.moderate]:"7",[h.low]:"5"},2:{[h.extreme]:"13",[h.high]:"11",[h.moderate]:"9",[h.low]:"7"},3:{[h.extreme]:"14",[h.high]:"12",[h.moderate]:"10",[h.low]:"8"},4:{[h.extreme]:"16",[h.high]:"14",[h.moderate]:"12",[h.low]:"9"},5:{[h.extreme]:"17",[h.high]:"15",[h.moderate]:"13",[h.low]:"11"},6:{[h.extreme]:"19",[h.high]:"17",[h.moderate]:"15",[h.low]:"12"},7:{[h.extreme]:"20",[h.high]:"18",[h.moderate]:"16",[h.low]:"13"},8:{[h.extreme]:"22",[h.high]:"20",[h.moderate]:"18",[h.low]:"15"},9:{[h.extreme]:"23",[h.high]:"21",[h.moderate]:"19",[h.low]:"16"},10:{[h.extreme]:"25",[h.high]:"23",[h.moderate]:"21",[h.low]:"17"},11:{[h.extreme]:"27",[h.high]:"24",[h.moderate]:"22",[h.low]:"19"},12:{[h.extreme]:"28",[h.high]:"26",[h.moderate]:"24",[h.low]:"20"},13:{[h.extreme]:"29",[h.high]:"27",[h.moderate]:"25",[h.low]:"21"},14:{[h.extreme]:"31",[h.high]:"29",[h.moderate]:"27",[h.low]:"23"},15:{[h.extreme]:"32",[h.high]:"30",[h.moderate]:"28",[h.low]:"24"},16:{[h.extreme]:"34",[h.high]:"32",[h.moderate]:"30",[h.low]:"25"},17:{[h.extreme]:"35",[h.high]:"33",[h.moderate]:"31",[h.low]:"27"},18:{[h.extreme]:"37",[h.high]:"35",[h.moderate]:"33",[h.low]:"28"},19:{[h.extreme]:"38",[h.high]:"36",[h.moderate]:"34",[h.low]:"29"},20:{[h.extreme]:"40",[h.high]:"38",[h.moderate]:"36",[h.low]:"31"},21:{[h.extreme]:"41",[h.high]:"39",[h.moderate]:"37",[h.low]:"32"},22:{[h.extreme]:"43",[h.high]:"41",[h.moderate]:"39",[h.low]:"33"},23:{[h.extreme]:"44",[h.high]:"42",[h.moderate]:"40",[h.low]:"35"},24:{[h.extreme]:"46",[h.high]:"44",[h.moderate]:"42",[h.low]:"36"}},strikeDamage:{"-1":{[h.extreme]:"4",[h.high]:"3",[h.moderate]:"3",[h.low]:"2"},0:{[h.extreme]:"6",[h.high]:"5",[h.moderate]:"4",[h.low]:"3"},1:{[h.extreme]:"8",[h.high]:"6",[h.moderate]:"5",[h.low]:"4"},2:{[h.extreme]:"11",[h.high]:"9",[h.moderate]:"8",[h.low]:"6"},3:{[h.extreme]:"15",[h.high]:"12",[h.moderate]:"10",[h.low]:"8"},4:{[h.extreme]:"18",[h.high]:"14",[h.moderate]:"12",[h.low]:"9"},5:{[h.extreme]:"20",[h.high]:"16",[h.moderate]:"13",[h.low]:"11"},6:{[h.extreme]:"23",[h.high]:"18",[h.moderate]:"15",[h.low]:"12"},7:{[h.extreme]:"25",[h.high]:"20",[h.moderate]:"17",[h.low]:"13"},8:{[h.extreme]:"28",[h.high]:"22",[h.moderate]:"18",[h.low]:"15"},9:{[h.extreme]:"30",[h.high]:"24",[h.moderate]:"20",[h.low]:"16"},10:{[h.extreme]:"33",[h.high]:"26",[h.moderate]:"22",[h.low]:"17"},11:{[h.extreme]:"35",[h.high]:"28",[h.moderate]:"23",[h.low]:"19"},12:{[h.extreme]:"38",[h.high]:"30",[h.moderate]:"25",[h.low]:"20"},13:{[h.extreme]:"40",[h.high]:"32",[h.moderate]:"27",[h.low]:"21"},14:{[h.extreme]:"43",[h.high]:"34",[h.moderate]:"28",[h.low]:"23"},15:{[h.extreme]:"45",[h.high]:"36",[h.moderate]:"30",[h.low]:"24"},16:{[h.extreme]:"48",[h.high]:"37",[h.moderate]:"31",[h.low]:"25"},17:{[h.extreme]:"50",[h.high]:"38",[h.moderate]:"32",[h.low]:"26"},18:{[h.extreme]:"53",[h.high]:"40",[h.moderate]:"33",[h.low]:"27"},19:{[h.extreme]:"55",[h.high]:"42",[h.moderate]:"35",[h.low]:"28"},20:{[h.extreme]:"58",[h.high]:"44",[h.moderate]:"37",[h.low]:"29"},21:{[h.extreme]:"60",[h.high]:"46",[h.moderate]:"38",[h.low]:"31"},22:{[h.extreme]:"63",[h.high]:"48",[h.moderate]:"40",[h.low]:"32"},23:{[h.extreme]:"65",[h.high]:"50",[h.moderate]:"42",[h.low]:"33"},24:{[h.extreme]:"68",[h.high]:"52",[h.moderate]:"44",[h.low]:"35"}},strikeDamageRoll:{"-1":{[h.extreme]:"1d6+1",[h.high]:"1d4+1",[h.moderate]:"1d4",[h.low]:"1d4"},0:{[h.extreme]:"1d6+3",[h.high]:"1d6+2",[h.moderate]:"1d4+2",[h.low]:"1d4+1"},1:{[h.extreme]:"1d8+4",[h.high]:"1d6+3",[h.moderate]:"1d6+2",[h.low]:"1d4+2"},2:{[h.extreme]:"1d12+4",[h.high]:"1d10+4",[h.moderate]:"1d8+4",[h.low]:"1d6+3"},3:{[h.extreme]:"1d12+8",[h.high]:"1d10+6",[h.moderate]:"1d8+6",[h.low]:"1d6+5"},4:{[h.extreme]:"2d10+7",[h.high]:"2d8+5",[h.moderate]:"2d6+5",[h.low]:"2d4+4"},5:{[h.extreme]:"2d12+7",[h.high]:"2d8+7",[h.moderate]:"2d6+6",[h.low]:"2d4+6"},6:{[h.extreme]:"2d12+10",[h.high]:"2d8+9",[h.moderate]:"2d6+8",[h.low]:"2d4+7"},7:{[h.extreme]:"2d12+12",[h.high]:"2d10+9",[h.moderate]:"2d8+8",[h.low]:"2d6+6"},8:{[h.extreme]:"2d12+15",[h.high]:"2d10+11",[h.moderate]:"2d8+9",[h.low]:"2d6+8"},9:{[h.extreme]:"2d12+17",[h.high]:"2d10+13",[h.moderate]:"2d8+11",[h.low]:"2d6+9"},10:{[h.extreme]:"2d12+20",[h.high]:"2d12+13",[h.moderate]:"2d10+11",[h.low]:"2d6+10"},11:{[h.extreme]:"2d12+22",[h.high]:"2d12+15",[h.moderate]:"2d10+12",[h.low]:"2d8+10"},12:{[h.extreme]:"3d12+19",[h.high]:"3d10+14",[h.moderate]:"3d8+12",[h.low]:"3d6+10"},13:{[h.extreme]:"3d12+21",[h.high]:"3d10+16",[h.moderate]:"3d8+14",[h.low]:"3d6+11"},14:{[h.extreme]:"3d12+24",[h.high]:"3d10+18",[h.moderate]:"3d8+15",[h.low]:"3d6+13"},15:{[h.extreme]:"3d12+26",[h.high]:"3d12+17",[h.moderate]:"3d10+14",[h.low]:"3d6+14"},16:{[h.extreme]:"3d12+29",[h.high]:"3d12+18",[h.moderate]:"3d10+15",[h.low]:"3d6+15"},17:{[h.extreme]:"3d12+31",[h.high]:"3d12+19",[h.moderate]:"3d10+16",[h.low]:"3d6+16"},18:{[h.extreme]:"3d12+34",[h.high]:"3d12+20",[h.moderate]:"3d10+17",[h.low]:"3d6+17"},19:{[h.extreme]:"4d12+29",[h.high]:"4d10+20",[h.moderate]:"4d8+17",[h.low]:"4d6+14"},20:{[h.extreme]:"4d12+32",[h.high]:"4d10+22",[h.moderate]:"4d8+19",[h.low]:"4d6+15"},21:{[h.extreme]:"4d12+34",[h.high]:"4d10+24",[h.moderate]:"4d8+20",[h.low]:"4d6+17"},22:{[h.extreme]:"4d12+37",[h.high]:"4d10+26",[h.moderate]:"4d8+22",[h.low]:"4d6+18"},23:{[h.extreme]:"4d12+39",[h.high]:"4d12+24",[h.moderate]:"4d10+20",[h.low]:"4d6+19"},24:{[h.extreme]:"4d12+42",[h.high]:"4d12+26",[h.moderate]:"4d10+22",[h.low]:"4d6+21"}},spellcasting:{"-1":{[h.extreme]:"11",[h.high]:"8",[h.moderate]:"5"},0:{[h.extreme]:"11",[h.high]:"8",[h.moderate]:"5"},1:{[h.extreme]:"12",[h.high]:"9",[h.moderate]:"6"},2:{[h.extreme]:"14",[h.high]:"10",[h.moderate]:"7"},3:{[h.extreme]:"15",[h.high]:"12",[h.moderate]:"9"},4:{[h.extreme]:"17",[h.high]:"13",[h.moderate]:"10"},5:{[h.extreme]:"18",[h.high]:"14",[h.moderate]:"11"},6:{[h.extreme]:"19",[h.high]:"16",[h.moderate]:"13"},7:{[h.extreme]:"21",[h.high]:"17",[h.moderate]:"14"},8:{[h.extreme]:"22",[h.high]:"18",[h.moderate]:"15"},9:{[h.extreme]:"24",[h.high]:"20",[h.moderate]:"17"},10:{[h.extreme]:"25",[h.high]:"21",[h.moderate]:"18"},11:{[h.extreme]:"26",[h.high]:"22",[h.moderate]:"19"},12:{[h.extreme]:"28",[h.high]:"24",[h.moderate]:"21"},13:{[h.extreme]:"29",[h.high]:"25",[h.moderate]:"22"},14:{[h.extreme]:"31",[h.high]:"26",[h.moderate]:"23"},15:{[h.extreme]:"32",[h.high]:"28",[h.moderate]:"25"},16:{[h.extreme]:"33",[h.high]:"29",[h.moderate]:"26"},17:{[h.extreme]:"35",[h.high]:"30",[h.moderate]:"27"},18:{[h.extreme]:"36",[h.high]:"32",[h.moderate]:"29"},19:{[h.extreme]:"38",[h.high]:"33",[h.moderate]:"30"},20:{[h.extreme]:"39",[h.high]:"34",[h.moderate]:"31"},21:{[h.extreme]:"40",[h.high]:"36",[h.moderate]:"33"},22:{[h.extreme]:"42",[h.high]:"37",[h.moderate]:"34"},23:{[h.extreme]:"43",[h.high]:"38",[h.moderate]:"35"},24:{[h.extreme]:"44",[h.high]:"40",[h.moderate]:"37"}},spellDC:{"-1":{[h.extreme]:"19",[h.high]:"16",[h.moderate]:"13"},0:{[h.extreme]:"19",[h.high]:"16",[h.moderate]:"13"},1:{[h.extreme]:"20",[h.high]:"17",[h.moderate]:"14"},2:{[h.extreme]:"22",[h.high]:"18",[h.moderate]:"15"},3:{[h.extreme]:"23",[h.high]:"20",[h.moderate]:"17"},4:{[h.extreme]:"25",[h.high]:"21",[h.moderate]:"18"},5:{[h.extreme]:"26",[h.high]:"22",[h.moderate]:"19"},6:{[h.extreme]:"27",[h.high]:"24",[h.moderate]:"21"},7:{[h.extreme]:"29",[h.high]:"25",[h.moderate]:"22"},8:{[h.extreme]:"30",[h.high]:"26",[h.moderate]:"23"},9:{[h.extreme]:"32",[h.high]:"28",[h.moderate]:"25"},10:{[h.extreme]:"33",[h.high]:"29",[h.moderate]:"26"},11:{[h.extreme]:"34",[h.high]:"30",[h.moderate]:"27"},12:{[h.extreme]:"36",[h.high]:"32",[h.moderate]:"29"},13:{[h.extreme]:"37",[h.high]:"33",[h.moderate]:"30"},14:{[h.extreme]:"39",[h.high]:"34",[h.moderate]:"31"},15:{[h.extreme]:"40",[h.high]:"36",[h.moderate]:"33"},16:{[h.extreme]:"41",[h.high]:"37",[h.moderate]:"34"},17:{[h.extreme]:"43",[h.high]:"38",[h.moderate]:"35"},18:{[h.extreme]:"44",[h.high]:"40",[h.moderate]:"37"},19:{[h.extreme]:"46",[h.high]:"41",[h.moderate]:"38"},20:{[h.extreme]:"47",[h.high]:"42",[h.moderate]:"39"},21:{[h.extreme]:"48",[h.high]:"44",[h.moderate]:"41"},22:{[h.extreme]:"50",[h.high]:"45",[h.moderate]:"42"},23:{[h.extreme]:"51",[h.high]:"46",[h.moderate]:"43"},24:{[h.extreme]:"52",[h.high]:"48",[h.moderate]:"45"}},skills:{"-1":{[h.extreme]:"8",[h.high]:"5",[h.moderate]:"4",[h.low]:"2"},0:{[h.extreme]:"9",[h.high]:"6",[h.moderate]:"5",[h.low]:"3"},1:{[h.extreme]:"10",[h.high]:"7",[h.moderate]:"6",[h.low]:"4"},2:{[h.extreme]:"11",[h.high]:"8",[h.moderate]:"7",[h.low]:"5"},3:{[h.extreme]:"13",[h.high]:"10",[h.moderate]:"9",[h.low]:"6"},4:{[h.extreme]:"15",[h.high]:"12",[h.moderate]:"10",[h.low]:"8"},5:{[h.extreme]:"16",[h.high]:"13",[h.moderate]:"12",[h.low]:"9"},6:{[h.extreme]:"18",[h.high]:"15",[h.moderate]:"13",[h.low]:"10"},7:{[h.extreme]:"20",[h.high]:"17",[h.moderate]:"15",[h.low]:"12"},8:{[h.extreme]:"21",[h.high]:"18",[h.moderate]:"16",[h.low]:"13"},9:{[h.extreme]:"23",[h.high]:"20",[h.moderate]:"18",[h.low]:"14"},10:{[h.extreme]:"25",[h.high]:"22",[h.moderate]:"19",[h.low]:"16"},11:{[h.extreme]:"26",[h.high]:"23",[h.moderate]:"21",[h.low]:"18"},12:{[h.extreme]:"28",[h.high]:"25",[h.moderate]:"22",[h.low]:"19"},13:{[h.extreme]:"30",[h.high]:"27",[h.moderate]:"24",[h.low]:"21"},14:{[h.extreme]:"31",[h.high]:"28",[h.moderate]:"25",[h.low]:"22"},15:{[h.extreme]:"33",[h.high]:"30",[h.moderate]:"27",[h.low]:"23"},16:{[h.extreme]:"35",[h.high]:"32",[h.moderate]:"28",[h.low]:"25"},17:{[h.extreme]:"36",[h.high]:"33",[h.moderate]:"30",[h.low]:"26"},18:{[h.extreme]:"38",[h.high]:"35",[h.moderate]:"31",[h.low]:"28"},19:{[h.extreme]:"40",[h.high]:"37",[h.moderate]:"33",[h.low]:"29"},20:{[h.extreme]:"41",[h.high]:"38",[h.moderate]:"34",[h.low]:"30"},21:{[h.extreme]:"43",[h.high]:"40",[h.moderate]:"36",[h.low]:"31"},22:{[h.extreme]:"45",[h.high]:"42",[h.moderate]:"37",[h.low]:"32"},23:{[h.extreme]:"46",[h.high]:"43",[h.moderate]:"38",[h.low]:"34"},24:{[h.extreme]:"48",[h.high]:"45",[h.moderate]:"40",[h.low]:"36"}},resistWeak:{"-1":{[d.minimum]:"1",[d.maximum]:"1"},0:{[d.minimum]:"1",[d.maximum]:"3"},1:{[d.minimum]:"2",[d.maximum]:"3"},2:{[d.minimum]:"2",[d.maximum]:"5"},3:{[d.minimum]:"3",[d.maximum]:"6"},4:{[d.minimum]:"4",[d.maximum]:"7"},5:{[d.minimum]:"4",[d.maximum]:"8"},6:{[d.minimum]:"5",[d.maximum]:"9"},7:{[d.minimum]:"5",[d.maximum]:"10"},8:{[d.minimum]:"6",[d.maximum]:"11"},9:{[d.minimum]:"6",[d.maximum]:"12"},10:{[d.minimum]:"7",[d.maximum]:"13"},11:{[d.minimum]:"7",[d.maximum]:"14"},12:{[d.minimum]:"8",[d.maximum]:"15"},13:{[d.minimum]:"8",[d.maximum]:"16"},14:{[d.minimum]:"9",[d.maximum]:"17"},15:{[d.minimum]:"9",[d.maximum]:"18"},16:{[d.minimum]:"9",[d.maximum]:"19"},17:{[d.minimum]:"10",[d.maximum]:"19"},18:{[d.minimum]:"10",[d.maximum]:"20"},19:{[d.minimum]:"11",[d.maximum]:"21"},20:{[d.minimum]:"11",[d.maximum]:"22"},21:{[d.minimum]:"12",[d.maximum]:"23"},22:{[d.minimum]:"12",[d.maximum]:"24"},23:{[d.minimum]:"13",[d.maximum]:"25"},24:{[d.minimum]:"13",[d.maximum]:"26"}},areaDamage:{"-1":{[s.unlimited]:"2",[s.limited]:"4"},0:{[s.unlimited]:"4",[s.limited]:"6"},1:{[s.unlimited]:"5",[s.limited]:"7"},2:{[s.unlimited]:"7",[s.limited]:"11"},3:{[s.unlimited]:"9",[s.limited]:"14"},4:{[s.unlimited]:"11",[s.limited]:"18"},5:{[s.unlimited]:"12",[s.limited]:"21"},6:{[s.unlimited]:"14",[s.limited]:"25"},7:{[s.unlimited]:"15",[s.limited]:"28"},8:{[s.unlimited]:"17",[s.limited]:"32"},9:{[s.unlimited]:"18",[s.limited]:"35"},10:{[s.unlimited]:"20",[s.limited]:"39"},11:{[s.unlimited]:"21",[s.limited]:"42"},12:{[s.unlimited]:"23",[s.limited]:"46"},13:{[s.unlimited]:"24",[s.limited]:"49"},14:{[s.unlimited]:"26",[s.limited]:"53"},15:{[s.unlimited]:"27",[s.limited]:"56"},16:{[s.unlimited]:"28",[s.limited]:"60"},17:{[s.unlimited]:"29",[s.limited]:"63"},18:{[s.unlimited]:"30",[s.limited]:"67"},19:{[s.unlimited]:"32",[s.limited]:"70"},20:{[s.unlimited]:"33",[s.limited]:"74"},21:{[s.unlimited]:"35",[s.limited]:"77"},22:{[s.unlimited]:"36",[s.limited]:"81"},23:{[s.unlimited]:"38",[s.limited]:"84"},24:{[s.unlimited]:"39",[s.limited]:"88"}}},u={[m.str]:n.abilityScores,[m.dex]:n.abilityScores,[m.con]:n.abilityScores,[m.int]:n.abilityScores,[m.wis]:n.abilityScores,[m.cha]:n.abilityScores,[m.hp]:n.hitPoints,[m.per]:n.perceptionSaves,[m.ac]:n.armorClass,[m.resistWeak]:n.resistWeak,[m.fort]:n.perceptionSaves,[m.ref]:n.perceptionSaves,[m.wil]:n.perceptionSaves,[m.strikeBonus]:n.strikeBonus,[m.strikeDamage]:n.strikeDamage,[m.spellcasting]:n.spellcasting,[m.spellDC]:n.spellDC,[m.acrobatics]:n.skills,[m.arcana]:n.skills,[m.athletics]:n.skills,[m.crafting]:n.skills,[m.deception]:n.skills,[m.diplomacy]:n.skills,[m.intimidation]:n.skills,[m.medicine]:n.skills,[m.nature]:n.skills,[m.occultism]:n.skills,[m.performance]:n.skills,[m.religion]:n.skills,[m.society]:n.skills,[m.stealth]:n.skills,[m.survival]:n.skills,[m.thievery]:n.skills,[m.areaDamage]:n.areaDamage},c={[r.d4]:2.5,[r.d6]:3.5,[r.d8]:4.5,[r.d10]:5.5,[r.d12]:6.5};class x{constructor(e){this.adjustments=[],this.displayName=e}}const w=/\[(\d+)\]/,E=/\[\[\/r\s*(\d+d\d+)\[\s*(\w+)\s*\]\s*\]\]/g,p=/@Check\[type:\w+\|dc:(\d+)[|:\w]*\]/g,S=/@Template/;class f extends FormApplication{constructor(){super(...arguments),this.actor=this.object,this.level="-1",this.DataToModify=[]}static get defaultOptions(){return mergeObject(super.defaultOptions,{classes:["form"],popOut:!0,template:"modules/pf2e-adjust-monster-level/forms/adjustMonsterLevelForm.html",id:"adjustMonsterLevelForm",title:"Adjust Level Form",height:833,width:400})}async _updateObject(i,r){if(r&&r[m.level]!=this.level){let i=this.actor.system.details.level.value;this.level=r[m.level];let a=[],l={targetDocument:this.actor,data:{name:r[m.name]?r[m.name]:this.actor.name,"system.details.level.value":parseInt(this.level)}};a.push(l);for(const e of this.DataToModify)for(const t of e.adjustments)if("function"==typeof t.targetDocument.update){let e=a.find((e=>e.targetDocument==t.targetDocument));e||(e={targetDocument:t.targetDocument,data:{}},a.push(e));let r=t.targetAttribute.match(w);r?this.mergeIndexedAdjustment(e,t,r[0]):t.statistic==m.strikeDamage?this.mergeStrikeDamage(e,t,this.level>i):t.statistic==m.description?this.mergeDescription(e,t):this.mergeSimpleAdjustment(e,t)}if(game.settings.get(e,t)){console.log(`----- Data deltas for adjusting monster ${this.actor.name} ${this.actor.system.details.level.value}->${this.level} -----`);for(const e of a)console.log(`${e.targetDocument.name}`),console.log(e.data)}else{for(const e of a)await e.targetDocument.update(e.data);await this.actor.update(this.updateHitPoints())}}}updateHitPoints(){return{"system.attributes.hp.value":this.actor.system.attributes.hp.max}}mergeSimpleAdjustment(e,t){let i=u[t.statistic][this.level],m={[t.targetAttribute]:f.getNumericValue(t.normalizedValue,i)};e.data=mergeObject(e.data,m)}mergeIndexedAdjustment(e,t,i){let m=u[t.statistic][this.level],r=t.targetAttribute.indexOf(i),a=t.targetAttribute.substring(r+i.length+1);t.targetAttribute=t.targetAttribute.substring(0,r);let l=parseInt(i.substring(1,i.length-1)),o=f.getChildField(e.data,t.targetAttribute);if(!o){let e=f.getChildField(t.targetDocument,t.targetAttribute);o=JSON.parse(JSON.stringify(e))}o[l][a]=f.getNumericValue(t.normalizedValue,m);let h={[t.targetAttribute]:o};e.data=mergeObject(e.data,h)}mergeStrikeDamage(e,t,i){let m=u[t.statistic][this.level],r=f.getNumericValue(t.normalizedValue,m),a={},l=f.getChildField(t.targetDocument,t.targetAttribute);for(let[e,m]of Object.entries(l)){m.damage;let l=t.metaData[e],o=l.totalFraction*r,h="";if(l.flatFraction<1){let e=i?g.above:g.below;t.metaData.isItemRoll&&(e=g.sameOnly);let m=f.getClosestDieRoll(o,l.flatFraction,l.dieSize,e);h=m.roll,o-=m.damage}l.flatFraction>0&&l.flatFraction<1&&(h+="+"),l.flatFraction>0&&(h+=`${Math.floor(o)}`),a[`${t.targetAttribute}.${e}.damage`]=h}e.data=mergeObject(e.data,a)}mergeDescription(e,t){let i=u[t.metaData.statisticTable][this.level],r="",a="";if(t.metaData.statisticTable==m.spellDC){let e=f.getNumericValue(t.normalizedValue,i);r=t.metaData.replaceText,a=t.metaData.replaceText.replace(t.metaData.replaceValues[0],e.toString())}else{let e=f.getNumericValue(t.normalizedValue,i),m=f.getClosestDieRoll(e,0,t.metaData.dieSize,g.sameOnly);r=t.metaData.replaceText,a=t.metaData.replaceText.replace(t.metaData.replaceValues[0],m.roll)}if(""!==r&&""!==a){let i=f.getChildField(e.data,t.targetAttribute);i||(i=f.getChildField(t.targetDocument,t.targetAttribute)),i=i.replace(r,a);let m={[t.targetAttribute]:i};e.data=mergeObject(e.data,m)}}static getClosestDieRoll(e,t,i,m){let a=e*(1-t),l=0==t?Math.floor:Math.round,o=[r.d4,r.d6,r.d8,r.d10,r.d12];const h=o.indexOf(i);m==g.above&&h>0?o.splice(0,h):m==g.below&&h<o.length-1?o.splice(o.indexOf(i)+1):m==g.sameOnly&&o.splice(0,o.length);let d=Math.max(l(a/c[i]),1),s=i,n=Math.abs(d*c[i]-a);for(const e of o){const t=c[e];let i=Math.max(l(a/t),1),m=Math.abs(i*t-a);m<n&&(d=i,s=e,n=m)}return{roll:`${d}${s}`,damage:c[s]*d}}static getNumericValue(e,t){let i=[s.unlimited,s.limited,d.minimum,d.maximum,h.terrible,h.low,h.moderate,h.high,h.extreme];i=i.filter((e=>e in t));for(let m=0;m<i.length-1;m++){if(e<m+1&&0!=m)continue;if(e>m+2&&m!=i.length-2)continue;const r=e-(m+1);let a=parseInt(t[i[m]]),l=parseInt(t[i[m+1]]);return Math.round(r*(l-a)+a)}return 0}getData(){this.level=this.actor.system.details.level.value.toString();const e={[m.name]:this.actor.name,[m.level]:this.level};this.pushActorCategory("Defenses",a),this.pushActorCategory("AbilityModifiers",l),this.pushActorCategory("PerceptionAndSaves",o);let t=this.actor;if(t.system.attributes.weaknesses.length>0){let e=new x(f.localize("PF2EADJUSTMONSTERLEVEL.categoryWeaknesses"));for(let i=0;i<t.system.attributes.weaknesses.length;i++){const m=t.system.attributes.weaknesses[i];let r=this.getResistWeakAdjustment(m,`system.attributes.weaknesses[${i}].value`);e.adjustments.push(r)}this.DataToModify.push(e)}if(t.system.attributes.resistances.length>0){let e=new x(f.localize("PF2EADJUSTMONSTERLEVEL.categoryWeaknesses"));for(let i=0;i<t.system.attributes.resistances.length;i++){const m=t.system.attributes.resistances[i];let r=this.getResistWeakAdjustment(m,`system.attributes.resistances[${i}].value`);e.adjustments.push(r)}this.DataToModify.push(e)}let r=new x(f.localize("PF2EADJUSTMONSTERLEVEL.categorySkills"));this.DataToModify.push(r);for(const[,e]of this.actor.items.entries())if("lore"==e.type&&null!=e.name){let t="PF2EADJUSTMONSTERLEVEL."+e.name.toLowerCase(),i=this.getItemAdjustment(t,e,"system.mod.value");i&&r.adjustments.push(i)}else if("spellcastingEntry"==e.type&&null!=e.name){let t=this.getItemAdjustment(m.spellcasting,e,"system.spelldc.value");if(t){let i=JSON.parse(JSON.stringify(t));i.targetAttribute="system.spelldc.dc",i.statistic=m.spellDC,i.targetDocument=e;let r=new x(e.name);r.adjustments.push(t),r.adjustments.push(i),this.DataToModify.push(r)}}else if("melee"==e.type&&null!=e.name){let t=this.getItemAdjustment(m.strikeBonus,e,"system.bonus.value"),i=this.getItemAdjustment(m.strikeDamage,e,"system.damageRolls"),r=new x(e.name+" Strike");t&&r.adjustments.push(t),i&&r.adjustments.push(i),r.adjustments.length>0&&this.DataToModify.push(r)}else if("action"==e.type&&"offensive"==e.system.actionCategory.value&&"action"==e.system.actionType.value&&null!=e.name){let t=this.getTextAdjustments(e,"system.description.value");if(t.length>0){let i=new x(e.name);i.adjustments=t,this.DataToModify.push(i)}}return Handlebars.registerHelper("json",(function(e){return JSON.stringify(e)})),{Levels:i,Current:e,ToModify:JSON.parse(JSON.stringify(this.DataToModify))}}pushActorCategory(e,t){let i=new x(f.localize(`PF2EADJUSTMONSTERLEVEL.category${e}`));for(const[e,m]of Object.entries(t)){let t=this.getActorFieldAdjustment(e,m);t&&i.adjustments.push(t)}this.DataToModify.push(i)}getActorFieldAdjustment(e,t){const i=u[e][this.level];let m=f.getChildField(this.actor,t),r={},a=f.getNormalizedValue(m,i,1);return a.value>-9999?(a.flag&&(r.outOfRange=!0),{targetDocument:this.actor,targetAttribute:t,normalizedValue:a.value,displayValue:a.display,statistic:e,metaData:r}):null}getResistWeakAdjustment(e,t){const i=u[m.resistWeak][this.level];let r=e.value,a={},l=f.getNormalizedValue(r,i,1);return l.flag&&(a.outOfRange=!0),{targetDocument:this.actor,targetAttribute:t,statistic:m.resistWeak,normalizedValue:l.value,displayValue:l.display,displayName:e.type,metaData:a}}getItemAdjustment(e,t,i){const r=u[e][this.level];let a={},l=0;if("lore"==t.type||"spellcastingEntry"==t.type||"melee"==t.type&&e==m.strikeBonus)l=f.getChildField(t,i);else{if("melee"!=t.type||e!=m.strikeDamage)return null;{let e=0;a.isItemRoll=null!=this.actor.inventory.find((e=>e.name.includes(t.name)));for(let[i,m]of Object.entries(t.system.damageRolls)){let t=f.getDamageRollValues(m.damage);e+=t.total,a[i]={totalFraction:t.total,flatFraction:t.flatFraction,dieSize:t.dieSize}}l=Math.ceil(e);for(const[,t]of Object.entries(a))t.hasOwnProperty("totalFraction")&&(t.totalFraction=t.totalFraction/e)}}let o=f.getNormalizedValue(l,r,1);return o.value>-9999?(o.flag&&(a.outOfRange=!0),{targetDocument:t,targetAttribute:i,statistic:e,normalizedValue:o.value,displayValue:o.display,metaData:a}):null}getTextAdjustments(e,t){let i=[],r=f.getChildField(e,t),a=r.matchAll(E),l=r.matchAll(p);for(const l of a){const a=l[1],o=l[2];let h=r.match(S)?m.areaDamage:m.strikeDamage,d=u[h][this.level],s=f.getDamageRollValues(a),g=f.getNormalizedValue(s.total,d,1);if(g.value>-9999){let r={replaceText:l[0],replaceValues:[a],statisticTable:h,dieSize:s.dieSize};g.flag&&(r.outOfRange=!0);let d={targetDocument:e,targetAttribute:t,statistic:m.description,normalizedValue:g.value,displayValue:g.display,displayName:`Text: Roll ${a} ${o}`,metaData:r};i.push(d)}}const o=u[m.spellDC][this.level];for(const r of l){let a=parseInt(r[1]),l=f.getNormalizedValue(a,o,1);if(l.value>-9999){let a={replaceText:r[0],replaceValues:[r[1]],statisticTable:m.spellDC};l.flag&&(a.outOfRange=!0);let o={targetDocument:e,targetAttribute:t,statistic:m.description,normalizedValue:l.value,displayValue:l.display,displayName:`Text: Save DC ${r[1]}`,metaData:a};i.push(o)}}return i}static localize(e){return game.i18n.localize(e)}static getNormalizedValue(e,t,i=-9999){let m=[s.unlimited,s.limited,d.minimum,d.maximum,h.terrible,h.low,h.moderate,h.high,h.extreme];if(m=m.filter((e=>e in t)),-9999===i&&(i=parseInt(t[m[0]])),e<i)return{value:-9999,display:"",flag:!1};for(let i=0;i<m.length-1;i++){const r=parseInt(t[m[i]]),a=parseInt(t[m[i+1]]);if(e>=r&&e<a||0==i&&e<r||i==m.length-2&&e>=a){let t=(e-r)/(a-r);t=Math.round(10*t)/10;let l=f.localize(m[i]),o=t;return t>=1&&(l=f.localize(m[i+1]),o-=1),0!=o&&(o>0&&(l+="+"),l+=o.toFixed(1)),{value:t+i+1,display:l,flag:t<0||t>1}}}return{value:-9999,display:"",flag:!1}}static getDamageRollValues(e){let t=0,i=0,m="";const r=e.indexOf("+"),a=e.indexOf("d");if((r>=0||-1==a)&&(i=parseInt(e.substring(r+1)),t+=i,r>=0&&(e=e.substring(0,r))),a>=0){let i=e.substring(0,a);m=e.substring(a).trim(),t+=parseInt(i)*c[m]}return{total:t,dieSize:m,flatFraction:i/t}}static getChildField(e,t){let i=e,m=t.split(".");for(;m.length>0&&null!=i;)i=i[m[0]],m.splice(0,1);return i}}Hooks.on("init",(async function(){await game.settings.register(e,"expandFoldout",{scope:"client",config:!1,requiresReload:!1,type:Boolean,default:!1}),await game.settings.register(e,t,{name:"PF2EADJUSTMONSTERLEVEL.SETTINGS.testModeLabel",hint:"PF2EADJUSTMONSTERLEVEL.SETTINGS.testModeHint",scope:"client",config:!0,requiresReload:!1,type:Boolean,default:!1})})),Hooks.on("renderActorSheet",(async function(e,t){let i=e.object;if("npc"!==i?.type)return;if(!i.canUserModify(game.user,"update"))return;let m=t.find(".adjustment-select"),r=$(`<a class="adjustment trait" style>${f.localize("PF2EADJUSTMONSTERLEVEL.ACTORSHEET.buttonlabel")}</a>`);r.on("click",(()=>{new f(i).render(!0)})),m.after(r)}))})();