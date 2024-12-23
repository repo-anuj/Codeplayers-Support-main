import { API5_GET_CompanySelection} from "../../../helpers/fakebackend_helper";

// action
import { dataSuccess } from "./reducer";

export const GET_CompanySelection = () => async (dispatch) => {
    try {
        
           const response = await API5_GET_CompanySelection();
           dispatch(dataSuccess(response));

    } catch (error) {
        //dispatch(profileError(error));
    }
};