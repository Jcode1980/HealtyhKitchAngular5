import { LoginActions, LOG_IN_USER, LOG_OUT_USER } from '../actions/currentuser.actions';
import { IAppState } from '../IAppState';
import { User } from '../../../models/User';

const initialState: User = null;

// Section 2
export function LoginReducer(state: any = initialState, action: LoginActions) {
    console.log("Getting to LoginReducer");
    // Section 3
    switch(action.type) {
        case LOG_IN_USER:
            return action.payload;
        case LOG_OUT_USER:  
            return null;
        default:
            return state;
    }
}
