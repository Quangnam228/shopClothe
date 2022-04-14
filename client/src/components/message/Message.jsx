import "./message.css";
import { format } from "timeago.js";

export default function Message({ own, messages }) {
  return (
    <div className={own ? "message own" : "message"}>
      <div className="messageTop">
        <img
          src="https://crowd-literature.eu/wp-content/uploads/2015/01/no-avatar.gif"
          alt=""
          className="messageImg"
        />
        <p className="messageText">{messages.text}</p>
      </div>
      <div className="messageBottom">{format(messages.createdAt)}</div>
    </div>
  );
}
