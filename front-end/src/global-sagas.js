import { fork, all } from 'redux-saga/effects';

const sagas = [
  // NOTE: put all sagas here
];

function* globalSagas() {
  const globalSagasForks = sagas.map((saga) => fork(saga));

  yield all([...globalSagasForks]);
}

export default globalSagas;
