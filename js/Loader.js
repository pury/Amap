/**
 * @File: Loader.js
 * @Description: Loader
 *
 * @Author:  Pury 
 * @Email:   szwzjx@gmail.com
 * @Version: 0.0.2
 * @Date:    2015-1-30
 *
 * Copyright (C) 2015 - 2016 pury.org.   
 * All rights reserved.
 *
 */
 
var GMap = GMap || {};

/**
 * Loader
 *
 * @class
 */
function Loader()
{
	this.init();
}

Loader.prototype.init = function()
{
	var self = this;
	self.start();
};

Loader.prototype.start = function()
{
	var self = this;
    var done = function()
    {
        //TODO: XMLHttpRequest
        setTimeout("GMap.Map.show()", 100);
    }

	this.loadScript(GMap.FileList, done);
};

Loader.prototype.loadApi = function()
{
    var self = this;
    var api = GMap.Config.URL + "?v=" + GMap.Config.AMAPV + "&key=" + GMap.Config.KEY;
    self.loadSingleScript(api,function(){});
};

Loader.prototype.loadScript = function (list, callback) {
    var self = this;
    var loaded = 0;
    var loadNext = function ()
    {
        self.loadSingleScript(list[loaded], function () 
        {         
            loaded++;

            if (loaded >= list.length)
            {
                callback();
            }
            else 
            {
                loadNext();
            }
        });
    };

    loadNext();
};

Loader.prototype.loadSingleScript = function(src, callback)
{
    var s = document.createElement('script');

    if (s.hasOwnProperty("async"))
    {
        s.async = false;
    }

    s.src = src;
    s.addEventListener('load', function () {
        this.removeEventListener('load', arguments.callee, false);
        callback();
    }, false);

    document.body.appendChild(s);
};

Loader.getInstance = function()
{
	if(!Loader.instance)
	{
		Loader.instance = new Loader;
	} 

	return Loader.instance;
}

GMap.Loader = Loader.getInstance();
