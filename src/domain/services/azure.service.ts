import { injectable } from "inversify";
import * as azStorage from "azure-storage";
import "reflect-metadata";

import IAzureService from "../interfaces/services/azure.service.interface";
import { getEnv } from "../../configuration";
import { CustomException } from "../../api/models/custom.execption";
import log from "../../configuration/logger";

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
      log.fatal("azure queue no configure");
      const error = new CustomException("Please, configure the azure queue",500);
      throw error;
    }

    this.queueSvc.createMessage(String(queue), email, function (error, results,response ) {
      if (!error) {
        log.info("Email sent to: " + email);
      }
    });
  }
}
