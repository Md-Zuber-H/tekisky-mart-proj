import { useState } from "react";

const ProfileDropdown = ({ user, onLogout }) => {
  const [show, setShow] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative">
      {/* Profile Button */}
      <button
        onClick={() => setShow(!show)}
        className="font-medium flex items-center gap-1"
      >
        👤 {user.name}
      </button>

      {/* Dropdown */}
      {show && (
        <div className="absolute right-0 mt-2 w-64 bg-white border rounded shadow-lg p-4 z-50">
          <p className="font-semibold mb-2">Profile</p>

          <div className="text-sm space-y-2">
            <div>
              <span className="text-gray-500">Username:</span>
              <p>{user.name}</p>
            </div>

            <div>
              <span className="text-gray-500">Email:</span>
              <p>{user.email}</p>
            </div>

            <div>
              <span className="text-gray-500">Password:</span>
              <div className="flex items-center gap-2">
                <span>
                  {showPassword ? "********" : "********"}
                </span>
                <button
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-blue-600"
                >
                  👁
                </button>
              </div>
            </div>
          </div>

          <button
            onClick={onLogout}
            className="mt-4 w-full text-red-600 border-t pt-2"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
