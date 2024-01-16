import { REMOVE_BASE_INFO, SET_BASE_INFO } from '../actions/accountAction';
import { UserGetByToken } from '../model/accountModel';

interface AccountState {
  BasicInfo: UserGetByToken | null;
}

const initGetByTokenState: AccountState = {
  BasicInfo: null,
};

interface AccountAction {
  type: string;
  payload: UserGetByToken | null;
}

const accountReducer = (state = initGetByTokenState, action: AccountAction) => {
  switch (action.type) {
    case SET_BASE_INFO:
      return {
        ...state,
        BasicInfo: action.payload,
      };
    case REMOVE_BASE_INFO:
      return {
        ...state,
        BasicInfo: null,
      };
    default:
      return state;
  }
};

export default accountReducer;
