/*
    LuaIDE - A Lua IDE made in HTML5
    Copyright (C) 2013 Julien "Juju" Savard

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

  var colors = {
    "aqua": 0x07FF,
    "azure": 0xF7FF,
    "beige": 0xF7BB,
    "black": 0x0000,
    "blue": 0x001F,
    "blueviolet": 0x895C,
    "brown": 0xA145,
    "chartreuse": 0x7FE0,
    "chocolate": 0xD343,
    "coral": 0xFBEA,
    "cornsilk": 0xFFDB,
    "crimson": 0xD8A7,
    "cyan": 0x07FF,
    "darkblue": 0x0011,
    "darkcyan": 0x0451,
    "darkgray": 0xAD55,
    "darkgreen": 0x0320,
    "darkkhaki": 0xBDAD,
    "darkorange": 0xFC60,
    "darkorchid": 0x9999,
    "darkred": 0x8800,
    "darksalmon": 0xECAF,
    "darkviolet": 0x901A,
    "deeppink": 0xF8B2,
    "dimgray": 0x6B4D,
    "firebrick": 0xB104,
    "forestgreen": 0x2444,
    "fuchsia": 0xF81F,
    "gold": 0xFEA0,
    "goldenrod": 0xDD24,
    "gray": 0x8410,
    "green": 0x0400,
    "greenyellow": 0xAFE5,
    "honeydew": 0xF7FE,
    "hotpink": 0xFB56,
    "indianred": 0xCAEB,
    "indigo": 0x4810,
    "ivory": 0xFFFE,
    "khaki": 0xF731,
    "lavender": 0xE73F,
    "lawngreen": 0x7FE0,
    "lightblue": 0xAEDC,
    "lightcoral": 0xF410,
    "lightcyan": 0xE7FF,
    "lightgray": 0xD69A,
    "lightgreen": 0x9772,
    "lightpink": 0xFDB8,
    "lightyellow": 0xFFFC,
    "lime": 0x07E0,
    "limegreen": 0x3666,
    "linen": 0xFF9C,
    "magenta": 0xF81F,
    "maroon": 0x8000,
    "midnightblue": 0x18CE,
    "mintcream": 0xF7FF,
    "mistyrose": 0xFF3C,
    "moccasin": 0xFF36,
    "navy": 0x0010,
    "oldlace": 0xFFBC,
    "olive": 0x8400,
    "olivedrab": 0x6C64,
    "orange": 0xFD20,
    "orangered": 0xFA20,
    "orchid": 0xDB9A,
    "pink": 0xFE19,
    "plum": 0xDD1B,
    "powderblue": 0xB71C,
    "purple": 0x8010,
    "red": 0xF800,
    "royalblue": 0x435C,
    "salmon": 0xFC0E,
    "sandybrown": 0xF52C,
    "seagreen": 0x2C4A,
    "seashell": 0xFFBD,
    "sienna": 0xA285,
    "silver": 0xC618,
    "skyblue": 0x867D,
    "slateblue": 0x6AD9,
    "slategray": 0x7412,
    "snow": 0xFFDF,
    "springgreen": 0x07EF,
    "steelblue": 0x4416,
    "tan": 0xD5B1,
    "tardisblue": 0x3a73,
    "teal": 0x0410,
    "thistle": 0xDDFB,
    "tomato": 0xFB08,
    "turquoise": 0x471A,
    "violet": 0xEC1D,
    "wheat": 0xF6F6,
    "white": 0xFFFF,
    "yellow": 0xFFE0,
    "yellowgreen": 0x9E66,
  };

  var map = {
    79:112,69:113,59:114,49:115,39:116,29:117, // [F1]   [F2]   [F3]  [F4]  [F5]   [F6]
    78:16, 68:17, 58:20, 48:36, 38:37, 28:38,  // [SHIFT][OPTN] [VARS][MENU][LEFT] [UP]
    77:18, 67:0,  57:0,  47:0,  37:40, 27:39,  // [ALPHA][x^2]  [^]   [EXIT][DOWN] [RIGHT]
    76:0,  66:0,  56:0,  46:0,  36:0,  26:0,   // [X/O/T][log]  [ln]  [sin] [cos]  [tan]
    75:0,  65:0,  55:0,  45:0,  35:188,25:187, // [a b/c][F<->D][(]   [)]   [,]    [->]
    74:103,64:104,54:105,44:46, 10:27,         // [7]    [8]    [9]   [DEL] [AC/ON]
    73:100,63:101,53:102,43:106,33:111,        // [4]    [5]    [6]   [*]   [/]
    72:97, 62:98, 52:99, 42:107,32:109,        // [1]    [2]    [3]   [+]   [-]
    71:96, 61:110,51:0,  41:189,31:13,         // [0]    [.]    [EXP] [(-)] [EXE]
  }
  
  var term = new Terminal( {
	initHandler: termInitHandler,
	handler: termHandler,
        crsrBlinkMode: true,
  } );
  var editor;
  var ctx;
  var vram;
  var keys = new Array();
  var pkeys = new Array();
  var lastKey = 0;
  halt = false;
  myWorker = null;
  function termHandler() {
     this.newLine();
     var line = this.lineBuffer;
     if (line != "") {
	try {
          lua_load(line)();
	} catch (e) {
	  term.write(e);
	}
     }
     this.prompt();
  }

  function termInitHandler() {
    //lua_tableset("load");
    lua_libs["ctx"] = ctx.canvas.getContext("2d");
    lua_libs["gl"] = ctx.canvas.getContext("webgl");
    this.write("Juju's Lua/HTML5 Interpreter 0.1");
    this.newLine();
    this.prompt();
  }

  // Nspire Lua graphics
  lua_libs["gc"] = {
    "clipRect": function () {
      not_supported();
    },
    "drawArc": function () {
      not_supported();
    },
    "drawImage": function () {
      not_supported();
    },
    "drawLine": function(x1, y1, x2, y2) {
      ctx.moveTo(x1,y1);
      ctx.lineTo(x2,y2);
      ctx.stroke();
      return [];
    },
    "drawPolyLine": function () {
      not_supported();
    },
    "drawRect": function(x, y, w, h) {
      ctx.strokeRect(x, y, w, h);
      return [];
    },
    "drawString": function () {
      not_supported();
    },
    "fillArc": function () {
      not_supported();
    },
    "fillPolygon": function () {
      not_supported();
    },
    "fillRect": function(x, y, w, h) {
      ctx.fillRect(x, y, w, h);
      return [];
    },
    "getStringHeight": function () {
      not_supported();
    },
    "getStringWidth": function () {
      not_supported();
    },
    "setAlpha": function () {
      not_supported();
    },
    "setColorRGB": function(r, g, b) {
      ctx.fillStyle = "rgb("+r+","+g+","+b+")";
      ctx.strokeStyle = "rgb("+r+","+g+","+b+")";
      return [];
    },
    "setFont": function () {
      not_supported();
    },
    "setPen": function () {
      not_supported();
    },
  };

  function rgb5652888(rgb)
  {
    return [(rgb&0xF800) >> 8, (rgb&0x7E0) >> 3, (rgb&0x1F) << 3];
  }

  // LuaZM Graphics
  lua_libs["zmg"] = {
    "clear": function () {
      vram.clearRect(0, 0, vram.canvas.width, vram.canvas.height);
    },
    "copySprite": function (x,y,width,height,data) {
      imageData = vram.getImageData(0, 0, vram.canvas.width, vram.canvas.height);
      for(var i = 0; i < data.length; i+=4)
      {
        ind = Math.floor(i/4);
        color = "0x"+data.substr(i,4);
        c = rgb5652888(color)
        index = (x + (ind%width) + ((y+Math.floor(ind/width))*imageData.width)) * 4;
        imageData.data[index+0] = c[0];
        imageData.data[index+1] = c[1];
        imageData.data[index+2] = c[2];
        imageData.data[index+3] = 255;
      }
      vram.putImageData(imageData, 0, 0);        
    },
    "copySpriteMask": function (x,y,width,height,mask_color,data) {
      imageData = vram.getImageData(0, 0, vram.canvas.width, vram.canvas.height);
      for(var i = 0; i < data.length; i+=4)
      {
        color = "0x"+data.substr(i,4);
        if(color != mask_color)
        {
          ind = Math.floor(i/4);
          c = rgb5652888(color)
          index = (x + (ind%width) + ((y+Math.floor(ind/width))*imageData.width)) * 4;
          imageData.data[index+0] = c[0];
          imageData.data[index+1] = c[1];
          imageData.data[index+2] = c[2];
          imageData.data[index+3] = 255;
        }
      }
      vram.putImageData(imageData, 0, 0);        
    },
    "drawLine": function (x1,y1,x2,y2,color) {
      c = rgb5652888(color);
      vram.strokeStyle = "rgb("+c[0]+","+c[1]+","+c[2]+")";
      vram.moveTo(x1,y1);
      vram.lineTo(x2,y2);
      vram.stroke();
    },
    "drawPoint": function (x,y,color) {
      imageData = vram.getImageData(0, 0, vram.canvas.width, vram.canvas.height);
      c = rgb5652888(color);
      index = (x + y * imageData.width) * 4;
      imageData.data[index+0] = c[0];
      imageData.data[index+1] = c[1];
      imageData.data[index+2] = c[2];
      imageData.data[index+3] = 255;
      vram.putImageData(imageData, 0, 0);
    },
    "drawRect": function (x,y,width,height,color) {
      c = rgb5652888(color);
      vram.strokeStyle = "rgb("+c[0]+","+c[1]+","+c[2]+")";
      vram.strokeRect(x, y, width, height);
    },
    "drawRectFill": function (x,y,width,height,color) {
      c = rgb5652888(color);
      vram.fillStyle = "rgb("+c[0]+","+c[1]+","+c[2]+")";
      vram.fillRect(x, y, width, height);
    },
    "fastCopy": function () {
      ctx.putImageData(vram.getImageData(0, 0, vram.canvas.width, vram.canvas.height), 0, 0);
    },
    "drawCircle": function (x,y,radius,color) {
      c = rgb5652888(color);
      vram.strokeStyle = "rgb("+c[0]+","+c[1]+","+c[2]+")";
      vram.beginPath();
      vram.arc(x,y,radius,0,2*Math.PI);
      vram.stroke();
    },
    "drawCircleFilled": function (x,y,radius,color) {
      c = rgb5652888(color);
      vram.fillStyle = "rgb("+c[0]+","+c[1]+","+c[2]+")";
      vram.beginPath();
      vram.arc(x,y,radius,0,2*Math.PI);
      vram.fill();
    },
    "drawText": function (x,y,string,fgcolor,bgcolor) {
      size = 18;
      bgc = rgb5652888(bgcolor);
      c = rgb5652888(fgcolor);
      vram.font = size+"px CasioPrizmMini";
      w = vram.measureText(string).width;
      vram.fillStyle = "rgb("+bgc[0]+","+bgc[1]+","+bgc[2]+")";
      vram.fillRect(x, y, w, size);
      vram.fillStyle = "rgb("+c[0]+","+c[1]+","+c[2]+")";
      vram.fillText(string,x,y+size);
    },
    "clipRect": function (x0,y0,width,height) {
      vram.beginPath();
      vram.rect(x0,y0,width+x0,height+y0);
      vram.clip();
    },
    "makeColor": function (r,g,b) {
      if(typeof r == "string" || (typeof r == "object" && r.constructor === String))
      {
        if(colors[r] == undefined)
          return [-1];
        else
          return [colors[r]];
      }
      else
      {
        return [(((r>>3) << 11) | ((g>>2) << 5) | (b>>3))&65535];
      }
    },
    "keyMenu": function () {
      while(lastKey == 0){}
      return [lastKey];
    },
    "keyMenuFast": function () {
      return [lastKey];
    },
    "keyDirectPoll": function () {
      pkeys = keys;
      return [];
    },
    "keyDirect": function (key) {
      return [(keys[map[key]]<<1)|pkeys[map[key]]];
    },
    "time": function () {
      return [Math.floor(new Date().getTime()/1000)];
    },
    "ticks": function () {
      return [Math.floor(new Date().getTime()/1000*128)];
    },
  };

  lua_libs["canvas"] = {
    "mode": function (width, height) {
      if(width != undefined)
      {
        if(width == "big")
        {
          ctx.canvas.width = 640;
          ctx.canvas.height = 480;
        }
        else if(width == "nspire")
        {
          ctx.canvas.width = 320;
          ctx.canvas.height = 240;
        }
        else if(width == "prizm")
        {
          ctx.canvas.width = 384;
          ctx.canvas.height = 216;
        }
        else
        {
          ctx.canvas.width = width;
          ctx.canvas.height = height;
        }
      }
      return [ctx.canvas.width, ctx.canvas.height];
    }
  };

  lua_core["dofile"] = function(file,t) {
    if(t == undefined) t = false;
    term.lock = true;
    try {
      term.send({
        url: "p?f="+file,
        method: 'get',
        callback: function () {
          var response = this.socket;
          if (response.success) {
            try {
              if(t) runThreaded(response.responseText);
              else lua_load(response.responseText)();
            } catch(e) {
              this.write(e);
            }
          }
          else
          {
            this.write("Request failed: "+response.status+" "+response.statusText);
          }
          this.lock = false;
        }
      });
      return [];
    } catch (e) {
      term.lock = false;
      return [null, e.message];
    }
  }

  lua_core["run"] = function (file) {
    if(file == undefined)
    {
      lua_load(editor.getValue())();
    }
    else
    {
      lua_core["dofile"](file);
    }
  }
  
  lua_core["runThreaded"] = function (file) {
    if(file == undefined)
    {
    	runThreaded();
    }
    else
    {
	lua_core["dofile"](file, true);
    }
  }

  lua_core["loadfile"] = function(file) {
    term.lock = true;
    try {
      term.send({
        url: "p?f="+file,
        method: 'get',
        callback: function () {
          var response = this.socket;
          if (response.success) {
            try {
              editor.setValue(response.responseText);
              editor.selection.selectFileStart();
            } catch(e) {
              this.write(e);
            }
          }
          else
          {
            this.write("Request failed: "+response.status+" "+response.statusText);
          }
          this.lock = false;
        }
      });
      return [];
    } catch (e) {
      term.lock = false;
      return [null, e.message];
    }
  }

  lua_core["about"] = function() {
    if (winList['aboutWin']) winList['aboutWin'].open();
    return [];
  }

  // http://wiki.inspired-lua.org/class()
/*  lua_core["class"] = lua_load("function class(prototype)
        local derived={}
 	if prototype then
 		function derived.__index(t,key)
 			return rawget(derived,key) or prototype[key]
 		end
 	else
 		function derived.__index(t,key)
 			return rawget(derived,key)
 		end
 	end
 	function derived.__call(proto,...)
 		local instance={}
 		setmetatable(instance,proto)
 		local init=instance.init
 		if init then
 			init(instance,...)
 		end
 		return instance
 	end
 	setmetatable(derived,derived)
 	return derived
        end");*/

  window.onload = function(){
    winInit();
    editor = ace.edit("editor");
    editor.setTheme("ace/theme/twilight");
    editor.getSession().setMode("ace/mode/lua");
    ctx=document.getElementById("thecanvas").getContext("2d");
    vram=document.getElementById("thevram").getContext("2d");
    ctx.canvas.addEventListener('keydown', doKeyDown, false);
    ctx.canvas.addEventListener('keyup', doKeyUp, false);
    if (winList['editWin']) winList['editWin'].open();
    if (winList['dispWin']) winList['dispWin'].open();
  }

function doKeyDown(e)
{
	lastKey = e.keyCode;
        keys[e.keyCode] = true;
        myWorker.postMessage({"keys": {"key": e.keyCode, "down": true}});
        e.preventDefault();
}
function doKeyUp(e)
{
	lastKey = 0;
        keys[e.keyCode] = false;
        myWorker.postMessage({"keys": {"key": e.keyCode, "down": true}});
        e.preventDefault();
}

function loadFile()
{
	if(document.getElementById("fromfile").checked)
	{
		if (window.File && window.FileReader && window.FileList && window.Blob) {
			// Great success! All the File APIs are supported.
			var files = document.getElementById("fileOpen").files;
			for (var i=0; i<files.length; i++)
			{
				reader = new FileReader();
				reader.onload = (function (evt) {
					editor.setValue(evt.target.result);
					editor.selection.selectFileStart();
				});
				reader.readAsText(files[i]);
			}
			return true;
		} else {
			alert('Sorry, the File APIs are not fully supported in this browser.');
		}
	}
	else if(document.getElementById("fromurl").checked)
	{
		if(document.getElementById("urlOpen").value == "")
			alert("Please type a filename!");
		else
		{
			lua_load("loadfile(\""+document.getElementById("urlOpen").value+"\")")();
			return true;
		}
	}
	else if(document.getElementById("fromsample").checked)
	{
		if(document.getElementById("sampleOpen").value == "")
			alert("Please select a file!");
		else
		{
			lua_load("loadfile(\""+document.getElementById("sampleOpen").value+"\")")();
			return true;
		}
	}
	return false;
}

function post_to_url(path, params, method) {
    method = method || "post"; // Set method to post by default, if not specified.

    // The rest of this code assumes you are not using a library.
    // It can be made less wordy if you use one.
    var form = document.createElement("form");
    form.setAttribute("method", method);
    form.setAttribute("action", path);

    for(var key in params) {
        if(params.hasOwnProperty(key)) {
            var hiddenField = document.createElement("input");
            hiddenField.setAttribute("type", "hidden");
            hiddenField.setAttribute("name", key);
            hiddenField.setAttribute("value", params[key]);

            form.appendChild(hiddenField);
         }
    }

    form.submit();
}

function saveFile()
{
	//location.href = "data:application/octet-stream;charset=UTF-8," + encodeURIComponent(editor.getValue());
	if(document.getElementById("fileSave").value == ""){
		alert("Please type a filename!");
		return false;
	}
	else
		post_to_url("save.php?f="+encodeURIComponent(document.getElementById("fileSave").value), {"lua":encodeURIComponent(editor.getValue())})
	return true;
}

function saveFileTNS()
{
	if(document.getElementById("fileSave").value == "") {
		alert("Please type a filename!");
		return false;
	}
	else
		post_to_url("luna.php?f="+encodeURIComponent(document.getElementById("fileSave").value), {"lua":encodeURIComponent(editor.getValue())})
	return true;
}

function runThreaded(code)
{
	if(code == undefined) code = editor.getValue();
	if(typeof window.Worker === "function")
	{
		if(myWorker !== null){
			myWorker.terminate();
		}
		myWorker = new Worker("luaworker.js");

		myWorker.onmessage = function (oEvent) {
			if(oEvent.data['output'])
			{
				term.write(oEvent.data['output']);
				console.log("Worker said: "+oEvent.data['output']);
			}
			if(oEvent.data[0])
				lua_libs[oEvent.data[0]][oEvent.data[1]](oEvent.data[2],oEvent.data[3],oEvent.data[4],oEvent.data[5],oEvent.data[6],oEvent.data[7],oEvent.data[8],oEvent.data[9]);
		};
		myWorker.postMessage({"code": code});
	}
	else
	{
		if(confirm("Your browser does not support web workers. This means your browser may crash during infinite loops. Do you still want to continue?"))
		{
			lua_load(code)();
		}
	}
}

function stopThread()
{
	myWorker.terminate();
}
