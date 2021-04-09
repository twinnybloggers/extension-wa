function doGet(e) {
    if ("read" == e.parameter.action) return read_all_value(e)
}
var SCRIPT_PROP = PropertiesService.getScriptProperties();

function setup() {
    var e = SpreadsheetApp.getActiveSpreadsheet();
    SCRIPT_PROP.setProperty("key", e.getId())
}

function read_all_value(e) {
    var t = SpreadsheetApp.openById(SCRIPT_PROP.getProperty("key")),
        a = ContentService.createTextOutput(),
        r = {};
    r.records = readData_(t, "Sheet1");
    var n = e.parameters.callback;
    return void 0 === n ? a.setContent(JSON.stringify(r)) : a.setContent(n + "(" + JSON.stringify(r) + ")"), a.setMimeType(ContentService.MimeType.JAVASCRIPT), a
}

function readData_(e, t, a) {
    void 0 === a && (a = (a = getHeaderRow_(e, t)).map(function(e) {
        return e.replace(/\s+/g, "_")
    }));
    for (var r = getDataRows_(e, t), n = [], o = 0, g = r.length; o < g; o++) {
        var s = r[o],
            u = {};
        for (var i in a) u[a[i]] = s[i];
        n.push(u)
    }
    return n
}

function getDataRows_(e, t) {
    var a = e.getSheetByName(t);
    return a.getRange(2, 1, a.getLastRow() - 1, a.getLastColumn()).getValues()
}

function getDataRows_(e, t) {
    var a = e.getSheetByName(t);
    return a.getRange(2, 1, a.getLastRow() - 1, a.getLastColumn()).getValues()
}

function getHeaderRow_(e, t) {
    var a = e.getSheetByName(t);
    return a.getRange(1, 1, 1, a.getLastColumn()).getValues()[0]
}