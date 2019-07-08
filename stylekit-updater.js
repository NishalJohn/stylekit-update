function setJSONS(json, fileType) {
    if (fileType == "old") {
        this.oldJSON = json
    } else {
        this.newJSON = json
    }

}

function compileJSON() {
    if (!this.oldJSON || !this.newJSON) {
        alert('Upload Both JSONS and try again');
        return;
    }
    cacheMediaQueries(this.oldJSON);
    mergeStylekit(this.newJSON);
}

function cacheMediaQueries(oldJson) {
    this.mediaQ_1600 = oldJson['@media (max-width : 1600px)'];
    this.mediaQ_1200 = oldJson['@media (max-width : 1200px)'];
    this.mediaQ_993 = oldJson['@media (max-width : 993px)'];
    this.mediaQ_768 = oldJson['@media (max-width : 768px)'];
    this.mediaQ_480 = oldJson['@media (max-width : 480px)'];
    this.mediaQ_360 = oldJson['@media (max-width : 360px)'];
}

function mergeStylekit(newJSON) {
    newJSON['@media (max-width : 1600px)'] = this.mediaQ_1600;
    newJSON['@media (max-width : 1200px)'] = this.mediaQ_1200;
    newJSON['@media (max-width : 993px)'] = this.mediaQ_993;
    newJSON['@media (max-width : 768px)'] = this.mediaQ_768;
    newJSON['@media (max-width : 480px)'] = this.mediaQ_480;
    newJSON['@media (max-width : 360px)'] = this.mediaQ_360;
    var jsonString = JSON.stringify(newJSON)
    var ugly = jsonString;
    var obj = JSON.parse(ugly);
    var pretty = JSON.stringify(obj, undefined, 4);
    $('#compiledJSON').text(pretty)
    $('#download').removeClass('hide');
    this.jsonString = jsonString;
    console.log(jsonString);
}

function initDownload() {
    downloadString(this.jsonString, 'plain/json', 'Styelekit.json');
}

function downloadString(text, fileType, fileName) {
    var blob = new Blob([text], {
        type: fileType
    });

    var a = document.createElement('a');
    a.download = fileName;
    a.href = URL.createObjectURL(blob);
    a.dataset.downloadurl = [fileType, a.download, a.href].join(':');
    a.style.display = "none";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(function () {
        URL.revokeObjectURL(a.href);
    }, 1500);
}