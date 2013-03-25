<!--
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
-->
<html>
<head>
<title>Juju's LuaIDE</title>
<link rel="shortcut icon" href="http://lua-users.org/files/wiki_insecure/lua-std.ico" />
<link rel="icon" type="image/png" href="http://www.andreas-rozek.de/Lua/Lua-Logo_16x16.png" />
<link rel="stylesheet" href="luastyle.css" />
<script language="JavaScript" type="text/javascript" src="termlib.js"></script>
<script language="JavaScript" type="text/javascript" src="lua+parser.min.js"></script>
<script language="JavaScript" type="text/javascript" src="lualibs.js"></script>
<script src="http://d1n0x3qji82z53.cloudfront.net/src-min-noconflict/ace.js" type="text/javascript" charset="utf-8"></script>
<script language="JavaScript" type="text/javascript" src="windows.js"></script>
</head>
<body>
<div class="menuBar" style="width:100%;">
<a class="menuButton" href=""
    onclick="return buttonClick(event, 'fileMenu');"
    onmouseover="buttonMouseover(event, 'fileMenu');">File</a>
<a class="menuButton" href=""
    onclick="return buttonClick(event, 'editMenu');"
    onmouseover="buttonMouseover(event, 'editMenu');">Edit</a>
<a class="menuButton" href=""
    onclick="return buttonClick(event, 'toolsMenu');"
    onmouseover="buttonMouseover(event, 'toolsMenu');">Tools</a>
<a class="menuButton" href=""
    onclick="return buttonClick(event, 'windowMenu');"
    onmouseover="buttonMouseover(event, 'windowMenu');">Window</a>
<a class="menuButton" href=""
    onclick="return buttonClick(event, 'helpMenu');"
    onmouseover="buttonMouseover(event, 'helpMenu');">Help</a>
</div>
<div id="fileMenu" class="menu"
     onmouseover="menuMouseover(event)">
<a class="menuItem" href="" onclick="if (winList['openWin']) winList['openWin'].open(); return false;">Open</a>
<a class="menuItem" href="" onclick="saveFile(); return false;">Save</a>
</div>
<div id="editMenu" class="menu"
     onmouseover="menuMouseover(event)">
<a class="menuItem" href="" onclick="editor.undo(); return false;">Undo</a>
<a class="menuItem" href="" onclick="editor.redo(); return false;">Redo</a>
</div>
<div id="toolsMenu" class="menu"
     onmouseover="menuMouseover(event)">
<a class="menuItem" href="" onclick="lua_load(editor.getValue())(); return false;">Run</a>
</div>
<div id="windowMenu" class="menu"
     onmouseover="menuMouseover(event)">
<a class="menuItem" href="" onclick="if (winList['dispWin']) winList['dispWin'].open(); return false;">Display</a>
<a class="menuItem" href="" onclick="if (winList['editWin']) winList['editWin'].open(); return false;">Editor</a>
<a class="menuItem" href="" onclick="if (winList['termWin']){ winList['termWin'].open(); term.open(); } return false;">Terminal</a>
</div>
<div id="helpMenu" class="menu"
     onmouseover="menuMouseover(event)">
<a class="menuItem" href="" onclick="if (winList['aboutWin']) winList['aboutWin'].open(); return false;">About</a>
<a class="menuItem" href="http://www.omnimaga.org/index.php?topic=15762" target="_blank">Support Thread</a>
<a class="menuItem" href="https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=MZFUTCVNQRPL4&lc=CA&item_name=Julosoft&currency_code=CAD&bn=PP%2dDonationsBF%3abtn_donate_LG%2egif%3aNonHosted" target="_blank">Donate</a>
<a class="menuItem" href="https://github.com/juju2143/LuaIDE" target="_blank">Fork on GitHub</a>
</div>

<div id="termWin" class="window" style="left:50px;top:150px;width:646px;">
  <div class="titleBar">
    <span class="titleBarText">Lua Terminal</span>
    <img class="titleBarButtons" alt="" src="buttons.gif" usemap="#termWinMap" width="50" height="14" />
    <map id="termWinMap" name="termWinMap">
      <area shape="rect" coords="0,0,15,13"  href="" alt="" title="Minimize" onclick="this.parentWindow.minimize();return false;" />
      <area shape="rect" coords="16,0,31,13" href="" alt="" title="Restore"  onclick="this.parentWindow.restore();return false;" />
      <area shape="rect" coords="34,0,49,13" href="" alt="" title="Close"    onclick="term.close();this.parentWindow.close();return false;" />
    </map>
  </div>
<div id="termDiv" class="clientArea"></div>
</div>
<div id="dispWin" class="window" style="left:125px;top:225px;width:386px;">
  <div class="titleBar">
    <span class="titleBarText">Display</span>
    <img class="titleBarButtons" alt="" src="buttons.gif" usemap="#dispWinMap" width="50" height="14" />
    <map id="dispWinMap" name="dispWinMap">
      <area shape="rect" coords="0,0,15,13"  href="" alt="" title="Minimize" onclick="this.parentWindow.minimize();return false;" />
      <area shape="rect" coords="16,0,31,13" href="" alt="" title="Restore"  onclick="this.parentWindow.restore();return false;" />
      <area shape="rect" coords="34,0,49,13" href="" alt="" title="Close"    onclick="this.parentWindow.close();return false;" />
    </map>
  </div>
<canvas id="thecanvas" class="clientArea" width="384" height="216">You cannot use the graphic features of this page.</canvas>
</div>
<canvas id="thevram" width="384" height="216" style="display: none;"></canvas>
<div id="editWin" class="window" style="left:75px;top:175px;width:620px;">
  <div class="titleBar">
    <span class="titleBarText">Lua Editor</span>
    <img class="titleBarButtons" alt="" src="buttons.gif" usemap="#editWinMap" width="50" height="14" />
    <map id="editWinMap" name="editWinMap">
      <area shape="rect" coords="0,0,15,13"  href="" alt="" title="Minimize" onclick="this.parentWindow.minimize();return false;" />
      <area shape="rect" coords="16,0,31,13" href="" alt="" title="Restore"  onclick="this.parentWindow.restore();return false;" />
      <area shape="rect" coords="34,0,49,13" href="" alt="" title="Close"    onclick="this.parentWindow.close();return false;" />
    </map>
  </div>
<div id="editor" class="clientArea" style="height:400px;"><?php echo file_get_contents("default.lua"); ?></div>
</div>
<div id="aboutWin" class="window" style="left:100px;top:200px;width:400px;">
  <div class="titleBar">
    <span class="titleBarText">About</span>
    <img class="titleBarButtons" alt="" src="buttons.gif" usemap="#aboutWinMap" width="50" height="14" />
    <map id="aboutWinMap" name="aboutWinMap">
      <area shape="rect" coords="0,0,15,13"  href="" alt="" title="Minimize" onclick="this.parentWindow.minimize();return false;" />
      <area shape="rect" coords="16,0,31,13" href="" alt="" title="Restore"  onclick="this.parentWindow.restore();return false;" />
      <area shape="rect" coords="34,0,49,13" href="" alt="" title="Close"    onclick="this.parentWindow.close();return false;" />
    </map>
  </div>
<div class="clientArea" style="height:300px;background-color:#000;">
LuaIDE 0.1 Alpha
<!--br/><br/>Welcome to Juju's Lua/HTML5 IDE. This is a full-featured Lua IDE I made featuring a Lua interpreter console, a canvas and an editor, it could help you programming Lua.-->
<br/><br/>Copyright &#169; 2013 <a href="http://juju2143.ca/">Julien "juju2143" Savard</a>
<br/><br/><!--a href="http://www.w3schools.com/tags/ref_canvas.asp">ctx</a> <a href="http://wiki.inspired-lua.org/gc">gc</a> gl--> <a href="http://prizm.cemetech.net/index.php/LuaZM_Reference">LuaZM Documentation</a>
<br/>run() - Runs code in editor
<br/>loadfile(url) - Loads remote file in editor
<br/>dofile(url) - Executes remote file
<br/>canvas.mode(width,height) - Resizes display
<br/><br/><a href="http://www.masswerk.at/termlib/">termlib by Norbert Landsteiner</a>
<br/><a href="https://github.com/mherkender/lua.js">lua.js by mherkender</a>
<br/><a href="http://cemetech.net">LuaZM by Christopher "Kerm Martian" Mitchell</a>
<br/><a href="http://bwns.be/jim/WEBspire/editor.html">WEBspire by Jim Bauwens</a>
<br/><a href="http://www.brainjar.com/">DHTML stuff by Mike Hall</a>
<br/><a href="http://www.omnimaga.org/index.php?topic=15762">Official support thread</a>
<br/><a href="https://github.com/juju2143/LuaIDE">Get the source code!</a>
</div>
</div>
<div id="openWin" class="window" style="left:40%;top:40%;width:400px;">
  <div class="titleBar">
    <span class="titleBarText">Open</span>
    <img class="titleBarButtons" alt="" src="buttons.gif" usemap="#openWinMap" width="50" height="14" />
    <map id="openWinMap" name="openWinMap">
      <area shape="rect" coords="0,0,15,13"  href="" alt="" title="Minimize" onclick="this.parentWindow.minimize();return false;" />
      <area shape="rect" coords="16,0,31,13" href="" alt="" title="Restore"  onclick="this.parentWindow.restore();return false;" />
      <area shape="rect" coords="34,0,49,13" href="" alt="" title="Close"    onclick="this.parentWindow.close();return false;" />
    </map>
  </div>
<div class="clientArea" style="height:150px;color:black;">
<input type="radio" name="openfrom" id="fromfile" value="file" checked /><label for="fromfile">From file
<br/><input type="file" id="fileOpen" /></label>
<br/><br/><input type="radio" name="openfrom" id="fromurl" value="url" /><label for="fromurl">From URL
<br/><input type="URL" id="urlOpen" size="60" /></label>
<p align="center"><button onclick="loadFile();winList['openWin'].close();">OK</button> <button onclick="winList['openWin'].close();">Cancel</button></p>
</div>
</div>
</body>
</html>
