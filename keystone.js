// Simulate config options from your production environment by
// customising the .env file in your project's root folder.
require('dotenv')().load();

// Require keystone
var keystone = require('keystone');

keystone.init({
	
	'name': 'Murray John Architects',
	'brand': 'Murray John Architects',
	
	'less': 'public',
	'static': 'public',
	'favicon': 'public/favicon.ico',
	
	'views': 'templates/views',
	'view engine': 'jade',
	
	'auto update': true,
	
	'session': true,
	'auth': true,
	'user model': 'User',
	'cookie secret': 'g<?`X+s/>c{Hq6Gl2Si{If:;"m!&q(3xIoIr/oklkCP;GV6:G}(5}5I=!>0Wt^#R'
	
});

keystone.import('models');

keystone.set('locals', {
	_: require('underscore'),
	env: keystone.get('env'),
	utils: keystone.utils,
	editable: keystone.content.editable
});

keystone.set('routes', require('./routes'));

keystone.set('nav', {
	'galleries': 'galleries',
	'users': 'users'
});

keystone.start();
