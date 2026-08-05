import api from "./api";

export const analyzeResume = (data) => {

    return api.post("/analysis", data);

};

export const getHistory = () => {

    return api.get("/analysis/history");

};