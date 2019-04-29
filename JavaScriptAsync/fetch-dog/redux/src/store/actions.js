// Actions permute the store in some way (create, update, or delete).

import { 
  FETCH_DOG,
  FETCH_DOG_SUCCESS,
  FETCH_DOG_ERROR,
  FETCH_DOG_COMPLETE
} from './reducer';

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

