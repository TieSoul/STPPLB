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
				if (name == 'dictatormantis' && pokemon.getAbility().id === 'technician')
					pokemon.setAbility('Technicality');
				if (name == 'hazorex' && pokemon.getAbility().id !== 'physicalakazam')
					pokemon.setAbility('Physicalakazam');
			}
		},
		onSwitchInPriority: 1,
		onSwitchIn: function(pokemon) {
			var name = toId(pokemon.illusion ? pokemon.illusion.name : pokemon.name);
			var oldAbility = pokemon.ability;
			if (pokemon.template.isMega) { // more hackery for mega abilities.
				if (name == 'darkfiregamer' && pokemon.getAbility().id === 'solarpower')
					pokemon.setAbility('darkaura');
				
				if (name == 'dictatormantis' && pokemon.getAbility().id === 'technician')
					pokemon.setAbility('Technicality');
				
				if (name == 'hazorex' && pokemon.getAbility().id !== 'physicalakazam')
					pokemon.setAbility('Physicalakazam');
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
			if (name === 'pikalaxalt') {
				this.boost({def:1, spd:1}, pokemon);
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
			else if (name === 'pikalaxalt') this.add("c|PikalaxALT|ヽ༼ຈل͜ຈ༽ﾉ RIOT ヽ༼ຈل͜ຈ༽ﾉ");
			else if (name === 'best') this.add("raw|<big>GO AWAY</big>");
			else if (name === 'poomph') this.add("c|Poomph|I'm sure I'll win this time!");
			else if (name === 'tadpole_0f_doom') this.add("c|Tadpole_0f_Doom|I'm not racist. I own Pokemon Black. TriHard");
			else if (name === 'trollkitten') this.add("c|TrollKitten|Have time to listen to my lore?");
			else if (name === 'bigfatmantis') this.add("c|BigFatMantis|gldhf");
			else if (name === 'nofunmantis') this.add("c|NoFunMantis|gldhf");
			else if (name === 'dictatormantis') this.add("c|DictatorMantis|Do you even have enough yays to be battling?");
			else if (name === 'xinc') this.add("c|Xinc|Iwa took Gengar. DansGame");
			else if (name === 'natsugan') this.add("c|Natsugan|Flygonite when");
			else if (name === 'colewalski') this.add("c|ColeWalski|Allons-y and GERONIMOOO!");
			else if (name === 'liria_10') this.add("c|Liria_10|let's draw all night!");
			else if (name === 'speedypokson') this.add("c|Speedy Pokson|YOU'RE TOO SLOW!");
			else this.add('c|' + (pokemon.illusion ? pokemon.illusion.name : pokemon.name) + '|PLACEHOLDER MESSAGE PLEASE CONTACT TIESOUL');
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
			} else {
				var oMegaTemplate = this.getTemplate(pokemon.template.originalMega);
				if (oMegaTemplate.exists && pokemon.originalSpecies !== oMegaTemplate.baseSpecies) {
					// Place volatiles on the Pokémon to show its mega-evolved condition and details
					this.add('-start', pokemon, oMegaTemplate.requiredItem || oMegaTemplate.requiredMove, '[silent]');
					var oTemplate = this.getTemplate(pokemon.originalSpecies);
					if (oTemplate.types.length !== pokemon.template.types.length || oTemplate.types[1] !== pokemon.template.types[1]) {
						this.add('-start', pokemon, 'typechange', pokemon.template.types.join('/'), '[silent]');
					}
				}
			}
		},
		
		onSwitchOut: function (pokemon) {
			var name = toId(pokemon.name);
			var oMegaTemplate = this.getTemplate(pokemon.template.originalMega);
			if (oMegaTemplate.exists && pokemon.originalSpecies !== oMegaTemplate.baseSpecies) {
				this.add('-end', pokemon, oMegaTemplate.requiredItem || oMegaTemplate.requiredMove, '[silent]');
			}
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
			} else if (name === 'azum4roll') this.add("c|azum4roll|This game doesn't have enough glitches!");
			else if (name === 'lasszeowx') this.add("c|Lass zeowx|When can I beat TPPLA BibleThump");
			else if (name === 'kapnkooma') this.add("c|Kap'n Kooma|Avast! I be needing a pint of grog after this.");
			else if (name === 'kooma9') this.add("c|Kooma9|Most Disappointing Player 2015");
			else if (name === 'best') this.add("raw|<big>BEST? FALLED</big>");
			else if (name === 'poomph') this.add("c|Poomph|0/4 again. DansGame");
			else if (name === 'tadpole_0f_doom') this.add("c|Tadpole_0f_Doom|You'll never take me alive!");
			else if (name === 'trollkitten') this.add("c|TrollKitten|I need time away from the sub to clear my head after this.");
			else if (name === 'bigfatmantis') this.add("c|BigFatMantis|GGioz");
			else if (name === 'nofunmantis') this.add("c|NoFunMantis|GGCtrl27");
			else if (name === 'dictatormantis') this.add("c|DictatorMantis|bg DansGame");
			else if (name === 'xinc') this.add("c|Xinc|Bruh");
			else if (name === 'natsugan') this.add("c|Natsugan|hax imo");
			else if (name === 'pikalaxalt') this.add("c|PikalaxALT|Wow Deku OneHand");
			else if (name === 'colewalski') this.add("c|ColeWalski|Dced again");
			else if (name === 'liria_10') this.add("c|Liria_10|why is art so difficult ;_;");
			else if (name === 'speedypokson') this.add("c|Speedy Pokson|C'MON, STEP IT UP!");
		},
		onBegin: function() {
			// Mix and Mega stuff
			var allPokemon = this.p1.pokemon.concat(this.p2.pokemon);
			for (var i = 0, len = allPokemon.length; i < len; i++) {
				var pokemon = allPokemon[i];
				pokemon.originalSpecies = pokemon.baseTemplate.species;
			}
		}
	},
	
	{
		name: 'Super Glitch',
		section: 'STPPLB',
		column: 2,
		searchShow: true,
		mod: 'stpplb',
		ruleset: ['Super Glitch Clause', 'HP Percentage Mod', 'Cancel Mod', 'No Switching Clause', 'No Recycle Clause', 'Ability Clause', 'Team Preview'],
		
		maxLevel: 100,
		defaultLevel: 100
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
	exports.Formats.splice(stpplbi+2, 0, {
		name: "Super TPPL Bros. Testing",
		section: "STPPLB",
		column: 2,
		
		mod: 'stpplb',
		searchShow: false,
		ruleset: ['Sleep Clause Mod', 'HP Percentage Mod', 'Cancel Mod', 'Team Preview'],
		onUpdate: stpplb.onUpdate,
		onModifyMove: stpplb.onModifyMove,
		onSwitchInPriority: 1,
		onSwitchIn: stpplb.onSwitchIn,
		onFaint: stpplb.onFaint,
		onBegin: stpplb.onBegin
	});
}
