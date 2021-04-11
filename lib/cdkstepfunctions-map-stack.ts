import * as cdk from "@aws-cdk/core";
import * as sfn from "@aws-cdk/aws-stepfunctions";
import * as tasks from "@aws-cdk/aws-stepfunctions-tasks";
import * as lambda from "@aws-cdk/aws-lambda";
import { PythonFunction } from "@aws-cdk/aws-lambda-python";

export class CdkstepfunctionsMapStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    
    const PREFIX_NAME = id.toLowerCase().replace('stack', '')
    
    const create_function = new PythonFunction(this, "create_function", {
      entry: "lambda",
      index: "create.py",
      handler: "lambda_handler",
      functionName: PREFIX_NAME + '-create',
      runtime: lambda.Runtime.PYTHON_3_8,
      timeout: cdk.Duration.seconds(20),
    })
    
    const process_function = new PythonFunction(this, "process_function", {
      entry: "lambda",
      index: "process.py",
      handler: "lambda_handler",
      functionName: PREFIX_NAME + '-process',
      runtime: lambda.Runtime.PYTHON_3_8,
      timeout: cdk.Duration.seconds(20),
    })

    const create_job = new tasks.LambdaInvoke(this, "create", {
      lambdaFunction: create_function,
    })

    const process_job = new tasks.LambdaInvoke(this, "process", {
      lambdaFunction: process_function,
    })

    const map = new sfn.Map(this, "map", {
      maxConcurrency: 1,
      itemsPath: sfn.JsonPath.stringAt("$.Payload.todos"),
    })

    map.iterator(process_job);

    const definition = create_job.next(map)

    new sfn.StateMachine(this, "state_machine", {
      definition,
      timeout: cdk.Duration.minutes(5),
      stateMachineName: PREFIX_NAME + '-statemachine'
    })
  }
}
