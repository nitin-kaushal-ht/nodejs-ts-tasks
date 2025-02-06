import { handler as task8LambdaHandler } from "../lambda/task8-lambda";

export const executeTask8 = async () => {
  console.log("Executing Task 8 (DynamoDB CRUD)...");

  await task8LambdaHandler({ action: "create", data: { id: "1", title: "Test Task", completed: false } });
  console.log("Task Created.");

  const task = await task8LambdaHandler({ action: "read", id: "1" });
  console.log("Read Task:", task);

  await task8LambdaHandler({ action: "update", id: "1", data: { completed: true } });
  console.log("Task Updated.");

  await task8LambdaHandler({ action: "delete", id: "1" });
  console.log("Task Deleted.");

  console.log("Task 8 Execution Completed.");
};
