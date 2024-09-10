import * as UserApi from '../api/UserRequest';

// Funkcja do aktualizacji użytkownika
export const updateUser = (id, formData) => async (dispatch) => {
    dispatch({ type: "UPDATING_START" });

    try {
        const { data } = await UserApi.updateUser(id, formData);
        dispatch({ type: "UPDATING_SUCCESS", data: data });
    } catch (error) {
        dispatch({ type: "UPDATING_FAIL" });
    }
}

// Funkcja do śledzenia użytkownika
export const followUser = (id, data) => async (dispatch) => {
    dispatch({ type: "FOLLOW_USER", data: id });
    UserApi.followUser(id, data);
}

// Funkcja do cofania śledzenia użytkownika
export const unFollowUser = (id, data) => async (dispatch) => {
    dispatch({ type: "UNFOLLOW_USER", data: id });
    UserApi.unFollowUser(id, data);
}
