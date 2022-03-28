import handler from "./util/handler";
import dynamoDb from "./util/dynamodb";


export const main = handler(async (event) => {
    const data = JSON.parse(event.body);

    const params = {
      TableName: process.env.TABLE_NAME,
      
      Key: {
        eventId: event.pathParameters.id, // The id of the event
      },
      // 'UpdateExpression' defines the attributes to be updated
      // 'ExpressionAttributeValues' defines the value in the update expression
      UpdateExpression: "SET events = :events",
      ExpressionAttributeValues: {
        ":events": data.events || null,
      },
      // 'ReturnValues' specifies if and how to return the item's attributes,
      // where ALL_NEW returns all attributes of the item after the update
      ReturnValues: "ALL_NEW",
    };
  
    await dynamoDb.update(params);
  
    return { status: true };
  });