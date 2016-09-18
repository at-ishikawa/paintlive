import { createActions } from 'redux-actions';

export const { setMode } = createActions({
  SET_MODE: (mode) => ({
    mode: mode
  })
});
