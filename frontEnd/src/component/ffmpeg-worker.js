import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg';

const ffmpeg = createFFmpeg({ log: true });

self.onmessage = async (e) => {
  if (!ffmpeg.isLoaded()) {
    await ffmpeg.load();
  }

  const { video } = e.data;
  ffmpeg.FS('writeFile', 'input.mp4', await fetchFile(video));

  await ffmpeg.run('-i', 'input.mp4', 'output.mp3');

  const data = ffmpeg.FS('readFile', 'output.mp3');
  self.postMessage({ data });
};