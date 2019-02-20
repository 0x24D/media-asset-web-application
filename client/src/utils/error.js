export default function handleErrors(store, error) {
  let errorMessage = 'An error has occurred, please try again later';
  if (error.response) {
    if (error.response.status === 500 && error.response.data.err) {
      errorMessage = error.response.data.err;
    }
  } else if (error.request) {
    errorMessage = 'A network error has occured, please try again later';
  }
  store.commit('setErrorMessage', `TO REMOVE:Error ${errorMessage}`);
}
