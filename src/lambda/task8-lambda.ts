import {
  createTask,
  getTask,
  updateTask,
  deleteTask,
} from "../infra/aws-dynamodb";

export const handler = async (event: any) => {
  try {
    switch (event.action) {
      case "create":
        return await createTask(event.data);
      case "read":
        return await getTask(event.id);
      case "update":
        return await updateTask(event.id, event.data);
      case "delete":
        return await deleteTask(event.id);
      default:
        return { error: "Invalid action" };
    }
  } catch (error) {
    console.error("Error processing request:", error);
    return { error: "Failed to process request" };
  }
};

if (require.main === module) {
  (async () => {
    console.log("Creating Task...");
    await createTask({ id: "1", title: "Sample Task", completed: false });
    console.log("Reading Task...");
    console.log(await getTask("1"));
    console.log("Updating Task...");
    await updateTask("1", { completed: true });
    console.log("Deleting Task...");
    await deleteTask("1");
  })();
}
