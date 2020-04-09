export default function getAppEnvVars(env, prefix = 'LIT_APP_') {
  return Object.keys(env).reduce((appEnvs, key) => {
    if (key.startsWith(prefix)) {
      appEnvs[`process.env.${key.slice(prefix.length)}`] = JSON.stringify(env[key]);
    }
    return appEnvs;
  }, {});
}
