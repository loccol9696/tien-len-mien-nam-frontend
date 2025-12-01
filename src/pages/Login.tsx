import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import { useAuth } from "../contexts/AuthContext";
import { useToast } from "../contexts/ToastContext";
import { authService } from "../services/authService";
import Button from "../components/Button";
import Input from "../components/Input";
import Card from "../components/Card";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { showError, showSuccess } = useToast();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};

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

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    setIsLoading(true);
    try {
      const response = await authService.login(formData);
      if (response.success && response.data) {
        showSuccess("Đăng nhập thành công!");
        login(response.data.token);
        navigate("/home");
      }
    } catch (error: any) {
      showError(
        error.response?.data?.message || "Đăng nhập thất bại. Vui lòng thử lại."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = useGoogleLogin({
    flow: "auth-code",
    redirect_uri: "postmessage",
    onSuccess: async (codeResponse) => {
      setIsGoogleLoading(true);
      try {
        const response = await authService.googleLogin({
          authorizationCode: codeResponse.code,
        });
        if (response.success && response.data) {
          showSuccess("Đăng nhập Google thành công!");
          login(response.data.token);
          navigate("/home");
        }
      } catch (error: any) {
        showError(
          error.response?.data?.message ||
            "Đăng nhập Google thất bại. Vui lòng thử lại."
        );
      } finally {
        setIsGoogleLoading(false);
      }
    },
    onError: () => {
      showError("Đăng nhập Google thất bại. Vui lòng thử lại.");
      setIsGoogleLoading(false);
    },
  });

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
        🏮
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
          <h1 className="text-4xl font-bold text-tet-red mb-2">Đăng nhập</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
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
            placeholder="Nhập mật khẩu"
          />

          <div className="text-right">
            <Link
              to="/forgot-password"
              className="text-sm text-tet-red hover:text-tet-dark-red font-medium transition-colors"
            >
              Quên mật khẩu?
            </Link>
          </div>

          <Button
            type="submit"
            variant="primary"
            isLoading={isLoading}
            className="w-full"
          >
            Đăng Nhập
          </Button>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Hoặc</span>
            </div>
          </div>

          <Button
            type="button"
            variant="outline"
            onClick={handleGoogleLogin}
            isLoading={isGoogleLoading}
            disabled={isGoogleLoading || isLoading}
            className="w-full flex items-center justify-center gap-3"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Đăng nhập với Google
          </Button>

          <div className="text-center mt-6">
            <p className="text-gray-600">
              Chưa có tài khoản?{" "}
              <Link
                to="/register"
                className="text-tet-red hover:text-tet-dark-red font-semibold transition-colors"
              >
                Đăng ký ngay
              </Link>
            </p>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default Login;
