import { exec } from "@actions/exec";
import * as core from "@actions/core";

type ActionInputs = {
  serviceKeyJson: string;
  imgRegistryID: string;
  dockerContext: string;
  dockerImageName: string;
  dockerImageTag: string;
};

const createImageTag = (
  imgRegistryID: string,
  name: string,
  tag: string
): string => {
  return `cr.yandex/${imgRegistryID}/${name}:${tag}`;
};

const login = async (key: string) => {
  const keyBuffer = Buffer.from(key);
  await exec(
    "docker",
    ["login", "--username", "json_key", "--password-stdin", "cr.yandex"],
    { input: keyBuffer }
  ).catch(() => console.error("Failed logging in to Container Registry"));
};

const build = async (ctx: string, tag: string) => {
  await exec(`docker build -t ${tag} ${ctx}`).catch((error) =>
    console.error(error)
  );
};

const push = async (tag: string) => {
  await exec(`docker push ${tag}`).catch((error) => console.error(error));
};

const main = async () => {
  const inputs: ActionInputs = {
    serviceKeyJson: core.getInput("YC_SERVICE_ACCOUNT_KEY_FILE", {
      required: true,
    }),
    imgRegistryID: core.getInput("YC_IMG_REGISTRY_ID", { required: true }),
    dockerContext: core.getInput("DOCKER_CONTEXT", { required: false }),
    dockerImageName: core.getInput("DOCKER_IMG_NAME", { required: true }),
    dockerImageTag: core.getInput("DOCKER_IMG_TAG", { required: false }),
  };

  const imageTag = createImageTag(
    inputs.imgRegistryID,
    inputs.dockerImageName,
    inputs.dockerImageTag
  );
  await login(inputs.serviceKeyJson);
  await build(inputs.dockerContext, imageTag);
  await push(imageTag);
};

main();
