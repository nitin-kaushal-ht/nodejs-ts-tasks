import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import { S3Helper } from "./aws-s3";
import { DynamoDBHelper } from "./aws-dynamodb";
import { LambdaHelper } from "./aws-lambda";
import { AppSyncHelper } from "./aws-appsync";

export interface InfraStackProps extends cdk.StackProps {
  stackName: string;
}

export class InfraStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: InfraStackProps) {
    super(scope, id, props);

    const bucket = S3Helper.createBucket(this, `${props.stackName}-Bucket`);
    const table = DynamoDBHelper.createTable(this, `${props.stackName}-Table`);
    const lambdaFunction = LambdaHelper.createLambda(
      this,
      `${props.stackName}-Lambda`,
      table.tableName,
      bucket.bucketName
    );
    AppSyncHelper.createGraphQLAPI(
      this,
      `${props.stackName}-GraphQLAPI`,
      lambdaFunction
    );
  }
}
