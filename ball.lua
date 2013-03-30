-- By Spenceboy98
-- http://www.cemetech.net/programs/index.php?mode=file&id=776
-- sleep() by Juju

function sleep(t)
    time = zmg.ticks()
    while time+t > zmg.ticks() do end
end

local tardisblue = zmg.makeColor("tardisblue")
local x = 15
local y = 15
local c = 2
local d = 2
repeat
  zmg.drawRectFill(0, 0, 384, 216, 0xFFFF)
  zmg.drawCircle(x, y, 15, tardisblue)
  zmg.drawCircle(x, y, 14, tardisblue)
  zmg.drawCircle(x, y, 13, tardisblue)
  zmg.drawCircle(x, y, 12, tardisblue)
  zmg.drawCircle(x, y, 11, tardisblue)
  zmg.drawCircle(x, y, 10, tardisblue)
  zmg.drawCircle(x, y, 9, tardisblue)
  zmg.drawCircle(x, y, 8, tardisblue)
  zmg.drawCircle(x, y, 7, tardisblue)
  zmg.drawCircle(x, y, 6, tardisblue)
  zmg.drawCircle(x, y, 5, tardisblue)
  zmg.drawCircle(x, y, 4, tardisblue)
  zmg.drawCircle(x, y, 3, tardisblue)
  zmg.drawCircle(x, y, 2, tardisblue)
  zmg.drawCircle(x, y, 1, tardisblue)
  x = x+c
  y = y+d
  if y==201 or y==15 then
    d = -d
  end
  if x==369 or x==15 then
    c = -c
  end
  zmg.fastCopy()
  sleep(2)
until zmg.keyMenuFast() == 47
