(function () {
  "use strict";

  var W = window.WEDDING;
  var card = document.getElementById("card");
  var overlays = document.getElementById("overlays");
  var WEEKDAYS = ["Chủ nhật", "Thứ hai", "Thứ ba", "Thứ tư", "Thứ năm", "Thứ sáu", "Thứ bảy"];
  var LOCAL_KEY = "wedding-local-submissions";

  // ---------- helpers ----------
  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }
  function nl2br(s) {
    return esc(s).replace(/\n/g, "<br>");
  }
  function pad(n) {
    return (n < 10 ? "0" : "") + n;
  }
  function parseDate(str) {
    var p = str.split("-").map(Number);
    return { y: p[0], m: p[1], d: p[2], wd: new Date(p[0], p[1] - 1, p[2]).getDay() };
  }
  function to12h(t) {
    var p = t.split(":").map(Number);
    var h = p[0] % 12 || 12;
    return pad(h) + ":" + pad(p[1]) + (p[0] < 12 ? " AM" : " PM");
  }
  function head(eng, vi) {
    return (
      '<div class="section-head" data-aos>' +
      '<p class="eng_title">' + esc(eng) + "</p>" +
      '<h2 class="vi_title">' + esc(vi) + "</h2>" +
      "</div>"
    );
  }
  function $(sel, root) {
    return (root || document).querySelector(sel);
  }
  function $all(sel, root) {
    return Array.prototype.slice.call((root || document).querySelectorAll(sel));
  }
  function couple() {
    return W.brideFirst ? [W.bride, W.groom] : [W.groom, W.bride];
  }

  var ICON = {
    phone:
      '<svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" aria-hidden="true"><path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1z"/></svg>',
    sms:
      '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M4 5h16v11H8l-4 4z" stroke-linejoin="round"/></svg>',
    pen:
      '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M14.5 5.5l4 4M4 20l1-5L16 4l4 4L9 19z" stroke-linejoin="round"/><path d="M4 20h7" stroke-linecap="round"/></svg>',
    chevron:
      '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#1a1a1a" stroke-width="1.8" aria-hidden="true"><path d="M6 15l6-6 6 6" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    card:
      '<svg viewBox="0 0 24 24" width="14" height="14" fill="#555" aria-hidden="true"><rect x="2" y="5" width="20" height="14" rx="2"/></svg>',
    rsvp:
      '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><circle cx="9" cy="7" r="3.2"/><path d="M3.5 20v-2.5A4.5 4.5 0 0 1 8 13h2a4.5 4.5 0 0 1 4.5 4.5V20"/><circle cx="16.5" cy="8.5" r="2.4"/><path d="M17 13.2a4 4 0 0 1 3.5 4V20"/></svg>',
    music:
      '<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true"><path d="M9 17.5V6l11-2.5v11.2a2.8 2.8 0 1 1-1.6-2.5V7.4L10.6 9.2v8.3A2.8 2.8 0 1 1 9 15z"/></svg>',
    chevronRight:
      '<svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="1.2" aria-hidden="true"><path d="M9 4l8 8-8 8" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  };

  // ---------- sections ----------
  function renderHero() {
    var h = W.hero;
    var names = couple();
    var dots = "";
    for (var i = 0; i < 7; i++) dots += "<span></span>";
    return (
      '<section id="section-main" class="hero">' +
      '<div class="hero-frame">' +
      '<img class="hero-img" src="' + esc(h.image) + '" alt="' + esc(names[0].fullName + " & " + names[1].fullName) + '">' +
      "</div>" +
      '<div class="hero-light" aria-hidden="true">' + dots + "</div>" +
      '<div class="hero-text" style="color:' + esc(h.textColor) + '">' +
      '<svg class="hero-word" viewBox="0 0 361 222.5" aria-label="' + esc(h.line1 + " " + h.line2) + '">' +
      '<text class="w1" x="-4" y="105">' + esc(h.line1) + "</text>" +
      '<text class="w2" x="-4" y="220">' + esc(h.line2) + "</text>" +
      "</svg>" +
      '<div class="hero-names"><span>' + esc(names[0].fullName) + "</span><span>" + esc(names[1].fullName) + "</span></div>" +
      "</div>" +
      "</section>"
    );
  }

  function renderIntro() {
    var s = W.intro;
    return (
      '<section id="section-intro" class="sec">' +
      head("INVITATION", s.title) +
      '<p class="intro-desc" data-aos>' + nl2br(s.description) + "</p>" +
      (s.image ? '<div class="intro-image" data-aos><img src="' + esc(s.image) + '" alt="" loading="lazy"></div>' : "") +
      (W.contact ? '<button type="button" class="btn-box" data-open="contact" data-aos>' + ICON.phone + "<span>Liên hệ</span></button>" : "") +
      "</section>"
    );
  }

  function parentsCol(label, p) {
    return (
      '<div class="parents-col">' +
      '<p class="p-label">' + esc(label) + "</p>" +
      '<p class="p-name">' + esc(p.father.name) + "</p>" +
      '<p class="p-name">' + esc(p.mother.name) + "</p>" +
      (p.address ? '<p class="p-addr">' + esc(p.address) + "</p>" : "") +
      "</div>"
    );
  }

  function renderCeremonyInfo() {
    var s = W.ceremonyInfo;
    var cols = W.brideFirst
      ? parentsCol(s.brideParentLabel, W.bride) + '<span class="v-line"></span>' + parentsCol(s.groomParentLabel, W.groom)
      : parentsCol(s.groomParentLabel, W.groom) + '<span class="v-line"></span>' + parentsCol(s.brideParentLabel, W.bride);
    var names = couple();
    return (
      '<section id="section-ceremony-info" class="sec">' +
      head("WEDDING INFO", s.title) +
      '<div class="parents" data-aos>' + cols + "</div>" +
      '<p class="announce" data-aos>' + esc(s.announcementLine1) + "<br>" + esc(s.announcementLine2) + "</p>" +
      '<div class="couple-names" data-aos style="color:' + esc(W.theme.namesColor) + '">' +
      "<span>" + esc(names[0].fullName) + '</span><span class="amp">&amp;</span><span>' + esc(names[1].fullName) + "</span>" +
      "</div>" +
      "</section>"
    );
  }

  function renderInvitation() {
    var s = W.invitation;
    var list = s.ceremonies
      .map(function (c, i) {
        var d = parseDate(c.date);
        return (
          (i ? '<hr class="ceremony-hr">' : "") +
          '<div class="ceremony" data-aos>' +
          '<p class="c-title">' + esc(c.title) + "</p>" +
          '<p class="c-time">' + esc(c.time) + "</p>" +
          '<div class="c-date">' +
          '<span class="c-side">' + esc(WEEKDAYS[d.wd]) + "</span>" +
          '<span class="c-day">' + d.d + "</span>" +
          '<span class="c-side">Tháng ' + pad(d.m) + "</span>" +
          "</div>" +
          '<p class="c-year">' + d.y + "</p>" +
          (c.lunarNote ? '<p class="c-lunar">' + esc(c.lunarNote) + "</p>" : "") +
          "</div>"
        );
      })
      .join("");
    return '<section id="section-invitation" class="sec">' + head("WEDDING INVITATION", s.topLine) + list + "</section>";
  }

  function renderTimeline() {
    var s = W.timeline;
    if (!s || !s.enabled || !s.items.length) return "";
    var firstYear = s.items[0].year;
    var lastYear = parseDate(W.weddingDate.date).y;
    var slides = s.items
      .map(function (it, i) {
        return (
          '<div class="timeline-year ' + (i % 2 ? "bottom" : "top") + '"><div class="year-number-wrap"><span class="year-number">' + esc(it.year) + "</span></div></div>" +
          '<div class="timeline-content">' +
          '<div class="content-image">' + (it.image ? '<img src="' + esc(it.image) + '" alt="" loading="lazy">' : '<div class="content-placeholder"></div>') + "</div>" +
          '<div class="content-info">' +
          '<p class="info-date">' + esc(it.date) + "</p>" +
          '<p class="info-title">' + esc(it.title) + "</p>" +
          '<p class="info-desc">' + nl2br(it.description) + "</p>" +
          "</div></div>"
        );
      })
      .join("");
    return (
      '<section id="section-timeline">' +
      '<div class="timeline-v1" data-aos>' +
      '<div class="timeline-scroll">' +
      '<div class="timeline-cover">' +
      '<svg class="cover-deco cover-deco-top" viewBox="0 0 300 55" role="img" aria-label="' + esc(s.coverTitleTop) + '">' +
      '<text x="150" y="46" text-anchor="middle">' + esc(s.coverTitleTop) + "</text></svg>" +
      '<div class="cover-image"><img src="' + esc(s.coverImage) + '" alt="" loading="lazy"></div>' +
      '<svg class="cover-deco cover-deco-bottom" viewBox="0 0 300 39" role="img" aria-label="' + esc(s.coverTitleBottom) + '">' +
      '<text x="5" y="36" textLength="290" lengthAdjust="spacing">' + esc(s.coverTitleBottom) + "</text></svg>" +
      '<div class="cover-years"><span class="year-label">' + esc(firstYear) + '</span><span class="year-line"></span><span class="year-label">' + lastYear + "</span></div>" +
      '<button type="button" class="scroll-arrow" aria-label="Xem tiếp">' + ICON.chevronRight + "</button>" +
      "</div>" +
      slides +
      "</div></div></section>"
    );
  }

  function renderCalendar() {
    var wd = W.weddingDate;
    var d = parseDate(wd.date);
    var first = new Date(d.y, d.m - 1, 1).getDay();
    var days = new Date(d.y, d.m, 0).getDate();
    var cells = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"]
      .map(function (h, i) {
        return '<span class="day-header' + (i === 0 ? " sunday" : "") + '">' + h + "</span>";
      })
      .join("");
    for (var b = 0; b < first; b++) cells += '<span class="day-cell empty"></span>';
    for (var n = 1; n <= days; n++) {
      var cls = "day-cell";
      if ((first + n - 1) % 7 === 0) cls += " sunday";
      if (n === d.d) cls += " dday";
      cells += '<span class="' + cls + '">' + n + "</span>";
    }
    var units = [
      ["days", "ngày"],
      ["hours", "giờ"],
      ["minutes", "phút"],
      ["seconds", "giây"],
    ];
    var countdown = units
      .map(function (u, i) {
        return (
          (i ? '<span class="sep">:</span>' : "") +
          '<div class="item"><span class="desc">' + u[1] + '</span><span class="num" data-cd="' + u[0] + '">00</span></div>'
        );
      })
      .join("");
    return (
      '<section id="section-calendar" class="sec">' +
      '<div class="calendar-wrap" data-aos>' +
      '<div class="title"><p class="date_num">' + d.y + "." + pad(d.m) + "." + pad(d.d) + '</p><p class="date_ko">' + WEEKDAYS[d.wd] + ", " + to12h(wd.time) + "</p></div>" +
      '<div class="calendar"><div class="calendar-grid">' + cells + "</div></div>" +
      '<div class="dday-wrap"><div class="countdown">' + countdown + '</div><p class="dday-text" data-dday-text></p></div>' +
      "</div></section>"
    );
  }

  function renderMiddlePhoto() {
    if (!W.middlePhoto) return "";
    return '<section id="section-middle-photo" class="middle-photo" data-aos><img src="' + esc(W.middlePhoto) + '" alt="" loading="lazy"></section>';
  }

  function mapsUrl(q) {
    return "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(q);
  }

  function renderLocation() {
    var s = W.location;
    var items = s.items
      .map(function (l, i) {
        var q = l.mapQuery || l.address;
        return (
          '<div class="loc" data-aos>' +
          (i ? '<hr class="loc-hr">' : "") +
          '<p class="loc-label">' + esc(l.label) + "</p>" +
          (l.address ? '<p class="loc-addr">' + esc(l.address) + "</p>" : "") +
          '<div class="loc-detail">' + (l.details || []).map(function (t) { return "<p>" + esc(t) + "</p>"; }).join("") + "</div>" +
          (s.showMap
            ? '<iframe class="loc-map" loading="lazy" src="https://maps.google.com/maps?q=' + encodeURIComponent(q) + '&output=embed" title="Bản đồ ' + esc(l.label) + '"></iframe>'
            : "") +
          '<hr class="loc-hr">' +
          '<a class="btn-pill" href="' + mapsUrl(q) + '" target="_blank" rel="noopener">Chỉ đường - ' + esc(l.label) + "</a>" +
          "</div>"
        );
      })
      .join("");
    return '<section id="section-location" class="sec">' + head("LOCATION", s.title) + items + "</section>";
  }

  function renderGallery() {
    var s = W.gallery;
    if (!s.images.length) return "";
    var thumbs = s.images
      .map(function (src, i) {
        var thumb = src.replace(/([^/]+)$/, "thumbs/$1");
        return '<button type="button" class="gallery-thumb' + (i ? "" : " is-active") + '" data-idx="' + i + '"><img src="' + esc(thumb) + '" alt="" loading="lazy"></button>';
      })
      .join("");
    return (
      '<section id="section-gallery" class="sec">' +
      head("GALLERY", s.title) +
      '<div class="gallery-body" data-aos>' +
      '<div class="gallery-album-main"><img class="gallery-main-img" src="' + esc(s.images[0]) + '" alt="" data-idx="0"></div>' +
      '<div class="gallery-thumbs-strip">' + thumbs + "</div>" +
      "</div></section>"
    );
  }

  function renderGuestbook() {
    var s = W.guestbook;
    return (
      '<section id="section-guestbook" class="sec">' +
      head("GUESTBOOK", s.title) +
      '<div class="guest-books" data-aos>' +
      '<button type="button" class="postit postit-write" data-open="guestbook-write">' + ICON.pen + "<span>Viết lưu bút</span></button>" +
      '<div class="guest-entries"></div>' +
      "</div>" +
      '<div class="guest-actions" data-aos><button type="button" data-open="guestbook-write">Viết</button><button type="button" data-open="guestbook-all">Xem tất cả</button></div>' +
      "</section>"
    );
  }

  function renderAccount() {
    var s = W.account;
    var groups = s.groups
      .map(function (g) {
        var items = g.accounts
          .map(function (a) {
            return (
              '<li class="item"><div class="info">' +
              '<p class="holder">' + ICON.card + "<span>" + esc(a.holder) + "</span></p>" +
              '<button type="button" class="account" data-copy="' + esc(a.number) + '"><span class="bnk">' + esc(a.bank) + '</span> <span class="nmb">' + esc(a.number) + "</span></button>" +
              "</div>" +
              (a.qr ? '<div class="qr-wrap"><img src="' + esc(a.qr) + '" alt="QR ' + esc(a.bank) + '"></div>' : "") +
              "</li>"
            );
          })
          .join("");
        return (
          '<div class="list-wrap">' +
          '<button type="button" class="list-head" aria-expanded="' + (g.open ? "true" : "false") + '">' + esc(g.title) + '<span class="icon-wrap">' + ICON.chevron + "</span></button>" +
          '<ul class="item-list' + (g.open ? " on" : "") + '">' + items + "</ul>" +
          "</div>"
        );
      })
      .join("");
    return (
      '<section id="section-account" class="sec">' +
      head("ACCOUNT", s.title) +
      '<p class="sec-desc" data-aos>' + nl2br(s.description) + "</p>" +
      '<div class="card-account-accordion" data-aos><div class="inner">' + groups + "</div></div>" +
      "</section>"
    );
  }

  function renderRsvp() {
    var s = W.rsvp;
    return (
      '<section id="section-rsvp" class="sec">' +
      head("R.S.V.P.", s.title) +
      '<p class="sec-desc" data-aos>' + nl2br(s.description) + "</p>" +
      '<button type="button" class="btn-box" data-open="rsvp" data-aos>' + ICON.rsvp + "<span>" + esc(s.buttonName) + "</span></button>" +
      "</section>"
    );
  }

  function waveSvg(id) {
    return (
      '<svg class="waves" viewBox="0 24 150 28" preserveAspectRatio="none" aria-hidden="true">' +
      '<defs><path id="' + id + '" d="M-160 44c30 0 58-18 88-18s58 18 88 18 58-18 88-18 58 18 88 18v44h-352z"/></defs>' +
      '<g class="parallax">' +
      '<use href="#' + id + '" x="48" y="0" fill="rgba(255,255,255,0.7)"/>' +
      '<use href="#' + id + '" x="48" y="3" fill="rgba(255,255,255,0.5)"/>' +
      '<use href="#' + id + '" x="48" y="5" fill="rgba(255,255,255,0.3)"/>' +
      '<use href="#' + id + '" x="48" y="7" fill="#fff"/>' +
      "</g></svg>"
    );
  }

  function renderEnding() {
    var s = W.ending;
    if (!s || !s.image) return "";
    return (
      '<section id="section-ending" class="ending">' +
      '<div class="wave top">' + waveSvg("wave-top") + "</div>" +
      '<div class="ending-image"><img src="' + esc(s.image) + '" alt="" loading="lazy">' +
      '<div class="ending-text"><p>' + nl2br(s.message) + "</p></div></div>" +
      '<div class="wave bottom">' + waveSvg("wave-bottom") + "</div>" +
      "</section>"
    );
  }

  // ---------- overlays ----------
  function modal(id, title, body) {
    return (
      '<div class="modal" id="modal-' + id + '" hidden>' +
      '<div class="modal-backdrop" data-close></div>' +
      '<div class="modal-panel" role="dialog" aria-modal="true" aria-label="' + esc(title) + '">' +
      '<div class="modal-head"><p>' + esc(title) + '</p><button type="button" class="modal-close" data-close aria-label="Đóng">&times;</button></div>' +
      '<div class="modal-body">' + body + "</div>" +
      "</div></div>"
    );
  }

  function contactRow(role, name, tel) {
    if (!tel) return "";
    var t = tel.replace(/\s+/g, "");
    return (
      '<li class="contact-row"><span class="c-role">' + esc(role) + '</span><span class="c-name">' + esc(name) + "</span>" +
      '<a href="tel:' + esc(t) + '" aria-label="Gọi ' + esc(name) + '">' + ICON.phone + "</a>" +
      '<a href="sms:' + esc(t) + '" aria-label="Nhắn tin ' + esc(name) + '">' + ICON.sms + "</a></li>"
    );
  }

  function renderOverlays() {
    var c = W.contact || {};
    function contactGroup(side, rows) {
      return rows ? '<div class="contact-group"><p class="contact-side">' + side + "</p><ul>" + rows + "</ul></div>" : "";
    }
    var contactBody =
      contactGroup(
        "Nhà trai",
        contactRow("Chú rể", W.groom.fullName, c.groom) +
          contactRow("Bố", W.groom.father.name, c.groomFather) +
          contactRow("Mẹ", W.groom.mother.name, c.groomMother)
      ) +
      contactGroup(
        "Nhà gái",
        contactRow("Cô dâu", W.bride.fullName, c.bride) +
          contactRow("Bố", W.bride.father.name, c.brideFather) +
          contactRow("Mẹ", W.bride.mother.name, c.brideMother)
      );

    var r = W.rsvp;
    var shuttleOpts = (r.shuttlePoints || [])
      .map(function (p) {
        return '<option value="' + esc(p) + '">' + esc(p) + "</option>";
      })
      .join("");
    var rsvpBody =
      '<form class="form" id="form-rsvp">' +
      '<p class="form-note">' + nl2br(r.popupMessage) + "</p>" +
      '<div class="seg"><label><input type="radio" name="side" value="Nhà trai" checked><span>Khách nhà trai</span></label><label><input type="radio" name="side" value="Nhà gái"><span>Khách nhà gái</span></label></div>' +
      '<div class="seg"><label><input type="radio" name="attend" value="Có" checked><span>Sẽ tham dự</span></label><label><input type="radio" name="attend" value="Không"><span>Rất tiếc, không thể</span></label></div>' +
      '<label class="field"><span>Họ và tên *</span><input name="name" required maxlength="80" autocomplete="name"></label>' +
      '<label class="field"><span>Số điện thoại</span><input name="tel" type="tel" maxlength="20" autocomplete="tel"></label>' +
      '<label class="field" data-attend-only><span>Số người tham dự</span><select name="people">' +
      [1, 2, 3, 4, 5].map(function (n) { return "<option>" + n + "</option>"; }).join("") +
      "</select></label>" +
      (shuttleOpts
        ? '<label class="field" data-attend-only><span>Xe đưa đón</span><select name="shuttle"><option value="">Không cần</option>' + shuttleOpts + "</select></label>" +
          '<label class="field" data-attend-only><span>Ghi chú đưa đón</span><input name="shuttleNote" maxlength="200"></label>'
        : "") +
      '<label class="field"><span>Lời nhắn</span><textarea name="msg" rows="3" maxlength="500"></textarea></label>' +
      '<button type="submit" class="btn-solid">' + esc(r.buttonName) + "</button>" +
      "</form>";

    var gbBody =
      '<form class="form" id="form-guestbook">' +
      '<p class="form-note">' + nl2br(W.guestbook.buttonNote) + "</p>" +
      '<label class="field"><span>Tên của bạn *</span><input name="name" required maxlength="40"></label>' +
      '<label class="field"><span>Lời chúc *</span><textarea name="message" rows="5" required maxlength="500"></textarea></label>' +
      '<button type="submit" class="btn-solid">Gửi lời chúc</button>' +
      "</form>";

    var opening = "";
    if (W.opening && W.opening.enabled) {
      var names = couple();
      var d = parseDate(W.weddingDate.date);
      opening =
        '<div class="opening" id="opening">' +
        '<div class="opening-center"><div class="lds-heart"><div></div></div>' +
        '<div class="typing-wrapper"><span class="typing" data-typing></span><span class="cursor">|</span></div></div>' +
        '<div class="opening-bottom"><span>' + esc(names[0].shortName) + " &amp; " + esc(names[1].shortName) + "</span><span>" + pad(d.d) + "." + pad(d.m) + "." + d.y + "</span></div>" +
        "</div>";
    }

    overlays.innerHTML =
      opening +
      (W.music && W.music.enabled ? '<button type="button" class="music-btn" id="music-btn" aria-label="Bật/tắt nhạc">' + ICON.music + "</button>" : "") +
      modal("contact", "Liên hệ", contactBody) +
      modal("rsvp", W.rsvp.title, rsvpBody) +
      modal("guestbook-write", "Viết lưu bút", gbBody) +
      modal("guestbook-all", W.guestbook.title, '<div class="guest-list"></div>') +
      '<div class="lightbox" id="lightbox" hidden><button type="button" class="lb-close" data-close aria-label="Đóng">&times;</button>' +
      '<button type="button" class="lb-nav lb-prev" aria-label="Ảnh trước">&#8249;</button><img class="lb-img" alt="">' +
      '<button type="button" class="lb-nav lb-next" aria-label="Ảnh sau">&#8250;</button><p class="lb-count"></p></div>' +
      '<div class="toast" id="toast" role="status" aria-live="polite"></div>';
  }

  // ---------- behaviours ----------
  var toastTimer;
  function toast(msg) {
    var t = $("#toast");
    t.textContent = msg;
    t.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () {
      t.classList.remove("show");
    }, 2000);
  }

  function openModal(id) {
    var m = $("#modal-" + id);
    if (!m) return;
    if (id === "guestbook-all") renderGuestList();
    m.hidden = false;
    requestAnimationFrame(function () {
      m.classList.add("open");
    });
    document.body.classList.add("no-scroll");
  }
  function closeModal(m) {
    m.classList.remove("open");
    setTimeout(function () {
      m.hidden = true;
    }, 250);
    if (!$all(".modal.open").length && $("#lightbox").hidden) document.body.classList.remove("no-scroll");
  }

  function fitHeroWord() {
    var svg = $(".hero-word");
    if (!svg) return;
    var w1 = $(".w1", svg);
    var w2 = $(".w2", svg);
    var base = 100;
    w1.setAttribute("font-size", base);
    w2.setAttribute("font-size", base);
    var len = Math.max(w2.getComputedTextLength(), w1.getComputedTextLength());
    if (!len) return;
    var fs = (base * 369) / len;
    w1.setAttribute("font-size", fs);
    w2.setAttribute("font-size", fs);
    w2.setAttribute("y", 216);
    w1.setAttribute("y", 216 - fs * 0.8);
  }

  function setupParallax() {
    var img = $(".hero-img");
    var light = $(".hero-light");
    var ticking = false;
    function update() {
      var y = window.scrollY;
      var h = img.parentNode.offsetHeight;
      if (y < h * 1.2) {
        img.style.transform = "translate3d(0," + y * 0.35 + "px,0) scale(1.05)";
        if (light) light.style.transform = "translate3d(0," + y * 0.15 + "px,0)";
      }
      ticking = false;
    }
    window.addEventListener(
      "scroll",
      function () {
        if (!ticking) {
          ticking = true;
          requestAnimationFrame(update);
        }
      },
      { passive: true }
    );
    update();
  }

  function setupAos() {
    var els = $all("[data-aos]");
    if (!("IntersectionObserver" in window)) {
      els.forEach(function (el) {
        el.classList.add("aos-in");
      });
      return;
    }
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) {
            e.target.classList.add("aos-in");
            io.unobserve(e.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px" }
    );
    els.forEach(function (el) {
      io.observe(el);
    });
  }

  function setupCountdown() {
    var wd = W.weddingDate;
    var target = new Date(wd.date + "T" + wd.time + ":00" + (wd.utcOffset || "+07:00")).getTime();
    var els = {};
    $all("[data-cd]").forEach(function (el) {
      els[el.getAttribute("data-cd")] = el;
    });
    var textEl = $("[data-dday-text]");
    function tick() {
      var diff = Math.max(0, target - Date.now());
      var s = Math.floor(diff / 1000);
      var days = Math.floor(s / 86400);
      els.days.textContent = days;
      els.hours.textContent = pad(Math.floor((s % 86400) / 3600));
      els.minutes.textContent = pad(Math.floor((s % 3600) / 60));
      els.seconds.textContent = pad(s % 60);
      if (textEl) {
        textEl.textContent =
          diff > 0 ? wd.ddayText.replace("(D-Day)", days) :"Hôm nay là ngày cưới của " + W.groom.shortName + " và " + W.bride.shortName + "!";
      }
    }
    tick();
    setInterval(tick, 1000);
  }

  function setupTimeline() {
    var scroller = $(".timeline-scroll");
    if (!scroller) return;
    $(".scroll-arrow", scroller).addEventListener("click", function () {
      scroller.scrollBy({ left: scroller.clientWidth * 0.8, behavior: "smooth" });
    });
    // kéo bằng chuột trên desktop
    var down = false, startX = 0, startLeft = 0;
    scroller.addEventListener("mousedown", function (e) {
      down = true;
      startX = e.pageX;
      startLeft = scroller.scrollLeft;
      scroller.classList.add("dragging");
    });
    window.addEventListener("mouseup", function () {
      down = false;
      scroller.classList.remove("dragging");
    });
    scroller.addEventListener("mousemove", function (e) {
      if (!down) return;
      e.preventDefault();
      scroller.scrollLeft = startLeft - (e.pageX - startX);
    });
  }

  function setupGallery() {
    var images = W.gallery.images;
    var main = $(".gallery-main-img");
    if (!main) return;
    var current = 0;
    function select(i) {
      current = i;
      main.src = images[i];
      main.setAttribute("data-idx", i);
      $all(".gallery-thumb").forEach(function (t, j) {
        t.classList.toggle("is-active", j === i);
      });
    }
    $all(".gallery-thumb").forEach(function (t) {
      t.addEventListener("click", function () {
        select(+t.getAttribute("data-idx"));
      });
    });

    var lb = $("#lightbox");
    var lbImg = $(".lb-img", lb);
    var lbCount = $(".lb-count", lb);
    var idx = 0;
    function show(i) {
      idx = (i + images.length) % images.length;
      lbImg.src = images[idx];
      lbCount.textContent = idx + 1 + " / " + images.length;
    }
    function close() {
      lb.classList.remove("open");
      setTimeout(function () {
        lb.hidden = true;
      }, 200);
      document.body.classList.remove("no-scroll");
      select(idx);
    }
    main.addEventListener("click", function () {
      show(current);
      lb.hidden = false;
      requestAnimationFrame(function () {
        lb.classList.add("open");
      });
      document.body.classList.add("no-scroll");
    });
    $(".lb-prev", lb).addEventListener("click", function () { show(idx - 1); });
    $(".lb-next", lb).addEventListener("click", function () { show(idx + 1); });
    $(".lb-close", lb).addEventListener("click", close);
    lb.addEventListener("click", function (e) {
      if (e.target === lb) close();
    });
    var sx = null;
    lb.addEventListener("touchstart", function (e) { sx = e.touches[0].clientX; }, { passive: true });
    lb.addEventListener("touchend", function (e) {
      if (sx == null) return;
      var dx = e.changedTouches[0].clientX - sx;
      if (Math.abs(dx) > 40) show(idx + (dx < 0 ? 1 : -1));
      sx = null;
    });
    document.addEventListener("keydown", function (e) {
      if (lb.hidden) return;
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") show(idx - 1);
      if (e.key === "ArrowRight") show(idx + 1);
    });
  }

  function setupAccount() {
    $all("#section-account .list-head").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var list = btn.nextElementSibling;
        var open = list.classList.toggle("on");
        btn.setAttribute("aria-expanded", open ? "true" : "false");
      });
    });
    $all("[data-copy]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        copyText(btn.getAttribute("data-copy")).then(function () {
          toast("Đã sao chép số tài khoản");
        });
      });
    });
  }

  function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) return navigator.clipboard.writeText(text);
    var ta = document.createElement("textarea");
    ta.value = text;
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    try {
      document.execCommand("copy");
    } catch (e) {}
    document.body.removeChild(ta);
    return Promise.resolve();
  }

  // ---------- RSVP / guestbook storage ----------
  function readLocal() {
    try {
      return JSON.parse(localStorage.getItem(LOCAL_KEY)) || [];
    } catch (e) {
      return [];
    }
  }
  function writeLocal(list) {
    try {
      localStorage.setItem(LOCAL_KEY, JSON.stringify(list));
    } catch (e) {}
  }
  function submit(type, data) {
    data.type = type;
    data.createdAt = new Date().toISOString();
    var local = readLocal();
    local.push(data);
    writeLocal(local);
    if (!W.endpoint) return Promise.resolve();
    // text/plain để tránh preflight CORS với Google Apps Script
    return fetch(W.endpoint, { method: "POST", mode: "no-cors", body: JSON.stringify(data) });
  }

  var guestEntries = [];
  function loadGuestbook() {
    var base = (W.guestbook.entries || []).slice();
    var mine = readLocal().filter(function (x) { return x.type === "guestbook"; });
    if (!W.endpoint) {
      guestEntries = base.concat(mine).reverse();
      renderGuestStrip();
      return;
    }
    fetch(W.endpoint + (W.endpoint.indexOf("?") > -1 ? "&" : "?") + "type=guestbook")
      .then(function (r) { return r.json(); })
      .then(function (remote) {
        guestEntries = base.concat(Array.isArray(remote) ? remote : []).reverse();
      })
      .catch(function () {
        guestEntries = base.concat(mine).reverse();
      })
      .then(renderGuestStrip);
  }
  function postit(e) {
    var date = e.createdAt ? new Date(e.createdAt) : null;
    return (
      '<div class="postit">' +
      '<p class="postit-note">' + nl2br(e.message) + "</p>" +
      '<p class="postit-from">' + esc(e.name) + "</p>" +
      (date && !isNaN(date) ? '<p class="postit-date">' + pad(date.getDate()) + "." + pad(date.getMonth() + 1) + "." + date.getFullYear() + "</p>" : "") +
      "</div>"
    );
  }
  function renderGuestStrip() {
    var box = $(".guest-entries");
    if (box) box.innerHTML = guestEntries.slice(0, 10).map(postit).join("");
  }
  function renderGuestList() {
    var box = $(".guest-list");
    box.innerHTML = guestEntries.length ? guestEntries.map(postit).join("") : '<p class="empty">Chưa có lời chúc nào. Hãy là người đầu tiên!</p>';
  }

  function setupForms() {
    var rsvp = $("#form-rsvp");
    function syncAttend() {
      var attending = rsvp.attend.value !== "Không";
      $all("[data-attend-only]", rsvp).forEach(function (el) {
        el.hidden = !attending;
      });
    }
    $all('input[name="attend"]', rsvp).forEach(function (r) {
      r.addEventListener("change", syncAttend);
    });
    rsvp.addEventListener("submit", function (e) {
      e.preventDefault();
      var fd = new FormData(rsvp);
      var data = {};
      fd.forEach(function (v, k) { data[k] = String(v).trim(); });
      var btn = $("button[type=submit]", rsvp);
      btn.disabled = true;
      submit("rsvp", data)
        .then(function () {
          closeModal($("#modal-rsvp"));
          rsvp.reset();
          syncAttend();
          toast("Cảm ơn bạn đã xác nhận!");
        })
        .catch(function () {
          toast("Gửi chưa được, vui lòng thử lại.");
        })
        .then(function () {
          btn.disabled = false;
        });
    });

    var gb = $("#form-guestbook");
    gb.addEventListener("submit", function (e) {
      e.preventDefault();
      var data = { name: gb.name.value.trim(), message: gb.message.value.trim() };
      if (!data.name || !data.message) return;
      var btn = $("button[type=submit]", gb);
      btn.disabled = true;
      submit("guestbook", data)
        .then(function () {
          guestEntries.unshift(data);
          renderGuestStrip();
          closeModal($("#modal-guestbook-write"));
          gb.reset();
          toast("Cảm ơn lời chúc của bạn!");
        })
        .catch(function () {
          toast("Gửi chưa được, vui lòng thử lại.");
        })
        .then(function () {
          btn.disabled = false;
        });
    });
  }

  function setupModals() {
    document.addEventListener("click", function (e) {
      var opener = e.target.closest("[data-open]");
      if (opener) {
        openModal(opener.getAttribute("data-open"));
        return;
      }
      var closer = e.target.closest(".modal [data-close]");
      if (closer) closeModal(closer.closest(".modal"));
    });
    document.addEventListener("keydown", function (e) {
      if (e.key !== "Escape") return;
      $all(".modal.open").forEach(closeModal);
    });
  }

  // ---------- music + opening ----------
  var audio = document.getElementById("bgm");
  var userPaused = false;
  function setMusicUi(playing) {
    var b = $("#music-btn");
    if (b) b.classList.toggle("playing", playing);
  }
  function playMusic() {
    if (!W.music || !W.music.enabled || userPaused) return;
    var p = audio.play();
    if (p && p.then) p.then(function () { setMusicUi(true); }).catch(function () { setMusicUi(false); });
  }
  function setupMusic() {
    if (!W.music || !W.music.enabled) return;
    audio.src = W.music.src;
    audio.volume = 0.6;
    $("#music-btn").addEventListener("click", function (e) {
      e.stopPropagation();
      if (audio.paused) {
        userPaused = false;
        playMusic();
      } else {
        userPaused = true;
        audio.pause();
        setMusicUi(false);
      }
    });
    // trình duyệt chặn autoplay → bật nhạc ở lần chạm đầu tiên
    function firstGesture() {
      if (audio.paused) playMusic();
      ["pointerdown", "keydown", "touchend"].forEach(function (ev) {
        document.removeEventListener(ev, firstGesture, true);
      });
    }
    ["pointerdown", "keydown", "touchend"].forEach(function (ev) {
      document.addEventListener(ev, firstGesture, true);
    });
  }

  function setupOpening() {
    var el = $("#opening");
    if (!el) return;
    document.body.classList.add("no-scroll");
    var target = $("[data-typing]", el);
    var text = W.opening.text || "";
    var i = 0;
    var typer = setInterval(function () {
      target.textContent = text.slice(0, ++i);
      if (i >= text.length) clearInterval(typer);
    }, 110);
    var done = false;
    function finish() {
      if (done) return;
      done = true;
      clearInterval(typer);
      el.classList.add("fade-out");
      document.body.classList.remove("no-scroll");
      playMusic();
      setTimeout(function () {
        el.remove();
      }, 1000);
    }
    el.addEventListener("click", finish);
    setTimeout(finish, W.opening.duration || 3200);
  }

  // ---------- boot ----------
  document.title = W.meta.title;
  document.documentElement.style.setProperty("--color-emp", W.theme.emp);
  card.innerHTML = [
    renderHero(),
    renderIntro(),
    renderCeremonyInfo(),
    renderInvitation(),
    renderTimeline(),
    renderCalendar(),
    renderMiddlePhoto(),
    renderLocation(),
    renderGallery(),
    renderGuestbook(),
    renderAccount(),
    renderRsvp(),
    renderEnding(),
  ].join("");
  renderOverlays();

  setupOpening();
  setupMusic();
  setupParallax();
  setupAos();
  setupCountdown();
  setupTimeline();
  setupGallery();
  setupAccount();
  setupModals();
  setupForms();
  loadGuestbook();

  fitHeroWord();
  if (document.fonts && document.fonts.load) {
    document.fonts.load('800 100px "Montserrat"').then(fitHeroWord, fitHeroWord);
    document.fonts.ready.then(fitHeroWord);
  }
})();
