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
			set.moves = set.moves.sample(3).concat(set.signatureMove); // always have sig move.
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
			set.moves = set.moves.sample(3).concat(set.signatureMove); // always have sig move.
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
				species: 'Charizard', ability: 'Truant', item: 'Charizardite Y', gender: 'F',
				moves: ['airslash', 'earthpower', 'roost', 'slackoff', 'flamethrower'],
				signatureMove: 'afk',
				evs: {hp: 4, spa: 252, spe: 252}, nature: 'Timid'
			}
						'Bird Jesus': { // STPPB only
+				species: 'Pidgeot', ability: 'Messiah', item: 'Flying Gem', gender: 'M',
+				moves: ['judgement', 'focusblast', 'roost','fireblast'],
+				signatureMove: 'godbird',
+				evs: {spa:252,def:4,spe:252}, nature: 'Timid'
+			},
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
			set.moves = set.moves.sample(3).concat(set.signatureMove); // always have sig move.
			team.push(set);
		}
		return team;
	}
}
