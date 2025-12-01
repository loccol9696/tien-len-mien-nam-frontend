import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "../contexts/ToastContext";
import { authService } from "../services/authService";
import Button from "../components/Button";
import Input from "../components/Input";
import Card from "../components/Card";
import Modal from "../components/Modal";
import OTPInput from "../components/OTPInput";

const Register: React.FC = () => {
  const navigate = useNavigate();
  const { showError, showSuccess } = useToast();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState(false);
  const [showOTPModal, setShowOTPModal] = useState(false);
  const [otp, setOtp] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [countdown, setCountdown] = useState(0);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Họ tên không được để trống";
    }

    if (!formData.email) {
      newErrors.email = "Email không được để trống";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email không hợp lệ";
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

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
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
      const response = await authService.register(formData);
      if (response.success) {
        showSuccess("Mã OTP đã được gửi đến email của bạn. Vui lòng kiểm tra.");
        // Lưu thông tin đăng ký để dùng cho gửi lại OTP
        localStorage.setItem("registerData", JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          password: formData.password,
          confirmPassword: formData.confirmPassword,
        }));
        setShowOTPModal(true);
        setCountdown(60);
      }
    } catch (error: any) {
      showError(
        error.response?.data?.message || "Đăng ký thất bại. Vui lòng thử lại."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleOTPComplete = (otpCode: string) => {
    setOtp(otpCode);
  };

  const handleVerifyOTP = async () => {
    if (!otp || otp.length !== 6) {
      showError("Vui lòng nhập đầy đủ 6 chữ số OTP");
      return;
    }

    setIsVerifying(true);
    try {
      const response = await authService.verifyRegister({
        email: formData.email,
        otpCode: otp,
      });
      if (response.success) {
        localStorage.removeItem("registerData");
        showSuccess("Xác minh thành công! Đang chuyển đến trang đăng nhập...");
        setTimeout(() => {
          setShowOTPModal(false);
          navigate("/login");
        }, 1500);
      }
    } catch (error: any) {
      showError(
        error.response?.data?.message || "Mã OTP không hợp lệ"
      );
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResendOTP = async () => {
    if (countdown > 0) return;

    const savedRegisterData = localStorage.getItem("registerData");
    if (!savedRegisterData) {
      showError("Không tìm thấy thông tin đăng ký. Vui lòng đăng ký lại.");
      return;
    }

    const registerData = JSON.parse(savedRegisterData);
    setIsVerifying(true);
    try {
      const response = await authService.register({
        fullName: registerData.fullName,
        email: registerData.email,
        password: registerData.password,
        confirmPassword: registerData.confirmPassword,
      });
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
          <h1 className="text-4xl font-bold text-tet-red mb-2">Đăng Ký</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <Input
            label="Họ và tên"
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            error={errors.fullName}
            placeholder="Nhập họ và tên"
          />

          <Input
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
            placeholder="Nhập email của bạn"
          />

          <Input
            label="Mật khẩu"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            error={errors.password}
            placeholder="Nhập mật khẩu (tối thiểu 6 ký tự)"
          />

          <Input
            label="Xác nhận mật khẩu"
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            error={errors.confirmPassword}
            placeholder="Nhập lại mật khẩu"
          />

          <Button
            type="submit"
            variant="primary"
            isLoading={isLoading}
            className="w-full"
          >
            Đăng Ký
          </Button>

          <div className="text-center mt-6">
            <p className="text-gray-600">
              Đã có tài khoản?{" "}
              <Link
                to="/login"
                className="text-tet-red hover:text-tet-dark-red font-semibold transition-colors"
              >
                Đăng nhập ngay
              </Link>
            </p>
          </div>
        </form>
      </Card>

      <Modal
        isOpen={showOTPModal}
        onClose={() => {
          setShowOTPModal(false);
          setOtp("");
        }}
        title="Xác Minh Email"
      >
        <div className="space-y-6">
          <div className="text-center">
            <p className="text-gray-600 text-sm">
              Chúng tôi đã gửi mã OTP đến email: <br />
              <span className="font-semibold text-tet-red">{formData.email}</span>
            </p>
          </div>

          <OTPInput
            length={6}
            onComplete={handleOTPComplete}
            error={undefined}
          />

          <Button
            type="button"
            variant="primary"
            onClick={handleVerifyOTP}
            isLoading={isVerifying}
            className="w-full"
          >
            Xác Minh
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

export default Register;
