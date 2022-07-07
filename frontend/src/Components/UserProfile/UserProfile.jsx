import { Avatar, Button, Dialog, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  followAndUnfollowUser,
  getUserPost,
  getUserProfile,
} from "../../Actions/User";
import Loader from "../Loader/Loader";
import Post from "../Post/Post";
import { useAlert } from "react-alert";
import User from "../User/User";
import { useParams } from "react-router-dom";

const UserProfile = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const params = useParams();

  const { loading, error, posts } = useSelector((state) => state.userPosts);

  const { user: me } = useSelector((state) => state.user);

  const {
    message,
    error: followError,
    loading: followLoading,
  } = useSelector((state) => state.like);

  const {
    user,
    loading: userLoading,
    error: userError,
  } = useSelector((state) => state.userProfile);

  const [followersToggle, setFollowersToggle] = useState(false);
  const [followintToggle, setFollowintToggle] = useState(false);
  const [following, setFollowing] = useState(false);
  const [myProfile, setMyProfile] = useState(false);

  const followHandler = async () => {
    setFollowing(!following);
    await dispatch(followAndUnfollowUser(user._id));
    dispatch(getUserProfile(params.id));
  };

  useEffect(() => {
    dispatch(getUserPost(params.id));
    dispatch(getUserProfile(params.id));
  }, [dispatch, params.id]);

  useEffect(() => {
    if (me._id === params.id) {
      setMyProfile(true);
    }

    if (user) {
      user.followers.forEach((item) => {
        if (item._id === me._id) {
          setFollowing(true);
        } else {
          setFollowing(false);
        }
      });
    }
  }, [me._id, user, params.id]);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch({ type: "clearErrors" });
    }

    if (userError) {
      alert.error(userError);
      dispatch({ type: "clearErrors" });
    }

    if (followError) {
      alert.error(followError);
      dispatch({ type: "clearErrors" });
    }

    if (message) {
      alert.success(message);
      dispatch({ type: "clearMessages" });
    }
  }, [alert, error, message, followError, userError, dispatch]);

  return loading || userLoading ? (
    <Loader />
  ) : (
    <div className="account">
      <div className="accountleft">
        {posts && posts.length > 0 ? (
          posts.map((post) => (
            <Post
              key={post._id}
              postId={post._id}
              caption={post.caption}
              postImage={post.image.url}
              likes={post.likes}
              comments={post.comments}
              ownerImage={post.owner.avatar.url}
              ownerName={post.owner.name}
              ownerId={post.owner._id}
              isPersonal={true}
            />
          ))
        ) : (
          <Typography variant="h6">No Posts Yet</Typography>
        )}
      </div>

      <div className="accountright">
        {user && (
          <>
            <Avatar
              src={user.avatar.url}
              sx={{ height: "8vmax", width: "8vmax" }}
            />
            <Typography variant="h5">{user.name}</Typography>

            <div>
              <button onClick={() => setFollowersToggle(!followersToggle)}>
                <Typography>Followers</Typography>
              </button>
              <Typography>{user.followers.length}</Typography>
            </div>

            <div>
              <button onClick={() => setFollowintToggle(!followintToggle)}>
                <Typography>Following</Typography>
              </button>
              <Typography>{user.following.length}</Typography>
            </div>

            <div>
              <Typography>Post</Typography>
              <Typography>{user.posts.length}</Typography>
            </div>

            {myProfile ? null : (
              <Button
                disabled={followLoading}
                onClick={followHandler}
                style={{ backgroundColor: following ? "red" : "blue" }}
                variant="contained"
              >
                {following ? "Unfollow" : "Follow"}
              </Button>
            )}

            <Dialog
              open={followersToggle}
              onClose={() => setFollowersToggle(!followersToggle)}
            >
              <div className="DialogBox">
                <Typography variant="h4">Followers</Typography>

                {user.followers && user.followers.length > 0 ? (
                  user.followers.map((follower) => (
                    <User
                      key={follower._id}
                      userId={follower._id}
                      name={follower.name}
                      avatar={follower.avatar.url}
                    />
                  ))
                ) : (
                  <Typography style={{ margin: "2vmax" }}>
                    No Followers Yet
                  </Typography>
                )}
              </div>
            </Dialog>

            <Dialog
              open={followintToggle}
              onClose={() => setFollowintToggle(!followintToggle)}
            >
              <div className="DialogBox">
                <Typography variant="h4">Followings</Typography>

                {user.following && user.following.length > 0 ? (
                  user.following.map((follower) => (
                    <User
                      key={follower._id}
                      userId={follower._id}
                      name={follower.name}
                      avatar={follower.avatar.url}
                    />
                  ))
                ) : (
                  <Typography style={{ margin: "2vmax" }}>
                    No Followers Yet
                  </Typography>
                )}
              </div>
            </Dialog>
          </>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
