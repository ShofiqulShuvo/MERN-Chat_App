import React from "react";
import MyChats from "./MyChats";

const ChatPageBody = () => {
  return (
    <>
      <div className="container mx-auto p-1 row justify-content-between ">
        <div className="col-12 col-md-4 p-2 shadow">
          <MyChats />
        </div>
        <div className="shadow col-12 col-md-8 p-2">ssss</div>
      </div>
    </>
  );
};

export default ChatPageBody;