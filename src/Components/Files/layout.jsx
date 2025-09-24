import { Outlet, NavLink } from "react-router-dom";
import { Home, CalendarCheck, List } from "lucide-react";

export default function Layout() {
  return (
    <div className="flex justify-center bg-gray-100 min-h-screen">
      {/* Phone Frame */}
      <div className="w-full max-w-sm bg-white shadow-xl min-h-screen relative flex flex-col">
        {/* Page Content */}
        <div className="flex-1 overflow-y-auto pb-20 px-3">
          <Outlet />
        </div>

        {/* Bottom Navigation */}
        <nav className="bg-white border-t shadow-lg fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-sm flex justify-around py-2 rounded-t-2xl">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `flex flex-col items-center text-xs font-medium transition ${
                isActive
                  ? "text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500"
                  : "text-gray-500"
              }`
            }
          >
            <Home className="w-6 h-6 mb-1" />
            <span>Dashboard</span>
          </NavLink>

          <NavLink
            to="/appointments"
            className={({ isActive }) =>
              `flex flex-col items-center text-xs font-medium transition ${
                isActive
                  ? "text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500"
                  : "text-gray-500"
              }`
            }
          >
            <CalendarCheck className="w-6 h-6 mb-1" />
            <span>Appointments</span>
          </NavLink>

          <NavLink
            to="/queue"
            className={({ isActive }) =>
              `flex flex-col items-center text-xs font-medium transition ${
                isActive
                  ? "text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500"
                  : "text-gray-500"
              }`
            }
          >
            <List className="w-6 h-6 mb-1" />
            <span>Queue</span>
          </NavLink>
        </nav>
      </div>
    </div>
  );
}
