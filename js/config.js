/*
 * Toàn bộ nội dung thiệp nằm ở đây — sửa file này là đủ, không cần đụng tới app.js.
 * Ảnh/nhạc đặt trong thư mục assets/ rồi trỏ đường dẫn tương ứng.
 */
window.WEDDING = {
  meta: {
    title: "Thiệp cưới Thế Anh & Bích Hạnh",
    description: "Trân trọng kính mời bạn đến chung vui cùng Thế Anh & Bích Hạnh.",
    image: "assets/images/share.jpg",
  },

  theme: {
    emp: "#0B480A", // màu nhấn (tiêu đề, ngày cưới trên lịch...)
    namesColor: "#0A4106", // màu tên cô dâu chú rể ở phần "Thông tin lễ cưới"
  },

  // Màn hình mở thiệp
  opening: {
    enabled: true,
    text: "We said yes",
    duration: 3200, // ms trước khi tự đóng
  },

  // Muốn có nhạc: chép file .mp3 vào assets/music/, điền đường dẫn vào src và đặt enabled: true
  music: {
    enabled: false,
    src: "",
  },

  // false = chú rể trước, true = cô dâu trước
  brideFirst: false,

  groom: {
    fullName: "Thế Anh",
    shortName: "Thế Anh",
    father: { title: "Ông", name: "Phạm Văn Hướng" },
    mother: { title: "Bà", name: "Trần Thị Hương" },
    address: "Xã Nam Minh, tỉnh Ninh Bình",
  },
  bride: {
    fullName: "Bích Hạnh",
    shortName: "Bích Hạnh",
    father: { title: "Ông", name: "Lê Minh Đức" },
    mother: { title: "Bà", name: "Mạc Thị Thà" },
    address: "",
  },

  hero: {
    image: "assets/images/hero.jpg",
    line1: "for",
    line2: "ever.",
    textColor: "#FFFFFF",
  },

  intro: {
    title: "Lời mời chân thành",
    description:
      "Hôm nay không chỉ là ngày cưới,\nmà là ngày chúng con viết tiếp hành trình đã bắt đầu từ rất lâu.\n\nRất hân hạnh được chào đón bạn.",
    image: "assets/images/intro.jpg",
  },

  // Để trống "" thì dòng đó không hiện
  contact: {
    groom: "0382 717 655",
    groomFather: "",
    groomMother: "",
    bride: "",
    brideFather: "",
    brideMother: "",
  },

  ceremonyInfo: {
    title: "THÔNG TIN LỄ CƯỚI",
    groomParentLabel: "Ông Bà",
    brideParentLabel: "Ông Bà",
    announcementLine1: "TRÂN TRỌNG BÁO TIN",
    announcementLine2: "LỄ THÀNH HÔN CỦA CON CHÚNG TÔI",
  },

  invitation: {
    topLine: "Trân trọng kính mời",
    ceremonies: [
      { title: "Lễ thành hôn", date: "2026-11-24", time: "07:30", lunarNote: "(Nhằm ngày 16 tháng 10 năm Bính Ngọ)" },
    ],
  },

  timeline: {
    enabled: true,
    coverImage: "assets/images/story-cover.jpg",
    coverTitleTop: "Two Hearts",
    coverTitleBottom: "ONE STORY",
    items: [
      { year: "2020", date: "20/08", title: "Lần đầu gặp nhau", description: "Một buổi chiều mưa, hai người tình cờ chung bàn.", image: "assets/images/story-1.jpg" },
      { year: "2022", date: "14/02", title: "Chính thức hẹn hò", description: "Valentine đầu tiên — cũng là lời hứa bắt đầu từ đó.", image: "assets/images/story-2.jpg" },
      { year: "2025", date: "24/12", title: "Lời cầu hôn", description: "Giữa ánh đèn Giáng sinh, Thế Anh đã hỏi câu quan trọng nhất.", image: "assets/images/story-3.jpg" },
    ],
  },

  // Ngày giờ chính dùng cho lịch + đếm ngược
  weddingDate: {
    date: "2026-11-24",
    time: "07:30", // 24h
    utcOffset: "+07:00",
    // Giữa "Thế Anh" và "Bích Hạnh" là dấu cách không ngắt dòng, để mỗi tên nằm trên một dòng
    ddayText: "Còn (D-Day) ngày nữa là đến đám cưới của Thế Anh và Bích Hạnh.",
  },

  middlePhoto: "assets/images/middle.jpg",

  location: {
    title: "Địa điểm tổ chức",
    showMap: false, // true = nhúng bản đồ Google Maps dưới mỗi địa điểm
    items: [
      {
        label: "Lễ thành hôn",
        address: "Xã Nam Minh, tỉnh Ninh Bình",
        details: ["Thời gian: 07:30 sáng, Thứ ba 24/11/2026"],
        mapQuery: "Xã Nam Minh, Ninh Bình",
      },
    ],
  },

  gallery: {
    title: "Khoảnh khắc của chúng mình",
    // Mỗi ảnh cần thêm bản nhỏ cùng tên trong assets/images/gallery/thumbs/
    images: [
      "assets/images/gallery/01.jpg", "assets/images/gallery/02.jpg", "assets/images/gallery/03.jpg",
      "assets/images/gallery/04.jpg", "assets/images/gallery/05.jpg", "assets/images/gallery/06.jpg",
      "assets/images/gallery/07.jpg", "assets/images/gallery/08.jpg", "assets/images/gallery/09.jpg",
      "assets/images/gallery/10.jpg", "assets/images/gallery/11.jpg", "assets/images/gallery/12.jpg",
      "assets/images/gallery/13.jpg", "assets/images/gallery/14.jpg", "assets/images/gallery/15.jpg",
      "assets/images/gallery/16.jpg", "assets/images/gallery/17.jpg", "assets/images/gallery/18.jpg",
      "assets/images/gallery/19.jpg", "assets/images/gallery/20.jpg", "assets/images/gallery/21.jpg",
      "assets/images/gallery/22.jpg", "assets/images/gallery/23.jpg", "assets/images/gallery/24.jpg",
      "assets/images/gallery/25.jpg", "assets/images/gallery/26.jpg", "assets/images/gallery/27.jpg",
      "assets/images/gallery/28.jpg", "assets/images/gallery/29.jpg", "assets/images/gallery/30.jpg",
    ],
  },

  guestbook: {
    title: "Sổ lưu bút",
    buttonNote: "Hãy để lại lời chúc phúc\ncho cô dâu chú rể.",
    // Lời chúc mẫu; để mảng rỗng [] nếu không muốn hiển thị
    entries: [],
  },

  account: {
    title: "Mừng cưới",
    description: "Sự hiện diện của bạn là món quà ý nghĩa nhất.\nNếu muốn gửi lời chúc mừng, xin vui lòng chuyển khoản:",
    groups: [
      { title: "Nhà trai", open: true, accounts: [{ holder: "PHAM THE ANH", bank: "TPBank", number: "70382717655", qr: null }] },
    ],
  },

  rsvp: {
    title: "Xác nhận tham dự",
    description: "Vui lòng xác nhận trước ngày cưới để Thế Anh & Bích Hạnh chuẩn bị đón tiếp chu đáo nhất.",
    popupMessage: "Quý khách có thể gửi xác nhận tham dự trước cho Thế Anh & Bích Hạnh.",
    buttonName: "Gửi xác nhận",
    shuttlePoints: ["Quận 1, TP. Hồ Chí Minh", "Quận 7, TP. Hồ Chí Minh"],
  },

  ending: {
    image: "assets/images/ending.jpg",
    message:
      "Cảm ơn bạn đã ghé thăm tấm thiệp nhỏ này.\n\nSự hiện diện và lời chúc của bạn\nlà món quà ý nghĩa nhất với chúng mình.\n\nWith love,\nThế Anh & Bích Hạnh",
  },

  // URL Google Apps Script (xem server/google-apps-script.gs) để lưu RSVP + lưu bút vào Google Sheet.
  // Để trống: dữ liệu chỉ lưu tạm trên trình duyệt của khách.
  endpoint: "",
};
