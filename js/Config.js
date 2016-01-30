/**
 * @File: Config.js
 * @Description: Config
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
 * Config
 *
 * @class
 */
function Config()
{
	return;
}

Config.URL     = "http://webapi.amap.com/maps";

Config.KEY     = "5cea73229a058b4425b56e9ed7ee96c8";

Config.AMAPV   = 1.3;

Config.VERSION = "0.1.0";

Config.DEBUG   = true;

GMap.Config = Config;
GMap.Loader.loadApi();
