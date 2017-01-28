import GIFEncoder from 'utils/gif/GIFEncoder';

function renderFrame(frame) {
  var encoder, page, stream, transfer;
  encoder = new GIFEncoder(frame.width, frame.height);
  if (frame.index === 0) {
    encoder.writeHeader();
  } else {
    encoder.firstFrame = false;
  }
  console.log(frame.transparent);
  encoder.setTransparent(frame.transparent);
  encoder.setRepeat(frame.repeat);
  encoder.setDelay(frame.delay);
  encoder.setQuality(frame.quality);
  encoder.setPreserveColors(frame.preserveColors);
  encoder.addFrame(frame.data);
  if (frame.last) {
    encoder.finish();
  }
  if (frame.globalPalette === true) {
    frame.globalPalette = encoder.getGlobalPalette();
  }
  stream = encoder.stream();
  frame.data = stream.pages;
  frame.cursor = stream.cursor;
  frame.pageSize = stream.constructor.pageSize;
  if (frame.canTransfer) {
    transfer = (function () {
      var i, len, ref, results;
      ref = frame.data;
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        page = ref[i];
        results.push(page.buffer);
      }
      return results;
    })();
    return self.postMessage(frame, transfer);
  } else {
    return self.postMessage(frame);
  }
}

self.onmessage = function (event) {
  return renderFrame(event.data);
};
