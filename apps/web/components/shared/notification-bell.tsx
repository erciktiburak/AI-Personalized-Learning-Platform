"use client";

import { Bell } from "lucide-react";
import { useState } from "react";

export function NotificationBell() {
  const [hasNotifications] = useState(true);

  return (
    <button className="relative rounded-full p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500">
      <Bell className="h-6 w-6" />
      {hasNotifications && (
        <span className="absolute top-2 right-2 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white"></span>
      )}
    </button>
  );
}
