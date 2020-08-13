import { injectable } from "inversify";
import * as azStorage from "azure-storage";
import "reflect-metadata";

import IAzureService from "../interfaces/services/azure.service.interface";
import { getEnv } from "../../configuration";

@injectable()
export default class AzureService implements IAzureService {
  queueSvc: azStorage.QueueService;
  constructor() {
    this.queueSvc = azStorage.createQueueService(
      String(getEnv("QUEUE_CONNECTION_STRING"))
    );
  }

  async SendToQueue(email: string): Promise<void> {
    const queue = getEnv("QUEUE");

    if (!queue) {
      const error = new Error();
      error.message = "Please, configure the azure queue";

      throw error;
    }

    this.queueSvc.createMessage(String(queue), email, function (
      error,
      results,
      response
    ) {
      if (!error) {
        console.log("Email sent to: " + email);
      }
    });
  }
}
