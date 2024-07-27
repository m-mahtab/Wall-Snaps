import React from "react";

function Notifications() {
  return (
    <div className="  m-2 sm:m-4 md:m-6 xl:m-8 h-auto bg-white rounded-2xl shadow-xl">
      <div className=" h-auto border-b-2 border-slate-100 relative px-3 md:px-4 lg:px-6 py-3">
        <div className="h-auto py-1 md:py-2 xl:py-3 flex items-center justify-between lg:justify-start">
          <p className="font-bold text-lg cat-bar">Notifications</p>
        </div>
      </div>
      <div className=" flex items-center justify-center ">
        <img src="assets/notify2.png" className="h-80" />
      </div>
    </div>
  );
}

export default Notifications;
