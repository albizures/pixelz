const make = require('make');

exports.downloadBlob = function downloadBlob(file, name) {
  var saveAs = window.saveAs || (navigator.msSaveBlob && navigator.msSaveBlob.bind(navigator));
  if (saveAs) {
    saveAs(file, name);
  } else {
    file = window.URL.createObjectURL(file);
    let link = make('a', {
      parent: document.body,
      href: file,
      download: name
    });
    link.click();
    link.remove();
  }
};