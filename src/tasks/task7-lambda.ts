import AWS from "aws-sdk";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const GRAPHQL_API_URL = process.env.GRAPHQL_API_URL || "";
const API_KEY = process.env.API_KEY || "";

export const handler = async (event: any) => {
  console.log("Received event:", JSON.stringify(event, null, 2));

  try {
    const query = `
            query {
                fetchData {
                    id
                    title
                    completed
                }
            }
        `;

    const response = await axios.post(
      GRAPHQL_API_URL,
      { query },
      {
        headers: {
          "x-api-key": API_KEY,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("GraphQL Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error calling GraphQL API:", error);
    throw new Error("Failed to fetch data from GraphQL API");
  }
};

if (require.main === module) {
  handler({}).then((response) => {
      console.log('Lambda executed successfully:', response);
  }).catch((error) => {
      console.error('Lambda execution failed:', error);
  });
}