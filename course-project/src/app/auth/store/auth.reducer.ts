import { User } from '../user.model';
import * as AuthAuctions from './auth.actions';

export interface State {
    user: User;
    authError: string;
    loading: boolean;
}

const initialState: State = {
    user: null,
    authError: null,
    loading: false
};

export function authReducer(state = initialState, action: AuthAuctions.AuthAuctions) {
    switch(action.type) {
        case AuthAuctions.AUTHENTICATE_SUCCESS:
            const user = new User(
                action.payload.email,
                action.payload.userId,
                action.payload.token,
                action.payload.expirationDate
            );
            return {
                ...state,
                authError: null,
                user: user,
                loading: false
            }
        case AuthAuctions.LOGOUT:
            return {
                ...state,
                user: null
            }
        case AuthAuctions.LOGIN_START:
            return {
                ...state,
                authError: null,
                loading: true
            }
        case AuthAuctions.AUTHENTICATE_FAIL:
            return {
                ...state,
                user: null,
                authError: action.payload,
                loading: false
            }
        default:
            return state;
    }
    return state;
}