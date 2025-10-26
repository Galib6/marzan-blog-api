import { OnWorkerEvent, Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { queuesConstants } from '../constants';

@Processor(queuesConstants.defaultQueue.name)
export class CountryPurVisaCatServiceDocProcessor extends WorkerHost {
  // constructor /**import service here ans call form here */(
  //   private readonly countryPurVisaCatServiceDocService: CountryPurVisaCatServiceDocService
  // ) {
  //   super();
  // }

  async process(job: Job): Promise<void> {
    switch (job.name) {
      case queuesConstants.defaultQueue.jobNames.createOne:
        // await this.countryPurVisaCatServiceDocService.createBulk(job.data);
        break;

      case queuesConstants.defaultQueue.jobNames.updateOne:
        // await this.countryPurVisaCatServiceDocService.updateBulk(job.data);
        break;

      default:
        console.info(`Unknown job type: ${job.name}`);
    }
  }

  @OnWorkerEvent('completed')
  onComplete(job: Job): void {
    console.info(`Job completed: ${job.id}, ${job.name}`);
  }
}
