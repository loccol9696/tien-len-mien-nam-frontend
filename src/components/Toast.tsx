import React, { useEffect, useState } from "react";

export type ToastType = "success" | "error" | "info" | "warning";

export interface Toast {
  id: string;
  message: string;
  type: ToastType;
  duration?: number;
}

interface ToastProps {
  toast: Toast;
  onRemove: (id: string) => void;
}

const Toast: React.FC<ToastProps> = ({ toast, onRemove }) => {
  const [isRemoving, setIsRemoving] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsRemoving(true);
      setTimeout(() => {
        onRemove(toast.id);
      }, 300); // Wait for animation to complete
    }, toast.duration || 4000);

    return () => clearTimeout(timer);
  }, [toast.id, toast.duration, onRemove]);

  const handleRemove = () => {
    setIsRemoving(true);
    setTimeout(() => {
      onRemove(toast.id);
    }, 300);
  };

  const getToastStyles = () => {
    switch (toast.type) {
      case "success":
        return "bg-green-500 text-white";
      case "error":
        return "bg-red-500 text-white";
      case "warning":
        return "bg-yellow-500 text-white";
      case "info":
        return "bg-blue-500 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  return (
    <div
      className={`
        toast-notification
        ${isRemoving ? "removing" : ""}
        ${getToastStyles()}
        w-[350px]
        max-w-[90vw]
        px-6 py-4
        rounded-lg
        shadow-2xl
        flex items-start gap-3
        cursor-pointer
        transition-all duration-300
        hover:scale-105
      `}
      onClick={handleRemove}
    >
      <p className="flex-1 font-medium break-words word-break-break-word">
        {toast.message}
      </p>
      <button
        onClick={(e) => {
          e.stopPropagation();
          handleRemove();
        }}
        className="flex-shrink-0 text-white hover:text-gray-200 transition-colors text-xl font-bold leading-none mt-0.5"
      >
        ×
      </button>
    </div>
  );
};

export default Toast;
