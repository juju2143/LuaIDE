i = 0
zmg.clear()
while true do
zmg.drawText(0,0,i,zmg.makeColor("black"),zmg.makeColor("white"))
zmg.fastCopy()
time = zmg.ticks()
while time+128 > zmg.ticks() do end
i = i+1
end
