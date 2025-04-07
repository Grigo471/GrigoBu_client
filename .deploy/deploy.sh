cd ~/griboo/client
npm run build:prod

rm -rf ~/../var/www/griboo/html
mv ~/griboo/client/build ~/../var/www/griboo/html