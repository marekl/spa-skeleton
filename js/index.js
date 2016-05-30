var ko					= require('./ExtendedKnockout.js'),
	MainView			= require('./MainViewModel.js');

// Register our components with Knockout
require('./RegisterComponents.js')(ko);

// The vm variable in not mangled by the build system so it's accessible in the
// window scope for easy debugging in a browser
window.vm = new MainView(
{
	api:
	{
		url: 'api.service.com',
		port: 443,
		secure: true
	}
});

// Bind once the page has loaded
window.onload = function()
{
	ko.applyBindings(vm);
};
