const fs = require('fs')
const AWS = require('aws-sdk')
const readdir = require('recursive-readdir')
const mime = require('mime-types')

module.exports = async function upload() {
  const awsEnv = ['AWS_ACCESS_KEY_ID', 'AWS_SECRET_ACCESS_KEY', 'BUCKET']
  if (!process.env['AWS_ACCESS_KEY_ID'] || !process.env['AWS_SECRET_ACCESS_KEY']) {
    throw new Error('AWS creds missing')
  }

  const targetBucket = process.env['BUCKET']
  if (!targetBucket) {
    throw new Error('Bucket to upload not set')
  }

  console.log(`Uploading to S3 bucket: ${targetBucket}`)

  const uploadFolder = './build/static'
  const s3 = new AWS.S3({
    region: 'ap-southeast-2'
  })

  const filesToUpload = await readdir(uploadFolder)
  return filesToUpload.map(async (file) => {
    const key = file.replace('build/static/', '')
    const fileBuffer = fs.readFileSync(file)

    return s3.upload({
      Key: key,
      Bucket: targetBucket,
      Body: fileBuffer,
      ContentType: mime.lookup(key) || 'application/octet-stream'
    }).promise()
  })
}