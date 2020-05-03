import { action, thunk } from 'easy-peasy';
import data from './fakeData';

export default {
  playlist: {
    data: {
      // name: '',
      // cover: '',
      // url: '',
      // tracklist: [],
      ...data,
    },
    service: {
      serverError: null,
      isLoading: false,
      willProcessedQty: 0,
    },

    setPl: action((state, data) => {
      state.data = { ...data };
      state.service.willProcessedQty = data.tracklist.length;
    }),

    fetchPlURL: thunk(async (actions, url) => {
      console.log('action.fetchPlURL');
      let response = await fetch('/parseApplePlaylistLink', {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain;charset=utf-8',
        },
        body: url,
      });
      if (response.ok) {
        let json = await response.json();
        actions.setPl(json);
      } else {
        console.log('Ошибка HTTP: ' + response.status);
        actions.setServerError(response.status);
      }
    }),

    setServerError: action((state, error) => {
      state.service.serverError = error;
    }),

    removeServerError: action((state) => {
      state.service.serverError = null;
    }),

    setIsLoading: action((state) => {
      state.service.isLoading = true;
    }),

    removeIsLoading: action((state) => {
      state.service.isLoading = false;
    }),

    setWillProcessed: action((state, idx) => {
      let value = state.data.tracklist[idx].willProcessed;
      state.data.tracklist[idx].willProcessed = !value;
      let processedItems = state.data.tracklist.filter((item) => item.willProcessed === true);
      state.service.willProcessedQty = processedItems.length;
    }),
  },
};
