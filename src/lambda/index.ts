import AWS from "aws-sdk";
import awsMock from "aws-sdk-mock";

const isLocal = process.env.LOCAL === "true";

if (isLocal) {
  awsMock.mock("DynamoDB.DocumentClient", "scan", (params, callback) => {
    callback(null, {
      Items: [{ id: "1", title: "Test Item", completed: false }],
    });
  });
}

const dynamoDB = isLocal
  ? new AWS.DynamoDB.DocumentClient()
  : new AWS.DynamoDB.DocumentClient();

export async function handler(event: any) {
  if (event.info?.fieldName === "fetchData") {
    return await getData();
  }
}

async function getData() {
  const params = { TableName: "MockTable" };
  const data = await dynamoDB.scan(params).promise();
  return data.Items || [];
}
