import React, { useRef, useState, KeyboardEvent, ChangeEvent } from "react";

interface OTPInputProps {
  length?: number;
  onComplete: (otp: string) => void;
  error?: string;
}

const OTPInput: React.FC<OTPInputProps> = ({
  length = 6,
  onComplete,
  error,
}) => {
  const [otp, setOtp] = useState<string[]>(new Array(length).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) return; // Chỉ cho phép 1 ký tự

    const newOtp = [...otp];
    newOtp[index] = value.replace(/\D/g, ""); // Chỉ cho phép số
    setOtp(newOtp);

    // Tự động chuyển sang ô tiếp theo
    if (value && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }

    // Kiểm tra nếu đã nhập đủ
    if (newOtp.every((digit) => digit !== "")) {
      onComplete(newOtp.join(""));
    }
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData
      .getData("text")
      .slice(0, length)
      .replace(/\D/g, "");
    const newOtp = [...otp];

    for (let i = 0; i < length && i < pastedData.length; i++) {
      newOtp[i] = pastedData[i];
    }

    setOtp(newOtp);
    const filledLength = Math.min(pastedData.length, length);
    if (filledLength < length) {
      inputRefs.current[filledLength]?.focus();
    } else {
      onComplete(newOtp.join(""));
    }
  };

  return (
    <div className="w-full">
      <div className="flex justify-center gap-2 sm:gap-3 mb-3 sm:mb-4">
        {otp.map((digit, index) => (
          <input
            key={index}
            ref={(el) => (inputRefs.current[index] = el)}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digit}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleChange(index, e.target.value)
            }
            onKeyDown={(e) => handleKeyDown(index, e)}
            onPaste={handlePaste}
            className={`
              w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 text-center text-xl sm:text-2xl font-bold rounded-lg border-2
              transition-all duration-300
              ${
                error
                  ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                  : "border-tet-red/30 focus:border-tet-red focus:ring-2 focus:ring-tet-red/20"
              }
              focus:outline-none
              bg-white/80 backdrop-blur-sm
              text-tet-dark-red
            `}
          />
        ))}
      </div>
      {error && (
        <p className="text-center text-xs sm:text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};

export default OTPInput;
