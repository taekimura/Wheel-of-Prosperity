import { UPDATE_WHEEL, UPDATE_AVERAGE } from "../constants/action-types";

const initialState = {
    sectionScores: [
        { A1: 35 },
        { A2: 35 },
        { A3: 35 },
        { A4: 35 },
        { A5: 35 },
        { A6: 35 },
        { A7: 35 },
        { A8: 35 },
        { A9: 35 },
        { A10: 35 },
        { A11: 35 },
        { A12: 35 },
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