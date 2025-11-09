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
): Promise<IHistory | null> => {
  const history = await History.findById(historyId);
  if (!history) {
    throw new ApiError(404, 'History not found');
  }
  


   const result = await  History.findByIdAndUpdate(
    historyId,
    {
      riderRating: data.rating,
    },
    { new: true }
  );

  return result 

},
updateDriverFeedback: async (
  historyId: string,
  data: { rating: number; feedback?: string },
): Promise<IHistory | null> => {
  const history = await History.findById(historyId);
  if (!history) {
    throw new ApiError(404, 'History not found');
  }
  return History.findByIdAndUpdate(
    historyId,
    {
      driverRating: data.rating,
    },
    { new: true }
  );
}





};
