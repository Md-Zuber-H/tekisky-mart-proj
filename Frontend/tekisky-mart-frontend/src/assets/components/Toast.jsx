import { useEffect, useState } from "react";

const Toast = ({ message }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (message) {
      setShow(true);
      const timer = setTimeout(() => setShow(false), 2300);
      return () => clearTimeout(timer);
    }
  }, [message]);

  if (!message || !show) return null;

  return (
    <div className="fixed top-20 right-5 z-50 animate-slide-in">
      <div className="flex items-center gap-3 bg-green-600 text-white px-4 py-3 rounded-lg shadow-lg">
        
        {/* ✅ Animated Check Icon */}
        <span className="flex items-center justify-center w-6 h-6 bg-white text-green-600 rounded-full font-bold animate-pop">
          ✓
        </span>

        <span className="text-sm font-medium">{message}</span>
      </div>
    </div>
  );
};

export default Toast;
