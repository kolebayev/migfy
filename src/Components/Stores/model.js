import { action, thunk } from "easy-peasy";

export default {
  playlist: {
    data: {
      name: "",
      cover: "",
      url: "",
      tracklist: [],
    },
    service: {
      serverError: null,
      isLoading: false,
    },

    setPl: action((state, data) => {
      state.data = { ...data };
    }),

    fetchPlURL: thunk(async (actions, url) => {
      console.log("action.fetchPlURL");
      let response = await fetch("/parseApplePlaylistLink", {
        method: "POST",
        headers: {
          "Content-Type": "text/plain;charset=utf-8",
        },
        body: url,
      });
      if (response.ok) {
        let json = await response.json();
        actions.setPl(json);
      } else {
        console.log("Ошибка HTTP: " + response.status);
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
  },
};
