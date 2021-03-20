"use strict";
exports.__esModule = true;
var docker_1 = require("./docker");
var core = require("@actions/core");
var main = function () {
    var inputs = {
        serviceKeyJson: core.getInput("YANDEX_SERVICE_KEY_JSON", { required: true }),
        dockerContext: core.getInput("DOCKER_CONTEXT", { required: false }),
        dockerImageName: core.getInput("DOCKER_IMG_NAME", { required: true }),
        dockerImageTag: core.getInput("DOCKER_IMG_TAG", { required: false })
    };
    var imageTag = docker_1.createImageTag(inputs.dockerImageName, inputs.dockerImageTag);
    docker_1.login(inputs.serviceKeyJson);
    docker_1.build(inputs.dockerContext, imageTag);
    docker_1.push(imageTag);
};
main();
