import {IAppState} from '../../models/IAppState';

export const initialState: IAppState = {
  authReducer: {
    loading: false,
    authenticated: false,
    loaded: false,
    token: ''
  },
  userReducer: {
    firstName: '',
    lastName: '',
    email: '',
    profileImageThumbnailID: null,
    profileImagePreviewID: null
  },
};
