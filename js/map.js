/**
 * @File: Map.js
 * @Description: Map
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
  * Map
  *
  * @class
  */
function Map() 
{
	this.mMap = null;
	this.mTransfer = null;
	this.mWalking = null;
	this.mDriving = null;
	this.mInfowindow = null;
	this.mGeocoder = null;
	this.mMarker = null;
	this.mLatitude = null;
	this.mLongitude = null;
	this.mInput = document.getElementById('input');
}

Map.prototype.show = function()
{
	if(!AMap)
	{
		alert(GMap.ConstString.cServerError);
		return;
	}

	console.log("Version: " + GMap.Config.VERSION);
	var self = this;
	self.mMap = new AMap.Map('container');
	self.mMap.setZoom(10);
	
	AMap.service('AMap.Geocoder',function(){
		self.mGeocoder = new AMap.Geocoder();
	});
	
	AMap.service(['AMap.ToolBar','AMap.Scale'],function(){
		var toolBar = new AMap.ToolBar();
		var scale = new AMap.Scale();
		self.mMap.addControl(toolBar);
		self.mMap.addControl(scale);
	});	
	
	AMap.service('AMap.Transfer',function(){
        self.mTransfer = new AMap.Transfer({});
    });
	
    AMap.service('AMap.Walking',function(){
        self.mWalking = new AMap.Walking({});
    });
	
    AMap.service('AMap.Driving',function(){
        self.mDriving = new AMap.Driving({});
    });
	
	AMap.service('AMap.AdvancedInfoWindow',function(){
		self.mInfowindow = new AMap.AdvancedInfoWindow({
			content:
				'<div class="info-title">' + 
				GMap.ConstString.cMapName +
				'</div><div class="info-content">'+
				'<img src="http://webapi.amap.com/images/amap.jpg">'+
				GMap.ConstString.cMapContent +
				'<br/>' +
				'(Amap - By Pury)',
			offset: new AMap.Pixel(0, -30)
		});
	});
	
	self.mMarker = new AMap.Marker({
		map:self.mMap
	});
	
	self.mMarker.on('click',function(e){
		self.mInfowindow.open(map,e.target.getPosition());
    })
	
	self.getPosition();
};

Map.prototype.mapGoTO = function(x, y)
{	
	this.mMap.setCenter([x,y]);
	this.mMarker.setPosition([x,y]);
	this.mInfowindow.open(this.mMap, this.mMarker.getPosition());
};

Map.prototype.showPosition = function(position)
{	
	GMap.Map.mLatitude  = position.coords.latitude;
	GMap.Map.mLongitude = position.coords.longitude;
	GMap.Map.mapGoTO(GMap.Map.mLongitude, GMap.Map.mLatitude);
	GMap.Map.getAddress();
};

Map.prototype.getAddress = function()
{
	var self = this;
	var lnglatXY = [self.mLongitude, self.mLatitude];
	
	self.mGeocoder.getAddress(lnglatXY, function(status, result)
	{
		if (status === 'complete' && result.info === 'OK') 
		{
		   self.mInput.value = result.regeocode.formattedAddress;
		}
		else
		{
		   alert(GMap.ConstString.cFailedCurrentAddress);
		}
	}); 
};

Map.prototype.getLocation = function()
{
	if (navigator.geolocation)
	{
		navigator.geolocation.getCurrentPosition(this.showPosition);
	}
	else
	{
		alert(GMap.ConstString.cNotSupport);
	}
};

Map.prototype.getPosition = function()
{
	var self = this;

	self.mInput.onchange = function(e)
	{
		var address = self.mInput.value;
		
		self.mGeocoder.getLocation(address,function(status,result)
			{
				if(status == 'complete' && result.geocodes.length)
				{
					self.mMarker.setPosition(result.geocodes[0].location);
					self.mMap.setCenter(self.mMarker.getPosition());
					self.mInfowindow.open(self.mMap, self.mMarker.getPosition());
				}
				else
				{
					alert(GMap.ConstString.cFailedGetPosition);
				}
			}
		);
	}
	
	self.mInput.onchange();	
};

Map.getInstance = function()
{
	if(!Map.instance)
	{
		Map.instance = new Map;
	}

	return Map.instance;
};

GMap.Map = Map.getInstance();