import { Dispatch } from '@reduxjs/toolkit';

/**
 * Return type for use when declaring a new thunk, for example:
 *     export function myThunk(...): ThunkReturnType {
 */
export interface ThunkReturnType<T = void> {
  (dispatch: Dispatch, getState: () => any): Promise<T>;
}
