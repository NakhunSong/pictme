const AWS = require('aws-sdk');
const Sharp = require('sharp');

const S3 = new AWS.S3({ region: 'ap-northeast-2' });

const transforms = [
  { name: 'thumbnail_small', size: 320 },
  { name: 'thumbnail_big', size: 640 },
];

exports.handler = async (event, context, callback) => {
  const Bucket = event.Records[0].s3.bucket.name; // pictme
  const Key = event.Records[0].s3.object.key; // 파일 경로(파일명 포함)
  const filename = Key.split('/')[Key.split('/').length - 1]; // ['directoryname', 'filename']
  const ext = Key.split('.')[Key.split('.').length - 1]; // jpg, png, ...
  console.log(Bucket, Key, filename, ext);
  const requireFormat = ext === 'jpg' ? 'jpeg' : ext;

  try {
    const s3Object = await S3.getObject({
      Bucket,
      Key,
    }).promise();
    console.log('original', s3Object.Body.length);

    // resizing & s3 put object
    await Promise.all(
      transforms.map(async item => {
        const resizedImage = await Sharp(s3Object.body)
          .resize(item.size, item.size, {
            fit: 'inside',
          })
          .toFormat(requireFormat)
          .toBuffer();
        return await S3.putObject({
          Bucket,
          Key: `${item.name}/${filename}`,
          Body: resizedImage,
        }).promise();
      })
    );
    console.log('put');

    return callback(null, `Success: ${filename}`);
  } catch (e) {
    console.error(e);
    return callback(e);
  }
};