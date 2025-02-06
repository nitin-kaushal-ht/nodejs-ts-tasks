import * as appsync from "aws-cdk-lib/aws-appsync";
import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";

import * as lambda from "aws-cdk-lib/aws-lambda";

export class AppSyncHelper {
  static createGraphQLAPI(
    scope: Construct,
    id: string,
    lambdaFunction: lambda.Function
  ) {
    const api = new appsync.GraphqlApi(scope, id, {
      name: `${id}API`,
      definition: appsync.Definition.fromFile("graphql/schema.graphql"),
      authorizationConfig: {
        defaultAuthorization: {
          authorizationType: appsync.AuthorizationType.API_KEY,
          apiKeyConfig: {
            expires: cdk.Expiration.after(cdk.Duration.days(365)),
          },
        },
      },
    });

    const lambdaDs = api.addLambdaDataSource(
      `${id}LambdaDataSource`,
      lambdaFunction
    );
    lambdaDs.createResolver(`${id}Resolver`, {
      typeName: "Query",
      fieldName: "fetchData",
      requestMappingTemplate: appsync.MappingTemplate.fromString(
        '{ "version": "2017-02-28", "payload": {} }'
      ),
      responseMappingTemplate: appsync.MappingTemplate.fromString(
        "$util.toJson($context.result)"
      ),
    });

    return api;
  }
}
