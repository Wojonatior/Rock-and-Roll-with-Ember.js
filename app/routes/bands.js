import Ember from 'ember';

var Band = Ember.Object.extend({
	name: '',
});

var ledZepplin = Band.create({ name: 'Led Zepplin'});
var pearlJam = Band.create({ name: 'Pearl Jam'});
var fooFighters = Band.create({ name: 'Foo Fighters'});

var bands = [ledZepplin, pearlJam, fooFighters];

export default Ember.Route.extend({
	model: function() {
		return bands;
	}
});