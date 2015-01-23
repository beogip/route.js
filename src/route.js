(function(window)
{
  function _parsePath(str)
  {
    var slices = str.split("/");
		var pattern = "";

		pattern = str.replace(/:[^\/]+/g,"([^/]+)").replace(/\//g,"\\/");

		var match = window.location.pathname.match(pattern);

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

  window.parsePath = function(str, callback)
	{

		var match = _parsePath(str);

    if(match)
      callback(match);
	};


})(window)
