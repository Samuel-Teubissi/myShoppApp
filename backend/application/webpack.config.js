const path = require('path');

module.exports = {
    entry: './assets/js/app.jsx',  // Ton fichier principal
    output: {
        path: path.resolve(__dirname, 'assets/js'), // Le répertoire de sortie
        filename: 'app.bundle.js', // Le nom du fichier compilé
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/, // Appliquer Babel aux fichiers .js et .jsx
                exclude: /node_modules/, // Ne pas appliquer Babel aux fichiers dans node_modules
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react'], // Utiliser Babel pour transpiler le JS et JSX
                    },
                },
            },
        ],
    },
    resolve: {
        extensions: ['.js', '.jsx'], // Permet à Webpack de résoudre les fichiers .js et .jsx
    }
    // ,
    // devServer: {
    //     contentBase: path.join(__dirname, 'dist'),
    //     compress: true,
    //     port: 9000, // Tu peux changer le port si nécessaire
    // }
};
