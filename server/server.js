const Koa = require('koa');
const cors = require('koa2-cors');
const app = new Koa();

const recommend = require('./routers/recommend');
const singer = require('./routers/singer');
const song = require('./routers/song');
const search = require('./routers/search');
const rank = require('./routers/rank');

app.use(cors({
    origin: 'http://localhost:8080'
}));


app.use(recommend.routes(), recommend.allowedMethods());
app.use(singer.routes(), singer.allowedMethods());
app.use(song.routes(), song.allowedMethods());
app.use(search.routes(), search.allowedMethods());
app.use(rank.routes(), rank.allowedMethods());

app.listen(3000);