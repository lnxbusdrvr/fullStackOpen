import axios from "axios";
import { Diary } from "../types";
import { apiBaseUrl } from "../constant";

const getAll = async () => {
  const { data } = await axios
    .get<Diary[]>(`${apiBaseUrl}/diaries`);
  return data;
};


export default {
  getAll
};


