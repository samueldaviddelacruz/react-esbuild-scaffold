const fs = require('fs/promises')
const { constants } = require('fs')
require('esbuild').build({
    entryPoints: ['src/app.jsx'],
    bundle: true,
    minify: true,
    loader: {
        ".png": "dataurl",
        ".jpg": "dataurl",
    },
    define: {
        "process.env.NODE_ENV": `"production"`
    },
    outfile: 'build/out.js',
}).then(async () => {
    try {
        await fs.copyFile('public/index.html', 'build/index.html', constants.COPYFILE_FICLONE);
    } catch {
        console.log('The file could not be copied');
    }
}).catch(() => process.exit(1))