// ---------------------------------

// variables and prototypes
const express = require('express');
const path = require('path');
const app = express();
const port = process.env['PORT'] || 3000;

// https://stackoverflow.com/questions/6312993/javascript-seconds-to-time-string-with-format-hhmmss
String.prototype.toHHMMSS = function() {
  var sec_num = parseInt(this, 10);
  var hours = Math.floor(sec_num / 3600);
  var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
  var seconds = sec_num - (hours * 3600) - (minutes * 60);

  if (hours < 10) { hours = "0" + hours; }
  if (minutes < 10) { minutes = "0" + minutes; }
  if (seconds < 10) { seconds = "0" + seconds; }
  return hours + ':' + minutes + ':' + seconds;
}

// ---------

// server
app.use("/", express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  res.status(404).sendFile(`${process.cwd()}/public/404.html`)
})
 
app.listen(port, () => {
  setInterval(() => {
    console.clear();
    console.log(`Uptime: ${process.uptime().toString().toHHMMSS()}

online!
listening on port: ${port}

frontend:
http://localhost:${port}


replit url (if applicable):`)
    if (process.env.REPL_ID) {
      console.log(`https://${process.env.REPL_SLUG.toLowerCase()}.${process.env.REPL_OWNER.toLowerCase()}.repl.co/`)
    } else console.log(process.env.REPL_ID)
  }, 1000);
});