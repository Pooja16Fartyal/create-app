const fs = require('fs');
const Hapi = require('@hapi/hapi');
 
exports.startServer = function () {
    // Get base folder, based on the node_modules folder this code executes at
    var baseDir = process.cwd();
    var pathToApiDir = baseDir + '/src/api/';
   try {
    fs.readdir(pathToApiDir, async (err, files) => {
        let routes = [];

        files.forEach((api) => {
            var apiFolder = pathToApiDir + api;
            let pkg = JSON.parse(fs.readFileSync(`${apiFolder}/package.json`))
            let mainFile = pkg.main;
            let fileRoute = require(`${apiFolder}/${mainFile}`).routes;
            routes = routes.concat(fileRoute);
        })
        
        const server = Hapi.server({
            port: process.env.FRAMEWORK_PORT,
            host: process.env.FRAMEWORK_HOST
        });
        routes.forEach((route) => {
            server.route(route);
        })
        await server.start();
        console.log('Server running on %s', server.info.uri);
        return routes;
    });
   } catch (e) {
         console.warn('Error: ' + e.message)
   }
    
 
  
}
