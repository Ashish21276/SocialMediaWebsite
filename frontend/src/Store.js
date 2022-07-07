import { configureStore } from "@reduxjs/toolkit";
import {
  allUsersReducer,
  postOfFollowinReducer,
  userProfileReducer,
  userReducer,
} from "./Reducers/ User";
import { likeReducer, myPostReducer, userPostsReducer } from "./Reducers/Post";

const store = configureStore({
  reducer: {
    user: userReducer,
    postOfFollowing: postOfFollowinReducer,
    allUsers: allUsersReducer,
    like: likeReducer,
    myPosts: myPostReducer,
    userProfile: userProfileReducer,
    userPosts: userPostsReducer,
  },
});

export default store;
