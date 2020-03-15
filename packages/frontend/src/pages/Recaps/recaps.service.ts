import axios from "axios";
import { Recap } from "./recaps.interface";

export const getRecaps = () => {
  return axios.get<Recap[]>("/recaps");
};

export const createRecap = (recapToCreate: Omit<Recap, "_id">) => {
  return axios.post<Recap>("/recaps", recapToCreate);
};

export const updateRecap = (updatedRecap: Recap) => {
  return axios.patch<Recap>(`/recaps/${updatedRecap._id}`, updatedRecap);
};

export const deleteRecap = (recapId: Recap["_id"]) => {
  return axios.delete<Recap>(`/recaps/${recapId}`);
};
