import { Rating } from "@material-ui/lab";
import React from "react";
import { useSelector } from "react-redux";
// import profilePng from "../../images/Profile.png";
import "./reviewCard.css";

const ReviewCard = ({ review }) => {
  const { users } = useSelector((state) => state.users.users);
  const options = {
    value: review.rating,
    readOnly: true,
    precision: 0.5,
  };

  const userImg = () => {
    return users.map((user) => {
      if (user._id === review.user) {
        return (
          <>
            <img
              src={
                user.img
                  ? user.img
                  : "https://crowd-literature.eu/wp-content/uploads/2015/01/no-avatar.gif"
              }
              alt="User"
              // style="boder-radius:50%"
              className="imgAvatarReview"
            />

            <span className="reviewCardComment">{user.username}</span>
          </>
        );
      }
    });
  };

  return (
    <div className="reviewCard">
      {userImg()}
      <Rating {...options} />
      <span className="reviewCardComment">{review.comment}</span>
    </div>
  );
};

export default ReviewCard;
