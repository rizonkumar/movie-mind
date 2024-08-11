import axios from "../../utils/axios";
import { loadperson, setLoading, setError } from "../reducers/personSlice";

export const asyncloadperson = (id) => async (dispatch) => {
    dispatch(setLoading(true));
    try {
        const detail = await axios.get(`/person/${id}`);
        const externalId = await axios.get(`/person/${id}/external_ids`);
        const combinedCredits = await axios.get(`/person/${id}/combined_credits`);

        let theUltimateDetails = {
            detail: detail.data,
            externalId: externalId.data,
            combinedCredits: combinedCredits.data,
        };
        dispatch(loadperson(theUltimateDetails));
    } catch (error) {
        console.error("Error loading person:", error);
        dispatch(setError("Unable to load person details. Please try again."));
    }
};

export { removeperson } from "../reducers/personSlice";
