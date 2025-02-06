import { fetchData, saveDataToFile } from "../utils/helpers";
import { API_URLS } from "../utils/constants";
import path from "path";

const outputFile = "task2-output.json";

export async function task2() {
  try {
    const responses = await Promise.all(API_URLS.map(fetchData));
    const result = Object.fromEntries(
      API_URLS.map((url, index) => [url, responses[index]])
    );
    saveDataToFile(result, outputFile);
  } catch (error) {
    console.error("Error in Task 2:", error);
  }
}
