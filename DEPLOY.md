# Hướng dẫn Deploy và Cấu hình SPA Routing

## Vấn đề 404 khi truy cập trực tiếp vào routes

Khi deploy React SPA, nếu truy cập trực tiếp vào routes như `/home`, server sẽ trả về 404 vì không tìm thấy file. Cần cấu hình server để redirect tất cả requests về `index.html`.

## Giải pháp theo từng loại server:

### 1. Apache Server (sử dụng .htaccess)

File `.htaccess` đã được tạo trong thư mục `public/` và sẽ tự động được copy vào `dist/` khi build.

**Sau khi build:**
```bash
npm run build
```

Đảm bảo file `.htaccess` có trong thư mục `dist/` (root của website).

**Kiểm tra:**
- Mod_rewrite đã được bật trên Apache
- File `.htaccess` có trong thư mục root của website

### 2. Nginx

Thêm vào server block trong Nginx:

```nginx
location / {
  try_files $uri $uri/ /index.html;
}
```

Hoặc xem file `public/nginx.conf` để biết cấu hình chi tiết.

### 3. Netlify

File `_redirects` đã được tạo trong `public/` và sẽ tự động được copy vào build.

### 4. Vercel

File `vercel.json` đã được tạo trong `public/` và sẽ tự động được copy vào build.

## Kiểm tra sau khi deploy:

1. Truy cập: `https://loccol9696.site/home` (khi chưa login)
   - ✅ Nên redirect về `/login`
   - ❌ Nếu vẫn 404 → Server chưa được cấu hình đúng

2. Truy cập: `https://loccol9696.site/random-route`
   - ✅ Nên redirect về `/login` (catch-all route)
   - ❌ Nếu vẫn 404 → Server chưa được cấu hình đúng

## Lưu ý:

- Sau khi thay đổi cấu hình server, cần restart/reload server
- Đảm bảo file cấu hình được đặt đúng vị trí (root của website)
- Kiểm tra quyền truy cập file (chmod 644 cho .htaccess)

