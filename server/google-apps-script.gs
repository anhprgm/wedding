/**
 * Lưu RSVP + lưu bút của thiệp cưới vào Google Sheet.
 *
 * Cách dùng:
 * 1. Tạo Google Sheet mới → Extensions → Apps Script → dán toàn bộ file này.
 * 2. Deploy → New deployment → Web app
 *      Execute as: Me
 *      Who has access: Anyone
 * 3. Copy URL dạng https://script.google.com/macros/s/.../exec
 *    dán vào `endpoint` trong js/config.js.
 */

var SHEETS = {
  rsvp: ["createdAt", "name", "side", "attend", "people", "tel", "shuttle", "shuttleNote", "msg"],
  guestbook: ["createdAt", "name", "message"],
};

function sheetFor(type) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sh = ss.getSheetByName(type);
  if (!sh) {
    sh = ss.insertSheet(type);
    sh.appendRow(SHEETS[type]);
  }
  return sh;
}

function doPost(e) {
  var data = JSON.parse(e.postData.contents || "{}");
  var cols = SHEETS[data.type];
  if (!cols) return json({ ok: false });
  var row = cols.map(function (k) {
    return String(data[k] == null ? "" : data[k]).slice(0, 1000);
  });
  var lock = LockService.getScriptLock();
  lock.waitLock(5000);
  try {
    sheetFor(data.type).appendRow(row);
  } finally {
    lock.releaseLock();
  }
  return json({ ok: true });
}

// GET ?type=guestbook → trả danh sách lời chúc để hiển thị trên thiệp
function doGet(e) {
  if ((e.parameter.type || "") !== "guestbook") return json([]);
  var values = sheetFor("guestbook").getDataRange().getValues();
  var head = values.shift();
  var list = values.map(function (r) {
    var o = {};
    head.forEach(function (k, i) {
      o[k] = r[i];
    });
    return o;
  });
  return json(list);
}

function json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
