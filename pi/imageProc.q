rawData:read1 `:image.bmp;
header:121#rawData;
imgData:raze (enlist 122)cut rawData;
imgData:3 cut imgData;
`:image.bmp 1: header,imgData;
