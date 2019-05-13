// Actions permute the store in some way (create, update, or delete).

export const FETCH_DOG = 'FETCH_DOG';
export const FETCH_DOG_SUCCESS = 'FETCH_DOG_SUCCESS';
export const FETCH_DOG_ERROR = 'FETCH_DOG_ERROR';
export const FETCH_DOG_COMPLETE = 'FETCH_DOG_COMPLETE';

export const fetchDogAction = () => (
  { type: FETCH_DOG }
);

export const fetchDogSuccessAction = (dog) => (
  {
      type: FETCH_DOG_SUCCESS,
      dog
  }
);

export const fetchDogErrorAction = (error) => (
  {
      type: FETCH_DOG_ERROR,
      error
  }
);

export const fetchDogLoadCompleteAction = () => (
  {
      type: FETCH_DOG_COMPLETE
  }
);

