import { 
  fetchDogAction, 
  fetchDogSuccessAction, 
  fetchDogErrorAction
} from '../reducers/actions';

/* The word "thunk" is a play on words.  It's past-tense of "think".
 *
 * A thunk takes the place of an action creator function.  Whenever
 * an action-creator returns a funciton instead of an object, Redux
 * will hand it off to the middleware to get handled (i.e., it will 
 * be executed and monitored until it completes).
 */

// This is the Promise version
export function fetchDogThunkPromise() {
  return dispatch => {
    // Tell Redux that we're loading
    dispatch(fetchDogAction());

    // Fetch the data
    return fetch('https://dog.ceo/api/breeds/image/random')

      // Get the JSON payload from the response
      .then(response => response.json())

      // Tell Redux that we have data
      .then(data => dispatch(fetchDogSuccessAction(data.message)))

      // If there was an error then tell Redux about it.
      .catch(error => dispatch(fetchDogErrorAction(error.message)))
  }
};

/* Note, we cannot add an error handler in our first .then(), because
 * the error will be handled and then the next .then() will receive
 * an undefined payload.
 * 
 * // This will not work!
 * return fetch('https://dog.ceo/api/breeds/image/random')
 *   .then(
 *     response => response.json(),
 *     error => dispatch(fetchDogErrorAction(error.message))
 *   )
 *   .then(data => dispatch(fetchDogSuccessAction(data.message)))
 */ 


export function fetchDogThunkAsync() {
  return async dispatch => {
    try {
      // Tell Redux that we're loading
      dispatch(fetchDogAction());

      // Fetch the data
      const response = await fetch('https://dog.ceo/api/breeds/image/random');

      // Get the JSON payload from the response
      const json = await response.json();

      // Tell Redux that we have data
      dispatch(fetchDogSuccessAction(json.message));
    } catch (err) {
      // There was an error.  Tell Redux about it.
      dispatch(fetchDogErrorAction(err.message))
    }
  };
}
