const { exec, popd, pushd } = require('shelljs');


const execInDir = (dir, command) => {
  pushd(dir);
  const output = exec(command);
  popd();

  return output;
};


const getServerlessInfo = (dir) => {
  const stage = process.env.STAGE ? `--stage=${process.env.STAGE}` : '';
  const output = execInDir(dir, `sls info -v ${stage}`);
  return output.split('\n');
};

const objectToIni = (obj) =>
  Object.entries(obj).map(([k, v]) => `${k}=${v}`).join('\n')

const extractPiece = output => piece => output
  .find(line => line.startsWith(`${piece}: `))
  .replace(`${piece}: `, '')
  .trim();

const main = async () => {
  const getBackInfo = extractPiece(getServerlessInfo('../back'));
  const env = {
    ...process.env,
    REACT_APP_REGION: getBackInfo('region'),
    REACT_APP_BACKEND_URL: getBackInfo('ServiceEndpoint'),
    REACT_APP_USER_POOL_ID: getBackInfo('UserPoolId'),
    REACT_APP_IDENTITY_POOL_ID: getBackInfo('IdentityPoolId'),
    REACT_APP_APP_CLIENT_ID: getBackInfo('UserPoolClientId'),
    // REACT_APP_STORAGE_BUCKET: getFromPhotos('S3BucketPhotosArn').split(':::')[1],
  };
  const command = process.argv.slice(2).join(' ')
  await exec(command, { env })
}

main().then(() => console.log('done'))
