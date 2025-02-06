import { handler as task9LambdaHandler } from "../lambda/task9-lambda";

export const executeTask9 = async () => {
  console.log("Executing Task 9 (S3 Storage)...");

  await task9LambdaHandler({
    action: "upload",
    key: "sample.txt",
    content: "Hello, S3!",
  });
  console.log("File Uploaded.");

  const fileContent = await task9LambdaHandler({
    action: "fetch",
    key: "sample.txt",
  });
  console.log("Fetched File Content:", fileContent);

  await task9LambdaHandler({ action: "delete", key: "sample.txt" });
  console.log("File Deleted.");

  console.log("Task 9 Execution Completed.");
};
