export default (state = [], action) => {
  switch (action.type) {
    case 'ADD_BOAT':
      return [action.payload, ...state];
    case 'LOGOUT':
      return state;
    default:
      return state;
  }
};
