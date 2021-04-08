function doGet(e) {
    return handleResponse(e)
}
var SHEET_NAME = "Sheet1",
    SCRIPT_PROP = PropertiesService.getScriptProperties();

function handleResponse(e) {
    var t = LockService.getPublicLock();
    t.waitLock(3e4);
    try {
        var r = SpreadsheetApp.openById(SCRIPT_PROP.getProperty("key")).getSheetByName(SHEET_NAME),
            n = (e.parameter.header_row, r.getRange(1, 1, 1, r.getLastColumn()).getValues()[0]),
            a = r.getLastRow() + 1,
            s = [];
        for (i in n) s.push(e.parameter[n[i]]);
        return r.getRange(a, 1, 1, s.length).setValues([s]), ContentService.createTextOutput(JSON.stringify({
            result: "success",
            row: a
        })).setMimeType(ContentService.MimeType.JSON)
    } catch (e) {
        return ContentService.createTextOutput(JSON.stringify({
            result: "error",
            error: e
        })).setMimeType(ContentService.MimeType.JSON)
    } finally {
        t.releaseLock()
    }
}

function setup() {
    var e = SpreadsheetApp.getActiveSpreadsheet();
    SCRIPT_PROP.setProperty("key", e.getId())
}