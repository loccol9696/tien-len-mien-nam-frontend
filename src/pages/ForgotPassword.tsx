import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "../contexts/ToastContext";
import { authService } from "../services/authService";
import Button from "../components/Button";
import Input from "../components/Input";
import Card from "../components/Card";
import Modal from "../components/Modal";
import OTPInput from "../components/OTPInput";

const ForgotPassword: React.FC = () => {
  const navigate = useNavigate();
  const { showError, showSuccess } = useToast();
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<{ email?: string }>({});
  const [isLoading, setIsLoading] = useState(false);
  const [showOTPModal, setShowOTPModal] = useState(false);
  const [otp, setOtp] = useState("");
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [otpErrors, setOtpErrors] = useState<{ [key: string]: string }>({});
  const [isVerifying, setIsVerifying] = useState(false);
  const [countdown, setCountdown] = useState(0);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (errors.email) {
      setErrors({});
    }
  };

  const validate = () => {
    if (!email) {
      setErrors({ email: "Email không được để trống" });
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setErrors({ email: "Email không hợp lệ" });
      return false;
    }
    return true;
  };

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    setIsLoading(true);
    try {
      const response = await authService.forgotPassword({ email });
      if (response.success) {
        showSuccess("Mã OTP đã được gửi đến email của bạn. Vui lòng kiểm tra.");
        setShowOTPModal(true);
        setCountdown(60);
      }
    } catch (error: any) {
      showError(
        error.response?.data?.message ||
          "Không thể gửi mã OTP. Vui lòng thử lại."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleOTPComplete = (otpCode: string) => {
    setOtp(otpCode);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (otpErrors[name]) {
      setOtpErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateOTPForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!otp || otp.length !== 6) {
      newErrors.otp = "Vui lòng nhập đầy đủ 6 chữ số OTP";
    }

    if (!formData.password) {
      newErrors.password = "Mật khẩu không được để trống";
    } else if (formData.password.length < 6) {
      newErrors.password = "Mật khẩu phải có ít nhất 6 ký tự";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Vui lòng xác nhận lại mật khẩu";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Mật khẩu xác nhận không khớp";
    }

    setOtpErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleVerifyOTP = async () => {
    if (!validateOTPForm()) return;

    setIsVerifying(true);
    try {
      const response = await authService.verifyForgotPassword({
        email,
        otpCode: otp,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
      });
      if (response.success) {
        showSuccess("Đặt lại mật khẩu thành công! Đang chuyển đến trang đăng nhập...");
        setTimeout(() => {
          setShowOTPModal(false);
          navigate("/login");
        }, 1500);
      }
    } catch (error: any) {
      showError(
        error.response?.data?.message ||
          "Đặt lại mật khẩu thất bại. Vui lòng thử lại."
      );
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResendOTP = async () => {
    if (countdown > 0) return;

    setIsVerifying(true);
    try {
      const response = await authService.forgotPassword({ email });
      if (response.success) {
        showSuccess("Mã OTP mới đã được gửi đến email của bạn");
        setCountdown(60);
        setOtp("");
      }
    } catch (error: any) {
      showError(error.response?.data?.message || "Không thể gửi lại OTP");
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-10 left-10 text-6xl opacity-20 lantern">
        🏮
      </div>
      <div
        className="absolute top-20 right-20 text-5xl opacity-20 lantern"
        style={{ animationDelay: "1s" }}
      >
        🎋
      </div>
      <div
        className="absolute bottom-20 left-20 text-5xl opacity-20 lantern"
        style={{ animationDelay: "0.5s" }}
      >
        🧧
      </div>
      <div
        className="absolute bottom-10 right-10 text-6xl opacity-20 lantern"
        style={{ animationDelay: "1.5s" }}
      >
        🧧
      </div>

      <Card className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-tet-red mb-2">
            Quên Mật Khẩu
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <Input
            label="Email"
            type="email"
            name="email"
            value={email}
            onChange={handleChange}
            error={errors.email}
            placeholder="Nhập email của bạn"
          />

          <Button
            type="submit"
            variant="primary"
            isLoading={isLoading}
            className="w-full"
          >
            Gửi Mã OTP
          </Button>

          <div className="text-center mt-6">
            <Link
              to="/login"
              className="text-tet-red hover:text-tet-dark-red font-semibold transition-colors"
            >
              ← Quay lại đăng nhập
            </Link>
          </div>
        </form>
      </Card>

      <Modal
        isOpen={showOTPModal}
        onClose={() => {
          setShowOTPModal(false);
          setOtp("");
          setFormData({ password: "", confirmPassword: "" });
        }}
        title="Đặt Lại Mật Khẩu"
      >
        <div className="space-y-5">
          <div className="text-center">
            <p className="text-gray-600 text-sm">
              Chúng tôi đã gửi mã OTP đến email: <br />
              <span className="font-semibold text-tet-red">{email}</span>
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-tet-dark-red mb-2">
              Mã OTP
            </label>
            <OTPInput
              length={6}
              onComplete={handleOTPComplete}
              error={otpErrors.otp}
            />
          </div>

          <Input
            label="Mật khẩu mới"
            type="password"
            name="password"
            value={formData.password}
            onChange={handlePasswordChange}
            error={otpErrors.password}
            placeholder="Nhập mật khẩu mới (tối thiểu 6 ký tự)"
          />

          <Input
            label="Xác nhận mật khẩu mới"
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handlePasswordChange}
            error={otpErrors.confirmPassword}
            placeholder="Nhập lại mật khẩu mới"
          />

          <Button
            type="button"
            variant="primary"
            onClick={handleVerifyOTP}
            isLoading={isVerifying}
            className="w-full"
          >
            Đặt Lại Mật Khẩu
          </Button>

          <div className="text-center">
            <p className="text-gray-600 text-sm mb-2">Chưa nhận được mã OTP?</p>
            <button
              type="button"
              onClick={handleResendOTP}
              disabled={countdown > 0 || isVerifying}
              className="text-tet-red hover:text-tet-dark-red font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {countdown > 0 ? `Gửi lại sau ${countdown}s` : "Gửi lại mã OTP"}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ForgotPassword;
