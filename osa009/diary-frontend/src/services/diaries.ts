import axios from "axios";
import { Diary, NewDiary } from "../types";
import { apiBaseUrl } from "../constant";

const getAll = async () => {
  const { data } = await axios
    .get<Diary[]>(`${apiBaseUrl}/diaries`);
  return data;
};

const create = async (object: NewDiary) => {
  const { data } = await axios.post<Diary>(
    `${apiBaseUrl}/diaries`,
    object
  );

  return data;
};


export default {
  getAll,
  create
};


