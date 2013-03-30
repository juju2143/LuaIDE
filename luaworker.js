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

function term(){}
term.prototype.write = function(a,b)
{
	postMessage({"output": a});
}
term.prototype.newLine = function()
{
	postMessage({"output": "\n"});
}

importScripts("../lua+parser.js");

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
  
var keys = new Array();
var pkeys = new Array();
var lastKey = 0;

lua_core["print"] = function(a)
{
	postMessage({"output": a});
}

lua_libs["zmg"] = {
    "clear": function () {
	postMessage({0:"zmg",1:"clear"});
    },
    "copySprite": function (x,y,width,height,data) {
	postMessage({0:"zmg",1:"copySprite",2:x,3:y,4:width,5:height,6:data});       
    },
    "copySpriteMask": function (x,y,width,height,mask_color,data) {
	postMessage({0:"zmg",1:"copySpriteMask",2:x,3:y,4:width,5:height,6:mask_color,7:data});
    },
    "drawLine": function (x1,y1,x2,y2,color) {
	postMessage({0:"zmg",1:"drawLine",2:x1,3:y1,4:x2,5:y2,6:color});
    },
    "drawPoint": function (x,y,color) {
	postMessage({0:"zmg",1:"drawPoint",2:x,3:y,4:color});
    },
    "drawRect": function (x,y,width,height,color) {
	postMessage({0:"zmg",1:"drawRect",2:x,3:y,4:width,5:height,6:color});
    },
    "drawRectFill": function (x,y,width,height,color) {
	postMessage({0:"zmg",1:"drawRectFill",2:x,3:y,4:width,5:height,6:color});
    },
    "fastCopy": function () {
    	postMessage({0:"zmg",1:"fastCopy"});
    },
    "drawCircle": function (x,y,radius,color) {
	postMessage({0:"zmg",1:"drawCircle",2:x,3:y,4:radius,5:color});
    },
    "drawCircleFilled": function (x,y,radius,color) {
	postMessage({0:"zmg",1:"drawCircleFilled",2:x,3:y,4:radius,5:color});
    },
    "drawText": function (x,y,string,fgcolor,bgcolor) {
	postMessage({0:"zmg",1:"drawText",2:x,3:y,4:string,5:fgcolor,6:bgcolor});
    },
    "clipRect": function (x0,y0,width,height) {
	postMessage({0:"zmg",1:"clipRect",2:x0,3:y0,4:width,5:height});
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
onmessage = function(event) {
	if(event.data["code"])
		lua_load(event.data["code"])();
	if(event.data["keys"])
	{
		keys[event.data["keys"]["key"]] = event.data["keys"]["down"];
		lastKey = event.data["keys"]["key"];
	}
}

onerror = function(error) {
	postMessage({"output": error.message});
}
