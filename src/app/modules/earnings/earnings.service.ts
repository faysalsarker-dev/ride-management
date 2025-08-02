import { Earning } from './earnings.model';
import { IEarning } from './earnings.interface';

export const EarningsService = {
  async createEarning(payload: IEarning): Promise<IEarning> {
    const earning = await Earning.create(payload);
    return earning;
  },

  async getAllEarnings(): Promise<IEarning[]> {
    return await Earning.find().populate('driver ride');
  },

  async getSingleEarning(id: string): Promise<IEarning | null> {
    return await Earning.findById(id).populate('driver ride');
  },

  async deleteEarning(id: string): Promise<IEarning | null> {
    return await Earning.findByIdAndDelete(id);
  },
};
