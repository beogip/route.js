(function(window)
{
  function _parsePath(str, pathName)
  {
    var slices = str.split("/");
		var pattern = "";

		pattern = str.replace(/\*/g,".*").replace(/:[^\/]+/g,"([^/]+)").replace(/\//g,"\\/");

		var match = pathName.match("^"+pattern+"$");

		if(!match)
			return;

		var ret = {};
		var dynamicVar = 0;
		for(var i = 1; i < slices.length; i++)
		{
			var aux = slices[i].match(/^:([^\/]+)/);
			if(aux)
			{
				dynamicVar++;
				ret[aux[1]] = match[dynamicVar];
			}

		}
		return ret;
  }

  window.route = function(str, pathName, callback)
	{
    var callback = typeof pathName == "function" && pathName || callback;
    var pathName = typeof pathName == "string" && pathName || window.location.pathname;

		var match = _parsePath(str, pathName);

    if(match)
      callback(match);
	};


})(window)