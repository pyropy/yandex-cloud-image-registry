import { exec, spawnSync } from "child_process";

const createImageTag = (name: string, tag: string): string => {
  return `cr.yandex/${name}/${tag}`
}

const login = (key: string) => {

  const command = spawnSync(
    'docker', ['login', '--username', 'json_key', '--password-stdin', 'cr.yandex'], {input: key}
  )

  if (command.stdout) {
    console.log(command.stdout);
  }

  if (command.stderr) {
    console.error('Error occured while trying to login to image repository.')
  }

};

const build = (ctx: string, tag: string) => {
  exec(`docker build -t ${tag} ${ctx}`, (error, stdout, stderr) => {
    if (error) {
      console.log(`error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.log(`stderr: ${stderr}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
  });
};

const push = (tag: string) => {
  exec(`docker push ${tag}`, (error, stdout, stderr) => {
    if (error) {
      console.log(`error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.log(`stderr: ${stderr}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
  });
};

export { login, build, push, createImageTag };
