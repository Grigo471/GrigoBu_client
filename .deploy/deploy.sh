cd ~/GrigoBu_client
npm run build:prod

rm -rf ~/../var/www/griboo/html
mv ~/GrigoBu_client/build ~/../var/www/griboo/html