// const initialState = { isLogin: false, token: "", userDetail: {} };

// function reducer(state = initialState, action) {
//   switch (action.type) {
//     case "LOGIN":
//       return {
//         ...state,
//         isLogin: true,
//         token: action.payload.token,
//         userDetail: action.payload.userDetail,
//       };
//     case "LOGOUT":
//       return { ...initialState };
//     default:
//       return state;
//   }
// }

// const persistConfig = {
//   key: "root",
//   storage: localStorage,
// };

// const persistedReducer = ReduxPersist.persistReducer(persistConfig, reducer);
// const store = Redux.createStore(persistedReducer);
// const persistor = ReduxPersist.persistStore(store);
