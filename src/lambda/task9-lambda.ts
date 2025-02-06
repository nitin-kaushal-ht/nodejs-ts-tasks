import { uploadFile, getFile, deleteFile } from "../infra/aws-s3";

export const handler = async (event: any) => {
  try {
    switch (event.action) {
      case "upload":
        return await uploadFile(event.key, event.content);
      case "fetch":
        return await getFile(event.key);
      case "delete":
        return await deleteFile(event.key);
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
    console.log("Uploading File...");
    await uploadFile("sample.txt", "Hello, S3!");
    console.log("Fetching File...");
    console.log(await getFile("sample.txt"));
    console.log("Deleting File...");
    await deleteFile("sample.txt");
  })();
}
