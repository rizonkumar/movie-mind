import axios from "../../utils/axios";
import { loadtv, setLoading, setError } from "../reducers/tvShowSlice.jsx";

export const asyncloadtv = (id) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const detail = await axios.get(`/tv/${id}`);
    const externalId = await axios.get(`/tv/${id}/external_ids`);
    const recommendations = await axios.get(`/tv/${id}/recommendations`);
    const similar = await axios.get(`/tv/${id}/similar`);
    const videos = await axios.get(`/tv/${id}/videos`);
    const watchProviders = await axios.get(`/tv/${id}/watch/providers`);
    const translations = await axios.get(`/tv/${id}/translations`);

    let theUltimateDetails = {
      detail: detail.data,
      externalId: externalId.data,
      recommendations: recommendations.data.results,
      similar: similar.data.results,
      videos: videos.data.results.find((m) => m.type === "Trailer"),
      watchProviders: watchProviders.data.results.IN,
      translations: translations.data,
    };
    dispatch(loadtv(theUltimateDetails));
  } catch (error) {
    console.error("Error loading tv:", error);
    dispatch(setError("Unable to load tv details. Please try again."));
  }
};

export { removetv } from "../reducers/tvShowSlice.jsx";
