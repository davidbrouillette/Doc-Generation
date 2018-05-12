"use strict";

const path = require("path");
const fs = require("fs");
/**
 * Object containing directions, files, and utilities
 * commonly used for the build process.
 * @class Paths
 */
class Paths {
    constructor(){
        /**
         * The file path for the '.env' file
         * @readonly
         * @memberof Paths
         */
        this.dotEnv = this.resolveApp(".env");
            
        /**
         * The file path for the 'lib' directory
         * @readonly
         * @memberof Paths
         */
        this.appBuild = this.resolveApp("lib");
        
        /**
         * The file path for the primary index.js file
         * @readonly
         * @memberof Paths
         */
        this.appIndexJs = this.resolveApp("src/index.js");
        
        /**
         * The file path for the node_modules directory
         * @readonly
         * @memberof Paths
         */
        this.appNodeModules = this.resolveApp("node_modules");
        
        /**
         * The file path for the package.json file
         * @readonly
         * @memberof Paths
         */
        this.appPackageJson = this.resolveApp("package.json");
        
        /**
         * The file path for the .babelrc.js file
         * @readonly
         * @memberof Paths
         */
        this.appBabelrc = this.resolveApp(".babelrc");
        
        /**
         * The file path for the 'src' directory
         * @readonly
         * @memberof Paths
         */
        this.appSrc = this.resolveApp("src");
        
        /**
         * The file path for the app root directory
         * @readonly
         * @memberof Paths
         */
        this.appRoot = fs.realpathSync(process.cwd());
            
    }
    /**
     * Resolves any relative path based on the app root directory
     * @param {string} relativePath 
     * @memberof Paths
     */
    resolveApp(relativePath){
        return path.resolve(fs.realpathSync(process.cwd()), relativePath);
    }

    fixPermissions(){
        fs.chmodSync( this.appRoot , 0o777);
    }

    static currentWorkingDirectory(){
        return fs.realpathSync(process.cwd());
    }

}

module.exports = Paths;

