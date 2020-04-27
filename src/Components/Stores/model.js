import { action, thunk } from "easy-peasy";

export default {
  playlist: {
    data: {
      name: "",
      cover: "",
      url: "",
      tracklist: [],
    },
    
    fetchPlURL: thunk(async (actions, payload) => {
      console.log('action.fetchPlURL')
      let response = await fetch("/parseApplePlaylistLink", {
        method: "POST",
        headers: {
          "Content-Type": "text/plain;charset=utf-8",
        },
        body: payload,
      });
      if (response.ok) {
        let json = await response.json();
        console.log(json);
        actions.setPl(json)
      } else {
        // setServerError(response.status);
        console.log("Ошибка HTTP: " + response.status);
        // setIsLoading(false)
      }

    }),

    ok: thunk((actions, payload) => {
      console.log('thunk.ok' , '///////' , payload)

    }),

    setPl: action((state, payload) => {
      console.log('action.setPl')
      console.log(state.data.name)
      console.log(payload)
      state.data.name += payload.title.name
      state.data.cover += payload.title.cover
      state.data.url += payload.title.tracklist
      state.data.tracklist.push(...payload.tracklist)
    }),

    // plLinkValidation: thunk(() => {}),
  },

  // thunks
  // initialise: thunk(async (actions, payload, { dispatch }) => {
  //   await dispatch.todos.fetchTodos();
  // }),
};
