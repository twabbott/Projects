export const FETCH_DOG = 'FETCH_DOG';
export const FETCH_DOG_SUCCESS = 'FETCH_DOG_SUCCESS';
export const FETCH_DOG_ERROR = 'FETCH_DOG_ERROR';

export const fetchDogAction = () => (
    { type: FETCH_DOG }
);

export const fetchDogSuccess = (dog) => (
    {
        type: FETCH_DOG_SUCCESS,
        dog
    }
);

export const fetchDogError = (error) => (
    {
        type: FETCH_DOG_ERROR,
        error
    }
);

const initialState = {
    fetching: false,
    dog: null,
    error: null
};

export function rootReducer(state = initialState, action) {
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
                fetching: false,
                dog: action.dog
            };

        case FETCH_DOG_ERROR:
            console.log("Redux: FETCH_DOG_ERROR");
            return {
                ...state,
                fetching: false,
                error: action.error
            };

        default:
            return state;
    }
}
