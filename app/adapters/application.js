// app/adapters/application.js

import JSONAPIAdapter from 'ember-data/adapters/json-api';
import ENV from '../config/environment';

export default JSONAPIAdapter.extend({
	host: ENV.apiHost,

	shouldBackgroundReloadRecord: function() {
		return false;
	},
});
