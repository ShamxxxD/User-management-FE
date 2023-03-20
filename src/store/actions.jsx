export const isUserLogin = payload => {
    const currentUserStatus = payload === true ? 'log in' : 'log out';

    return {
        type: currentUserStatus,
        payload,
    };
};
