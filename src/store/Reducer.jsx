const initState = {
    user: {},
    conversationPartner: {},
};
function reducer(state, action) {
    switch (action.type) {
        case 'set user':
            return {
                ...state,
                user: action.payload,
            };

        case 'set conversation partner':
            return {
                ...state,
                conversationPartner: action.payload,
            };
        default:
            return new Error('Invalid action...');
    }
}
export default reducer;
export { initState };
