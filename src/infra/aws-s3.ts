import AWS from "aws-sdk";
import * as s3 from "aws-cdk-lib/aws-s3";
import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import dotenv from "dotenv";

dotenv.config();

const s3Client = new AWS.S3({
  region: "us-east-1",
  endpoint: "http://localhost:4566",
  s3ForcePathStyle: true,
});

const BUCKET_NAME = "task-storage";

export class S3Helper {
  static createBucket(scope: Construct, id: string) {
    return new s3.Bucket(scope, id, {
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      autoDeleteObjects: true,
    });
  }
}

export const uploadFile = async (key: string, content: string) => {
  const params = {
    Bucket: BUCKET_NAME,
    Key: key,
    Body: content,
  };
  await s3Client.putObject(params).promise();
  return { message: `File ${key} uploaded successfully.` };
};

export const getFile = async (key: string) => {
  const params = {
    Bucket: BUCKET_NAME,
    Key: key,
  };
  const data = await s3Client.getObject(params).promise();
  return data.Body?.toString("utf-8");
};

export const deleteFile = async (key: string) => {
  const params = {
    Bucket: BUCKET_NAME,
    Key: key,
  };
  await s3Client.deleteObject(params).promise();
  return { message: `File ${key} deleted successfully.` };
};
