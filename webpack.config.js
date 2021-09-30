const CompressionPlugin = require("compression-webpack-plugin");
const zlib = require("zlib");

module.exports = {
    mode: "production", // production or development
    entry: './htdocs/src/application.js' ,
    output: { path: __dirname + "/htdocs/bundle" , filename: "application.bundle.js" },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: [
                    {
                        loader: "babel-loader",
                        options: {
                            presets: [
                                "@babel/preset-env",
                            ],
                        },
                    },
                ],
            },
        ],
    },
    target: ["web", "es5"],
    plugins: [
        new CompressionPlugin({
            filename: "[path][base].brotli",
            algorithm: "brotliCompress",
            test: /\.js$/,
            compressionOptions: {
                params: {
                    [zlib.constants.BROTLI_PARAM_QUALITY]: zlib.constants.BROTLI_MAX_QUALITY,
                },
            },
        })
    ]
};
