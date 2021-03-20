import {
  login as dockerLogin,
  build as dockerBuild,
  push as dockerPush,
  createImageTag,
} from "./docker";

import * as core from "@actions/core";

type ActionInputs = {
  serviceKeyJson: string,
  dockerContext: string,
  dockerImageName: string,
  dockerImageTag: string,
};

const main = () => {

  const inputs: ActionInputs = {
    serviceKeyJson: core.getInput("YANDEX_SERVICE_KEY_JSON", {required: true}),
    dockerContext: core.getInput("DOCKER_CONTEXT", { required: false }),
    dockerImageName: core.getInput("DOCKER_IMG_NAME", { required: true }),
    dockerImageTag: core.getInput("DOCKER_IMG_TAG", { required: false }),
  };

  const imageTag = createImageTag(inputs.dockerImageName, inputs.dockerImageTag)

  dockerLogin(inputs.serviceKeyJson);
  dockerBuild(inputs.dockerContext, imageTag)
  dockerPush(imageTag)
};

main();
