exports.BattleMovedex = {
	"disappointment": {
		num: 622,
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "The user faints and the Pokemon brought out to replace it has its HP fully restored along with having any major status condition cured and getting a boost in all stats. Fails if the user is the last unfainted Pokemon in its party.",
		shortDesc: "User faints. Replacement is fully healed with boosts.",
		id: "disappointment",
		isViable: true,
		name: "Disappointment",
		pp: 10,
		priority: 0,
		flags: {snatch: 1, heal: 1},
		onTryHit: function (pokemon, target, move) {
			if (!this.canSwitch(pokemon.side)) {
				delete move.selfdestruct;
				return false;
			}
		},
		onPrepareHit: function(target, source, move) { // animation
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Lunar Dance', source);
		},
		selfdestruct: true,
		sideCondition: 'disappointment',
		effect: {
			duration: 2,
			onStart: function (side, source) {
				this.debug('Disappointment started on ' + side.name);
				this.effectData.positions = [];
				for (var i = 0; i < side.active.length; i++) {
					this.effectData.positions[i] = false;
				}
				this.effectData.positions[source.position] = true;
			},
			onRestart: function (side, source) {
				this.effectData.positions[source.position] = true;
			},
			onSwitchInPriority: 1,
			onSwitchIn: function (target) {
				if (!this.effectData.positions[target.position]) {
					return;
				}
				if (!target.fainted) {
					target.heal(target.maxhp);
					target.setStatus('');
					this.boost({atk:1,def:1,spa:1,spd:1,spe:1}, target);
					this.add('-heal', target, target.getHealth, '[from] move: Disappointment');
					this.effectData.positions[target.position] = false;
				}
				if (!this.effectData.positions.any(true)) {
					target.side.removeSideCondition('disappointment');
				}
			}
		},
		secondary: false,
		target: "self",
		type: "Normal"
	},
	'darkfire': {
		num: 623,
		name: 'Darkfire',
		id: 'darkfire',
		basePower: 90,
		accuracy: 100,
		category: 'Special',
		target: 'any',
		flags: {protect: 1, mirror: 1},
		onEffectiveness: function (typeMod, type, move) {
			return typeMod + this.getEffectiveness('Fire', type); // includes Fire in its effectiveness.
		},
		onPrepareHit: function(target, source, move) { // animation
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Flamethrower', target);
		},
		self: {
			onHit: function(pokemon) { // Mega evolves dfg
					var temp = pokemon.item;
					pokemon.item = 'houndoominite'; // in order to make it mega evolvable, add a Houndoomite temporarily.
					if (!pokemon.template.isMega) pokemon.canMegaEvo = this.canMegaEvo(pokemon); // don't mega evolve if it's already mega
					if (pokemon.canMegaEvo) this.runMegaEvo(pokemon);
					pokemon.item = temp; // give its normal item back.
				}
		},
		flags: {protect: 1, pulse: 1, mirror: 1, distance: 1},
		secondary: {
			chance: 20,
			volatileStatus: 'flinch'
		},
		priority: 0,
		pp: 15,
		type: 'Dark'
	},
	'superglitch': {
		num: 624,
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "A random move is selected for use, other than After You, Assist, Belch, Bestow, Celebrate, Chatter, Copycat, Counter, Covet, Crafty Shield, Destiny Bond, Detect, Diamond Storm, Endure, Feint, Focus Punch, Follow Me, Freeze Shock, Happy Hour, Helping Hand, Hold Hands, Hyperspace Hole, Ice Burn, King's Shield, Light of Ruin, Mat Block, Me First, Metronome, Mimic, Mirror Coat, Mirror Move, Nature Power, Protect, Quash, Quick Guard, Rage Powder, Relic Song, Secret Sword, Sketch, Sleep Talk, Snarl, Snatch, Snore, Spiky Shield, Steam Eruption, Struggle, Switcheroo, Techno Blast, Thief, Thousand Arrows, Thousand Waves, Transform, Trick, V-create, or Wide Guard.",
		shortDesc: "Picks a random move.",
		id: "superglitch",
		name: "(Super Glitch)",
		pp: 10,
		priority: 0,
		multihit: [2, 5],
		flags: {},
		onHit: function (target) {
			var moves = [];
			for (var i in exports.BattleMovedex) {
				var move = exports.BattleMovedex[i];
				if (i !== move.id) continue;
				if (move.isNonstandard) continue;
				var noMetronome = {
					afteryou:1, assist:1, belch:1, bestow:1, celebrate:1, chatter:1, copycat:1, counter:1, covet:1, craftyshield:1, destinybond:1, detect:1, diamondstorm:1, dragonascent:1, endure:1, feint:1, focuspunch:1, followme:1, freezeshock:1, happyhour:1, helpinghand:1, holdhands:1, hyperspacefury:1, hyperspacehole:1, iceburn:1, kingsshield:1, lightofruin:1, matblock:1, mefirst:1, metronome:1, mimic:1, mirrorcoat:1, mirrormove:1, naturepower:1, originpulse:1, precipiceblades:1, protect:1, quash:1, quickguard:1, ragepowder:1, relicsong:1, secretsword:1, sketch:1, sleeptalk:1, snarl:1, snatch:1, snore:1, spikyshield:1, steameruption:1, struggle:1, switcheroo:1, technoblast:1, thief:1, thousandarrows:1, thousandwaves:1, transform:1, trick:1, vcreate:1, wideguard:1
				};
				if (!noMetronome[move.id]) {
					moves.push(move);
				}
			}
			var move = '';
			if (moves.length) {
				moves.sort(function (a, b) {return a.num - b.num;});
				move = moves[this.random(moves.length)].id;
			}
			if (!move) {
				return false;
			}
			this.useMove(move, target);
		},
		onTryHit: function (target, source) { // can cause TMTRAINER effect randomly
			if (!source.isActive) return null;
			if (this.random(777) !== 42) return; // 1/777 chance to cause TMTRAINER effect
			var opponent = target;
			opponent.setStatus('brn');
			var possibleStatuses = ['confusion', 'flinch', 'attract', 'focusenergy', 'foresight', 'healblock'];
			for (var i = 0; i < possibleStatuses.length; i++) {
				if (this.random(3) === 1) {
					opponent.addVolatile(possibleStatuses[i]);
				}
			}

			function generateNoise() { // make some random glitchy text.
				var noise = '';
				var random = this.random(40, 81);
				for (var i = 0; i < random; i++) {
					if (this.random(4) !== 0) {
						// Non-breaking space
						noise += '\u00A0';
					} else {
						noise += String.fromCharCode(this.random(0xA0, 0x3040));
					}
				}
				return noise;
			}
			// weird effects.
			this.add('-message', "(Enemy " + generateNoise.call(this) + " TMTRAINER " + opponent.name + " is frozen solid?)");
			this.add('-message', "(Enemy " + generateNoise.call(this) + " TMTRAINER " + opponent.name + " is hurt by its burn!)");
			this.damage(opponent.maxhp * this.random(42, 96) * 0.01, opponent, opponent);
			var exclamation = source.status === 'brn' ? '!' : '?';
			this.add('-message', "(Enemy " + generateNoise.call(this) + " TMTRAINER xfix is hurt by its burn" + exclamation + ")");
			this.damage(source.maxhp * this.random(24, 48) * 0.01, source, source);
			return null;
		},
		secondary: false,
		target: "self",
		type: "Normal"
	},
	'tm56': {
		num: 625,
		name: 'TM56',
		id: 'tm56',
		type: 'Bird',
		basePower: 205,
		accuracy: 37,
		pp: 10,
		drain: [1, 2],
		category: 'Physical',
		flags: {pulse: 1, bullet: 1, protect: 1, mirror: 1},
		onPrepareHit: function(target, source) { // Turns user into Bird-type.
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Wish', source);
			if (!source.hasType('Bird')) { // turn user into Bird-type and spout glitchy nonsense.
				this.add("c|azum4roll|9̜͉̲͇̱̘̼ͬ̈́̒͌̑̓̓7ͩ͊̚5ͨ̆͐͏̪̦6̗͎ͬ̿̍̍̉ͧ͢4̯̠ͤ͛͐̄͒͡2͐ͬ̀d̺͉̜̈ͯ̓x̩̖̥̦̥͛́ͥ͑̈́ͩ͊͠║̛̥̜̱̝͍͒̌ͣ̀͌͌̒'̣͎̗̬̯r̸̗͍ͫ̓͆ͣ̎͊ ̜̻̈D͓̰̳̝̥̙͙͋̀E͉͔̥͇̫͓͍̔ͬͣ͂̓̽x̰̗̬̖͊̏̄̑̒̿͊s̜̪̏́f̧̯̼̦̓͌̇̒o̱̾̓ͩ̆̓̀F̟̰͓̩̂̆͛ͤ▓̣̩̝̙̇̓͒͋̈͡1̡̹̹͓̬͖͐̑̉̔̏xͥ̀'̻͖͍̠̉͡v̫̼̹̳̤̱͉▓̄̏͂ͤͭ̋ͫ͏̠̦̝▓̟͉͇̣̠̦̓̄ͫͥ̐̍̂▓͔̦̫̦̜̖́▓͍ͯ͗̾͆▓̮̗̠̜͙̹̟͊̎ͤ̔̽ͬ̃▓̩̟̏ͪ̇̂̂̒▓̖̼̤͉ͤ̾̋ͥͣͬ͒▓̈́̿͂̌̓▓͇̞̗̽̔̂͊̌ͣ͐▓ͬ́ͥ̔͒͒̎▓̰̪̫̩͇̲̇̔̿͢ͅ▓̞̬͎▓̖͍̖̫ͪ͐̆̅̍̂ͨͅ▓̡̭̠̗̳̬̜̝▓̤͙̥̆̌ͨͪ̆͌▓̴͉̩̈́▓ͩ̌̌̂̿̑̐▓ͨ҉͕̠͍▓̹̌̅̂ͨ͋̃͑▓̯̰̣̝̯ͭͦ̂͋̇̾͠▓̸̺̣̜̯̙̂͋̈ͨ̎̾ͧ▓͢▓͔̚▓̭͎͖̟̼̄̈̃̎́▓̧̌ͧ▓̼̹͈͗̄̆");
				source.setType('Bird');
				this.add('-start', source, 'typechange', 'Bird');
			}
		},
		onHit: function(target, source) { // Turns target into Bird-type.
			if (target.hasType('Bird')) return true;
			target.setType('Bird');
			this.add('-start', target, 'typechange', 'Bird');
		},
		onMoveFail: function (target, source, move) {
			this.boost({accuracy:1, evasion:1}, source);
		},
	},
	'hexattack': {
		num: 626,
		name: 'Hex Attack',
		id: 'hexattack',
		type: 'Ghost',
		category: 'Special',
		basePower: 100,
		accuracy: 90,
		pp: 5,
		onPrepareHit: function(target, source, move) { // animation
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Tri Attack', target);
		},
		flags: {protect: 1, mirror: 1},
		secondary: {
			chance: 20,
			onHit: function (target, source) { // random status.
				var result = this.random(6);
				if (result === 0) {
					target.trySetStatus('brn', source);
				} else if (result === 1) {
					target.trySetStatus('par', source);
				} else if (result === 2) {
					target.trySetStatus('frz', source);
				} else if (result === 3) {
					target.addVolatile('confusion');
				} else if (result === 4) {
					target.addVolatile('attract');
				} else {
					target.trySetStatus('slp', source);
				}
			}
		}
	},
	'projectilespam': {
		num: 627,
		name: 'Projectile Spam',
		id: 'projectilespam',
		type: 'Fighting',
		category: 'Physical',
		pp: 20,
		basePower: 12,
		multihit: [8, 11],
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Bullet Punch', target);
		},
		self: {
			volatileStatus: 'lockedmove'
		},
		onAfterMove: function (pokemon) {
			if (pokemon.volatiles['lockedmove'] && pokemon.volatiles['lockedmove'].duration === 1) {
				pokemon.removeVolatile('lockedmove');
			}
		},
		flags: {protect: 1, mirror: 1}
	},
	'bulk': {
		num: 628,
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "Raises the user's Attack and Defense by 2 stages.",
		shortDesc: "Raises the user's Attack and Defense by 2.",
		id: "bulk",
		isViable: true,
		name: "BULK!!",
		pp: 20,
		priority: 0,
		flags: {snatch: 1},
		boosts: {
			atk: 2,
			def: 2
		},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Bulk Up', source);
		},
		secondary: false,
		target: "self",
		type: "Fighting"
	},
	'shadowrush': {
		num: 629,
		accuracy: 100,
		basePower: 80,
		category: "Physical",
		desc: "No additional effect.",
		shortDesc: "Usually goes first.",
		id: "shadowrush",
		name: "Shadow Rush",
		pp: 5,
		priority: 2,
		flags: {contact: 1, protect: 1, mirror: 1},
		secondary: false,
		target: "normal",
		type: "Ghost",
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Shadow Sneak', target);
		}
	},
	'partingvoltturn': {
		num: 630,
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "Uses Parting Shot, Volt Switch and U-Turn in the same turn.",
		shortDesc: "Gets the fuck out of here.",
		id: "partingvoltturn",
		name: "Parting Volt Turn",
		pp: 10,
		priority: 0,
		flags: {},
		onHit: function(target) {
			this.useMove('partingshot', target);
			this.useMove('voltswitch', target);
			this.useMove('uturn', target);
			this.add("c|Lass Zeowx|I'm getting outta here! Byeeeee~");
		},
		secondary: false,
		target: "self",
		type: "Normal"
	},
	'evolutionbeam': {
		num: 631,
		accuracy: 100,
		basePower: 10,
		category: "Special",
		desc: "Hits once for every eeveelution.",
		shortDesc: "Hits once for every eeveelution.",
		id: "evolutionbeam",
		name: "Evolution Beam",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onPrepareHit: function (target, source, move) { // animation depending on type.
			this.attrLastMove('[still]');
			if (move.type === 'Normal')
				this.add('-anim', source, "Swift", target);
			if (move.type === 'Fire')
				this.add('-anim', source, "Flamethrower", target);
			if (move.type === 'Water')
				this.add('-anim', source, "Hydro Pump", target);
			if (move.type === 'Electric')
				this.add('-anim', source, "Zap Cannon", target);
			if (move.type === 'Psychic')
				this.add('-anim', source, "Psybeam", target);
			if (move.type === 'Dark')
				this.add('-anim', source, "Dark Pulse", target);
			if (move.type === 'Ice')
				this.add('-anim', source, "Ice Beam", target);
			if (move.type === 'Grass')
				this.add('-anim', source, 'Solar Beam', target);
			if (move.type === 'Fairy')
				this.add('-anim', source, 'Dazzling Gleam', target);
		},
		onTryHit: function(target, pokemon, move) {
			if (move.type === 'Normal') {
				var t = move.eeveelutiontypes.slice(0);
				move.accuracy = true; // I think this is bugged.
				for (var i = 0; i < move.eeveelutiontypes.length; i++) { // hit for all eeveelution types in random order.
					var r = this.random(t.length);
					move.type = t[r];
					t.splice(r, 1);
					this.useMove(move, pokemon, target);
				}
				move.type = 'Normal';
				move.accuracy = 100;
			}
		},
		eeveelutiontypes: ['Fire', 'Water', 'Electric', 'Psychic', 'Dark', 'Grass', 'Ice', 'Fairy'],
		secondary: false,
		target: "normal",
		type: "Normal"
	},
	'hyperwahahahahaha': {
		num: 632,
		name: 'Hyper WAHAHAHAHAHA',
		id: 'hyperwahahahahaha',
		flags: {protect: 1, mirror: 1, sound: 1, authentic: 1},
		accuracy: 100,
		basePower: 90,
		category: "Special",
		desc: "Has a 20% chance to paralyze the target and a 20% chance to cofuse it.",
		shortDesc: "20% chance to paralyze the target and 20% to confuse target.",
		isViable: true,
		pp: 15,
		priority: 0,
		onPrepareHit: function(target, source, move) { // animation
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Zap Cannon', target);
		},
		secondaries: [{chance: 20, status: 'par'}, {chance: 20, volatileStatus: 'confusion'}],
		target: "normal",
		type: "Electric"
	},
	'broadside': {
		num: 633,
		name: 'Broadside',
		id: 'broadside',
		accuracy: 100,
		basePower: 18,
		multihit: 5,
		category: "Special",
		desc: "No additional effect.",
		shortDesc: "Hits adjacent Pokemon.",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1, nonsky: 1},
		onPrepareHit: function(target, source, move) { // animation
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Spike Cannon', target);
		},
		secondary: false,
		target: "allAdjacent",
		type: "Water"
	},
	'bestfcar': {
		num: 634,
		name: 'BEST F-CAR',
		id: 'bestfcar',
		basePower: 60,
		secondaries: [{chance: 20, status: 'brn'}, {chance: 100, self: {boosts: {spa: 1}}}],
		accuracy: 100,
		category: "Special",
		desc: "Has a 20% chance to burn the target. Raises Sp.Atk by 1 stage.",
		shortDesc: "20% chance to burn the target. Raises Sp.Atk by 1.",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		target: "normal",
		type: "Fire"
	},
	'eternalstruggle': {
		num: 635,
		name: 'Eternal Struggle',
		id: 'eternalstruggle',
		category: 'Special',
		type: 'Electric',
		desc: 'Has 1/2 recoil.',
		shortDesc: 'Has 1/2 recoil.',
		pp: 5,
		priority: 0,
		basePower: 180,
		accuracy: 100,
		flags: {protect: 1, mirror: 1},
		onPrepareHit: function (target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Volt Tackle', target);
		},
		recoil: [1, 2],
		onHit: function (target, source, move) {
			this.boost({atk:-1, def:-1, spa:-1, spd:-1, spe:-1}, source);
		}
	},
	'nofun': {
		num: 636,
		name: 'No Fun',
		id: 'nofun',
		category: 'Physical',
		priority: 1,
		basePower: 90,
		accuracy: 90,
		type: 'Bug',
		pp: 15,
		flags: {protect: 1, mirror: 1},
		onHit: function (target) {
			target.clearBoosts();
			this.add('-clearboost', target);
		},
		secondary: false,
		target: "normal",
	},
	'ironfist': {
		num: 637,
		name: 'Iron Fist',
		id: 'ironfist',
		category: 'Physical',
		basePower: 90,
		accuracy: 100,
		pp: 10,
		type: 'Steel',
		flags: {contact:1, protect:1, mirror:1},
		onPrepareHit: function(target, source, move) { // animation
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Dynamic Punch', target);
		},
		onHit: function(target) {
			var bannedAbilities = {multitype:1, defeatist:1, stancechange:1, truant:1};
			if (!bannedAbilities[target.ability]) {
				var oldAbility = target.setAbility('defeatist');
				if (oldAbility) {
					this.add('-endability', target, oldAbility, '[from] move: Iron Fist');
					this.add('-ability', target, 'Defeatist', '[from] move: Iron Fist');
					return;
				}
			}
		},
		self: {
			onHit: function(pokemon) {
				var temp = pokemon.item;
				pokemon.item = 'Scizorite';
				if (!pokemon.template.isMega) pokemon.canMegaEvo = this.canMegaEvo(pokemon); // don't mega evolve if it's already mega
				if (pokemon.canMegaEvo) this.runMegaEvo(pokemon);
				pokemon.item = temp; // give its normal item back.
			}
		}
	},
	'afk': {
		num: 638,
		name: 'AFK',
		id: 'afk',
		category: 'Special',
		type: 'Fire',
		basePower: 120,
		accuracy: 100,
		pp: 5,
		priority: 0,
		flags: {charge: 1, protect: 1, mirror: 1},
		onTry: function(attacker, defender, move) {
			this.attrLastMove('[still]');
			if (attacker.volatiles[move.id] && attacker.volatiles[move.id].duration === 1) {
				this.add('-anim', attacker, 'Flare Blitz', defender);
				this.add('c|MegaCharizard|back');
				attacker.removeVolatile(move.id);
				return;
			}
			if (!attacker.volatiles[move.id]) {
				this.add('c|MegaCharizard|afk');
				this.add('-prepare', attacker, 'Shadow Force', defender);
			} else {
				this.add('raw|MegaCharizard is still gone!');
			}
			attacker.addVolatile('afk', defender);
			return null;
		},
		effect: {
			duration: 3,
			onLockMove: 'afk',
			onAccuracy: function(accuracy, target, source, move) {
				if (move.id === 'helpinghand') {
					return;
				}
				if (source.hasAbility('noguard') || target.hasAbility('noguard')) {
					return;
				}
				if (source.volatiles['lockon'] && target === source.volatiles['lockon'].source) return;
				return 0;
			}
		},
		secondaries: [
		{
			chance: 20,
			volatileStatus: 'confusion'
		}, {
			chance: 10,
			status: 'slp'
		}],
		target: 'normal'
	},
	"godbird": {
		num: 638,
		accuracy: 100,
		basePower: 100,
		category: "Special",
		desc: "If this move is successful, it breaks through the target's Detect, King's Shield, Protect, or Spiky Shield for this turn, allowing other Pokemon to attack the target normally. If the target's side is protected by Crafty Shield, Mat Block, Quick Guard, or Wide Guard, that protection is also broken for this turn and other Pokemon may attack the target's side normally. This attack charges on the first turn and executes on the second. On the first turn, the user avoids all attacks. If the user is holding a Power Herb, the move completes in one turn. Damage doubles and no accuracy check is done if the target has used Minimize while active.",
		shortDesc: "Soars in the sky turn 1. Hits turn 2. Breaks protection.",
		id: "godbird",
		name: "God Bird",
		pp: 15,
		priority: 0,
		flags: {contact: 1, charge: 1, mirror: 1},
		breaksProtect: true,
		self: {
			onHit: function(pokemon) { 
				var temp = pokemon.item;
				pokemon.item = 'pidgeotite'; 
				if (!pokemon.template.isMega) pokemon.canMegaEvo = this.canMegaEvo(pokemon); 
				if (pokemon.canMegaEvo) this.runMegaEvo(pokemon);
				pokemon.item = temp; 
			}
		},
		onTry: function (attacker, defender, move) {
			if (attacker.removeVolatile(move.id)) {
				return;
			}
			this.add('-prepare', attacker, 'Fly', defender);
			if (!this.runEvent('ChargeMove', attacker, defender, move)) {
				this.add('-anim', attacker, 'Fly', defender);
				return;
			}
			attacker.addVolatile('twoturnmove', defender);
			return null;
		},
		effect: {
			duration: 2,
			onAccuracy: function (accuracy, target, source, move) {
				if (move.id === 'helpinghand') {
					return;
				}
				if (source.hasAbility('noguard') || target.hasAbility('noguard')) {
					return;
				}
				if (source.volatiles['lockon'] && target === source.volatiles['lockon'].source) return;
				return 0;
			}
		},
		secondary: false,
		target: "normal",
		type: "Flying"
	},
	'reroll': {
		num: 639,
		accuracy: true,
		basePower: 0,
		category: 'Status',
		flags: {},
		pp: 10,
		priority: 0,
		onPrepareHit: function(target, source, move) { // animation
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Swords Dance', source);
		},
		onHit: function(target) {
			if (!target.template.isMega) {
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
				target.item = megaStoneList.sample(1)[0];
				this.add('-item', target, target.getItem(), '[from] move: Re-Roll');
				target.canMegaEvo = this.canMegaEvo(target);
				var pokemon = target;
				var item = pokemon.getItem();
				if (pokemon.isActive && !pokemon.template.isMega && !pokemon.template.isPrimal && (item.id === 'redorb' || item.id === 'blueorb') && pokemon.baseTemplate.tier !== 'Uber' && !pokemon.template.evos.length) {
					// Primal Reversion
					var bannedMons = {'Kyurem-Black':1, 'Slaking':1, 'Regigigas':1, 'Cresselia':1, 'Shuckle':1};
					if (!(pokemon.baseTemplate.baseSpecies in bannedMons)) {
						var template = this.getMixedTemplate(pokemon.originalSpecies, item.id === 'redorb' ? 'Groudon-Primal' : 'Kyogre-Primal');
						pokemon.formeChange(template);
						pokemon.baseTemplate = template;

						// Do we have a proper sprite for it?
						if (pokemon.originalSpecies === (item.id === 'redorb' ? 'Groudon' : 'Kyogre')) {
							pokemon.details = template.species + (pokemon.level === 100 ? '' : ', L' + pokemon.level) + (pokemon.gender === '' ? '' : ', ' + pokemon.gender) + (pokemon.set.shiny ? ', shiny' : '');
							this.add('detailschange', pokemon, pokemon.details);
						} else {
							var oTemplate = this.getTemplate(pokemon.originalSpecies);
							this.add('-formechange', pokemon, oTemplate.species, template.requiredItem);
							this.add('-start', pokemon, this.getTemplate(template.originalMega).requiredItem, '[silent]');
							if (oTemplate.types.length !== pokemon.template.types.length || oTemplate.types[1] !== pokemon.template.types[1]) {
								this.add('-start', pokemon, 'typechange', pokemon.template.types.join('/'), '[silent]');
							}
						}
						this.add('message', pokemon.name + "'s " + pokemon.getItem().name + " activated!");
						this.add('message', pokemon.name + "'s Primal Reversion! It reverted to its primal form!");
						pokemon.setAbility(template.abilities['0']);
						pokemon.baseAbility = pokemon.ability;
						pokemon.canMegaEvo = false;
					}
				}
			}
		},
		name: 'Re-Roll',
		id: 'reroll',
		secondary: false,
		target: 'self',
		type: 'Normal'
	},
	'shadowsphere': {
		num: 640,
		accuracy: 100,
		basePower: 90,
		category: "Special",
		desc: "Has a 20% chance to lower the target's Special Defense by 1 stage.",
		shortDesc: "20% chance to lower the target's Sp. Def by 1.",
		id: "shadowsphere",
		name: "Shadow Sphere",
		onPrepareHit: function(target, source, move) { // animation
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Shadow Ball', target);
		},
		pp: 15,
		priority: 0,
		flags: {bullet: 1, protect: 1, mirror: 1},
		secondary: {
			chance: 20,
			boosts: {
				spd: -1
			}
		},
		target: "normal",
		type: "Ghost"
	},
	'drainforce': {
		num: 641,
		accuracy: 100,
		basePower: 60,
		category: "Special",
		onPrepareHit: function(target, source, move) { // animation
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Giga Drain', target);
		},
		desc: "The user steals some stats from the target.",
		shortDesc: "Steals some stats.",
		id: "drainforce",
		name: "Drain Force",
		pp: 10,
		priority: 0,
		drain: [1, 2],
		flags: {protect: 1, mirror: 1},
		secondary: false,
		target: "normal",
		type: "Fighting"
	},
	'sneakyspook': {
		num: 642, // blaze it
		accuracy: 100,
		basePower: 40,
		category: "Special",
		onPrepareHit: function(target, source, move) { // animation
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Shadow Sneak', target);
		},
		desc: "No additional effect.",
		shortDesc: "Usually goes first.",
		id: "sneakyspook",
		isViable: true,
		name: "Sneaky Spook",
		pp: 30,
		priority: 1,
		flags: {protect: 1, mirror: 1},
		secondary: false,
		target: "normal",
		type: "Ghost"
	}
}
