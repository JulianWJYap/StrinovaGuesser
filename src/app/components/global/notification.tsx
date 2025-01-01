"use client"
import { useNotification } from "../providers/notification-provider";

export default function Notification() {
  const { notification, hideNotification } = useNotification();
  
  return (
    <div
      id="notificationModal"
      className={`${notification.visible ? "" : "hidden "}bg-slate-600/[0.8] fixed w-screen h-screen flex justify-center items-center`}
    >
      <div className="bg-white rounded-lg overflow-hidden grid grid-cols-1">
        <div className="px-9 py-3">
          <div className="grid grid-cols-2 grid-cols-[1fr_1.5rem]">
            <div className="text-black font-bold flex items-center">
              {notification.title}
            </div>
            <div className="flex text-lg pr-2 justify-end">
              <button onClick={hideNotification}>x</button>
            </div>
          </div>
          <div className="text-slate-900 whitespace-pre-line">
            {notification.desc}
          </div>
        </div>
        <div className="bg-gray-50 px-9 py-3 flex justify-end">
          <button 
            className="bg-red-600 hover:bg-red-700 rounded-md px-3 py-1"
            onClick={hideNotification}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
