import { configureStore } from "@reduxjs/toolkit";

/* slices */
import counterReducer from "./counter/counterSlice";
import { useDispatch, useSelector } from "react-redux";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

// Usamos estos dos hooks en lugar de usar useSelector y useDispatch como se usaba anteriormente, o se usa en vanilla js
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();