import React, { useState } from "react";
import { FaArrowLeft, FaEye } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { closeChat } from "../../app/features/chatSlice";
import { getChatName, getChatPicture } from "../../utility/chatPageLogic";

import "./curentChat.css";
import MessagesBox from "./MessagesBox";
import ViewCurentChatDetail from "./ViewCurentChatDetail";

const CurentChat = () => {
  const dispatch = useDispatch();
  const { currentChat } = useSelector((state) => state.chat);
  const { userData } = useSelector((state) => state.user);

  const [viewDetail, setViewDetail] = useState(false);

  const handleCloseChat = () => {
    dispatch(closeChat());
  };

  return (
    <>
      {currentChat ? (
        <>
          <div className="message-box-head d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center">
              <button
                className="message-box-head-back"
                onClick={handleCloseChat}
              >
                <FaArrowLeft />
              </button>
              <div className="ms-3 d-flex align-items-baseline">
                {currentChat.isGroupChat ? (
                  <div className="message-box-head-name">
                    {currentChat.chatName}
                  </div>
                ) : (
                  <>
                    <div className="message-box-head-image  rounded-circle shadow-sm">
                      <img
                        className="w-100 h-100 rounded-circle"
                        src={getChatPicture(userData, currentChat.users)}
                        alt=""
                      />
                    </div>
                    <div className="ms-1 message-box-head-name">
                      {getChatName(userData, currentChat.users)}
                    </div>
                  </>
                )}
              </div>
            </div>
            <div>
              <button
                className="message-box-head-view"
                onClick={() => setViewDetail(true)}
              >
                <FaEye />
              </button>
              {viewDetail ? (
                <ViewCurentChatDetail setViewDetail={setViewDetail} />
              ) : null}
            </div>
          </div>
          <div className="message-box-head-message rounded-2 p-1">
            <MessagesBox />
          </div>
        </>
      ) : (
        <div className="d-flex justify-content-center align-items-center h-100">
          <h4 className="text-muted">For Chating Select A Chat</h4>
        </div>
      )}
    </>
  );
};

export default CurentChat;
