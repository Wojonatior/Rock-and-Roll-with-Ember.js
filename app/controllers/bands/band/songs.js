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

			song.set('rating', rating);
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
