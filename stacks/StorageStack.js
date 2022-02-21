import * as sst from "@serverless-stack/resources";

export default class StorageStack extends sst.Stack {
  table;

  constructor(scope, id, props) {
    super(scope, id, props);

    // Create the DynamoDB table
    this.table = new sst.Table(this, "EventsDev", {
      fields: {
        eventId: sst.TableFieldType.STRING,
      },
      primaryIndex: { partitionKey: "eventId" },
    });
  }
}