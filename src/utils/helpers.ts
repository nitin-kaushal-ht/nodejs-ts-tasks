import axios from "axios";
import fs from "fs";
import path from "path";

type ApiResponse = {
  userId: number;
  id: number;
  title: string;
  completed?: boolean;
};

export async function fetchData(url: string): Promise<ApiResponse[]> {
  try {
    const response = await axios.get<ApiResponse[]>(url);
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch data from ${url}:`, error);
    throw new Error("Error fetching data");
  }
}

export function saveDataToFileOld(data: any, filename: string): void {
  const filePath = path.join(__dirname, filename);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
  console.log(`Data saved at ${filePath}`);
}

export const saveDataToFile = (data: any, filename: string) => {
  const outputFile = path.resolve(process.cwd(), filename); 
  fs.writeFileSync(outputFile, JSON.stringify(data, null, 2), 'utf-8');
  console.log(`✅ File Created: ${outputFile}`);
};