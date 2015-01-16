(function(window)
{
  function parsePath(url)
	{
		var slices = url.split("/");
		var pattern = "";

		pattern = url.replace(/:[^\/]+/g,"([^/]+)").replace(/\//g,"\\/");

		var match = window.location.pathname.match(pattern);

		if(!match)
			return {};

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
  window.parsePath = parsePath;
})(window)
