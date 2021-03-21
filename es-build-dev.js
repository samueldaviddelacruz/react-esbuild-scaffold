require('esbuild').build({
    entryPoints: ['src/app.jsx'],
    bundle: true,
    loader:{
        ".png":"dataurl",
        ".jpg":"dataurl",
    },
    define:{
        "process.env.NODE_ENV": `"development"`
    },
    outfile: 'build/out.js',
  }).catch(() => process.exit(1))