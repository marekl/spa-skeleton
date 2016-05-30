// Convenience Utility Functions
var utils = {};

utils.isDefined = function(variable)
{
	if(typeof variable === 'undefined' || variable === null)
	{
		return false;
	}
	else
	{
		return true;
	}
};

utils.isFunction = function(functionToCheck)
{
	var getType = {};
	return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
};

utils.isObject = function(test)
{
	if(utils.isDefined(test) && typeof test === 'object')
	{
		return true;
	}
	else
	{
		return false;
	}
};

module.exports = utils;
