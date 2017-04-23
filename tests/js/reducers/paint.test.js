import * as actions from 'actions/paint';
import * as layerActions from 'actions/layer';
import * as toolbarActions from 'actions/toolbar';
import reducer, { initialState } from 'reducers/paint';

describe('paint reducer for layers', () => {
  it('should return the initial state', () => {
    const expected = {...initialState};
    expected.contexts.push(null);
    expect(reducer(undefined, actions.initialize(null)))
      .toEqual(expected);
  });

  it('should add layer', () => {
    const actual = reducer(undefined, layerActions.addLayer());
    expect(actual.layerHistory)
      .toHaveLength(1);
  });

  it('should remove layer', () => {
    const state = {
      layerHistory: [],
      layers: [],
      contexts: [{}, {}],
      currentLayerIndex: 0
    };

    state.layers.push({});
    let actual = reducer(state, layerActions.removeLayer());
    expect(actual.layerHistory)
      .toHaveLength(0);
    expect(actual.layers)
      .toHaveLength(1);

    state.layers.push({});
    expect(state.layers)
      .toHaveLength(2);
    actual = reducer(state, layerActions.removeLayer());
    expect(actual.layerHistory)
      .toHaveLength(1);
    expect(actual.layers)
      .toHaveLength(1);
  });

  it('should move layer', () => {
    const state = {
      layerHistory: [],
      layers: [
        {id: 1},
        {id: 2}
      ],
      currentLayerIndex: 0
    };
    // the min index
    expect(reducer(state, layerActions.moveLayer(0, 0)))
      .toEqual(state);
    // the max index
    expect(reducer(state, layerActions.moveLayer(1, 1)))
      .toEqual(state);
    // no id
    expect(reducer(state, layerActions.moveLayer(100, 101)))
      .toEqual(state);

    const actual = reducer(state, layerActions.moveLayer(1, 2));
    expect(actual.layers)
      .toEqual([
        {id: 2},
        {id: 1}
      ]);
    expect(actual.layerHistory)
      .toHaveLength(1);
    expect(actual.currentLayerIndex)
      .toEqual(1);
  });

  it('should set layer name', () => {
    const state = {
      layerHistory: [],
      layers: [{}]
    };
    const actual = reducer(state, layerActions.setLayerName(0, 'New Layer'));
    expect(actual.layerHistory)
      .toHaveLength(1);
  });

  it('should set layer visible', () => {
    const state = {
      layerHistory: [],
      layers: [{
        isVisible: true
      }]
    };
    const actual = reducer(state, layerActions.setLayerVisible(0, false));
    expect(actual.layers[0].isVisible)
      .toBe(false);
    expect(actual.layerHistory)
      .toHaveLength(1);
  });
});

describe('paint reducer for images', () => {
  it('should open new image', () => {
    const state = {
      layerHistory: [],
      layers: []
    };
    const actual = reducer(state, toolbarActions.openNewImage({
      width: 1000,
      height: 1000
    }));
    expect(actual.layerHistory)
      .toHaveLength(1);
    expect(actual.layers)
      .toHaveLength(1);
  });

  it('should import image', () => {
    const state = {
      layerHistory: [],
      layers: []
    };
    const actual = reducer(state, actions.importImage('name', 'http://example.com/example.png'));
    expect(actual.layerHistory)
      .toHaveLength(1);
  });
});
