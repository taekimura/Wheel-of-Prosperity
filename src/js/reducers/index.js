import { UPDATE_WHEEL, UPDATE_AVERAGE } from "../constants/action-types";

const initialState = {
    sectionScores: [
        { Rejuvenation: 10 },
        { Embrace: 10 },
        { Lifestyle: 10 },
        { Self: 10 },
        { Relationship: 10 },
        { Family: 10 },
        { Inspiration: 10 },
        { Creativity: 10 },
        { Health: 10 },
        { Money: 10 },
        { Work: 10 },
        { Expansion: 10 },
    ],
    averageScores: []
};

function rootReducer(state = initialState, action) {
    switch (action.type) {
        case UPDATE_WHEEL:
            return {
                ...state,
                sectionScores: action.payload
            }
        case UPDATE_AVERAGE:
            return {
                ...state,
                averageScores: action.payload
            }
        default:
            return state;
    }
};

export default rootReducer;