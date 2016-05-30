// Function that accepts Knockout and registers all our custom components with it

module.exports = function(ko)
{
	ko.components.register('task',
	{
		viewModel: require('./components/task.js'),
		template: require('../html/components/task.html')
	});
	
	ko.components.register('task-list',
	{
		viewModel: require('./components/task-list.js'),
		template: require('../html/components/task-list.html')
	});
};