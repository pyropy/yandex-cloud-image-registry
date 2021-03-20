"use strict";
exports.__esModule = true;
exports.createImageTag = exports.push = exports.build = exports.login = void 0;
var child_process_1 = require("child_process");
var createImageTag = function (name, tag) {
    return "cr.yandex/" + name + "/" + tag;
};
exports.createImageTag = createImageTag;
var login = function (key) {
    var command = child_process_1.spawnSync('docker', ['login', '--username', 'json_key', '--password-stdin', 'cr.yandex'], { input: key });
    if (command.stdout) {
        console.log(command.stdout);
    }
    if (command.stderr) {
        console.error('Error occured while trying to login to image repository.');
    }
};
exports.login = login;
var build = function (ctx, tag) {
    child_process_1.exec("docker build -t " + tag + " " + ctx, function (error, stdout, stderr) {
        if (error) {
            console.log("error: " + error.message);
            return;
        }
        if (stderr) {
            console.log("stderr: " + stderr);
            return;
        }
        console.log("stdout: " + stdout);
    });
};
exports.build = build;
var push = function (tag) {
    child_process_1.exec("docker push " + tag, function (error, stdout, stderr) {
        if (error) {
            console.log("error: " + error.message);
            return;
        }
        if (stderr) {
            console.log("stderr: " + stderr);
            return;
        }
        console.log("stdout: " + stdout);
    });
};
exports.push = push;
