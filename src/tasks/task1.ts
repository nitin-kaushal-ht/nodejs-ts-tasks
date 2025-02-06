import { fetchData, saveDataToFile } from "../utils/helpers";
import { API_URLS } from "../utils/constants";
import path from "path";

const outputFile = "task1-output.json";

export async function task1() {
  const apiUrl = API_URLS[0];

  try {
    const data = await fetchData(apiUrl);
    console.log("Data fetched successfully:", data.slice(0, 5));
    saveDataToFile(data, outputFile);
  } catch (error) {
    console.error("Error in Task 1:", error);
  }
}
