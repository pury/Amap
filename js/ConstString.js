/**
 * @File: ConstString.js
 * @Description: ConstString
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
 * ConstString
 *
 * @class
 */
function ConstString()
{

}

//------------------------------------------------------------
//zh-cn
//------------------------------------------------------------

ConstString.cMapName = "高德地图";

ConstString.cMapContent = "高德是中国领先的数字地图内容、导航和位置服务解决方案提供商。";

ConstString.cServerError = "服务器未响应，请稍后重试...";

ConstString.cFailedCurrentAddress = "获取当前位置失败！";

ConstString.cFailedGetPosition = "无法获取位置信息！";

ConstString.cNotSupport = "当前浏览器不支持地理定位！";


//------------------------------------------------------------
// en
//------------------------------------------------------------

ConstString.cFailedCurrentAddress = "Failed to get the current address!";

ConstString.cFailedGetPosition = "Failed to get the position!";

ConstString.cNotSupport = "The browser does not support access to geographical location！";

GMap.ConstString = ConstString;
