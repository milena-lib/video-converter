
const hbjs = require('handbrake-js');

compressVideo('original-video.mp4', 'compressed-video.mp4', callBackError);

function compressVideo(videoPath, outputPath, cback) {
    console.log(videoPath, outputPath);
    
    hbjs.spawn({
      input: videoPath,
      output: outputPath,
      preset: 'Very Fast 480p30'
    })
      .on('error', function(err){
        // invalid user input, no video found etc
        console.log("error", err);
        cback(err);
      })
      .on('progress', function(progress){
        console.log(
          'Percent complete: %s, ETA: %s',
          progress.percentComplete,
          progress.eta
        );
      })
      .on('end', function(res){
        console.log("Finalized compressing video", res);
        cback(outputPath);
      });    
  }
  
  function compressFile(file, name, type, cback) {
    console.log("file: ", file);
    console.log("name: ", name);
    console.log("type: ", type);
  
    switch (type.split('/')[0]) {
      case 'image':
        compressImage(file, file.replace(name, 'compressed'), cback);
        break;
      case 'video':
        let outputPath = file.replace(name, name.replace(/(\..*)/, "compressed.mp4"));
        compressVideo(file, outputPath, cback)
        break;
      default:
  
    }

    
  }

  function callBackError(err) {
    console.log("callback msg: ", err);
  }

  