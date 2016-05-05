// app/controllers/bands/band/songs.js

import Ember from 'ember';

export default Ember.Controller.extend({
	// Properties
	title: '',
	songCreationStarted: false,

	// Actions
	actions: {
		updateRating: function(params) {
			var song = params.item,
				rating = params.rating;

			if (song.get('rating') === rating) {
				rating = 0;
			}
			song.set('rating', rating);
			song.save();
		},

		enableSongCreation: function() {
			this.set('songCreationStarted', true);
		},
	},

	// Computed Properties
	isAddButtonDisabled: Ember.computed('title', function(){
		return Ember.isEmpty(this.get('title'));
	}),

	canCreateSong: Ember.computed('songCreationStarted', 'model.songs.length', function() {
		return this.get('songCreationStarted') || this.get('model.songs.length');
	}),
});
