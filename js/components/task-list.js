var ko = require('../ExtendedKnockout.js');

function TaskList(parameters)
{
	var self = this;
	
	self.name = ko.observable();
	self.tasks = ko.observableArray();
	
	self.addTask = function()
	{
		self.tasks.push("New task");
	};
	
	self.parseParameters = function(parameters)
	{
		if(ko.isObservable(parameters.name))
		{
			self.name = parameters.name;
		}
		else
		{
			self.name(parameters.name);
		}
		
		if(ko.isObservableArray(parameters.tasks))
		{
			self.tasks = parameters.tasks;
		}
		else if(Array.isArray(parameters.tasks))
		{
			self.tasks = ko.observableArray(parameters.tasks);
		}
	};
	
	self.parseParameters(parameters);
}

module.exports = TaskList;
