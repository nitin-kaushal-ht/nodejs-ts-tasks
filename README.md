# Node.js & TypeScript Tasks

## Overview
This project consists of multiple tasks implemented in **Node.js** and **TypeScript**. It includes API calls, file operations, AWS infrastructure setup (mocked for local use), and Jest testing.

## Tasks Description

### **Task 1: Fetch Data from API**
- Calls a dummy API (`https://jsonplaceholder.typicode.com/todos`).
- Saves the response to `task1-output.json`.

### **Task 2: Fetch Data from Multiple APIs in Parallel**
- Calls two APIs in parallel.
- Saves the response to `task2-output.json`.

### **Task 3: File Operations**
- Reads, writes, updates, and deletes a file in three ways:
  - **Synchronous**
  - **Asynchronous (Promises)**
  - **Streams**

### **Task 4: Jest Testing**
- Uses **Jest** to test API calls and file operations.
- Mocks API responses for unit testing.

### **Task 5: AWS Infrastructure (Mocked for Local Testing)**
- Creates an AWS Lambda function (mocked for local execution).
- Sets up **DynamoDB, S3, and GraphQL (AppSync)**.
- Uses `aws-sdk-mock` to simulate AWS services locally.

### **Task 6: AWS Lambda Example with DynamoDB & GraphQL**
- Demonstrates Lambda interaction with **DynamoDB and GraphQL API** (mocked).
- Allows fetching data via a simulated GraphQL query.

### **Task 7: Lambda Calling GraphQL API**
- Calls the locally hosted GraphQL API.
- Fetches data using a GraphQL query.

---

## **Installation**
Ensure **Node.js** and **npm** are installed on your system.

1. **Clone the repository:**
   ```sh
   git clone https://github.com/your-repo/nodejs-ts-tasks.git
   cd nodejs-ts-tasks
   ```

2. **Install dependencies:**
   ```sh
   npm install
   ```

---

## **Running the Tasks**

### **Start GraphQL Server (Required for Task 6 & Task 7)**
```sh
npm run graphql
```

This will start a **local GraphQL server** on `http://localhost:4000/graphql`.

### **Run All Tasks Locally (After Starting GraphQL Server)**
```sh
npm run local
```

This will execute **Task 1, Task 2, Task 3**, and mock **Task 5, Task 6, and Task 7**.

### **Run Individual Tasks**
You can also run each task separately:

#### **Task 1 (Fetch Data from API)**
```sh
npm run dev src/tasks/task1.ts
```

#### **Task 2 (Fetch Multiple APIs in Parallel)**
```sh
npm run dev src/tasks/task2.ts
```

#### **Task 3 (File Operations - Sync, Async, Stream)**
```sh
npm run dev src/tasks/task3.ts
```

#### **Task 5 & Task 6 (AWS Infrastructure - Mocked Locally)**
```sh
npm run dev src/tasks/task5-stack.ts
npm run dev src/tasks/task6-stack.ts
```

#### **Task 7 (Lambda Calling GraphQL API)**
```sh
npm run dev src/lambda/task7-lambda.ts
```

---

## **Building & Running in Production**

### **Build the TypeScript Project**
```sh
npm run build
```

### **Start the Compiled JavaScript Project**
```sh
npm run start
```

---

## **Testing with Jest**
Run the Jest test suite:
```sh
npm test
```

For verbose output:
```sh
npm test -- --verbose
```

Run a specific test file:
```sh
jest tests/task4.test.ts
```

---

## **Project Structure**
```
/nodejs-ts-tasks
│── /src
│   ├── /tasks
│   │   ├── task1.ts  # Fetch API
│   │   ├── task2.ts  # Parallel API Calls
│   │   ├── task3.ts  # File Operations
│   │   ├── task4.test.ts  # Jest Tests
│   │   ├── task5-stack.ts  # AWS Infra (Mocked Locally)
│   │   ├── task6-stack.ts  # AWS Lambda Example
│   │   ├── task7-lambda.ts  # Lambda Calling GraphQL API
│   ├── /infra  # AWS Infrastructure Helpers
│   │   ├── aws-s3.ts
│   │   ├── aws-dynamodb.ts
│   │   ├── aws-lambda.ts
│   │   ├── aws-appsync.ts
│   ├── /lambda  # Lambda Function Code
│   │   ├── task7-lambda.ts
│   ├── /utils
│   │   ├── helpers.ts  # Utility Functions
│── /tests  # Jest Tests
│── graphql/schema.graphql  # GraphQL Schema
│── cdk.json  # AWS CDK Config
│── package.json  # Dependencies & Scripts
│── tsconfig.json  # TypeScript Config
│── jest.config.js  # Jest Config
│── README.md  # Documentation
```

---
