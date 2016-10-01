import { handleActions } from 'redux-actions';

const ObjectUtils = () => {}
ObjectUtils.getDifferenceByKeys = (object, ...others) => {
  let result = {};
  Object.keys(object).forEach((key) => {
    let count = others.filter((other) => { return key in other; }).length;
    if (count > 0) {
      return;
    }

    result[key] = object[key];
  });
  return result;
};

const signUpForm = handleActions({
  CHANGE_INPUT: (state, action) => ({
    ...state,
    input: {
      ...state.input,
      ...action.payload.input
    }
  }),
  END_VALIDATE_INPUT: (state, action) => ({
    ...state,
    errorMessages: (() => {
      let differences = ObjectUtils.getDifferenceByKeys(state.errorMessages, action.payload.successes);
      const newStates = Object.assign({}, differences, action.payload.errors);
      return newStates;
    })(),
    successMessages: (() => {
      let differences = ObjectUtils.getDifferenceByKeys(state.successMessages, action.payload.errors);
      const newStates = Object.assign({}, differences, action.payload.successes);
      return newStates;
    })()
  })
}, {
  input: {},
  errorMessages: {},
  successMessages: {}
});

export default signUpForm;
