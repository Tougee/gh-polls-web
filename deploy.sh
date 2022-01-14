rm -r dist
npm install
npm run build

rsync -rcv dist/* one@mixin-one:/home/one/mixin-polls-web/

# ssh one@mixin-one service nginx restart