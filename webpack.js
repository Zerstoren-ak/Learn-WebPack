const webpack = require('webpack');
const path = require('path');

const compiler = webpack({
    mode: "production",
    entry: "./src/js/app.js",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js"
    }
});

const watching = compiler.watch({
    // Example watchOptions
    aggregateTimeout: 300,
    poll: undefined
}, (err, stats) => { // Stats Object
                     // Print watch/build result here...
    console.log(stats);
});
