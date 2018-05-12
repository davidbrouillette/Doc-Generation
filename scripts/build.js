"use strict";

// Makes the script crash on unhandled rejections instead of silently
// ignoring them. In the future, promise rejections that are not handled will
// terminate the Node.js process with a non-zero exit code.
process.on("unhandledRejection", (err) => {
    console.error(err);
    process.exit(1);
});

process.on("uncaughtException", (err) => {
    console.error(err);
    process.exit(1);
});


const Paths = require("../config/paths");
const Env = require("../config/env");
const fs = require("fs-extra");
const path = require("path");
const chalk = require("chalk");
const babel = require("@babel/core");
const formatConsoleOutput = require("./consoleOutput");


class Build {
    constructor(LocalPaths){
        
        this.appSrc = LocalPaths.appSrc;
        this.appBuild = LocalPaths.appBuild;
        this.appRoot = LocalPaths.appRoot;
        this.fileFilters = [];
        this.dirFilters = [];
    }

    build(){
        return new Promise((resolve, reject) =>{
            formatConsoleOutput(`Clearing Directory '${this.appBuild}'`, "info");
            this.cleanDirectory(this.appBuild);
            
            formatConsoleOutput("Compiling Files", "info");
            this.compileFiles(resolve);
            
        });
    }


    cleanDirectory(dir){
        if(fs.existsSync(dir)){
            fs.emptyDirSync(dir);
        }
    }

    compileFiles(resolve) {
        var dirContents = fs.readdirSync(this.appSrc);
        
        dirContents.forEach((fileName, index, arr) => {
            var filePathAndName = path.resolve(this.appSrc, fileName);
            
            var stat = fs.lstatSync(filePathAndName);
            
            if(stat && stat.isDirectory()){
                this.compileFiles();
            } else if (stat && stat.isFile()){
                this.compile(fileName, filePathAndName, ()=> {});
            }
            
        });

        resolve();
    }


    compile(fileName, filePath, cb){
        try{
            let results = babel.transformFileSync(filePath, {babelrc:true}); 

            if(results && results.code){
                fs.outputFileSync(path.resolve(this.appBuild, fileName), results.code);    
                console.log(chalk.green(`${fileName} compiled`));
            }
        } catch(e){
            console.error(err);
        }
        
    }

}



async function runBuildProcess(){
    formatConsoleOutput("SETUP: Setting up Paths", "info");

    const LocalPaths = new Paths();    
    LocalPaths.fixPermissions();
    
    formatConsoleOutput("SETUP: Setting up Environment", "info");
    Env.setupEnvironment(LocalPaths.dotEnv);

    formatConsoleOutput("BUILD: Starting Build", "info");
    const BabelBuild = new Build(LocalPaths);
    await BabelBuild.build();
    
}

runBuildProcess();
formatConsoleOutput("Compiled and Bundled successfully", "success");
