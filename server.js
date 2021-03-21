
const express = require('express');
const compression = require('compression');
const path = require('path');
const port = process.env.PORT || 4200;
const app = express();


app.use(compression())
// serve static assets normally
app.use(express.static('build'))

// handle every other route with index.html, which will contain
// a script tag to your application's JavaScript file(s).
app.get('*', function (request, response) {
    response.sendFile(path.resolve(__dirname, 'build', 'index.html'))
});

app.listen(port, async () => {
    console.log(`server started on port ${port}`);
});
