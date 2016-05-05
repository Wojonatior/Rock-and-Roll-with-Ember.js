// app/routes/bands/band/songs.js

import Ember from 'ember';

export default Ember.Route.extend({
	model: function() {
		return this.modelFor('bands.band');
	},

	resetController: function(controller) {
		controller.set('songCreationStarted', false);
	},

	actions: {
		createSong: function() {
			var controller = this.get('controller');
			var band = this.modelFor('bands.band');
			
			var song = this.store.createRecord('song', {
				title: controller.get('title'),
				band: band
			});
			song.save().then(function() {
				controller.set('title', '');
			});
		},

		updateRating: function(params) {
			var song = params.item,
				rating = params.rating;

			song.set('rating', rating);
		},

		didTransition: function() {
			var band = this.modelFor("bands.band");
			document.title = `${band.get('name')} songs - Rock & Roll`;
		}
	}
});