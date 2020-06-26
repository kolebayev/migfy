import { action, thunk } from 'easy-peasy';
import data from './fakeData';

export default {
  playlist: {
    data: {
      // name: '',
      // cover: '',
      // url: '',
      // tracklist: [],
      // use in dev mode to fix Desk layout
      ...data,
    },
    service: {
      serverError: null,
      isLoading: false,
      willProcessedQty: 0,
      userData: null,
    },

    // add data to state storage
    setPl: action((state, data) => {
      state.data = { ...data };
      state.service.willProcessedQty = data.tracklist.length;
    }),

    // send apple playlist url to parse on backend
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

    // process server error on client
    setServerError: action((state, error) => {
      state.service.serverError = error;
    }),

    // process server error on client
    removeServerError: action((state) => {
      state.service.serverError = null;
    }),

    // set state for loading
    setIsLoading: action((state) => {
      state.service.isLoading = true;
    }),

    // remove state for loading
    removeIsLoading: action((state) => {
      state.service.isLoading = false;
    }),

    // process tracks to export in spotify
    setWillProcessed: action((state, idx) => {
      // change state of track in pl
      let value = state.data.tracklist[idx].willProcessed;
      state.data.tracklist[idx].willProcessed = !value;
      // recount qty of processed tracks
      let processedItems = state.data.tracklist.filter((item) => item.willProcessed === true);
      state.service.willProcessedQty = processedItems.length;
    }),

    // perform login into spotify -> redirect to login page
    login: thunk(async () => {
      let res = await fetch('/login');
      if (res.ok) {
        let loginURI = await res.text();
        window.location.assign(loginURI);
      } else {
        console.log('error');
      }
    }),

    // fetch users data for pic preview
    getUser: thunk(async (state) => {
      let res = await fetch('/getUser');
      console.log(res.status);
      if (res.ok) {
        let data = res.json();
        state.service.userData = data;
      }
    }),
  },
};
