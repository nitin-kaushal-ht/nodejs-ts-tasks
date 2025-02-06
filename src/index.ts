import { task1 } from './tasks/task1';
import { task2 } from './tasks/task2';
import { fileOperations } from './tasks/task3';
import * as cdk from 'aws-cdk-lib';
import { Task5Stack } from './tasks/task5-stack';
import { Task6Stack } from './tasks/task6-stack';
import { handler as task7LambdaHandler } from './tasks/task7-lambda';
import { executeTask8 } from "./tasks/task8";


async function runTasks() {
    console.log('Executing Task 1...');
    await task1();

    console.log('\nExecuting Task 2...');
    await task2();

    console.log('\nExecuting Task 3...');
    const testFile = 'testFile.txt';
    const testContent = 'Sample content for testing.';
    fileOperations.sync(testFile, testContent);
    await fileOperations.async(testFile, testContent);
    fileOperations.stream(testFile, testContent);

    console.log('\nExecuting Task 7 (Lambda calling GraphQL)...');
    await task7LambdaHandler({});

    console.log('\nExecuting Task 8...');
    await executeTask8();
}

function deployAWSInfra() {
    console.log('\nDeploying Task-5 and Task-6 AWS Infrastructure...');
    const app = new cdk.App();
    new Task5Stack(app, 'Task5InfraStack');
    new Task6Stack(app, 'Task6InfraStack');
    app.synth();
}

(async () => {
    await runTasks();
    //deployAWSInfra();
})();
