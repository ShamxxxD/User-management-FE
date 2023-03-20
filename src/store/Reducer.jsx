const initState = {
    isLogin: false,
};
function reducer(state, action) {
    switch (action.type) {
        case 'log in':
            return {
                ...state,
                isLogin: action.payload,
            };
        case 'log out':
            return {
                ...state,
                isLogin: action.payload,
            };
        default:
            return new Error('Invalid action...');
    }
}
export default reducer;
export { initState };
