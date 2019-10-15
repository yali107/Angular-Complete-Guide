import { User } from '../user.model';
import * as AuthAuctions from './auth.actions';

export interface State {
    user: User;
}

const initialState: State = {
    user: null
};

export function authReducer(state = initialState, action: AuthAuctions.AuthAuctions) {
    switch(action.type) {
        case AuthAuctions.LOGIN:
            const user = new User(
                action.payload.email,
                action.payload.userId,
                action.payload.token,
                action.payload.expirationDate
            );
            return {
                ...state,
                user: user
            }
        case AuthAuctions.LOGOUT:
            return {
                ...state,
                user: null
            }
        default:
            return state;
    }
    return state;
}