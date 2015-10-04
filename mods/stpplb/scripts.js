var megaStoneList = [
	'Abomasite',
	'Absolite',
	'Aerodactylite',
	'Aggronite',
	'Alakazite',
	'Altarianite',
	'Ampharosite',
	'Audinite',
	'Banettite',
	'Beedrillite',
	'Blastoisinite',
	'Blazikenite',
	'Cameruptite',
	'Charizardite X',
	'Charizardite Y',
	'Diancite',
	'Galladite',
	'Garchompite',
	'Gardevoirite',
	'Gengarite',
	'Glalitite',
	'Gyaradosite',
	'Heracronite',
	'Houndoominite',
	'Kangaskhanite',
	'Latiasite',
	'Latiosite',
	'Lopunnite',
	'Lucarionite',
	'Manectite',
	'Mawilite',
	'Medichamite',
	'Metagrossite',
	'Mewtwonite X',
	'Mewtwonite Y',
	'Pidgeotite',
	'Pinsirite',
	'Sablenite',
	'Salamencite',
	'Sceptilite',
	'Scizorite',
	'Sharpedonite',
	'Slowbronite',
	'Steelixite',
	'Swampertite',
	'Tyranitarite',
	'Venusaurite',
	'Red Orb',
	'Blue Orb'
];
exports.BattleScripts = {
	randomtpplbTeam: function(side) {
		var team = [];
		var variant = this.random(2);
		var sets = { // this is where all the movesets are defined. Add new mons here.
			'darkfiregamer': {
				species: "Houndoom", ability: "Dark Aura", item: "Dark Gem", gender: "M",
				moves: ['moonblast', 'hyperbeam', 'fireblast'],
				signatureMove: 'darkfire',
				evs: {hp:4, spa:252, spe:252}, nature: 'Timid'
			},
			'xfix': {
				species: 'Xatu', ability: 'Magic Bounce', item: 'Focus Sash', gender: 'M',
				moves: ['thunderwave', 'substitute', 'roost'],
				signatureMove: 'superglitch',
				evs: {hp:252, spd:252, def:4}, nature: 'Calm'
			},
			'azum4roll': {
				species: "Azumarill", ability: "Glitchiate", item: "Metronome", gender: 'M',
				moves: ['rollout', 'batonpass', 'swordsdance', 'bellydrum', 'extremespeed', 'playrough', 'thunderwave'],
				signatureMove: 'tm56',
				evs: {hp:4, atk:252, spe:252}, nature: 'Adamant'
			},
			'Iwamiger': {
				species: "Gengar", ability: 'Serene Grace Plus', item: "Life Orb", gender: 'M',
				moves: ['shadowball', 'flamethrower', 'icebeam', 'crunch'],
				signatureMove: 'hexattack',
				evs: {hp:4, spa:252, spe:252}, nature: 'Timid'
			},
			/*'Poomphcario': { // STPPLB+ only
				species: "Lucario", ability: "Scrappy", item: 'Assault Vest', gender: 'M',
				moves: ['rockwrecker', 'megahorn', 'bulletpunch'],
				signatureMove: 'projectilespam',
				evs: {hp:4, atk:252, spe:252}, nature: 'Jolly'
			},*/
			'TieSoul': {
				species: 'Rhyperior', ability: 'Rock Head', item: 'Focus Sash', gender: 'M',
				moves: ['headsmash', 'autotomize', 'earthquake'],
				signatureMove: 'bulk',
				evs: {hp:252, def:252, spe:4}, nature: 'Impish'
			},
			"Soma's Ghost": {
				species: 'Herdier', ability: 'Spoopify', item: 'Leftovers', gender: 'M',
				moves: ['playrough', 'swordsdance', 'substitute'],
				signatureMove: 'shadowrush',
				evs: {atk:252, def:4, spe:252}, nature: 'Jolly'
			},
			/*"Lass zeowx": { // STPPLB+ only
				species: 'Liepard', ability: 'Protean', item: 'Focus Sash', gender: 'F',
				moves: ['suckerpunch', 'shadowsneak', 'bulletpunch', 'playrough', 'spikes', 'acrobatics'].sample(2).concat('fakeout'), // always have Fake Out.
				signatureMove: 'partingvoltturn',
				evs: {atk:252, spa:12, spe:244}, nature: 'Hasty'
			},*/
			"Eeveelutionlvr": {
				species: 'Eevee', ability: 'Proteon', item: 'Eviolite', gender: 'M',
				moves: ['hydropump', 'flareblitz', 'thunderbolt', 'batonpass', 'nastyplot', 'dazzlinggleam', 'energyball', 'leechseed', 'blizzard', 'nightslash', 'psychic', 'hyperbeam'], // azum stop nagging about this moveset.
				signatureMove: 'evolutionbeam',
				evs: {spa:252, spe:252, hp:4}, nature: 'Timid'
			},
			'sohippy': {
				species: 'Rotom-Wash', ability: 'Swahahahahaggers', item: 'Leftovers', gender: 'M',
				moves: ['scald', 'painsplit', 'destinybond', 'voltswitch', 'swagger', 'taunt', 'foulplay', 'hex', 'hydropump', 'electricterrain'],
				signatureMove: 'hyperwahahahahaha',
				evs: {hp:252, spa:252, spd:4}, nature: 'Modest'
			},
			'Kooma9': {
				species: 'Blastoise-Mega', ability: 'Psychologist', item: 'Focus Sash', gender: 'M',
				moves: ['scald', 'roar', 'toxic'],
				signatureMove: 'disappointment',
				evs: {hp:252, def:252, spa:4}, nature: 'Bold'
			},
			/*"Kap'n Kooma": { // STPPLB+ only
				species: 'Kingdra', ability: 'Sea and Sky', item: 'Choice Specs', gender: 'M',
				moves: ['steameruption', 'dracometeor', 'thunder'],
				signatureMove: 'broadside',
				evs: {hp:4, spa:252, spe:252}, nature: 'Modest'
			},*/
			/*'BEST': { // STPPB only
				species: 'Typhlosion', ability: 'Technician', item: 'Life Orb', gender: 'M',
				moves: ['waterpulse', 'hiddenpowerice', 'shockwave'],
				ivs: {atk:30, def:30}, // in order for HP Ice to be a thing.
				signatureMove: 'bestfcar',
				evs: {atk:252,def:4,spe:252}, nature: 'Adamant'
			},*/
			'Poomph':{
				species: "Ampharos", ability: "Little Engine", item: 'Life Orb', gender: 'M',
				moves: ['headsmash','frustration','withdraw', 'endure','wish'],
				signatureMove: 'eternalstruggle',
				happiness: 0,
				evs: {hp:252, atk:252, def:4}, nature: 'Adamant'
			},
			/*'NoFunMantis':{ // STPPLB+ only
				species: "Scyther", ability: "No Fun Allowed", item: 'Eviolite', gender: 'M',
				moves: ['knockoff','brickbreak','aerialace','swordsdance','agility','batonpass','roost'],
				signatureMove: 'xscissor',
				evs: {hp:4, atk:252, spe:252}, nature: 'Adamant'
			},*/
			'BigFatMantis': {
				species: "Scyther", shiny: true, ability: "Dictator", item: 'Eviolite', gender: 'M',
				moves: ['bravebird', 'aerialace', 'swordsdance', 'roost', 'uturn', 'xscissor', 'knockoff', 'earthquake'],
				signatureMove: 'nofun',
				evs: {hp:216,atk:40,spe:252}, nature: 'Jolly'
			},
			/*'DictatorMantis': { // STPPLB+ only
				species: 'Scizor', ability: 'Technicality', item: 'Occa Berry', gender: 'M',
				moves: ['barrier','craftyshield','trick','block','disable','stickyweb','embargo','quash','taunt','knockoff','bulletpunch'],
				signatureMove: 'ironfist',
				evs: {hp:4,atk:252,spe:252}, nature: 'Adamant'
			},*/
			'MegaCharizard': {
				species: 'Charizard', ability: 'Truant', item: 'Charizardite Y', gender: 'M',
				moves: ['airslash', 'earthpower', 'roost', 'slackoff', 'flamethrower'],
				signatureMove: 'afk',
				evs: {hp: 4, spa: 252, spe: 252}, nature: 'Timid'
			},
			'Natsugan': {
				species: 'Flygon', ability: 'Mega Plunder', item: megaStoneList.sample(1)[0], gender: 'M',
				moves: ['earthquake','earthpower','uturn','dragonclaw','fireblast','boomburst','dragonpulse','return','stoneedge','crunch','ironhead','dragondance','quiverdance'],
				signatureMove: 'reroll',
				nature: 'Serious'
			},
			'GroundCtrl27': {
				species: 'Meloetta', ability: 'Scrappy', item: 'Assault Vest', gender: 'M',
				moves: ['hypervoice'],
				signatureMoves: ['shadowsphere', 'drainforce', 'sneakyspook'],
				evs: {hp: 248, spa: 252, spe: 8}, nature: 'Modest'
			}
		};
		var pool = Object.keys(sets).randomize();
		for (var i = 0; i < Math.min(6, pool.length); i++) {
			var set = sets[pool[i]];
			set.level = 100;
			set.name = pool[i];
			if (!set.ivs) { // set 31 for unspecified IVs.
				set.ivs = {hp:31, atk:31, def:31, spa:31, spd:31, spe:31};
			} else {
				for (var iv in {hp:31, atk:31, def:31, spa:31, spd:31, spe:31}) {
					set.ivs[iv] = set.ivs[iv] ? set.ivs[iv] : 31;
				}
			}
			// Assuming the hardcoded set evs are all legal.
			if (!set.evs) set.evs = {hp:88, atk:84, def:84, spa:84, spd:84, spe:84};
			if (set.signatureMove) set.signatureMoves = [set.signatureMove];
			var len = set.signatureMoves.length;
			set.moves = set.moves.sample(4-len).concat(set.signatureMoves); // always have sig move.
			team.push(set);
		}
		return team;
	},
	randomtpplbpTeam: function(side) {
		var team = [];
		var variant = this.random(2);
		var sets = { // this is where all the movesets are defined. Add new mons here.
			'darkfiregamer': {
				species: "Houndoom", ability: "Dark Aura", item: "Dark Gem", gender: "M",
				moves: ['moonblast', 'hyperbeam', 'fireblast'],
				signatureMove: 'darkfire',
				evs: {hp:4, spa:252, spe:252}, nature: 'Timid'
			},
			'xfix': {
				species: 'Xatu', ability: 'Magic Bounce', item: 'Focus Sash', gender: 'M',
				moves: ['thunderwave', 'substitute', 'roost'],
				signatureMove: 'superglitch',
				evs: {hp:252, spd:252, def:4}, nature: 'Calm'
			},
			'azum4roll': {
				species: "Azumarill", ability: "Glitchiate", item: "Metronome", gender: 'M',
				moves: ['rollout', 'batonpass', 'swordsdance', 'bellydrum', 'extremespeed', 'playrough', 'thunderwave'],
				signatureMove: 'tm56',
				evs: {hp:4, atk:252, spe:252}, nature: 'Adamant'
			},
			'Iwamiger': {
				species: "Gengar", ability: 'Serene Grace Plus', item: "Life Orb", gender: 'M',
				moves: ['shadowball', 'flamethrower', 'icebeam', 'crunch'],
				signatureMove: 'hexattack',
				evs: {hp:4, spa:252, spe:252}, nature: 'Timid'
			},
			'Poomphcario': {
				species: "Lucario", ability: "Scrappy", item: 'Assault Vest', gender: 'M',
				moves: ['rockwrecker', 'megahorn', 'bulletpunch'],
				signatureMove: 'projectilespam',
				evs: {hp:4, atk:252, spe:252}, nature: 'Jolly'
			},
			'TieSoul': {
				species: 'Rhyperior', ability: 'Rock Head', item: 'Focus Sash', gender: 'M',
				moves: ['headsmash', 'autotomize', 'earthquake'],
				signatureMove: 'bulk',
				evs: {hp:252, def:252, spe:4}, nature: 'Impish'
			},
			"Soma's Ghost": {
				species: 'Herdier', ability: 'Spoopify', item: 'Leftovers', gender: 'M',
				moves: ['playrough', 'swordsdance', 'substitute'],
				signatureMove: 'shadowrush',
				evs: {atk:252, def:4, spe:252}, nature: 'Jolly'
			},
			"Lass zeowx": { // STPPLB+ only
				species: 'Liepard', ability: 'Protean', item: 'Focus Sash', gender: 'F',
				moves: ['suckerpunch', 'shadowsneak', 'bulletpunch', 'playrough', 'spikes', 'acrobatics'].sample(2).concat('fakeout'), // always have Fake Out.
				signatureMove: 'partingvoltturn',
				evs: {atk:252, spa:12, spe:244}, nature: 'Hasty'
			},
			"Eeveelutionlvr": {
				species: 'Eevee', ability: 'Proteon', item: 'Eviolite', gender: 'M',
				moves: ['hydropump', 'flareblitz', 'thunderbolt', 'batonpass', 'nastyplot', 'dazzlinggleam', 'energyball', 'leechseed', 'blizzard', 'nightslash', 'psychic', 'hyperbeam'], // azum stop nagging about this moveset.
				signatureMove: 'evolutionbeam',
				evs: {spa:252, spe:252, hp:4}, nature: 'Timid'
			},
			'sohippy': {
				species: 'Rotom-Wash', ability: 'Swahahahahaggers', item: 'Leftovers', gender: 'M',
				moves: ['scald', 'painsplit', 'destinybond', 'voltswitch', 'swagger', 'taunt', 'foulplay', 'hex', 'hydropump', 'electricterrain'],
				signatureMove: 'hyperwahahahahaha',
				evs: {hp:252, spa:252, spd:4}, nature: 'Modest'
			},
			'Kooma9': {
				species: 'Blastoise-Mega', ability: 'Psychologist', item: 'Focus Sash', gender: 'M',
				moves: ['scald', 'roar', 'toxic'],
				signatureMove: 'disappointment',
				evs: {hp:252, def:252, spa:4}, nature: 'Bold'
			},
			"Kap'n Kooma": { // STPPLB+ only
				species: 'Kingdra', ability: 'Sea and Sky', item: 'Choice Specs', gender: 'M',
				moves: ['steameruption', 'dracometeor', 'thunder'],
				signatureMove: 'broadside',
				evs: {hp:4, spa:252, spe:252}, nature: 'Modest'
			},
			/*'BEST': { // STPPB only
				species: 'Typhlosion', ability: 'Technician', item: 'Life Orb', gender: 'M',
				moves: ['waterpulse', 'hiddenpowerice', 'shockwave'],
				ivs: {atk:30, def:30}, // in order for HP Ice to be a thing.
				signatureMove: 'bestfcar',
				evs: {atk:252,def:4,spe:252}, nature: 'Adamant'
			},*/
			'Poomph':{
				species: "Ampharos", ability: "Little Engine", item: 'Life Orb', gender: 'M',
				moves: ['headsmash','frustration','withdraw', 'endure','wish'],
				signatureMove: 'eternalstruggle',
				happiness: 0,
				evs: {hp:252, atk:252, def:4}, nature: 'Adamant'
			},
			'NoFunMantis':{
				species: "Scyther", ability: "No Fun Allowed", item: 'Eviolite', gender: 'M',
				moves: ['knockoff','brickbreak','aerialace','swordsdance','agility','batonpass','roost'],
				signatureMove: 'xscissor',
				evs: {hp:4, atk:252, spe:252}, nature: 'Adamant'
			},
			'BigFatMantis': {
				species: "Scyther", shiny: true, ability: "Dictator", item: 'Eviolite', gender: 'M',
				moves: ['bravebird', 'aerialace', 'swordsdance', 'roost', 'uturn', 'xscissor', 'knockoff', 'earthquake'],
				signatureMove: 'nofun',
				evs: {hp:216,atk:40,spe:252}, nature: 'Jolly'
			},
			'DictatorMantis': {
				species: 'Scizor', ability: 'Technicality', item: 'Occa Berry', gender: 'M',
				moves: ['barrier','craftyshield','trick','block','disable','stickyweb','embargo','quash','taunt','knockoff','bulletpunch'],
				signatureMove: 'ironfist',
				evs: {hp:4,atk:252,spe:252}, nature: 'Adamant'
			},
			'MegaCharizard': {
				species: 'Charizard', ability: 'Truant', item: 'Charizardite Y', gender: 'M',
				moves: ['airslash', 'earthpower', 'roost', 'slackoff', 'flamethrower'],
				signatureMove: 'afk',
				evs: {hp: 4, spa: 252, spe: 252}, nature: 'Timid'
			},
			'Natsugan': {
				species: 'Flygon', ability: 'Mega Plunder', item: megaStoneList.sample(1)[0], gender: 'M',
				moves: ['earthquake','earthpower','uturn','dragonclaw','fireblast','boomburst','dragonpulse','return','stoneedge','crunch','ironhead','dragondance','quiverdance'],
				signatureMove: 'reroll',
				nature: 'Serious'
			},
			'GroundCtrl27': {
				species: 'Meloetta', ability: 'Scrappy', item: 'Assault Vest', gender: 'M',
				moves: ['hypervoice'],
				signatureMoves: ['shadowsphere', 'drainforce', 'sneakyspook'],
				evs: {hp: 248, spa: 252, spe: 8}, nature: 'Modest'
			},
			'WhatevsFur': {
				species: 'Ursaring', ability: 'Furrier Coat', item: 'Leftovers', gender: 'F',
				moves: ['earthquake','drainpunch','bulkup','protect','aromatherapy'],
				signatureMove: 'wish',
				evs: {hp: 252, def: 168, spd: 88}, nature: 'Calm'
			}
		};
		var pool = Object.keys(sets).randomize();
		for (var i = 0; i < Math.min(6, pool.length); i++) {
			var set = sets[pool[i]];
			set.level = 100;
			set.name = pool[i];
			if (!set.ivs) { // set 31 for unspecified IVs.
				set.ivs = {hp:31, atk:31, def:31, spa:31, spd:31, spe:31};
			} else {
				for (var iv in {hp:31, atk:31, def:31, spa:31, spd:31, spe:31}) {
					set.ivs[iv] = set.ivs[iv] ? set.ivs[iv] : 31;
				}
			}
			// Assuming the hardcoded set evs are all legal.
			if (!set.evs) set.evs = {hp:84, atk:84, def:84, spa:84, spd:84, spe:84};
			if (set.signatureMove) set.signatureMoves = [set.signatureMove];
			var len = set.signatureMoves.length;
			set.moves = set.moves.sample(4-len).concat(set.signatureMoves); // always have sig move.
			team.push(set);
		}
		return team;
	},
	randomtppbTeam: function(side) {
		var team = [];
		var variant = this.random(2);
		var sets = { // this is where all the movesets are defined. Add new mons here.
			'darkfiregamer': {
				species: "Houndoom", ability: "Dark Aura", item: "Dark Gem", gender: "M",
				moves: ['moonblast', 'hyperbeam', 'fireblast'],
				signatureMove: 'darkfire',
				evs: {hp:4, spa:252, spe:252}, nature: 'Timid'
			},
			'xfix': {
				species: 'Xatu', ability: 'Magic Bounce', item: 'Focus Sash', gender: 'M',
				moves: ['thunderwave', 'substitute', 'roost'],
				signatureMove: 'superglitch',
				evs: {hp:252, spd:252, def:4}, nature: 'Calm'
			},
			'azum4roll': {
				species: "Azumarill", ability: "Glitchiate", item: "Metronome", gender: 'M',
				moves: ['rollout', 'batonpass', 'swordsdance', 'bellydrum', 'extremespeed', 'playrough', 'thunderwave'],
				signatureMove: 'tm56',
				evs: {hp:4, atk:252, spe:252}, nature: 'Adamant'
			},
			'Iwamiger': {
				species: "Gengar", ability: 'Serene Grace Plus', item: "Life Orb", gender: 'M',
				moves: ['shadowball', 'flamethrower', 'icebeam', 'crunch'],
				signatureMove: 'hexattack',
				evs: {hp:4, spa:252, spe:252}, nature: 'Timid'
			},
			'Poomphcario': {
				species: "Lucario", ability: "Scrappy", item: 'Assault Vest', gender: 'M',
				moves: ['rockwrecker', 'megahorn', 'bulletpunch'],
				signatureMove: 'projectilespam',
				evs: {hp:4, atk:252, spe:252}, nature: 'Jolly'
			},
			'TieSoul': {
				species: 'Rhyperior', ability: 'Rock Head', item: 'Focus Sash', gender: 'M',
				moves: ['headsmash', 'autotomize', 'earthquake'],
				signatureMove: 'bulk',
				evs: {hp:252, def:252, spe:4}, nature: 'Impish'
			},
			"Soma's Ghost": {
				species: 'Herdier', ability: 'Spoopify', item: 'Leftovers', gender: 'M',
				moves: ['playrough', 'swordsdance', 'substitute'],
				signatureMove: 'shadowrush',
				evs: {atk:252, def:4, spe:252}, nature: 'Jolly'
			},
			"Lass zeowx": { // STPPLB+ only
				species: 'Liepard', ability: 'Protean', item: 'Focus Sash', gender: 'F',
				moves: ['suckerpunch', 'shadowsneak', 'bulletpunch', 'playrough', 'spikes', 'acrobatics'].sample(2).concat('fakeout'), // always have Fake Out.
				signatureMove: 'partingvoltturn',
				evs: {atk:252, spa:12, spe:244}, nature: 'Hasty'
			},
			"Eeveelutionlvr": {
				species: 'Eevee', ability: 'Proteon', item: 'Eviolite', gender: 'M',
				moves: ['hydropump', 'flareblitz', 'thunderbolt', 'batonpass', 'nastyplot', 'dazzlinggleam', 'energyball', 'leechseed', 'blizzard', 'nightslash', 'psychic', 'hyperbeam'], // azum stop nagging about this moveset.
				signatureMove: 'evolutionbeam',
				evs: {spa:252, spe:252, hp:4}, nature: 'Timid'
			},
			'sohippy': {
				species: 'Rotom-Wash', ability: 'Swahahahahaggers', item: 'Leftovers', gender: 'M',
				moves: ['scald', 'painsplit', 'destinybond', 'voltswitch', 'swagger', 'taunt', 'foulplay', 'hex', 'hydropump', 'electricterrain'],
				signatureMove: 'hyperwahahahahaha',
				evs: {hp:252, spa:252, spd:4}, nature: 'Modest'
			},
			'Kooma9': {
				species: 'Blastoise-Mega', ability: 'Psychologist', item: 'Focus Sash', gender: 'M',
				moves: ['scald', 'roar', 'toxic'],
				signatureMove: 'disappointment',
				evs: {hp:252, def:252, spa:4}, nature: 'Bold'
			},
			"Kap'n Kooma": { // STPPLB+ only
				species: 'Kingdra', ability: 'Sea and Sky', item: 'Choice Specs', gender: 'M',
				moves: ['steameruption', 'dracometeor', 'thunder'],
				signatureMove: 'broadside',
				evs: {hp:4, spa:252, spe:252}, nature: 'Modest'
			},
			'BEST': { // STPPB only
				species: 'Typhlosion', ability: 'Technician', item: 'Life Orb', gender: 'M',
				moves: ['waterpulse', 'hiddenpowerice', 'shockwave'],
				ivs: {atk:30, def:30}, // in order for HP Ice to be a thing.
				signatureMove: 'bestfcar',
				evs: {atk:252,def:4,spe:252}, nature: 'Adamant'
			},
			'Poomph':{
				species: "Ampharos", ability: "Little Engine", item: 'Life Orb', gender: 'M',
				moves: ['headsmash','frustration','withdraw', 'endure','wish'],
				signatureMove: 'eternalstruggle',
				happiness: 0,
				evs: {hp:252, atk:252, def:4}, nature: 'Adamant'
			},
			'NoFunMantis':{
				species: "Scyther", ability: "No Fun Allowed", item: 'Eviolite', gender: 'M',
				moves: ['knockoff','brickbreak','aerialace','swordsdance','agility','batonpass','roost'],
				signatureMove: 'xscissor',
				evs: {hp:4, atk:252, spe:252}, nature: 'Adamant'
			},
			'BigFatMantis': {
				species: "Scyther", shiny: true, ability: "Dictator", item: 'Eviolite', gender: 'M',
				moves: ['bravebird', 'aerialace', 'swordsdance', 'roost', 'uturn', 'xscissor', 'knockoff', 'earthquake'],
				signatureMove: 'nofun',
				evs: {hp:216,atk:40,spe:252}, nature: 'Jolly'
			},
			'DictatorMantis': {
				species: 'Scizor', ability: 'Technicality', item: 'Occa Berry', gender: 'M',
				moves: ['barrier','craftyshield','trick','block','disable','stickyweb','embargo','quash','taunt','knockoff','bulletpunch'],
				signatureMove: 'ironfist',
				evs: {hp:4,atk:252,spe:252}, nature: 'Adamant'
			},
			'MegaCharizard': {
				species: 'Charizard', ability: 'Truant', item: 'Charizardite Y', gender: 'M',
				moves: ['airslash', 'earthpower', 'roost', 'slackoff', 'flamethrower'],
				signatureMove: 'afk',
				evs: {hp: 4, spa: 252, spe: 252}, nature: 'Timid'
			},
			'Natsugan': {
				species: 'Flygon', ability: 'Mega Plunder', item: megaStoneList.sample(1)[0], gender: 'M',
				moves: ['earthquake','earthpower','uturn','dragonclaw','fireblast','boomburst','dragonpulse','return','stoneedge','crunch','ironhead','dragondance','quiverdance'],
				signatureMove: 'reroll',
				nature: 'Serious'
			},
			'Bird Jesus': { //STPPB only
				species: 'Pidgeot', ability: 'Messiah', item: 'Flying Gem', gender: 'M',
				moves: ['judgment', 'focusblast', 'roost','fireblast'],
				signatureMove: 'godbird',
				evs: {spa:252,def:4,spe:252}, nature: 'Timid'
			},
			'GroundCtrl27': {
				species: 'Meloetta', ability: 'Scrappy', item: 'Assault Vest', gender: 'M',
				moves: ['hypervoice'],
				signatureMoves: ['shadowsphere', 'drainforce', 'sneakyspook'],
				evs: {hp: 248, spa: 252, spe: 8}, nature: 'Modest'
			},
			'WhatevsFur': {
				species: 'Ursaring', ability: 'Furrier Coat', item: 'Leftovers', gender: 'F',
				moves: ['earthquake','drainpunch','bulkup','protect','aromatherapy'],
				signatureMove: 'wish',
				evs: {hp: 252, def: 168, spd: 88}, nature: 'Calm'
			}
		};
		var pool = Object.keys(sets).randomize();
		for (var i = 0; i < Math.min(6, pool.length); i++) {
			var set = sets[pool[i]];
			set.level = 100;
			set.name = pool[i];
			if (!set.ivs) { // set 31 for unspecified IVs.
				set.ivs = {hp:31, atk:31, def:31, spa:31, spd:31, spe:31};
			} else {
				for (var iv in {hp:31, atk:31, def:31, spa:31, spd:31, spe:31}) {
					set.ivs[iv] = set.ivs[iv] ? set.ivs[iv] : 31;
				}
			}
			// Assuming the hardcoded set evs are all legal.
			if (!set.evs) set.evs = {hp:84, atk:84, def:84, spa:84, spd:84, spe:84};
			if (set.signatureMove) set.signatureMoves = [set.signatureMove];
			var len = set.signatureMoves.length;
			set.moves = set.moves.sample(4-len).concat(set.signatureMoves); // always have sig move.
			team.push(set);
		}
		return team;
	},
	// Mix and Mega mechanics just for Natsugon EleGiggle
	init: function () {
		var onTakeMegaStone = function (item, source) {
			return false;
		};
		for (var id in this.data.Items) {
			if (id !== 'redorb' && id !== 'blueorb' && !this.data.Items[id].megaStone) continue;
			this.modData('Items', id).onTakeItem = onTakeMegaStone;
		}
	},
	canMegaEvo: function (pokemon) {
		if (pokemon.template.isMega || pokemon.template.isPrimal) return false;

		var item = pokemon.getItem();
		if (item.megaStone) {
			if (item.megaStone === pokemon.species) return false;
			return item.megaStone;
		} else if (pokemon.set.moves.indexOf('dragonascent') >= 0) {
			return 'Rayquaza-Mega';
		} else {
			return false;
		}
	},
	runMegaEvo: function (pokemon) {
		if (pokemon.template.isMega || pokemon.template.isPrimal) return false;
		var template = this.getMixedTemplate(pokemon.originalSpecies, pokemon.canMegaEvo);
		var side = pokemon.side;

		// PokÃ©mon affected by Sky Drop cannot mega evolve. Enforce it here for now.
		var foeActive = side.foe.active;
		for (var i = 0; i < foeActive.length; i++) {
			if (foeActive[i].volatiles['skydrop'] && foeActive[i].volatiles['skydrop'].source === pokemon) {
				return false;
			}
		}

		pokemon.formeChange(template);
		pokemon.baseTemplate = template; // mega evolution is permanent

		// Do we have a proper sprite for it?
		if (this.getTemplate(pokemon.canMegaEvo).baseSpecies === pokemon.originalSpecies) {
			pokemon.details = template.species + (pokemon.level === 100 ? '' : ', L' + pokemon.level) + (pokemon.gender === '' ? '' : ', ' + pokemon.gender) + (pokemon.set.shiny ? ', shiny' : '');
			this.add('detailschange', pokemon, pokemon.details);
			this.add('-mega', pokemon, template.baseSpecies, template.requiredItem);
		} else {
			var oTemplate = this.getTemplate(pokemon.originalSpecies);
			var oMegaTemplate = this.getTemplate(template.originalMega);
			if (template.originalMega === 'Rayquaza-Mega') {
				this.add('message', "" + pokemon.side.name + "'s fervent wish has reached " + pokemon.species + "!");
			} else {
				this.add('message', "" + pokemon.species + "'s " + pokemon.getItem().name + " is reacting to " + pokemon.side.name + "'s Mega Bracelet!");
			}
			this.add('-formechange', pokemon, oTemplate.species, template.requiredItem);
			this.add('message', template.baseSpecies + " has Mega Evolved into Mega " + template.baseSpecies + "!");
			this.add('-start', pokemon, oMegaTemplate.requiredItem || oMegaTemplate.requiredMove, '[silent]');
			if (oTemplate.types.length !== pokemon.template.types.length || oTemplate.types[1] !== pokemon.template.types[1]) {
				this.add('-start', pokemon, 'typechange', pokemon.template.types.join('/'), '[silent]');
			}
		}

		pokemon.setAbility(template.abilities['0']);
		pokemon.baseAbility = pokemon.ability;
		pokemon.canMegaEvo = false;
		return true;
	},
	doGetMixedTemplate: function (template, deltas) {
		if (!deltas) throw new TypeError("Must specify deltas!");
		if (!template || typeof template === 'string') template = this.getTemplate(template);
		template = Object.clone(template); // shallow is enough
		template.abilities = {'0': deltas.ability};
		template.types = Object.merge(template.types.slice(), deltas.types).compact().unique();
		var baseStats = template.baseStats;
		template.baseStats = {};
		for (var statName in baseStats) template.baseStats[statName] = baseStats[statName] + deltas.baseStats[statName];
		template.weightkg = Math.max(0.1, template.weightkg + deltas.weightkg);
		template.originalMega = deltas.originalMega;
		template.requiredItem = deltas.requiredItem;
		if (deltas.isMega) template.isMega = true;
		if (deltas.isPrimal) template.isPrimal = true;
		return template;
	},
	getMixedTemplate: function (originalSpecies, megaSpecies) {
		var originalTemplate = this.getTemplate(originalSpecies);
		var megaTemplate = this.getTemplate(megaSpecies);
		if (originalTemplate.baseSpecies === megaTemplate.baseSpecies) return megaTemplate;
		var deltas = this.getMegaDeltas(megaTemplate);
		var template = this.doGetMixedTemplate(originalTemplate, deltas);
		return template;
	},
	getMegaDeltas: function (megaTemplate) {
		var baseTemplate = this.getTemplate(megaTemplate.baseSpecies);
		var deltas = {
			ability: megaTemplate.abilities['0'], baseStats: {}, weightkg: megaTemplate.weightkg - baseTemplate.weightkg, types: Array(baseTemplate.types.length),
			originalMega: megaTemplate.species, requiredItem: megaTemplate.requiredItem
		};
		for (var statId in megaTemplate.baseStats) deltas.baseStats[statId] = megaTemplate.baseStats[statId] - baseTemplate.baseStats[statId];
		if (megaTemplate.types.length > baseTemplate.types.length) {
			deltas.types.push(megaTemplate.types[1]);
		} else if (megaTemplate.types.length < baseTemplate.types.length) {
			deltas.types[1] = baseTemplate.types[0];
		} else if (megaTemplate.types[1] !== baseTemplate.types[1]) {
			deltas.types[1] = megaTemplate.types[1];
		}
		if (megaTemplate.isMega) deltas.isMega = true;
		if (megaTemplate.isPrimal) deltas.isPrimal = true;
		return deltas;
	}
}
