// app/controllers/bands/band/songs.js
import Ember from 'ember';
import { capitalize } from '../../../helpers/capitalize';
const {Controller, computed, isEmpty} = Ember;

export default Ember.Controller.extend({
    // Properties
    title: '',
    searchTerm: '',
    songCreationStarted: false,
    sortBy: 'ratingDesc',
    queryParams: {
        sortBy: 'sort',
        searchTerm: 's',
    },

    // Actions
    actions: {
        updateRating(params) {
            let { item: song, rating } = params;

            if (song.get('rating') === rating) {
                rating = 0;
            }
            song.set('rating', rating);
            song.save();
        },

        enableSongCreation() {
            this.set('songCreationStarted', true);
        },
        
        setSorting(option) {
            this.set('sortBy', option);
        }
    },

    // Computed Properties
    isAddButtonDisabled: Ember.computed.empty('title'),

    canCreateSong: Ember.computed('songCreationStarted', 'model.songs.length', function() {
        return this.get('songCreationStarted') || this.get('model.songs.length');
    }),

    sortProperties: Ember.computed('sortBy', function() {
        var options = {
            'ratingDesc': 'rating:desc,title:asc',
            'ratingAsc': 'rating:asc,title:asc',
            'titleDesc': 'title:desc',
            'titleAsc': 'title:asc',
        };
        return options[this.get('sortBy')].split(',');
    }),

    sortedSongs: Ember.computed.sort('matchingSongs', 'sortProperties'),

    matchingSongs: Ember.computed('model.songs.@each.title', 'searchTerm', function() {
        return this.get('model.songs').filter( (song) => {
            const searchTerm = this.get('searchTerm').toLowerCase();
            return song.get('title').toLowerCase().indexOf(searchTerm) !== -1;
        });
    }),

    newSongPlaceholder: Ember.computed('model.name', function() {
        var bandName = this.get('model.name');
        return `New ${capitalize(bandName)} song`;
    }),
});
