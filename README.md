# Thiệp cưới Thế Anh & Bích Hạnh

Trang thiệp tĩnh (HTML/CSS/JS thuần, không cần build), bố cục lấy cảm hứng từ mẫu "Parallax ấm áp" của ngaychungdoi.com.
Font chữ dùng Google Fonts; không kèm nhạc, font hay hình vẽ của bên thứ ba.

Bản đang chạy: https://anhprgm.github.io/wedding/

## Xem thử trên máy

```bash
python3 -m http.server 8000
```

Rồi mở http://localhost:8000. Có thể mở thẳng `index.html`, nhưng chạy qua server sẽ giống khi đưa lên host hơn.

## Sửa nội dung

Toàn bộ chữ, ngày giờ, địa điểm, số tài khoản, ảnh, nhạc… nằm trong **`js/config.js`**.
Thường không cần sửa `js/app.js` hay `css/style.css`.

| Muốn đổi | Sửa ở |
|---|---|
| Tên, bố mẹ, địa chỉ | `groom`, `bride` |
| Ảnh bìa, chữ "for ever." | `hero` |
| Ngày giờ lễ | `invitation.ceremonies`, `weddingDate` |
| Câu chuyện tình yêu | `timeline.items` |
| Album ảnh | `gallery.images` |
| Số tài khoản / QR | `account.groups` (`qr`: đường dẫn ảnh QR) |
| Màu nhấn | `theme.emp` |
| Nhạc nền (đang tắt) | `music` — chép file .mp3 vào `assets/music/`, điền `src`, đặt `enabled: true` |

**Ảnh:** ảnh nằm trong `assets/images/` (album ở `assets/images/gallery/`, kèm bản nhỏ trong `gallery/thumbs/`).
Muốn đổi ảnh thì giữ nguyên tên file hoặc đổi đường dẫn trong config; nên thu nhỏ ảnh còn khoảng 1500px trước khi đưa vào.
Ảnh bìa nên dọc tỉ lệ khoảng 2:3. Nhớ thay cả `assets/images/share.jpg` (ảnh hiện khi gửi link qua Zalo/Messenger)
và các thẻ `og:` trong `index.html`.

## RSVP và sổ lưu bút

Nếu để `endpoint: ""`, lời chúc và xác nhận chỉ lưu trên máy của khách; bạn sẽ không nhận được.
Để nhận về Google Sheet:

1. Làm theo hướng dẫn ở đầu file `server/google-apps-script.gs`.
2. Dán URL web app vào `endpoint` trong `js/config.js`.

## Đưa lên mạng

Vì đây là trang tĩnh, có thể kéo-thả cả thư mục lên Netlify Drop, Vercel, Cloudflare Pages hoặc GitHub Pages.
