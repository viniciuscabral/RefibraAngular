const webpack = require('webpack');

module.exports = {
    plugins: [
        new webpack.DefinePlugin({
            $ENV: {
                ENVIRONMENT: JSON.stringify(process.env.ENVIRONMENT),
                BACKEND_API_FUSEKI_URL: JSON.stringify(process.env.BACKEND_API_FUSEKI_URL),
                IMAGES_PATH: JSON.stringify(process.env.IMAGES_PATH)
            }
        })
    ]
};