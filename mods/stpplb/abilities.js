exports.BattleAbilities = { // define custom abilities here.
	"glitchiate": {
		desc: "This Pokemon's moves become Bird-type moves and have their power multiplied by 1.3. This effect comes after other effects that change a move's type, but before Ion Deluge and Electrify's effects.",
		shortDesc: "This Pokemon's moves become Bird type and have 1.3x power.",
		onModifyMovePriority: -1,
		onModifyMove: function (move, pokemon) {
			if (move.id !== 'struggle') { // still boost moves even if they are already Bird-type (TM56). Also don't mess with Struggle.
				move.type = 'Bird';
				if (move.category !== 'Status') pokemon.addVolatile('glitchiate');
			}
		},
		effect: {
			duration: 1,
			onBasePowerPriority: 8,
			onBasePower: function (basePower, pokemon, target, move) {
				return this.chainModify([0x14CD, 0x1000]); // multiplies BP by 5325/4096 (~1.3000488), like in the games
			}
		},
		id: "glitchiate",
		name: "Glitchiate",
		rating: 4,
		num: 192
	},
	"serenegraceplus": {
		desc: "This Pokemon's moves have their secondary chances multiplied by 3.",
		shortDesc: "This Pokemon's moves have their secondary chances multiplied by 3.",
		onModifyMovePriority: -2,
		onModifyMove: function (move) {
			if (move.secondaries && move.id !== 'secretpower') {
				for (var i = 0; i < move.secondaries.length; i++) {
					move.secondaries[i].chance *= 3;
				}
			}
		},
		id: "serenegraceplus",
		name: "Serene Grace Plus",
		rating: 5,
		num: 193
	},
	'spoopify': {
		desc: "Makes stuff Ghost on switch-in.",
		shortDesc: 'b', // got lazy
		onStart: function(pokemon) {
			activeFoe = pokemon.side.foe.active;
			for (var i = 0; i < activeFoe.length; i++) {
				var pokemon = activeFoe[i];
				var secondarytype = (pokemon.typesData[1] ? pokemon.typesData[1].type : false);
				if (pokemon.typesData[1] === 'Ghost') { // no more Ghost/Ghost madness!
					this.add('-start', pokemon, 'typechange', 'Ghost');
					pokemon.typesData = [{type: 'Ghost', suppressed: false,  isAdded: false}];
					continue;
				}
				this.add('-start', pokemon, 'typechange', 'Ghost' + (secondarytype ? '/' + secondarytype : ''));
				pokemon.typesData[0] = {type: 'Ghost', suppressed: false,  isAdded: false};
			}
		},
		id: "spoopify",
		name: "Spoopify",
		rating: 4,
		num: 194
	},
	'scrubterrain': { // MLZekrom pls
	                  // Scrub Terrain was really hacky. Happy it's out of the meta.
		desc: '',
		shortDesc: '',
		onStart: function(pokemon) {
			this.setWeather('scrubterrain');
		},
		onAnySetWeather: function (target, source, weather) {
			if (this.getWeather().id === 'scrubterrain' && !(weather.id in {desolateland:1, primordialsea:1, deltastream:1, scrubterrain:1})) return false;
		},
		onEnd: function (pokemon) {
			if (this.weatherData.source !== pokemon) return;
			for (var i = 0; i < this.sides.length; i++) {
				for (var j = 0; j < this.sides[i].active.length; j++) {
					var target = this.sides[i].active[j];
					if (target === pokemon) continue;
					if (target && target.hp && target.hasAbility('scrubterrain')) {
						this.weatherData.source = target;
						return;
					}
				}
			}
			this.clearWeather();
		},
		id: 'scrubterrain',
		name: 'Scrub Terrain',
		rating: 4,
		num: 195
	},
	'proteon': { // Eeveelutionlvr's ability.
		desc: '',
		shortDesc: '',
		onPrepareHit: function (source, target, move) {
			var type = move.type;
			if (type && type !== '???' && source.getTypes().join() !== type) {
				var species = '';
				if (type === 'Electric') {
					species = 'Jolteon';
				} else if (type === 'Normal') {
					species = 'Eevee';
				} else if (type === 'Water') {
					species = 'Vaporeon';
				} else if (type === 'Fire') {
					species = 'Flareon';
				} else if (type === 'Psychic') {
					species = 'Espeon';
				} else if (type === 'Dark') {
					species = 'Umbreon';
				} else if (type === 'Ice') {
					species = 'Glaceon';
				} else if (type === 'Grass') {
					species = 'Leafeon';
				} else if (type === 'Fairy') {
					species = 'Sylveon';
				}
				if (species !== '' && source.template.speciesid !== toId(species)) { // don't transform if type is not an eeveelution type or you are already that eeveelution.
					source.formeChange(species);
					this.add('-formechange', source, species, '[msg]');
					source.setAbility('proteon');
				}
			}
		},
		id: 'proteon',
		name: 'Proteon',
		rating: 4.5,
		num: 196
	},
	'swahahahahaggers': { // Sohippy's ability: con on switch-in.
		onImmunity: function (type) {
			if (type === 'Ground') return false;
		},
		onStart: function(pokemon) {
			activeFoe = pokemon.side.foe.active;
			for (var i = 0; i < activeFoe.length; i++) {
				var pokemon = activeFoe[i];
				pokemon.addVolatile('confusion');
			}
		},
		id: 'swahahahahaggers',
		name: 'Swahahahahaggers',
		rating: 4,
		num: 197
	},
	'psychologist': { // Kooma's ability: immune to all "mental" volatile statuses.
		onUpdate: function (pokemon) {
			var list = ['embargo', 'encore', 'flinch', 'healblock', 'attract', 'nightmare', 'taunt', 'torment', 'confusion'];
			for (var i = 0; i < list.length; i++)
				if (pokemon.volatiles[list[i]])
					pokemon.removeVolatile(list[i]);
		},
		onImmunity: function (type, pokemon) {
			var list = ['embargo', 'encore', 'flinch', 'healblock', 'attract', 'nightmare', 'taunt', 'torment', 'confusion'];
			for (var i = 0; i < list.length; i++)
				if (type === list[i]) {
					this.add('-immune', pokemon, list[i]);
					return false;
				}
		},
		id: 'psychologist',
		name: 'Psychologist',
		rating: 4,
		num: 198
	},
	'seaandsky': { // Kap'n Kooma's ability: Primordial Sea plus Swift Swim.
		onStart: function (source) {
			this.setWeather('primordialsea');
		},
		onAnySetWeather: function (target, source, weather) {
			if (this.getWeather().id === 'primordialsea' && !(weather.id in {desolateland:1, primordialsea:1, deltastream:1})) return false; // no more Sandstorm overwriting the Heavy Rain!
		},
		onEnd: function (pokemon) {
			if (this.weatherData.source !== pokemon) return;
			for (var i = 0; i < this.sides.length; i++) {
				for (var j = 0; j < this.sides[i].active.length; j++) {
					var target = this.sides[i].active[j];
					if (target === pokemon) continue;
					if (target && target.hp && (target.ability === 'primordialsea' || target.ability === 'seaandsky') && (!target.ignore || target.ignore['Ability'] !== true)) {
						this.weatherData.source = target;
						return;
					}
				}
			}
			this.clearWeather();
		},
		onModifySpe: function (spe, pokemon) { // let's try this again
			if (this.isWeather(['raindance', 'primordialsea'])) {
				return this.chainModify(2);
			}
			/* return this.chainModify(2); */
		},
		id: 'seaandsky',
		name: 'Sea and Sky',
		rating: 5,
		num: 199
	},
	'littleengine': { // Poomph, the little engine who couldn't. Little moody.
		desc: "This Pokemon has a random stat raised by 1 stage at the end of each turn.",
		shortDesc: "Raises a random stat by 1 at the end of each turn.",
		onResidualOrder: 26,
		onResidualSubOrder: 1,
		onResidual: function (pokemon) {
			var stats = [], i= '';
			var boost = {};
			for (var i in pokemon.boosts) {
				if (pokemon.boosts[i] < 6) {
					stats.push(i);
				}
			}
			if (stats.length) {
				i = stats[this.random(stats.length)];
				boost[i] = 1;
			}
			this.boost(boost);
		},
		id: "littleengine",
		name: "Little Engine",
		rating: 4.5,
		num: 200
	},
	'furriercoat': { // WhatevsFur, better fur coat, no frz.
		shortDesc: "This Pokemon's Defense and Sp. Defense are doubled. This Pokemon cannot be frozen.",
		onModifyDefPriority: 6,
		onModifyDef: function (def) {
			return this.chainModify(2);
		},
		onModifySpDPriority: 6,
		onModifySpD: function (spd) { //SpD not Spd TriHard
			return this.chainModify(2);
		},
		onImmunity: function (type, pokemon) {
			if (type === 'frz') return false;
		},
		id: "furriercoat",
		name: "Furrier Coat",
		rating: 3.5,
		num: 201
	},
	'nofun': {
		shortDesc: "Abilities are fun. No more ability for you.",
		id: "nofun",
		name: "No Fun",
		rating: 0,
		num: 202
	},
	'nofunallowed': {
		shortDesc: "Makes opponent's ability No Fun. Causes all custom moves to fail.",
		onFoeSwitchIn: function (pokemon) {
			var oldAbility = pokemon.setAbility('nofun', pokemon, 'nofun', true);
			if (oldAbility) {
				this.add('-endability', pokemon, oldAbility, '[from] ability: No Fun Allowed');
				this.add('-ability', pokemon, 'No Fun', '[from] ability: No Fun Allowed');
			}
		},
		onStart: function (pokemon){
			var foeactive = pokemon.side.foe.active;
			for (var i = 0; i < foeactive.length; i++) {
				var pokemon = foeactive[i];
				var oldAbility = pokemon.setAbility('nofun', pokemon, 'nofun', true);
				if (oldAbility) {
					this.add('-endability', pokemon, oldAbility, '[from] ability: No Fun Allowed');
					this.add('-ability', pokemon, 'No Fun', '[from] ability: No Fun Allowed');
				}
			}
		},
		onAnyTryMove: function (target, source, effect) {
			if (effect.num > 621) {
				this.attrLastMove('[still]');
				this.add("raw|No Fun Mantis's No Fun Allowed suppressed the signature move!");
				return false;
			}
		},
		id: "nofunallowed",
		name: "No Fun Allowed",
		rating: 3.5,
		num: 203
	},
	"dictator": {
		desc: "On switch-in, this Pokemon lowers the Attack, Special Attack and Speed of adjacent opposing Pokemon by 1 stage. Pokemon behind a substitute are immune.",
		shortDesc: "On switch-in, this Pokemon lowers the Attack, Special Attack and Speed of adjacent opponents by 1 stage.",
		onStart: function (pokemon) {
			var foeactive = pokemon.side.foe.active;
			var activated = false;
			for (var i = 0; i < foeactive.length; i++) {
				if (!foeactive[i] || !this.isAdjacent(foeactive[i], pokemon)) continue;
				if (!activated) {
					this.add('-ability', pokemon, 'Dictator');
					activated = true;
				}
				if (foeactive[i].volatiles['substitute']) {
					this.add('-activate', foeactive[i], 'Substitute', 'ability: Dictator', '[of] ' + pokemon);
				} else {
					this.boost({atk: -1, spa: -1, spe: -1}, foeactive[i], pokemon);
				}
			}
		},
		id: "dictator",
		name: "Dictator",
		rating: 4,
		num: 204
	},
	"messiah": {
		desc: "This Pokemon blocks certain status moves and instead uses the move against the original user. Increases Sp.Attack by 2 when triggered",
		shortDesc: "This Pokemon blocks certain status moves and bounces them back to the user. Also gets a SpA boost when triggered",
		id: "messiah",
		name: "Messiah",
		onTryHitPriority: 1,
		onTryHit: function (target, source, move) {
			if (target === source || move.hasBounced || !move.flags['reflectable']) {
				return;
			}
			var newMove = this.getMoveCopy(move.id);
			newMove.hasBounced = true;
			this.useMove(newMove, target, source);
			this.boost({spa:2}, target);
			return null;
		},
		onAllyTryHitSide: function (target, source, move) {
			if (target.side === source.side || move.hasBounced || !move.flags['reflectable']) {
				return;
			}
			var newMove = this.getMoveCopy(move.id);
			newMove.hasBounced = true;
			this.useMove(newMove, target, source);
			this.boost({spa:2}, target); // now boosts when bouncing back hazards
			return null;
		},
		effect: {
			duration: 1
		},
		rating: 4.5,
		num: 205
	},
	'technicality': {
		num: 206,
		rating: 2,
		id: 'technicality',
		name: 'Technicality',
		onFoeTryMove: function (target, source, effect) {
			if (this.random(10) === 0) {
				this.attrLastMove('[still]');
				this.add("c|DictatorMantis|This move doesn't work because I say so!");
				return false;
			}
		},
	},
	'megaplunder': {
		num: 207,
		rating: 0,
		id: 'megaplunder',
		name: 'Mega Plunder'
	},
	'pikapower': {
		num: 208,
		rating: 2,
		desc: "This Pok&#xe9;mon has a 10% chance of exploding if you target it.",
		shortdesc: "May explode when hit.",
		id: "pikapower",
		name: "Pika Power",
		onTryHit: function (target, source, move) {
			if (target === source || move.hasBounced) {
				return;
			}
			if (this.random(10) === 1) {
				this.add("c|PikalaxALT|KAPOW");
				var newMove = this.getMoveCopy("explosion");
				this.useMove(newMove, target, source);
				return null;
			}
		}
	},
	'banevade': {
		desc: "This Pokemon's evasion is evaluated by end of each turn. Higher evasion at lower HP.",
		shortDesc: "Higher evasion at lower HP. Immune to OHKO.",
		onTryHit: function (pokemon, target, move) {
			if (move.ohko) {
				this.add('-immune', pokemon, '[msg]');
				return null;
			}
		},
		onResidualOrder: 26,
		onResidualSubOrder: 1,
		onResidual: function (pokemon) {
			if (pokemon.hp <= 3*pokemon.maxhp/4 && pokemon.hp > pokemon.maxhp/2 && pokemon.boosts.evasion <1) {
				this.boost({evasion:1-pokemon.boosts.evasion}, pokemon);
			}
			if (pokemon.hp <= pokemon.maxhp/2 && pokemon.hp > pokemon.maxhp/4 && pokemon.boosts.evasion <2) {
				this.boost({evasion:2-pokemon.boosts.evasion}, pokemon);
			}
			if (pokemon.hp <= 1*pokemon.maxhp/4 && pokemon.hp > pokemon.maxhp/32  && pokemon.boosts.evasion <4) {
				this.boost({evasion:4-pokemon.boosts.evasion}, pokemon);
			}
			if (pokemon.hp <= pokemon.maxhp/32 && pokemon.boosts.evasion <6) {
				this.boost({evasion:6-pokemon.boosts.evasion}, pokemon);
			}
		},
		id: "banevade",
		name: "Ban Evade",
		rating: 3,
		num: 208
	},
	'incinerate': {
		desc: "This Pokemon's Normal type moves become Fire type and have their power multiplied by 1.3. This effect comes after other effects that change a move's type, but before Ion Deluge and Electrify's effects.",
		shortDesc: "This Pokemon's Normal type moves become Fire type and have 1.3x power.",
		onModifyMovePriority: -1,
		onModifyMove: function (move, pokemon) {
			if (move.id !== 'struggle' && move.type == 'Normal') { // don't mess with Struggle, only change normal moves.
				move.type = 'Fire';
				if (move.category !== 'Status') pokemon.addVolatile('incinerate');
			}
		},
		effect: {
			duration: 1,
			onBasePowerPriority: 8,
			onBasePower: function (basePower, pokemon, target, move) {
				return this.chainModify([0x14CD, 0x1000]); // not sure how this one works but this was in the Aerilate code in Pokemon Showdown.
			}
		},
		id: "incinerate",
		name: "Incinerate",
		rating: 3.5,
		num: 209
	},
	'physicalakazam': { // Makes Alakazam into a physical tank
		shortDesc: "This Pokemon's Attack is 2.5x and its Defense is doubled.",
		onModifyDefPriority: 6,
		onModifyDef: function (def) {
			return this.chainModify(2);
		},
		onModifyAtkPriority: 6,
		onModifyAtk: function (atk) {
			return this.chainModify(2.5);
		},
		id: "physicalakazam",
		name: "Physicalakazam",
		rating: 3.5,
		num: 210
	},
	"defiantplus": {
		desc: "This Pokemon's Attack and Speed are raised by 2 stages for each of its stat stages that is lowered by an opposing Pokemon. If this Pokemon has a major status condition, its Speed is multiplied by 1.5; the Speed drop from paralysis is ignored.",
		shortDesc: "This Pokemon's Attack and Speed are raised by 2 for each of its stats that is lowered by a foe. If this Pokemon is statused, its Speed is 1.5x; ignores Speed drop from paralysis.",
		onAfterEachBoost: function (boost, target, source) {
			if (!source || target.side === source.side) return;
			var statsLowered = false;
			for (var i in boost) {
				if (boost[i] < 0) {
					statsLowered = true;
				}
			}
			if (statsLowered) {
				this.boost({atk: 2, spe: 2});
			}
		},
		onModifySpe: function (spe, pokemon) {
			if (pokemon.status) {
				return this.chainModify(1.5);
			}
		},
		id: "defiantplus",
		name: "Defiant Plus",
		rating: 3,
		num: 211
	},
	'silverscale': { // Abyll's Milotic's ability: Upgraded marvel scale
		desc: "If this Pokemon has a major status condition, its Sp Defense is multiplied by 1.5, and Speed by 1.25.",
		shortDesc: "If this Pokemon is statused, its Sp Defense is 1.5x and Speed is 1.25x.",
		onModifySpDPriority: 6,
		onModifySpD: function (spD, pokemon) {
			if (pokemon.status) {
				return this.chainModify(1.5);
			}
		},
		onModifySpePriority: 6,
		onModifySpe: function (spe, pokemon) {
			if (pokemon.status) {
				return this.chainModify(1.25);
			}
		},
		id: "silverscale",
		name: "Silver Scale",
		rating: 2.5,
		num: 212
	},
	'gottagofast': { // Pokson's speedboost
		id: 'gottagofast',
		name: 'Gotta Go Fast',
		rating: -1,
		num: 213,
		desc: "Chance of boosting speed when using signature move",
		shortDesc: "10% chance to raise Speed by 6 when using Boost or Spin Dash.",
		onAnyMove: function (target, source, move) {
			if(move.id === "boost" || move.id === "spindash") { //syntax pls
				if(this.random(10) === 0) {
					this.boost({spe: 6}, source);
				}
			}
		},
		onStart: function (pokemon) {
			this.boost({def: -1, spd: -1});
		}
	},
	'drawingrequest': {
		id: 'drawingrequest',
		name: 'Drawing Request',
		rating: 2,
		num: 214,
		desc: "At the end of each turn, replaces this Pokemon's first move with a random move from the pool of all Special attacks >= 60 BP and all status moves, minus the ones that boost the user's Attack stat, and the ones this Pokemon already has.",
		shortDesc: 'TL;DR',
		onResidualOrder: 26,
		onResidualSubOrder: 1,
		onResidual: function(pokemon) {
			var moves = [];
			var movedex = require('./moves.js').BattleMovedex;
			for (var i in movedex) {
				var move = movedex[i];
				if (i !== move.id) continue;
				if (move.isNonstandard) continue;
				if (move.category === 'Physical') continue;
				if (move.basePower < 60) continue;
				if (move.category === 'Status' && move.boosts && move.boosts.atk && move.boosts.atk > 0 && move.name !== "Swagger") continue;
				if (pokemon.hasMove(move)) continue;
				moves.push(move);
			}
			var move = '';
			if (moves.length) {
				moves.sort(function (a, b) {return a.num - b.num;});
				move = moves[this.random(moves.length)];
			}
			if (!move) {
				return false;
			}
			pokemon.moveset[0] = {
				move: move.name,
				id: move.id,
				pp: move.pp,
				maxpp: move.pp,
				target: move.target,
				disabled: false,
				used: false
			};
			pokemon.moves[0] = toId(move.name);
			this.add('message', pokemon.name + ' acquired a new move using its Drawing Request!'); // not showing move name to opponent
		}
	},
	"mindgames": {
		desc: "When this Pokemon switches in, it appears as the last unfainted Pokemon in its party until it takes direct damage from another Pokemon's attack. This Pokemon's actual level and HP are displayed instead of those of the mimicked Pokemon.",
		shortDesc: "This Pokemon appears as the last Pokemon in the party until it takes direct damage.",
		onBeforeSwitchIn: function (pokemon) {
			pokemon.illusion = null;
			var foe = pokemon.side.foe;
			pokemon.illusion = foe.pokemon[this.random(foe.pokemon.length)];
		},
		// illusion clearing is hardcoded in the damage function
		id: "mindgames",
		name: "Mind Games",
		rating: 4.5,
		num: 149
	},
	'jackyofalltrades': {
		desc: '',
		shortDesc: '',
		id: 'jackyofalltrades',
		name: 'Jack(y) of All Trades',
		rating: 4,
		num: 150,
		onBasePowerPriority: 8,
		onBasePower: function (basePower, attacker, defender, move) {
			if (basePower <= 80) {
				this.debug('Technician boost');
				return this.chainModify(1.5);
			}
		},
	}
}
