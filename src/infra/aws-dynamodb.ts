import AWS from "aws-sdk";
import * as dynamodb from "aws-cdk-lib/aws-dynamodb";
import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import dotenv from "dotenv";

dotenv.config();

const dynamoDB = new AWS.DynamoDB.DocumentClient({
  region: "us-east-1",
  endpoint: "http://localhost:8000", 
});

const TABLE_NAME = "Tasks";

export class DynamoDBHelper {
  static createTable(scope: Construct, id: string) {
    return new dynamodb.Table(scope, id, {
      partitionKey: { name: "id", type: dynamodb.AttributeType.STRING },
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });
  }
}

export const createTask = async (task: { id: string; title: string; completed: boolean }) => {
  const params = {
    TableName: TABLE_NAME,
    Item: task,
  };
  await dynamoDB.put(params).promise();
  return task;
};

export const getTask = async (id: string) => {
  const params = {
    TableName: TABLE_NAME,
    Key: { id },
  };
  const result = await dynamoDB.get(params).promise();
  return result.Item;
};

export const updateTask = async (id: string, updates: Partial<{ title: string; completed: boolean }>) => {
  const params = {
    TableName: TABLE_NAME,
    Key: { id },
    UpdateExpression: "set title = :title, completed = :completed",
    ExpressionAttributeValues: {
      ":title": updates.title || "",
      ":completed": updates.completed || false,
    },
    ReturnValues: "UPDATED_NEW",
  };
  const result = await dynamoDB.update(params).promise();
  return result.Attributes;
};

export const deleteTask = async (id: string) => {
  const params = {
    TableName: TABLE_NAME,
    Key: { id },
  };
  await dynamoDB.delete(params).promise();
  return { message: "Task deleted" };
};
