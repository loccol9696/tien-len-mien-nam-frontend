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
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    const duration = toast.duration || 4000;
    const interval = 50; // Update every 50ms for smooth animation
    const decrement = (100 / duration) * interval;

    const progressTimer = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev - decrement;
        return newProgress <= 0 ? 0 : newProgress;
      });
    }, interval);

    const timer = setTimeout(() => {
      setIsRemoving(true);
      setTimeout(() => {
        onRemove(toast.id);
      }, 300); // Wait for animation to complete
    }, duration);

    return () => {
      clearTimeout(timer);
      clearInterval(progressTimer);
    };
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
        w-[280px]
        max-w-[calc(100vw-1.5rem)]
        sm:w-[320px]
        sm:max-w-sm
        md:max-w-md
        px-4 sm:px-5 md:px-6
        py-3 sm:py-4
        rounded-lg
        sm:rounded-xl
        shadow-2xl
        flex items-start gap-2 sm:gap-3
        cursor-pointer
        transition-all duration-300
        hover:scale-[1.02]
        relative
        overflow-hidden
      `}
      onClick={handleRemove}
    >
      <p className="flex-1 font-medium text-sm sm:text-base break-words word-break-break-word leading-relaxed">
        {toast.message}
      </p>
      <button
        onClick={(e) => {
          e.stopPropagation();
          handleRemove();
        }}
        className="flex-shrink-0 text-white/90 hover:text-white transition-colors text-lg sm:text-xl font-bold leading-none mt-0.5 w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center rounded-full hover:bg-white/20"
        aria-label="Đóng thông báo"
      >
        ×
      </button>

      {/* Progress bar line */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 sm:h-1 bg-black/20">
        <div
          className="h-full bg-white/60 transition-all ease-linear"
          style={{
            width: `${progress}%`,
            transition: isRemoving ? "none" : "width 50ms linear",
          }}
        />
      </div>
    </div>
  );
};

export default Toast;
