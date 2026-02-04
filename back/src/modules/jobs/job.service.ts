import { JobModel } from './job.model';

class JobService {
  async list() {
    return JobModel.find().lean().exec();
  }
}

export const jobService = new JobService();
