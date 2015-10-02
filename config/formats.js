// Note: This is the list of formats
// The rules that formats use are stored in data/rulesets.js

exports.Formats = [
	// TPP
	{
		name: "Random Battle",
		section: "TPP",

		team: 'random',
		mod: "tpprandom",
		ruleset: ['PotD', 'Pokemon', 'Sleep Clause Mod', 'HP Percentage Mod', 'Cancel Mod']
	},
	{
		name: "anarchy",
		section: "TPP",

		team: 'random',
		mod: "tppanarchy",
		ruleset: ['PotD', 'Pokemon', 'HP Percentage Mod', 'Cancel Mod']
	},
	{
		name: "Gym Challenge",
		section: "TPP",

		searchShow: false,
		ruleset: ['Pokemon', 'Standard Ubers', 'Swagger Clause', 'Team Preview'],
		banlist: []
	},
	{
		name: "Gym Challenge Doubles",
		section: "TPP",

		searchShow: false,
		gameType: 'doubles',
		ruleset: ['Pokemon', 'Moody Clause', 'OHKO Clause', 'Endless Battle Clause', 'HP Percentage Mod', 'Cancel Mod', 'Team Preview'],
		banlist: ['Unreleased', 'Illegal', 'Dark Void']
	},
	{ 
		name: "Gym Challenge Triples",
		section: "TPP",

		searchShow: false,
		gameType: 'triples',
		ruleset: ['Pokemon', 'Moody Clause', 'OHKO Clause', 'Endless Battle Clause', 'HP Percentage Mod', 'Cancel Mod', 'Team Preview'],
		banlist: ['Unreleased', 'Illegal', 'Dark Void', 'Perish Song']
	},
	{
		name: "TPPLA",
		section: "TPP",

		searchShow: false,
		maxLevel: 1000,
		defaultLevel: 100,
		ruleset: ['Team Preview', 'Sleep Clause Mod', 'HP Percentage Mod', 'Cancel Mod']
	},
	{
		name: "TPPLA Doubles",
		section: "TPP",

		gameType: 'doubles',
		searchShow: false,
		maxLevel: 1000,
		defaultLevel: 100,
		ruleset: ['Team Preview', 'Sleep Clause Mod', 'HP Percentage Mod', 'Cancel Mod'],
	},
	{
		name: "TPPLA Triples",
		section: "TPP",

		gameType: 'triples',
		searchShow: false,
		maxLevel: 1000,
		defaultLevel: 100,
		ruleset: ['Team Preview', 'Sleep Clause Mod', 'HP Percentage Mod', 'Cancel Mod']
	},
	{
		name: "TPP Battle",
		section: "TPP",

		mod: "tppbattle",
		ruleset: ['Pokemon', 'Standard Ubers', 'Swagger Clause', 'Team Preview', 'TPP Clause', 'Cancel Mod']
	},

	// ORAS (hidden)
	{
		name: "Anything Goes",
		desc: [
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3523229/\">Anything Goes</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3548945/\">Anything Goes Resources</a>"
		],
		section: "ORAS",

		ruleset: ['Pokemon', 'Endless Battle Clause', 'HP Percentage Mod', 'Cancel Mod', 'Team Preview'],
		banlist: ['Unreleased', 'Illegal']
	},
	{
		name: "OU",
		section: "ORAS",
		column: 2,

		searchShow: false,
		ruleset: ['Pokemon', 'Standard', 'Team Preview', 'Swagger Clause', 'Baton Pass Clause', 'Cancel Mod'],
		banlist: ['Uber', 'Soul Dew', 'Gengarite', 'Kangaskhanite', 'Lucarionite', 'Mawilite', 'Salamencite']
	},
	{
		name: "Inverse",
		section: "ORAS",

		searchShow: false,
		ruleset: ['Pokemon', 'Standard', 'Baton Pass Clause', 'Swagger Clause', 'Team Preview', 'Cancel Mod'],
		banlist: ['Arceus', 'Blaziken', 'Darkrai', 'Deoxys', 'Deoxys-Attack', 'Deoxys-Defense', 'Deoxys-Speed', 'Giratina-Origin', 'Groudon', 'Ho-Oh',
			'Kyogre', 'Kyurem-Black', 'Kyurem-White', 'Lugia', 'Mewtwo', 'Palkia', 'Rayquaza', 'Reshiram', 'Shaymin-Sky', 'Snorlax',
			'Xerneas', 'Yveltal', 'Zekrom', 'Gengarite', 'Kangaskhanite', 'Salamencite', 'Soul Dew'
		],
		onModifyPokemon: function (pokemon) {
			pokemon.negateImmunity['Type'] = true;
		},
		onEffectiveness: function (typeMod, target, type, move) {
			// The effectiveness of Freeze Dry on Water isn't reverted
			if (move && move.id === 'freezedry' && type === 'Water') return;
			if (move && !this.getImmunity(move, type)) return 1;
			return -typeMod;
		}
	},
	{
		name: "Custom",
		section: "ORAS",

		searchShow: false,
		canUseRandomTeam: true,
		maxLevel: 9999,
		defaultLevel: 100,
		// no restrictions, for serious (other than team preview)
		ruleset: ['Team Preview', 'HP Percentage Mod', 'Cancel Mod']
	},
	{
		name: "Doubles Custom Game",
		section: "ORAS",

		gameType: 'doubles',
		searchShow: false,
		canUseRandomTeam: true,
		maxLevel: 9999,
		defaultLevel: 100,
		// no restrictions, for serious (other than team preview)
		ruleset: ['Team Preview', 'HP Percentage Mod', 'Cancel Mod']
	},
	{
		name: "Triples Custom Game",
		section: "ORAS",

		gameType: 'triples',
		searchShow: false,
		canUseRandomTeam: true,
		maxLevel: 9999,
		defaultLevel: 100,
		// no restrictions, for serious (other than team preview)
		ruleset: ['Team Preview', 'HP Percentage Mod', 'Cancel Mod']
	},
	
	// STPPLB
	{
		name: "Super TPPL Bros.",
		section: "STPPLB",
		column: 2,
		
		mod: 'stpplb',
		searchShow: true,
		team: 'randomtpplb',
		ruleset: ['Sleep Clause Mod', 'HP Percentage Mod', 'Cancel Mod'],
		onUpdate: function(pokemon) { // called whenever a pokemon changes
			var name = toId(pokemon.name);
			if (pokemon.template.isMega) { // some foolery to give megas their proper ability
				if (name == 'darkfiregamer' && pokemon.getAbility().id === 'solarpower')
					pokemon.setAbility('darkaura');
			}
		},
		onModifyMove: function(move, pokemon) { // this is where the signature moves are actually done.
			var name = toId(pokemon.illusion && move.sourceEffect === 'allyswitch' ? pokemon.illusion.name : pokemon.name);
			if (name === 'darkfiregamer' && move.id === 'celebrate') { // Darkfire
				move.name = "Darkfire";
				move.basePower = 90;
				move.accuracy = 100;
				move.onEffectiveness = function (typeMod, type, move) {
					return typeMod + this.getEffectiveness('Fire', type); // includes Fire in its effectiveness.
				};
				move.onHit = function(target, pokemon) { // Mega evolves dfg
					var temp = pokemon.item;
					pokemon.item = 'houndoominite'; // in order to make it mega evolvable, add a Houndoomite temporarily.
					if (!pokemon.template.isMega) pokemon.canMegaEvo = this.canMegaEvo(pokemon); // don't mega evolve if it's already mega
					if (pokemon.canMegaEvo) this.runMegaEvo(pokemon);
					pokemon.item = temp; // give its normal item back.
				}
			}
			if (name === 'xfix' && move.id == 'celebrate') { // (Super Glitch)
				if (pokemon.moveset[3] && pokemon.moveset[3].pp) { // I have no idea. No seriously. This was in the Super Staff Bros. code and I don't know what it does. Leaving it here.
					pokemon.moveset[3].pp = Math.round(pokemon.moveset[3].pp * 10 + 6) / 10;
				}
				move.name = '(Super Glitch)';
				move.multihit = [2, 5];
				move.onTryHit = function (target, source) { // can cause TMTRAINER effect randomly
					if (!source.isActive) return null;
					if (this.random(777) !== 42) return; // 1/777 chance to cause TMTRAINER effect
					var opponent = pokemon.side.foe.active[0];
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
					this.add('-message', "(Enemy " + generateNoise.call(this) + " TMTRAINER @xfix is hurt by its burn" + exclamation + ")");
					this.damage(source.maxhp * this.random(24, 48) * 0.01, source, source);
					return null;
				};
			}
			if (name === 'azum4roll' && move.id === 'celebrate') { // TM56
				move.name = 'TM56';
				move.type = 'Bird';
				move.basePower = 205;
				move.accuracy = 37;
				move.onPrepareHit = function(target, source) { // Turns target and user into Bird-type.
					this.attrLastMove('[still]');
					this.add('-anim', source, 'Calm Mind', source);
					if (!source.hasType('Bird')) { // turn user into Bird-type and spout glitchy nonsense.
						this.add("c|azum4roll|9̜͉̲͇̱̘̼ͬ̈́̒͌̑̓̓7ͩ͊̚5ͨ̆͐͏̪̦6̗͎ͬ̿̍̍̉ͧ͢4̯̠ͤ͛͐̄͒͡2͐ͬ̀d̺͉̜̈ͯ̓x̩̖̥̦̥͛́ͥ͑̈́ͩ͊͠║̛̥̜̱̝͍͒̌ͣ̀͌͌̒'̣͎̗̬̯r̸̗͍ͫ̓͆ͣ̎͊ ̜̻̈D͓̰̳̝̥̙͙͋̀E͉͔̥͇̫͓͍̔ͬͣ͂̓̽x̰̗̬̖͊̏̄̑̒̿͊s̜̪̏́f̧̯̼̦̓͌̇̒o̱̾̓ͩ̆̓̀F̟̰͓̩̂̆͛ͤ▓̣̩̝̙̇̓͒͋̈͡1̡̹̹͓̬͖͐̑̉̔̏xͥ̀'̻͖͍̠̉͡v̫̼̹̳̤̱͉▓̄̏͂ͤͭ̋ͫ͏̠̦̝▓̟͉͇̣̠̦̓̄ͫͥ̐̍̂▓͔̦̫̦̜̖́▓͍ͯ͗̾͆▓̮̗̠̜͙̹̟͊̎ͤ̔̽ͬ̃▓̩̟̏ͪ̇̂̂̒▓̖̼̤͉ͤ̾̋ͥͣͬ͒▓̈́̿͂̌̓▓͇̞̗̽̔̂͊̌ͣ͐▓ͬ́ͥ̔͒͒̎▓̰̪̫̩͇̲̇̔̿͢ͅ▓̞̬͎▓̖͍̖̫ͪ͐̆̅̍̂ͨͅ▓̡̭̠̗̳̬̜̝▓̤͙̥̆̌ͨͪ̆͌▓̴͉̩̈́▓ͩ̌̌̂̿̑̐▓ͨ҉͕̠͍▓̹̌̅̂ͨ͋̃͑▓̯̰̣̝̯ͭͦ̂͋̇̾͠▓̸̺̣̜̯̙̂͋̈ͨ̎̾ͧ▓͢▓͔̚▓̭͎͖̟̼̄̈̃̎́▓̧̌ͧ▓̼̹͈͗̄̆");
						source.setType('Bird');
						this.add('-start', source, 'typechange', 'Bird');
					}
					if (target.hasType('Bird')) return true;
					target.setType('Bird');
					this.add('-start', target, 'typechange', 'Bird');
				};
				move.onMoveFail = function (target, source, move) {
					this.boost({accuracy:1, evasion:1}, source);
				};
			}
			if (name === 'iwamiger' && move.id === 'celebrate') { // Hex Attack (more like Hax Attack amirite)
				move.name = 'Hex Attack';
				move.type = 'Ghost';
				move.basePower = 100;
				move.accuracy = 90;
				move.pp = 8;
				move.onPrepareHit = function(target, source, move) { // animation
					this.attrLastMove('[still]');
					this.add('-anim', source, 'Tri Attack', target);
				}
				move.secondary = {
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
				};
			}
			if (name == 'poomph' && move.id == 'celebrate') { // Projectile Spam. (reminds me Poomph needs to be not a lucario kek)
				move.name = 'Projectile Spam';
				move.basePower = 12;
				move.multihit = [8, 11];
				move.onPrepareHit = function(target, source, move) {
					this.attrLastMove('[still]');
					this.add('-anim', source, 'Bullet Punch', target);
				}
				move.self = { // lock in like Outrage.
					volatileStatus: 'lockedmove'
				};
				move.onAfterMove = function (pokemon) {
					if (pokemon.volatiles['lockedmove'] && pokemon.volatiles['lockedmove'].duration === 1) {
						pokemon.removeVolatile('lockedmove');
					}
				};
			}
			if (name === 'tiesoul' && move.id === 'celebrate') { // BULK!!
				move.name = 'BULK!!';
				move.boosts = {atk:2, def:2}; // best move
				move.onPrepareHit = function(target, source, move) {
					this.attrLastMove('[still]');
					this.add('-anim', source, 'Bulk Up', source);
				}
			}
			if (name === 'somasghost' && move.id === 'celebrate') { // Shadow Rush (I think these comments might not be necessary.)
				move.name = 'Shadow Rush';
				move.priority = 2;
				move.basePower = 80;
				move.pp = 8;
				move.onPrepareHit = function(target, source, move) {
					this.attrLastMove('[still]');
					this.add('-anim', source, 'Shadow Sneak', target);
				}
			}
			if (name === 'lasszeowx' && move.id === 'celebrate') {
				move.name = 'Parting Volt Turn';
				move.onHit = function(target) {
					this.useMove('partingshot', target);
					this.useMove('voltswitch', target);
					this.useMove('uturn', target);
					this.add("c|Lass Zeowx|I'm getting outta here! Byeeeee~");
				};
			}
			if (name === 'masterleozangetsu' && move.id === 'celebrate') {
				move.name = 'Scrub Bolt';
				move.category = 'Physical';
				move.basePower = 80;
				move.accuracy = 90;
				move.pp = 10;
				move.secondaries = [{
					chance: 20,
					volatileStatus: 'flinch'
				}];
				move.onPrepareHit = function(target, source, move) {
					this.attrLastMove('[still]');
					this.add('-anim', source, 'Thunderbolt', target);
				}
			}
			if (name === 'eeveelutionlvr' && move.id === 'celebrate') {
				move.name = "Evolution Beam";
				move.eeveelutiontypes = ['Fire', 'Water', 'Electric', 'Psychic', 'Dark', 'Ice', 'Grass', 'Fairy'];
				move.multihit = false;
				move.ignoreImmunity = true;
				move.hits = 0;
				move.basePower = 10;
				move.accuracy = 100;
				move.category = 'Special';
				move.onPrepareHit = function (target, source, move) { // animation depending on type.
					this.attrLastMove('[still]');
					if (move.type === 'Normal')
						this.add('-anim', source, "Swift", target);
					if (move.type === 'Fire')
						this.add('-anim', source, "Flamethrower", target);
					if (move.type === 'Water')
						this.add('-anim', source, "Water Gun", target);
					if (move.type === 'Electric')
						this.add('-anim', source, "Thunderbolt", target);
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
				};
				move.onHit = function(target, pokemon, move) {
					if (move.type === 'Normal') {
						var t = move.eeveelutiontypes;
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
				}
			}
			if (name === 'sohippy' && move.id === 'celebrate') {
				move.name = "Hyper WAHAHAHAHAHA";
				move.flags = {protect: 1, mirror: 1, sound: 1, authentic: 1}; // authentic means it hits through subs.
				move.onPrepareHit = function (target, source, move) {
					this.attrLastMove('[still]');
					this.add('-anim', source, 'Zap Cannon', target);
				};
				move.secondaries = [{chance: 20, status: 'par'}, {chance: 20, volatileStatus: 'confusion'}];
			}
			if (name === 'kapnkooma' && move.id === 'celebrate') {
				move.name = 'Broadside';
				move.basePower = 18;
				move.multihit = 5;
			}
			if (name === 'best' && move.id === 'celebrate') { // best isn't in but I'm still keeping this BrokeBack
				move.name = 'BEST F-CAR';
				move.basePower = 60;
				move.secondaries = [
				{
					chance: 20, 
					status: 'brn'
				}, 
				{
					chance: 100, 
					self: {
						boosts: {
							spa: 1
						}
					}
				}
				];
			}
			if (name === 'poomph' && move.id === 'celebrate') { // Eternal Struggle
                                move.name = 'Eternal Struggle';
                                move.type = 'Electric';
                                move.basePower = 220;
                                move.accuracy = 100;
                                move.onPrepareHit = function (target, source, move) {
                                        this.attrLastMove('[still]');
                                        this.add('-anim', source, 'Discharge', target);
                                };
                                move.onHit = function (target, source, move) {
                                        this.boost({atk:-1, def:-1, spa:-1, spd:-1, spe:-1, accuracy:1, evasion:1}, source);
                                        this.recoil([50,100], source);
                                };
                        }
                        if (name === 'dictatormantis' && move.id === 'celebrate') {
                                move.name = 'Iron Fist';
                                move.type = 'Steel';
                                move.basePower = 90;
                                move.accuracy = 100;
                                move.onPrepareHit = function (target, source, move) {
                                        this.attrLastMove('[still]');
                                        this.add('-anim', source, 'hammerarm', target);
                                };
                                move.onHit = function (pokemon) {
                                        pokemon.setAbility('defeatist'));
                                };
                        }
		},
		onSwitchInPriority: 1,
		onSwitchIn: function(pokemon) {
			var name = toId(pokemon.illusion ? pokemon.illusion.name : pokemon.name);
			var oldAbility = pokemon.ability;
			if (pokemon.template.isMega) { // more hackery for mega abilities.
				if (name == 'darkfiregamer' && pokemon.getAbility().id === 'solarpower')
					pokemon.setAbility('darkaura');
			} else {
				pokemon.canMegaEvo = this.canMegaEvo(pokemon); // Bypass one mega limit.
			}
			if (name === 'somasghost' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Normal/Ghost');
				pokemon.typesData = [
					{type: 'Normal', suppressed: false,  isAdded: false},
					{type: 'Ghost', suppressed: false,  isAdded: false}
				];
			}
			if (name === 'xfix') { // different message depending on hazards.
				var hazards = {stealthrock: 1, spikes: 1, toxicspikes: 1, stickyweb: 1};
				var hasHazards = false;
				for (var hazard in hazards) {
					if (pokemon.side.getSideCondition(hazard)) {
						hasHazards = true;
						break;
					}
				}
				if (hasHazards) {
					this.add('c|xfix|(no haz... too late)');
				} else {
					this.add('c|xfix|(no hazards, attacks only, final destination)');
				}
			}
			else if (name === 'azum4roll') this.add("c|azum4roll|What? I'm just a normal Azumarill.");
			else if (name === 'lasszeowx') this.add("c|Lass zeowx|Oh, a new challenger?");
			else if (name === 'kapnkooma') this.add("c|Kap'n Kooma|Hoist the black flag lads!");
			else if (name === 'kooma9') this.add("c|Kooma9|ello");
			else if (name === 'best') this.add("raw|<big>GO AWAY</big>");
			else if (name === 'poomph') this.add("c|Poomph|I'm sure I'll win this time!");
			else if (name === 'nofunmantis') this.add("c|NoFunMantis|The fun ends here!");
			else this.add('c|' + (pokemon.illusion ? pokemon.illusion.name : pokemon.name) + '|PLACEHOLDER MESSAGE PLEASE CONTACT TIESOUL');
		},
		
		onFaint: function(pokemon) { // PJSalt-y faint messages go here.
			var name = toId(pokemon.name);
			if (name === 'xfix') {
				var foe = pokemon.side.foe.active[0];
				if (foe.name === 'xfix') {
					this.add('c|xfix|(annoying Dittos...)');
				} else if (foe.ability === 'magicbounce') {
					this.add('c|xfix|(why ' + foe.name + ' has Magic Bounce...)');
					this.add('c|xfix|(gg... why...)');
				} else {
					this.add('c|xfix|(gg... I guess)');
				}
			} else if (name === 'azum4roll') {
				this.add("c|azum4roll|This game doesn't have enough glitches!");
			} else if (name === 'lasszeowx') this.add("c|Lass zeowx|When can I beat TPPLA BibleThump");
			else if (name === 'kapnkooma') this.add("c|Kap'n Kooma|Avast! I be needing a pint of grog after this.");
			else if (name === 'kooma9') this.add("c|Kooma9|Most Disappointing Player 2015");
			else if (name === 'best') this.add("raw|<big>BEST? FALLED</big>");
			else if (name === 'poomph') this.add("c|Poomph|0/4 again. DansGame");
			else if (name === 'nofunmantis') this.add("c|NoFunMantis|Nothing fun about this!")
		},
		
		onBegin: function() { // some hackery to make sure the names of sig moves show up correctly.
			var allPokemon = this.p1.pokemon.concat(this.p2.pokemon);

			for (var i = 0, len = allPokemon.length; i < len; i++) {
				var pokemon = allPokemon[i];
				var last = pokemon.moves.length - 1;
				if (pokemon.moves[last]) {
					pokemon.moves[last] = toId(pokemon.set.signatureMove);
					pokemon.moveset[last].move = pokemon.set.signatureMove;
					pokemon.baseMoveset[last].move = pokemon.set.signatureMove;
				}
			}
		}
	},
	
	{
		name: 'Super Glitch',
		section: 'STPPLB',
		column: 2,
		searchShow: true,
		mod: 'superglitch',
		ruleset: ['Metronome Clause', 'Pokemon', 'HP Percentage Mod', 'Cancel Mod', 'No Switching Clause', 'No Recycle Clause'],
		banlist: ['Unreleased'],
		
		maxLevel: 100,
		defaultLevel: 100,
		
		onModifyMove: function(move, pokemon) {
			if (move.id == 'metronome') {
				if (pokemon.moveset[3] && pokemon.moveset[3].pp) {
					pokemon.moveset[3].pp = Math.round(pokemon.moveset[3].pp * 10 + 6) / 10;
				}
				move.name = '(Super Glitch)';
				move.multihit = [2, 5];
				move.onTryHit = function (target, source) {
					if (!source.isActive) return null;
					if (this.random(777) !== 42) return;
					var opponent = pokemon.side.foe.active[0];
					opponent.setStatus('brn');
					var possibleStatuses = ['confusion', 'flinch', 'attract', 'focusenergy', 'foresight', 'healblock'];
					for (var i = 0; i < possibleStatuses.length; i++) {
						if (this.random(3) === 1) {
							opponent.addVolatile(possibleStatuses[i]);
						}
					}

					function generateNoise() {
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
					this.add('-message', "(Enemy " + generateNoise.call(this) + " TMTRAINER " + opponent.name + " is frozen solid?)");
					this.add('-message', "(Enemy " + generateNoise.call(this) + " TMTRAINER " + opponent.name + " is hurt by its burn!)");
					this.damage(opponent.maxhp * this.random(42, 96) * 0.01, opponent, opponent);
					var exclamation = source.status === 'brn' ? '!' : '?';
					this.add('-message', "(Enemy " + generateNoise.call(this) + " TMTRAINER " + pokemon.name + " is hurt by its burn" + exclamation + ")");
					this.damage(source.maxhp * this.random(24, 48) * 0.01, source, source);
					return null;
				};
			}
		}
	},

	// Past Generation (hidden)
	{
		name: "[Gen 5] Custom",
		section: "Past Generations",
		column: 2,

		mod: 'gen5',
		searchShow: false,
		canUseRandomTeam: true,
		maxLevel: 9999,
		defaultLevel: 100,
		// no restrictions, for serious (other than team preview)
		ruleset: ['Team Preview', 'Cancel Mod']
	},
	{
		name: "[Gen 5] Doubles Custom",
		section: 'Past Generations',

		mod: 'gen5',
		gameType: 'doubles',
		searchShow: false,
		canUseRandomTeam: true,
		maxLevel: 9999,
		defaultLevel: 100,
		// no restrictions, for serious (other than team preview)
		ruleset: ['Team Preview', 'Cancel Mod']
	},
	{
		name: "[Gen 4] Custom Game",
		section: "Past Generations",

		mod: 'gen4',
		searchShow: false,
		canUseRandomTeam: true,
		maxLevel: 9999,
		defaultLevel: 100,
		// no restrictions
		ruleset: ['Cancel Mod']
	},
	{
		name: "[Gen 3] Custom Game",
		section: "Past Generations",

		mod: 'gen3',
		searchShow: false,
		ruleset: ['Pokemon', 'HP Percentage Mod', 'Cancel Mod']
	},
	{
		name: "[Gen 2] Custom Game",
		section: "Past Generations",

		mod: 'gen2',
		searchShow: false,
		ruleset: ['Pokemon', 'HP Percentage Mod', 'Cancel Mod']
	},
	{
		name: "[Gen 1] Custom Game",
		section: "Past Generations",

		mod: 'gen1',
		searchShow: false,
		ruleset: ['Pokemon', 'HP Percentage Mod', 'Cancel Mod']
	}
];
var stpplb;
var stpplbi;
for (var i = 0; i < exports.Formats.length; i++)
	if (exports.Formats[i].name === 'Super TPPL Bros.') {
		stpplb = exports.Formats[i];
		stpplbi = i;
	}
if (stpplb) {
	exports.Formats.splice(stpplbi+1, 0, {
		name: "Super TPPL Bros. Plus",
		section: "STPPLB",
		column: 2,
		
		mod: 'stpplb',
		searchShow: true,
		team: 'randomtpplbp',
		ruleset: ['Sleep Clause Mod', 'HP Percentage Mod', 'Cancel Mod'],
		onUpdate: stpplb.onUpdate,
		onModifyMove: stpplb.onModifyMove,
		onSwitchInPriority: 1,
		onSwitchIn: stpplb.onSwitchIn,
		onFaint: stpplb.onFaint,
		onBegin: stpplb.onBegin
	});
	exports.Formats.splice(stpplbi+2, 0, {
		name: "Super TPP Bros.",
		section: "STPPLB",
		column: 2,
		
		mod: 'stpplb',
		searchShow: true,
		team: 'randomtppb',
		ruleset: ['Sleep Clause Mod', 'HP Percentage Mod', 'Cancel Mod'],
		onUpdate: stpplb.onUpdate,
		onModifyMove: stpplb.onModifyMove,
		onSwitchInPriority: 1,
		onSwitchIn: stpplb.onSwitchIn,
		onFaint: stpplb.onFaint,
		onBegin: stpplb.onBegin
	});
}
