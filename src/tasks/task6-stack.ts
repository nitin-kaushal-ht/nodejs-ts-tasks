import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import { InfraStack } from "../infra/infra-stack";

export class Task6Stack extends InfraStack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, { ...props, stackName: "Task6" });
  }
}
