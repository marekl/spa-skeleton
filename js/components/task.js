var ko = require('../ExtendedKnockout.js');

function task(parameters)
{
	var self = this;
	
	if(ko.isObservable(parameters.name))
	{
		self.name = parameters.name;
	}
	else
	{
		self.name = ko.observable(parameters.name);
	}
	
	self.editing = ko.observable(false);
	
	self.color = ko.observable("#999");
	
	self.edit = function()
	{
		self.editing(true);
	};
}

module.exports = task;
