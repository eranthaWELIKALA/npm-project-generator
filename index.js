#!/usr/bin/env node
require('colors');
const readLineSync = require("readline-sync");
const path = require('path');
const fse = require('fs-extra');
const { exec } = require('child_process');

const NO_CHOICE_MADE = -1
const CURR_DIR = process.cwd();
const templatesDir = path.join(__dirname, 'templates')
const templates = fse.readdirSync(templatesDir)

if (!templates.length) {
    console.log('\nNo template to choose from , templates folder is empty'.yellow);
    process.exit(0)
}

const index = readLineSync.keyInSelect(templates)

if (index === NO_CHOICE_MADE) {
    process.exit(0);
}

const projectName = readLineSync.question('\nWhat is the name of your project? '.blue, {
    limit: input => input.trim().length > 0,
    limitMessage: '\nThe project has to have a name, try again'.yellow
});

const confirmCreateDirectory = readLineSync.keyInYN(`\nYou entered '${projectName}', create directory with this name?`.blue);

if (confirmCreateDirectory) {
    const template = templates[index];
    const source = path.join(templatesDir, template);
    const destination = path.join(CURR_DIR, projectName);
    fse.copy(source, destination)
        .then(() => {
            console.log(`\nSuccessfully created ${destination}`.green);
            
            console.log(`\nInstalling npm packages...`.magenta);            
            console.log(`\nPlease wait...`.magenta);
            exec('npm install', { cwd: destination }, (error, stdout, stderr) => {
                if (error) {
                    console.error(`\nError while running npm install: \n${error}`.red);
                    consolele.log('==================================================');
                    console.log('\n Please run below command to install npm packages manually.'.magenta);
                    console.log(`\n\tnpm install`);
                    console.log('\n Please run below command to rename the project manually.'.magenta);
                    console.log(`\n\tnpm pkg set name=${projectName}`);
                    consolele.log('==================================================');
                    return;
                }
                console.log(stdout);
                if (stderr) {
                    console.error(`\nnpm install stderr: \n${stderr}`);
                }

                updateProjectName(projectName, destination)
            });
        })
        .catch(err => console.error(err));
} else {
    console.log('\nAborted creating a new template'.red);
}


function updateProjectName(projectName, destination) {
    console.log(`\nRenaming project name...`.magenta);
    exec(`npm pkg set name=${projectName}`, { cwd: destination }, (error, stdout, stderr) => {
        if (error) {
            console.error(`\nError while setting package name: \n${error}`.red);
            consolele.log('==================================================');
            console.log('\n Please run below command to rename the project manually.'.magenta);
            console.log(`\n\tnpm pkg set name=${projectName}`);
            consolele.log('==================================================');
            return;
        }
        console.log(stdout);
        if (stderr) {
            console.error(`\nnpm pkg set name= stderr: \n${stderr}`);
        }
        console.log(`\nSuccessfully created project ${projectName}`.green);
    });
}