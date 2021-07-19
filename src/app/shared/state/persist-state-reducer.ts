import {ActionReducer, MetaReducer} from "@ngrx/store";

export function persistStateReducer(_reducer: ActionReducer<any>): ActionReducer<any> {
  const localStorageKey = '__location';
  return (state: any, action: any) => {
    if (state === undefined) {
      const persisted = localStorage.getItem(localStorageKey);
      return persisted ? JSON.parse(persisted) : _reducer(state, action);
    }

    const nextState = _reducer(state, action);
    localStorage.setItem(localStorageKey, JSON.stringify(nextState));
    return nextState;
  };
}

export const metaReducers: MetaReducer<any>[] = [persistStateReducer];
