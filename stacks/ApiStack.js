import * as sst from "@serverless-stack/resources";
import { UpdatePolicy } from "aws-cdk-lib/aws-autoscaling";

export default class ApiStack extends sst.Stack {
  // Public reference to the API
  api;

  constructor(scope, id, props) {
    super(scope, id, props);

    const { table } = props;

    // Create the API
    this.api = new sst.Api(this, "Api", {
      defaultFunctionProps: {
        environment: {
          TABLE_NAME: table.tableName,
        },
      },
      routes: {
        "POST   /events": "src/create.main",

        "GET    /events/{id}": "src/get.main",

        "PUT    /events/{id}": "src/update.main",

        "PUT    /events/participants/{id}": "src/addParticipant.main",
      },
    });

    // Allow the API to access the table
    this.api.attachPermissions([table]);

    // Show the API endpoint in the output
    this.addOutputs({
      ApiEndpoint: this.api.url,
    });
  }
}