import React from "react";

const Loading = () => {
  return (
    <div className="mx-auto animate-spin flex items-center justify-center rounded-full w-24 h-24 bg-gradient-to-tr from-rose-200 to-rose-800">
      <div className="h-16 w-16 rounded-full bg-white"></div>
    </div>
  );
};

export default Loading;
