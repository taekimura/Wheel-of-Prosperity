import { UPDATE_WHEEL, UPDATE_AVERAGE } from "./wheel.types";

const initialState = {
    sectionScores: [
        { Stimulation: 10 },
        { Comprehension: 10 },
        { Livelihood: 10 },
        { Intellect: 10 },
        { Love: 10 },
        { Bonds: 10 },
        { Imagination: 10 },
        { Inventiveness: 10 },
        { Strength: 10 },
        { Finances: 10 },
        { Performance: 10 },
        { Development: 10 },
    ],
    averageScores: []
};

function wheelReducer(state = initialState, action) {
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

export default wheelReducer;
