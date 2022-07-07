import { Avatar, Button, Dialog, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteUserProfile, getMyPost, logoutUser } from "../../Actions/User";
import Loader from "../Loader/Loader";
import Post from "../Post/Post";
import { useAlert } from "react-alert";
import "./Account.css";
import User from "../User/User";

const Account = () => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { loading, error, posts } = useSelector((state) => state.myPosts);
  const {
    message,
    error: likeError,
    loading: deleteLoading,
  } = useSelector((state) => state.like);
  const { user, loading: userLoading } = useSelector((state) => state.user);

  const [followersToggle, setFollowersToggle] = useState(false);
  const [followintToggle, setFollowintToggle] = useState(false);

  const logoutHandler = () => {
    dispatch(logoutUser());
    alert.success("Logout Successfully");
  };

  const deleteProfileHandler = async () => {
    await dispatch(deleteUserProfile());
    dispatch(logoutUser());
  };

  useEffect(() => {
    dispatch(getMyPost());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch({ type: "clearErrors" });
    }

    if (likeError) {
      alert.error(likeError);
      dispatch({ type: "clearErrors" });
    }

    if (message) {
      alert.success(message);
      dispatch({ type: "clearMessages" });
    }
  }, [alert, error, message, likeError, dispatch]);

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
              isAccount={true}
              isDelete={true}
            />
          ))
        ) : (
          <Typography variant="h6">No Posts Yet</Typography>
        )}
      </div>
      <div className="accountright">
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

        <Button onClick={logoutHandler} variant="contained">
          Logout
        </Button>

        <Link to="/update/profile">Edit Profile</Link>
        <Link to="/update/password">Change Password</Link>

        <Button
          onClick={deleteProfileHandler}
          disabled={deleteLoading}
          variant="text"
          style={{ color: "red", margin: "2vmax" }}
        >
          Delete My Profile
        </Button>

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
      </div>
    </div>
  );
};

export default Account;
