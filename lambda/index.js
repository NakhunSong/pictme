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
  const fitStyle = 'cover';

  try {
    const s3Object = await S3.getObject({
      Bucket,
      Key,
    }).promise();
    console.log('original', s3Object.Body.length);

    // resizing & s3 put object
    const resizedImageSmall = await Sharp(s3Object.Body)
      .resize(320, 320, {
        fit: fitStyle,
      })
      .toFormat(requireFormat)
      .toBuffer(); // such as 010111.
    console.log('resize', resizedImageSmall);

    const resizedImageBig = await Sharp(s3Object.Body)
      .resize(640, 640, {
        fit: fitStyle,
      })
      .toFormat(requireFormat)
      .toBuffer(); // such as 010111.
    console.log('resize', resizedImageBig);
    
    await S3.putObject({
      Bucket,
      Key: `thumbnail_small/${filename}`, // resizing 된 데이터는 thumb(썸네일) 폴더에 넣을 것이다.
      Body: resizedImageSmall,
    }).promise();
    console.log('putSmall');
    await S3.putObject({
      Bucket,
      Key: `thumbnail_big/${filename}`, // resizing 된 데이터는 thumb(썸네일) 폴더에 넣을 것이다.
      Body: resizedImageBig,
    }).promise();
    console.log('putBig');

    return callback(null, `Success: ${filename}`);
  } catch (e) {
    console.error(e);
    return callback(e);
  }
};