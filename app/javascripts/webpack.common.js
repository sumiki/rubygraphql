const path = require('path');
const fs = require('fs');

var entries = ( () => {
    var entries = {}
    var readDir = (dirpath) => {
        fs.readdirSync(dirpath).forEach((file, i) => {
            
            if( fs.lstatSync( `${dirpath}/${file}` ).isDirectory() ){
                readDir( `${dirpath}/${file}` )
            } else {
                if( file.indexOf('js') > -1 && file.indexOf('_') !== 0 ){
                    let dir_name = dirpath.split('packs/')[1]
                    
                    var filename = (file.replace(/\.[^/.]+$/, ""))
                    if( dir_name ){
                        filename = `${dir_name}/${(file.replace(/\.[^/.]+$/, ""))}`
                    }
                    
                    entries[filename] = `${dirpath}/${file}`
                }
            }
        })
    }
    
    const dirpath = './app/javascripts/packs'
    readDir( dirpath )
    return entries
} )()

module.exports = {
    entry: entries,
    output: {
        filename: '[name].js',
        path: path.resolve('./public', 'packs')
    },
    resolve: {
        modules: [
            'node_modules',
            '.'
        ]
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: [
                        'react',
                        'env'
                    ],
                    plugins: [
                        "syntax-dynamic-import",
                        "transform-object-rest-spread",
                        [
                            "transform-class-properties",
                            {
                                "spec": true
                            }
                        ]
                    ]
                }
            }
        ]
    }
}