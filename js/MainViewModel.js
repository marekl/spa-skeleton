var ko = require('./ExtendedKnockout.js'),
	utils = require('./utils.js');

function MainViewModel(options)
{
	var self = this;

	// Settings
	self.settings =
	{
		api:
		{
			url: null,
			port: null,
			secure: null
		}
	};
	
	// Data
	self.startTasks = ko.observableArray(['Do laundry', 'Mow lawn']);

	// Methods
	self.parseOptions = function(options)
	{
		if(utils.isObject(options))
		{
			// api
			if(utils.isObject(options.api))
			{
				// url
				if(options.api.hasOwnProperty('url'))
				{
					self.settings.api.url = options.api.url;
				}

				// port
				if(options.api.hasOwnProperty('port'))
				{
					self.settings.api.port = options.api.port;
				}
				
				// secure
				if(options.api.hasOwnProperty('secure'))
				{
					self.settings.api.secure = options.api.secure;
				}
			}
		}
	};

	self.init = function(options)
	{
		self.parseOptions(options);
	};

	self.init(options);
}

module.exports = MainViewModel;
