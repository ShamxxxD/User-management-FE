export const setUser = payload => {
    return {
        type: 'set user',
        payload,
    };
};

export const setConversationPartner = payload => {
    return {
        type: 'set conversation partner',
        payload,
    };
};
