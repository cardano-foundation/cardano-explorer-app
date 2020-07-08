const fs = require('fs');
const AWS = require('aws-sdk');
const readdir = require('recursive-readdir');
const mime = require('mime-types');

module.exports = async function deploy() {
  const requiredEnvs = [
    'AWS_ACCESS_KEY_ID',
    'AWS_SECRET_ACCESS_KEY',
    'AWS_DEFAULT_REGION',
    'BUCKET'
  ];

  requiredEnvs.forEach(env => {
    const val = process.env[env];
    if (!val) {
      throw new Error(`Missing ${env} from the environment`);
    }
    console.log(`${env} = ${val}`);
  });

  const targetBucket = process.env.BUCKET

  const uploadFolder = './build/static';
  const s3 = new AWS.S3();

  const filesToUpload = await readdir(uploadFolder);

  console.log(`Uploading to S3 bucket: ${targetBucket}`);

  return filesToUpload.map(async (file) => {
    const key = file.replace('build/static/', '');
    const fileBuffer = fs.readFileSync(file);

    return s3.upload({
      Key: key,
      Bucket: targetBucket,
      Body: fileBuffer,
      ContentType: mime.lookup(key) || 'application/octet-stream'
    }).promise();
  })
};
