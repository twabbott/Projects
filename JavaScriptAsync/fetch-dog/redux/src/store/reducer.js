export const FETCH_DOG = 'FETCH_DOG';
export const FETCH_DOG_SUCCESS = 'FETCH_DOG_SUCCESS';
export const FETCH_DOG_ERROR = 'FETCH_DOG_ERROR';
export const FETCH_DOG_COMPLETE = 'FETCH_DOG_COMPLETE';

const initialState = {
    fetching: false,
    dog: null,
    error: null
};

export default function rootReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_DOG:
            console.log("Redux: FETCH_DOG");
            return {
                ...state,
                fetching: true,
                error: null
            };

        case FETCH_DOG_SUCCESS:
            console.log("Redux: FETCH_DOG_SUCCESS");
            return {
                ...state,
                dog: action.dog
            };

        case FETCH_DOG_ERROR:
            console.log("Redux: FETCH_DOG_ERROR");
            return {
                ...state,
                fetching: false,
                error: action.error
            };

        case FETCH_DOG_COMPLETE:
            console.log("Redux: FETCH_DOG_COMPLETE");
            return {
                ...state,
                fetching: false
            };

        default:
            return state;
    }
}
