// tests/acceptance/bands-test.js

import { test } from 'qunit';
import moduleForAcceptance from 'rarwe/tests/helpers/module-for-acceptance';
import Pretender from 'pretender';
import httpStubs from '../helpers/http-stubs';

moduleForAcceptance('Acceptance | bands');

var server;

test('List bands', function(assert) {
	server = new Pretender(function() {
		httpStubs.stubBands(this, [
		{
			id: 1,
			attributes: {
				name: 'Radiohead'
			}
		}
		]);
		httpStubs.stubCreateBand(this, 2);
	});

	visit('/bands');
	fillIn('.new-band', 'Long Distance Calling');
	click('.new-band-button');

	andThen(function() {
		assertLength(assert, '.band-link', 2, 'All band links are rendered');
		assertTrimmedText(assert, '.band-link:last', 'Long Distance Calling', 'Created band appears at end of the list');
		assertElement(assert, '.nav a.active:contains("Songs")', 'The Songs tab is active');
	});
});

test('Create a new band', function(assert) {
	server = new Pretender(function() {
		httpStubs.stubBands(this, [
		{
			id: 1,
			attributes: {
				name: 'Radiohead'
			}
		}
		]);
		httpStubs.stubCreateBand(this, 2);
	});
	visit('/bands');
	fillIn('.new-band', 'Long Distance Calling');
	click('.new-band-button');
	andThen(function() {
		assertLength(assert, '.band-link', 2, 'All band links are rendered');
		assertTrimmedText(assert, '.band-link:last', 'Long Distance Calling', 'Created band appears at the end of the list');
		assertElement(assert, '.nav a.active:contains("Songs")', 'The Songs tab is active');
	});
});

test('Create a new song in two steps', function(assert) {
	server = new Pretender(function() {
		this.get('/bands', function() {
			var response = {
				data: [
				{
					id: 1,
					type: 'bands',
					attributes: {
						name: 'Radiohead'
					}
				}
				]
			};
			return [200, { 'Content-Type': 'application/vnd.api+json' },
			JSON.stringify(response)];
		});
		this.post('/songs', function() {
			var response = {
				data: [
				{
					id: 1,
					type: "songs",
					attributes: {
						name: 'Killer Cars'
					}
				}
				]
			};
			return [200, { 'Content-Type': 'application/vnd.api+json' },
			JSON.stringify(response)];
		});
		this.get('/bands/1/songs', () => {
			return [200, { 'Content-Type': 'application/vnd.api+json' },
			JSON.stringify({ data: [] })];
		});
	});
	selectBand('Radiohead');
	click('a:contains("create one")');
	fillIn('.new-song', 'Killer Cars').click('.new-song-button');
	// submit('.new-song-form');
	andThen(function() {
		assertElement(assert, '.songs .song:contains("Killer Cars")', 'Creates the song and displays it in the list');
	});
});