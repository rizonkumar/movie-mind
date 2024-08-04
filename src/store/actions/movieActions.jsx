import axios from "../../utils/axios";
import { loadMovie, setLoading, setError } from "../reducers/movieSlice";

export const asyncloadmovie = (id) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const detail = await axios.get(`/movie/${id}`);
    const externalId = await axios.get(`/movie/${id}/external_ids`);
    const recommendations = await axios.get(`/movie/${id}/recommendations`);
    const similar = await axios.get(`/movie/${id}/similar`);
    const videos = await axios.get(`/movie/${id}/videos`);
    const watchProviders = await axios.get(`/movie/${id}/watch/providers`);
    const translations = await axios.get(`/movie/${id}/translations`);

    let theUltimateDetails = {
      detail: detail.data,
      externalId: externalId.data,
      recommendations: recommendations.data.results,
      similar: similar.data.results,
      videos: videos.data.results.find((m) => m.type === "Trailer"),
      watchProviders: watchProviders.data.results.IN,
      translations: translations.data,
    };
    dispatch(loadMovie(theUltimateDetails));
  } catch (error) {
    console.error("Error loading movie:", error);
    dispatch(setError("Unable to load movie details. Please try again."));
  }
};

export { removeMovie } from "../reducers/movieSlice";
