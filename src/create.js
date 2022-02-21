import * as uuid from "uuid";
import handler from "./util/handler";
import dynamoDb from "./util/dynamodb";

export const main = handler(async (event) => {
  // Request body is passed in as a JSON encoded string in 'event.body'
  const data = JSON.parse(event.body);

  const params = {
    TableName: process.env.TABLE_NAME,
    Item: {
      eventId: uuid.v1(), 
      eventName: data.eventName,
      eventStartTime: data.eventStartTime,
      eventEndTime: data.eventEndTime,
      eventStartDate: data.eventStartDate,
      eventEndDate: data.eventEndDate,
      eventParticipants: data.eventParticipants,
      createdAt: Date.now(), // Current Unix timestamp
    },
  };

  await dynamoDb.put(params);

  return params.Item;
});
