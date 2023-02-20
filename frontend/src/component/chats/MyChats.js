import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getChat } from "../../app/features/chatSlice";
import { getChatName } from "../../utility/chatPageLogic";

const MyChats = () => {
  const dispatch = useDispatch();

  const { token, userData } = useSelector((state) => state.user);

  const { chat } = useSelector((state) => state.chat);

  useEffect(() => {
    dispatch(getChat(token));
    // eslint-disable-next-line
  }, []);
  return (
    <div className="p-2">
      <div className="d-flex justify-content-between align-items-center">
        <h4>My Chats</h4>
        <button className="btn  btn-outline-secondary fw-bold ">
          Create Group Chat
        </button>
      </div>
      <div className="mt-2">
        {chat &&
          chat.map((chat, i) => {
            const { isGroupChat, chatName, users } = chat;
            return (
              <button
                key={i}
                className="btn btn-outline-secondary text-start border-0 w-100 mt-4 p-2 shadow rounded"
              >
                <h5>{isGroupChat ? chatName : getChatName(userData, users)}</h5>
              </button>
            );
          })}
      </div>
    </div>
  );
};

export default MyChats;
