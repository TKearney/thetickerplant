h:hopen `:thetickerplant.com:5001:username:password
time:.z.p;
.z.ts:{system"raspistill -o ../../pictures/test.jpg -w 640 -h 480";system"scp -i TestSystem.pem ../../pictures/test.jpg ec2-user@thetickerplant.com:thetickerplant/server/ttpApp/public/test.jpg";system"raspiyuv -o ../../test -w 640 -h 480 -rgb -vf";h(`.u.upd;(`images;(.z.n;`chili1;read1`:../../test;0i)))};
\t 60000
