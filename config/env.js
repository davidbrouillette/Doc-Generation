'use strict';

const dotEnv = require('dotenv');
const dotEnvExpand = require('dotenv-expand');

/**
 * Static object containing utility methods for environment setup
 * @class Env
 */
class Env {
    /**
     * Sets defaults for environment and loads .env files
     * @param {string} envFilePath 
     * @memberof Env
     */
    static setupEnvironment(envFilePath){
        this.determineNodeBabelEnvs();
        this.getEnvironmentVariables(envFilePath);
    }

    /**
     * Get environment variables from .env file & expand if needed
     * 
     * @static
     * @param {string} envPath 
     * @memberof Env
     */
    static getEnvironmentVariables(envPath) {
        dotEnvExpand(dotEnv.config({path: envPath}));
    }

    /**
     * Keeps NODE_ENV and BABEL_ENV in sync.
     * Defaults NODE_ENV to "development" if it's not set
     * @static
     * @memberof Env
     */
    static determineNodeBabelEnvs(){
        if (!process.env.NODE_ENV) {
            process.env.NODE_ENV = "development";
        }
        process.env.BABEL_ENV = process.env.NODE_ENV;
    }

}


module.exports = Env;



