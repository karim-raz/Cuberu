var widgetAPI = new Common.API.Widget();
var tvKey = new Common.API.TVKeyValue();
var i=0;
var max=3;
var plugin;
var Main =
{

};

Main.onLoad = function()
{
	// Enable key event processing
	plugin = document.getElementById("pluginObjectAudio");
	this.enableKeys();
	widgetAPI.sendReadyEvent();
	if(sessionStorage.getItem("indice")==null)
		navigation("RIGHT");
	else
		{i=sessionStorage.getItem("indice")-1;
	
	navigation("RIGHT");}
};



Main.onUnload = function()
{

};

Main.enableKeys = function()
{
	document.getElementById("anchor").focus();
};

Main.keyDown = function()
{
	var keyCode = event.keyCode;
	alert("Key pressed: " + keyCode);

	switch(keyCode)
	{
		case tvKey.KEY_RETURN:
		case tvKey.KEY_PANEL_RETURN:
		
			widgetAPI.blockNavigation(event);
			parent.location="index.html";
			break;
		case tvKey.KEY_LEFT:
			alert("LEFT");
			
			break;
		case tvKey.KEY_RIGHT:
			alert("RIGHT");
			
			break;
		case tvKey.KEY_UP:
			alert("UP");
			break;
		case tvKey.KEY_DOWN:
			alert("DOWN");
			break;
	
		break;
		case tvKey.KEY_ENTER:
		case tvKey.KEY_PANEL_ENTER:
			alert("ENTER");
			parent.location="settings.html";
			
			break;
		case tvKey.KEY_VOL_UP:
			volInc();
			alert(getVolume());
			break;
		case tvKey.KEY_VOL_DOWN:
			alert(plugin.GetVolume());
			volDec();
			alert(getVolume());
			break;
		case tvKey.KEY_MUTE:
			volMute();
			alert(getVolume());
			break;
		default:
			alert("Unhandled key");
			break;
	}
};
function volInc() {
	plugin.SetVolumeWithKey(0);
	getVolume();
}

function volDec() {
	plugin.SetVolumeWithKey(1);
	getVolume();
}
function volMute() {
	if (plugin.GetUserMute() == 0) {
		plugin.SetUserMute(1);
		setVolumeZero();
	} else {
		plugin.SetUserMute(0);
		getVolume();
	}
}
function getVolume() {
	alert(plugin.GetVolume());
}
function setVolumeZero() {
}



