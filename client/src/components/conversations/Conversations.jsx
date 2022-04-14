import "./conversations.css";
import { useEffect, useState } from "react";
import { publicRequest } from "../../requestMethods";

export default function Conversations({ conversation, currentUser }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const friendId = conversation.members.find((m) => m !== currentUser._id);

    const getUser = async () => {
      try {
        const res = await publicRequest.get("/users/find/" + friendId);

        setUser(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, [conversation, currentUser]);

  return (
    <div className="conversation">
      <img
        src={
          user?.img
            ? user.img
            : "https://crowd-literature.eu/wp-content/uploads/2015/01/no-avatar.gif"
        }
        alt=""
        className="conversationImg"
      />
      <span className="conversationName">{user?.username}</span>
    </div>
  );
}
