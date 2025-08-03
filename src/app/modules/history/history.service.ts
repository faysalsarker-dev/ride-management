import { ApiError } from "../../errors/ApiError";
import { IHistory } from "./history.interface";
import { History } from "./History.model";

export const HistoryService = {
  createHistory: async (payload: IHistory): Promise<IHistory> => {
    const history = await History.create(payload);
    return history;
  },

  getAllHistories: async (): Promise<IHistory[]> => {
    return History.find().populate("rideId riderId driverId");
  },

  getSingleHistory: async (id: string): Promise<IHistory | null> => {
    return History.findById(id).populate("rideId riderId driverId");
  },

  updateHistory: async (
    id: string,
    payload: Partial<IHistory>
  ): Promise<IHistory | null> => {
    return History.findByIdAndUpdate(id, payload, {
      new: true,
      runValidators: true,
    });
  },

  deleteHistory: async (id: string): Promise<IHistory | null> => {
    return History.findByIdAndDelete(id);
  },


  
  updateRiderFeedback: async (
  historyId: string,
  data: { rating: number; feedback?: string },
  userId: string
): Promise<IHistory | null> => {
  const history = await History.findById(historyId);
  if (!history) {
    throw new ApiError(404, 'History not found');
  }
  
  if (history.riderId.toString() !== userId) {
    throw new ApiError(401, 'Unauthorized');
  }

  return History.findByIdAndUpdate(
    historyId,
    {
      riderRating: data.rating,
      riderFeedback: data.feedback,
    },
    { new: true }
  );
},
updateDriverFeedback: async (
  historyId: string,
  data: { rating: number; feedback?: string },
  userId: string
): Promise<IHistory | null> => {
  const history = await History.findById(historyId);
  if (!history) {
    throw new ApiError(404, 'History not found');
  }

  if (history.driverId?.toString() !== userId) {
    throw new ApiError(401, 'Unauthorized');
  }

  return History.findByIdAndUpdate(
    historyId,
    {
      driverRating: data.rating,
      driverFeedback: data.feedback,
    },
    { new: true }
  );
}





};
