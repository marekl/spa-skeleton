var ko = require('knockout'),
	utils = require('./utils.js');

// A computed that we can force to reevaluate
ko.forcibleComputed = function(readFunc, context, options)
{
	var trigger = ko.observable().extend({notify:'always'}),
		target = ko.computed(function()
		{
			trigger();
			return readFunc.call(context);
		}, null, options);

	target.evaluateImmediate = function()
	{
		trigger.valueHasMutated();
	};

	return target;
};

ko.isObservableArray = function(obj)
{
	return ko.isObservable(obj) &&
		!(obj.destroyAll === undefined);
}

module.exports = ko;
