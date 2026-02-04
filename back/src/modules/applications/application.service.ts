import { ApplicationModel } from './application.model';
import { Types } from 'mongoose';

class ApplicationService {
  async create(userId: string, payload: any) {
    return ApplicationModel.create({ applicantId: Types.ObjectId(userId), data: payload });
  }
}

export const applicationService = new ApplicationService();
