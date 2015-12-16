/**
 * @File: map.js
 * @Description: map
 *
 * @Author:  Pury 
 * @Email:   szwzjx@gmail.com
 * @Version: 0.0.1
 * @Date:    2015-12-16
 *
 * Copyright © 2015 pury.org.   
 * All rights reserved.
 *
 */
 
var latitude, longitude, geocoder, marker, map, transfer, walking, driving;
var input = document.getElementById('input');

function onLoad()
{
	map = new AMap.Map('container');
	map.setZoom(13);
	
	AMap.service('AMap.Geocoder',function(){
		geocoder = new AMap.Geocoder({});
	});
	
	AMap.service(['AMap.ToolBar','AMap.Scale'],function(){
		var toolBar = new AMap.ToolBar();
		var scale = new AMap.Scale();
		map.addControl(toolBar);
		map.addControl(scale);
	});	
	
	AMap.service('AMap.Transfer',function(){
        transfer = new AMap.Transfer({});
    })
    AMap.service('AMap.Walking',function(){
        walking = new AMap.Walking({});
    })
    AMap.service('AMap.Driving',function(){
        driving = new AMap.Driving({});
    })
	
	marker = new AMap.Marker({
		map:map
	});
	
	getPosition();
}

function mapGoTO(x, y)
{	
	map.setCenter([x,y]);
	marker.setPosition([x,y]);
}

function showPosition(position)
{
	latitude  = position.coords.latitude;
	longitude = position.coords.longitude;
	mapGoTO(longitude, latitude);
	getAddress();
}

function getAddress()
{
	var lnglatXY = [longitude, latitude];
	
	geocoder.getAddress(lnglatXY, function(status, result)
	{
		if (status === 'complete' && result.info === 'OK') 
		{
		   input.value = result.regeocode.formattedAddress;
		}
		else
		{
		   alert("Failed to get the current address!");
		}
	}); 
}

function getLocation()
{
	if (navigator.geolocation)
	{
		navigator.geolocation.getCurrentPosition(showPosition);
	}
	else
	{
		alert("The browser does not support access to geographical location！");
	}
}

function getPosition()
{
	input.onchange = function(e)
	{
		var address = input.value;
		
		geocoder.getLocation(address,function(status,result)
			{
				if(status == 'complete' && result.geocodes.length)
				{
					marker.setPosition(result.geocodes[0].location);
					map.setCenter(marker.getPosition());
				}
				else
				{
					alert("Failed to get the position!");
				}
			}
		);
	}
	
	input.onchange();	
}

onLoad();
