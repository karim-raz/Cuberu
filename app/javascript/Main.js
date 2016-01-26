var widgetAPI = new Common.API.Widget();
var tvKey = new Common.API.TVKeyValue();
var i=0;
var max=2;
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

window.onShow = function() {
	var nnaviPlugin = document.getElementById('pluginObjectNNavi');
	nnaviPlugin.SetBannerState(1);
	// For volume OSD
	var pluginAPI = new Common.API.Plugin();
	pluginAPI.SetBannerState(1);
	pluginAPI.unregistKey(tvKey.KEY_VOL_UP);
	pluginAPI.unregistKey(tvKey.KEY_VOL_DOWN);
	pluginAPI.unregistKey(tvKey.KEY_MUTE);
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
			alert("RETURN");
			widgetAPI.sendReturnEvent();
			break;
		case tvKey.KEY_LEFT:
			alert("LEFT");
			navigation("LEFT");
			break;
		case tvKey.KEY_RIGHT:
			alert("RIGHT");
			navigation("RIGHT");
			break;
		case tvKey.KEY_INFO:
			parent.location="about.html";
			break;
		case tvKey.KEY_UP:
			alert("UP");
			break;
		case tvKey.KEY_DOWN:
			alert("DOWN");
			break;
		case tvKey.KEY_ENTER:
		case tvKey.KEY_PANEL_ENTER:
			alert("ENTER");
			if(i==1){
				sessionStorage.setItem("indice",i);
				parent.location="settings.html";
			}
			if(i==2){
				sessionStorage.setItem("indice",i);
				parent.location="how.html";
			}
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
function playon() {
	document.getElementById('fig3').src='app/images/play.png';
	}
function playoff() {
	document.getElementById('fig1').src='app/images/playoff.png';
	}
function engoff() {
		document.getElementById('fig2').src='app/images/engrenageoff.png';
		}
function engon() {
		document.getElementById('fig4').src='app/images/engrenage.png';
		}
function navigation(dir){
   $("#fig"+i).removeClass("selected");
	if(dir=="RIGHT"){
		playon();
		engoff();
		if(i==max) i=1;
	else i++;
	}
	if(dir=="LEFT"){
		playoff();
		engon();
		if(i==1) i=max;
		else i--;
	}
	 $("#fig"+i).addClass("selected");
}

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

