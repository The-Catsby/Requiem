import Immutable from 'immutable';

const defaultState = new Immutable.List();

export default function MapReducer(state = defaultState, action) {

  switch (action.type) {

    case 'some case':
      return new Immutable.List(action.res.data);

    default:
      return state;
  }
}
