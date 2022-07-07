import { Delete } from "@mui/icons-material";
import { Button, Typography } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteCommentOnPost } from "../../Actions/Post";
import { getFollowinPost, getMyPost } from "../../Actions/User";
import "./CommentCard.css";

const CommentCard = ({
  userId,
  name,
  avatar,
  comment,
  postId,
  commentId,
  isAccount,
}) => {
  const dispatch = useDispatch();

  const deleteCommentHandler = async () => {
    await dispatch(deleteCommentOnPost(postId, commentId));

    if (isAccount) {
      dispatch(getMyPost());
    } else {
      dispatch(getFollowinPost());
    }
  };

  const { user } = useSelector((state) => state.user);

  return (
    <div className="commentUser">
      <Link to={`/user/${userId}`}>
        <img src={avatar} alt="" />
        <Typography style={{ minWidth: "6vmax" }}>{name}</Typography>
      </Link>

      <Typography>{comment}</Typography>

      {isAccount ? (
        <Button onClick={deleteCommentHandler}>
          <Delete />
        </Button>
      ) : userId === user._id ? (
        <Button onClick={deleteCommentHandler}>
          <Delete />
        </Button>
      ) : null}
    </div>
  );
};

export default CommentCard;
