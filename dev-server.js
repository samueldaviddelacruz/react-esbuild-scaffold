require('dotenv').config()
const fs = require('fs/promises')
const {constants} = require('fs')
const express = require('express');
const nodemon = require('nodemon');

const open = require('open');
const compression = require('compression');
const path = require('path');
const port = process.env.PORT || 4200;
const app = express();

console.log("process.env.NODE_ENV",process.env.NODE_ENV)
if (process.env.NODE_ENV === "development") {
    let responseWritter;
    app.get('/files-changed', function (req, res) {
        res.writeHead(200, {
            'Content-Type': 'text/event-stream',
            'Cache-Control': 'no-cache',
            'Connection': 'keep-alive'
        })
        responseWritter = res;
    })

    nodemon({
        exec: 'npm run build:dev',
        ext: 'jsx css',
        ignore: 'build/*',
        watch: 'src'
    });

    nodemon.on('start', function () {
        console.log('App has started');

    }).on('quit', function () {
        console.log('App has quit');
        process.exit();
    }).on('restart', function (files) {
        console.log('App restarted due to: ', files);
        if (responseWritter) {
            setTimeout(() => {
                responseWritter.write(`data: ok\n\n`)
            }, 500)
        }
    });
}

app.use(compression())
// serve static assets normally
app.use(express.static('build'))

// handle every other route with index.html, which will contain
// a script tag to your application's JavaScript file(s).
app.get('*', function (request, response) {
    response.sendFile(path.resolve(__dirname, 'build', 'index.html'))
});

app.listen(port, async () => {
    if(process.env.NODE_ENV === "development"){
        try {
            await fs.copyFile('public/index.html', 'build/index.html', constants.COPYFILE_FICLONE);
            console.log('public/index.html was copied to build/index.html');
        } catch {
            console.log('The file could not be copied');
        }
    }
    console.log(`server started on port ${port}`);
    open(`http://localhost:${port}/`);
});
