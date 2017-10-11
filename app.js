const express = require('express');
const browserSync = require('browser-sync');
const app = express();

app.use(express.static('client'));
//app.use('/styles', express.static('styles'));
//app.use('/scripts', express.static('scripts'));

var bs = browserSync.create();

bs.init({
  proxy: "localhost:4000",
  files: ["client/**"]
});

app.listen(4000, function(){
  console.log('Server started at port 4000');
});
