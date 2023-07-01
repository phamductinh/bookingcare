import actionTypes from "../actions/actionTypes";

const initialState = {
	isLoggedIn: false,
	joinRoom: false,
	userInfo: null,
};

const appReducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.USER_LOGIN_SUCCESS:
			return {
				...state,
				isLoggedIn: true,
				userInfo: action.userInfo,
			};
		case actionTypes.JOIN_ROOM_SUCCESS:
			return {
				...state,
				joinRoom: true,
			};
		case actionTypes.USER_LOGIN_FAIL:
			return {
				...state,
				isLoggedIn: false,
				userInfo: null,
			};
		case actionTypes.PROCESS_LOGOUT:
			return {
				...state,
				isLoggedIn: false,
				userInfo: null,
			};
		default:
			return state;
	}
};

export default appReducer;
