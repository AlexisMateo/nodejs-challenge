export default interface IAzureService {
  SendToQueue(email: string): Promise<void>;
}
