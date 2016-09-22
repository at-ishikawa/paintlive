import io from 'socket.io-client';

let socket = null;

export function socketIoMiddleware() {
  return next => action => {
    const result = next(action);

    // console.log(action);

    return result;
  };
}

export function syncWithServer() {
  socket = io.connect('http://localhost:8080');

  socket.on('start', () => {
    // console.log(data);
    // store.dispatch
  });

  socket.on('message', () => {
    // console.log(data);
    // store.dispatch(actions.addResponse(data));
  });
}
