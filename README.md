# Tiến Lên Miền Nam - Frontend

Giao diện frontend cho game Tiến Lên Miền Nam với theme Tết truyền thống Việt Nam.

## 🎨 Tính năng

- ✅ Đăng ký tài khoản với xác thực OTP qua email
- ✅ Đăng nhập bằng email/password
- ✅ Đăng nhập bằng Google
- ✅ Quên mật khẩu với xác thực OTP
- ✅ Giao diện đẹp mắt với theme Tết (đỏ, vàng)
- ✅ Responsive design
- ✅ Form validation
- ✅ Protected routes

## 🚀 Cài đặt

1. Cài đặt dependencies:

```bash
npm install
```

2. Tạo file `.env` (tùy chọn):

```env
VITE_API_URL=http://localhost:8080/api
VITE_GOOGLE_CLIENT_ID=your-google-client-id
```

3. Chạy development server:

```bash
npm run dev
```

4. Build cho production:

```bash
npm run build
```

## 📁 Cấu trúc dự án

```
src/
├── components/          # Các component UI tái sử dụng
│   ├── Button.tsx
│   ├── Card.tsx
│   ├── Input.tsx
│   ├── OTPInput.tsx
│   └── PrivateRoute.tsx
├── contexts/            # React Context
│   └── AuthContext.tsx
├── pages/              # Các trang
│   ├── Login.tsx
│   ├── Register.tsx
│   ├── VerifyRegister.tsx
│   ├── ForgotPassword.tsx
│   ├── VerifyForgotPassword.tsx
│   └── Home.tsx
├── services/           # API services
│   ├── api.ts
│   └── authService.ts
├── App.tsx
├── main.tsx
└── index.css
```

## 🎨 Theme

Giao diện được thiết kế với màu sắc Tết truyền thống:

- **Đỏ (Tet Red)**: #DC143C
- **Vàng (Tet Gold)**: #FFD700
- **Đỏ đậm (Tet Dark Red)**: #B22222

## 🔗 API Endpoints

Frontend tích hợp với các API sau:

- `POST /api/auth/register` - Đăng ký
- `POST /api/auth/register/verify` - Xác thực đăng ký
- `POST /api/auth/login` - Đăng nhập
- `POST /api/auth/login/google` - Đăng nhập Google
- `POST /api/auth/password/forgot` - Quên mật khẩu
- `PATCH /api/auth/password/forgot/verify` - Xác thực quên mật khẩu

## 📝 Lưu ý

- Backend API phải chạy trên port 8080 (hoặc cấu hình trong `.env`)
- Token được lưu trong localStorage
- Tự động redirect về login nếu token hết hạn

## 🔐 Cấu hình Google OAuth

Để sử dụng đăng nhập Google, bạn cần:

1. **Tạo Google OAuth 2.0 Client ID:**
   - Truy cập [Google Cloud Console](https://console.cloud.google.com/)
   - Tạo project mới hoặc chọn project hiện có
   - Vào **APIs & Services** > **Credentials**
   - Click **Create Credentials** > **OAuth client ID**
   - Chọn **Web application**
   - Thêm **Authorized redirect URIs**: `http://localhost:3000/auth/google/callback`
   - Copy **Client ID**

2. **Cấu hình trong frontend:**
   - Tạo file `.env` trong thư mục `tien-len-mien-nam-frontend`
   - Thêm: `VITE_GOOGLE_CLIENT_ID=your-google-client-id-here`

3. **Cấu hình trong backend:**
   - Cập nhật `google.redirect-uri` trong `application.properties` hoặc `.env`:
     ```
     google.redirect-uri=http://localhost:3000/auth/google/callback
     ```

4. **Lưu ý:**
   - Redirect URI phải khớp chính xác giữa Google Console và backend
   - Nếu deploy production, cập nhật redirect URI tương ứng
