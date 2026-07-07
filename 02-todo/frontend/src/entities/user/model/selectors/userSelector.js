export const profile = (state) => state.user.profile;
export const isAuth = (state) => !!state.user.token;
export const selectToken = (state) => state.user.token;
