/* eslint-env node */
module.exports = {
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/
            },
            {
                test: /\.worker\.ts$/,
                use: 'worker-loader'
            }
        ]
    },
    resolve: {
        extensions: [ '.ts', '.js' ]
    },
};
