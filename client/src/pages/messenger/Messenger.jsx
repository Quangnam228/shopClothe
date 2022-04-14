import Announcement from "../../components/Announcement";
import Navbar from "../../components/Navbar";
import "./messenger.css";
import { useEffect, useState, useRef } from "react";
import Conversations from "../../components/conversations/Conversations";
import Message from "../../components/message/Message";
import { useSelector } from "react-redux";
import { publicRequest } from "../../requestMethods";
import { io } from "socket.io-client";

export default function Messenger() {
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessages, setNewMessages] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const scrollRef = useRef();
  const socket = useRef();
  let user = useSelector((state) => state.user.currentUser);
  const currentUser = user.user;

  useEffect(() => {
    socket.current = io("ws://localhost:8900");
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    socket.current.emit("addUser", currentUser._id);
    socket.current.on("getUsers", (users) => {
      console.log(users);
    });
  }, [currentUser]);

  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await publicRequest.get(
          "/conversations/" + currentUser._id
        );
        setConversations(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getConversations();
  }, [currentUser._id]);

  useEffect(() => {
    const getMessages = async () => {
      const res = await publicRequest.get("/message/" + currentChat?._id);
      setMessages(res.data);
    };
    getMessages();
  }, [currentChat]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      sender: currentUser._id,
      text: newMessages,
      conversationId: currentChat._id,
    };

    const receiverId = currentChat.members.find(
      (member) => member !== currentUser._id
    );
    // console.log(receiverId, currentUser._id);
    socket.current.emit("sendMessage", {
      senderId: currentUser._id,
      receiverId,
      text: newMessages,
    });

    try {
      const res = await publicRequest.post("/message", message);
      setMessages([...messages, res.data]);
      setNewMessages("");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
      <Navbar />
      <Announcement />
      <div className="messenger">
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            <input
              placeholder="Search for customer"
              className="chatMenuInput"
            />
            {conversations.map((c, index) => (
              <div onClick={() => setCurrentChat(c)} key={index}>
                <Conversations conversation={c} currentUser={currentUser} />
              </div>
            ))}
          </div>
        </div>
        <div className="chatBox">
          <div className="chatBoxWrapper">
            {currentChat ? (
              <>
                <div className="chatBoxTop">
                  {messages.map((m, index) => (
                    <div ref={scrollRef} key={`${m._id} ${index}`}>
                      <Message
                        own={m.sender === currentUser._id}
                        messages={m}
                      />
                    </div>
                  ))}
                </div>
                <div className="chatBoxBottom">
                  <textarea
                    placeholder="write something..."
                    className="chatMessageInput"
                    onChange={(e) => setNewMessages(e.target.value)}
                    value={newMessages}
                  ></textarea>
                  <button className="chatSubmitButton" onClick={handleSubmit}>
                    Send
                  </button>
                </div>
              </>
            ) : (
              <span className="noConversationText">
                Open a conversation to start a chat
              </span>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
