var widgetAPI = new Common.API.Widget();
var tvKey = new Common.API.TVKeyValue();
var canvas; 
var ctx;
var pDiv;
var tileSize = 32;
var cWidth;
var cHeight;
var type="";
var Main =
{

};

Main.onLoad = function()
{
	// Enable key event processing
	this.enableKeys();
	widgetAPI.sendReadyEvent();
	canvas = document.getElementById('c');
	pDiv   = document.getElementById('player');
	if (!(!!canvas.getContext && canvas.getContext("2d"))) {
		alert("Your browser doesn't support HTML5, please update to latest version");
	}else alert("he's supporting");
	ctx = canvas.getContext("2d");
	cWidth = canvas.width / tileSize;
	cHeight = canvas.height / tileSize;
	setTimeout(function(){
	    document.getElementById("loading").style.display="none";
	}, 10000);
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
	if (!start) {
        start = true;
        document.getElementById('player').style.display = 'block';
        document.getElementById('msg').innerHTML = '';
        init();
    }
	switch(keyCode)
	{
		case tvKey.KEY_RETURN:
		case tvKey.KEY_PANEL_RETURN:
			widgetAPI.blockNavigation(event);
			if(document.getElementById('popup').style.display == "none")
			{
				pause(0);
				type="RETURN";
				document.getElementById('popup').style.display = "block";
			}else
			{
				pause(0);
				document.getElementById('popup').style.display = "none";
			}
			break;
		case tvKey.KEY_LEFT:
			alert("LEFT");
			break;
		case tvKey.KEY_INFO:
			//death();
            player.attempts -= 1;
            break;
		case tvKey.KEY_RIGHT:
			alert("RIGHT");
			break;
		case tvKey.KEY_UP:
			
			jump();
			
			break;
		case tvKey.KEY_DOWN:
			alert("DOWN");
			break;
		case tvKey.KEY_ENTER:
		case tvKey.KEY_PANEL_ENTER:
			if(document.getElementById('popup').style.display == "none")
			{
				pause(0);
			}else
			{
				if(type=="RETURN")parent.location="settings.html";
				if(type=="EXIT")widgetAPI.sendExitEvent();
			}
			break;
		case tvKey.KEY_EXIT:
			widgetAPI.blockNavigation(event);
			if(document.getElementById('popup').style.display == "none")
			{
				pause(0);
				type="EXIT";
				document.getElementById('popup').style.display = "block";
			}
		default:
			alert("Unhandled key");
			break;
	}
};


setInterval(function() {
    var wrapper = document.getElementById('wrapper').style;
    wrapper.top = window.innerHeight / 2 - 160 + 'px';
    wrapper.left = window.innerWidth / 2 - 320 + 'px';
}, 10000);

var lastLoop = new Date().getTime();

var player = {
    'pos': {
        'x': -8,
        'y': 0
    },
    'y_v': 0,
    'jump': false,
    'pause': false,
    'attempts': 0,
};

var map = [
    [],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 1, 0, 0, 0, 0, 0, 0, 0, 2, 2, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 0, 0, 0, 0, 1, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 1, 2, 2, 2, 0, 0, 0, 0, 0, 0, 2, 2, 2, 1, 0, 0, 1, 2, 2, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 2, 1, 1, 0, 0, 0, 0, 0, 0, 1, 2, 2, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 2, 2, 2, 0, 0, 1, 0, 2, 0, 0],
    ];

function message(msg) {
    document.getElementById('msg').innerHTML = msg;
}

function drawCanvas() {
	ctx.clearRect ( 0 , 0 , canvas.width, canvas.height );
    canvas.width = canvas.width;

    for (var x = -1; x < cWidth - 1; x++) {
        for (var y = 0; y < cHeight; y++) {
            var a = x + Math.floor(player.pos.x) - 5;
            var b = y - Math.floor(player.pos.y);

            if (!map[b]) {
                map[b] = [];
            }

            if (!map[b][a]) {
                map[b][a] = 0;
            }

            if (b === 4) {
                map[b][a] = -1;
            }

            if (map[b][a]) {
                var color = '0,0,0';
                var height = tileSize;
                var y_offSet = 3;
                ctx.lineWidth = 2;

                if (map[b][a] === -1) {
                    color = '255,255,255';
                    height = 2;
                }

                if (x < 1 || x > 17) {
                    ctx.fillStyle = 'rgba(' + color + ',0)';
                    ctx.strokeStyle = 'rgba(255,255,255,0)';
                } else if (x === 1 || x === 17) {
                    ctx.fillStyle = 'rgba(' + color + ',0.33)';
                    ctx.strokeStyle = 'rgba(255,255,255,0.33)';
                } else if (x === 2 || x === 16) {
                    ctx.fillStyle = 'rgba(' + color + ',0.66)';
                    ctx.strokeStyle = 'rgba(255,255,255,0.66)';
                } else {
                    ctx.fillStyle = 'rgba(' + color + ',1.0)';
                    ctx.strokeStyle = 'rgba(255,255,255,1.0)';
                }
                
                if (map[b][a] === 1) {
                    ctx.beginPath();
                        ctx.moveTo(((x + 1) * tileSize) + 16 - ((player.pos.x - Math.floor(player.pos.x)) * tileSize), ((y + y_offSet) * tileSize) + ((player.pos.y - Math.floor(player.pos.y)) * tileSize));
                        ctx.lineTo(((x + 1) * tileSize) - ((player.pos.x - Math.floor(player.pos.x)) * tileSize), ((y + y_offSet) * tileSize) + 32 + ((player.pos.y - Math.floor(player.pos.y)) * tileSize));
                        ctx.lineTo(((x + 1) * tileSize) + 32 - ((player.pos.x - Math.floor(player.pos.x)) * tileSize), ((y + y_offSet) * tileSize) + 32 + ((player.pos.y - Math.floor(player.pos.y)) * tileSize));
                        ctx.lineTo(((x + 1) * tileSize) + 16 - ((player.pos.x - Math.floor(player.pos.x)) * tileSize), ((y + y_offSet) * tileSize) + ((player.pos.y - Math.floor(player.pos.y)) * tileSize));
                    ctx.fill();
                    ctx.stroke();
                    ctx.closePath();
                } else if (map[b][a] === -1) {
                    ctx.fillRect(((x + 1) * tileSize) - ((player.pos.x - Math.floor(player.pos.x)) * tileSize), ((y + y_offSet) * tileSize) + ((player.pos.y - Math.floor(player.pos.y)) * tileSize), tileSize, height);
                } else {
                    ctx.fillRect(((x + 1) * tileSize) - ((player.pos.x - Math.floor(player.pos.x)) * tileSize), ((y + y_offSet) * tileSize) + ((player.pos.y - Math.floor(player.pos.y)) * tileSize), tileSize, height);
                    ctx.strokeRect(((x + 1) * tileSize) - ((player.pos.x - Math.floor(player.pos.x)) * tileSize), ((y + y_offSet) * tileSize) + ((player.pos.y - Math.floor(player.pos.y)) * tileSize), tileSize, height);
                }
            }
        }
    }
}

function rotate() {
    var a = 0,
        i = 0,
        deg = 6;

    while (i < 30) {
        i += 1;
        setTimeout(function() {
            a += 1;
            if (player.pos.y !== 0) {
                pDiv.style.transform = 'rotate(' + a * deg + 'deg)';
                pDiv.style.msTransform = 'rotate(' + a * deg + 'deg)';
                pDiv.style.webkitTransform = 'rotate(' + a * deg + 'deg)';
                pDiv.style.oTransform = 'rotate(' + a * deg + 'deg)';
                pDiv.style.mozTransform = 'rotate(' + a * deg + 'deg)';
            } else {
                pDiv.style.transform = 'rotate(0deg)';
                pDiv.style.msTransform = 'rotate(0deg)';
                pDiv.style.webkitTransform = 'rotate(0deg)';
                pDiv.style.oTransform = 'rotate(0deg)';
                pDiv.style.mozTransform = 'rotate(0deg)';
            }
        }, i * 35);
    }
}

function pause(time) {
    if (time) {
        player.pause = true;
        setTimeout(function() {player.pause = false;}, time);
    } else {
        if (player.pause) {
            message('');
            player.pause = false;
        } else {
            message('PAUSED');
            player.pause = true;
        }
    }
}

function collision(x, y, type) {
    var a = Math.floor(player.pos.x - 0.3) + x;
    var b = 3 - Math.floor(player.pos.y) + y;

    if (!map[b]) {
        map[b] = [];
    }

    if (!map[b][a]) {
        map[b][a] = 0;
    }

    if (type) {
        if (map[b][a] === type) {
            return true;
        }
    } else {
        if (map[b][a] !== 0) {
            return true;
        }
    }

    return false;
}

function gravity() {
    g = true;

/* if (!collision(0,0)) {
        player.jump = false;
        g = false;
    } */

    if (player.pos.y < 0 || player.pos.y === 0.2999999999999999) {
        player.pos.y = 0;
        player.y_v = 0;
    }

    if (player.pos.y < 0.01) {
        player.jump = false;
        g = false;
    }

    if (g === true && player.pos.y > 0.5) {
        player.y_v -= 0.02;
    }

    player.pos.y += player.y_v;
}

function jump() {
    if (player.jump === false) {
        player.jump = true;
        rotate();
        player.y_v += 0.3;
    }
}

function death() {
    pause(2000);
    
    setTimeout(function() {
        pDiv.style.display = 'none';
    }, 250);
    
    setTimeout(function() {
        player.y_v = 0;
        player.pos.x = -8;
        player.pos.y = 0;
        player.attempts += 1;
        pDiv.style.display = 'block';
    }, 2000);
}

function step() {
    var thisLoop = new Date().getTime();
    var fps = Math.floor(1000 / (thisLoop - lastLoop));
    lastLoop = thisLoop;

    if (!player.pause) {
        if (!collision(-1, 0, 1)) {
            player.pos.x += 0.25;
        } else {
            death();
        }

        gravity();
        
        drawCanvas(canvas);
        
        ctx.fillStyle = '#FFF';
        ctx.font = '8pt monospace';
        

        if (player.attempts > 0) {
            message('Attempts: ' + player.attempts);
        } else {
            message('');
        }
    }
    
    if (player.pos.x > 80) {
        message('yow cuberu survived;)');
        pause(4000);
        parent.location="youwon.html";
    }
    setTimeout(step, 30);
}

function init() {
    drawCanvas();
    step();
}

var start = false;