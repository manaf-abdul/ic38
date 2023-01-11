import aws from 'aws-sdk'
import multer from 'multer'
import multerS3 from 'multer-s3'
import path from 'path'
import dotenv from 'dotenv'
dotenv.config()

const s3=new aws.S3({accessKeyId:process.env.Access_Key_ID,secretAccessKey: process.env.Secret_Access_Key, Bucket: process.env.BUCKET_NAME })

const getFileKey = (file, folder) => {
    if (!file) return false;
    const name = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) + path.extname(file.originalname);
    return `${folder}/${name}`;
  };

  const s3Storage = multerS3({
    s3: s3,
    bucket: process.env.BUCKET_NAME,
    acl: "public-read",
    metadata: (req, file, callBack) => callBack(null, { fieldName: file.fieldname }),
    contentType: multerS3.AUTO_CONTENT_TYPE,
    serverSideEncryption: "AES256",
    cacheControl: "max-age=31536000",
    key: (req, file, cb) => cb(null, getFileKey(file, "user"))
  });
  export const s3UserStorage= multer({ storage: s3Storage });
