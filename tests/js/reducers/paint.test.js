import * as actions from 'actions/paint';
import reducer, { initialState } from 'reducers/paint';

describe('paint reducer', () => {
  it('should return the initial state', () => {
    const expected = { ...initialState };
    expected.contexts.push(null);
    expect(reducer(undefined, actions.initialize(null)))
      .toEqual(initialState);
  });
});
