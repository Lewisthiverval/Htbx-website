const SoundCloud = require("soundcloud-scraper");
const client = new SoundCloud.Client();
const fs = require("fs");

const song = "https://soundcloud.com/pan_hq/puce-mary-the-size-of-our";
const NN = "https://soundcloud.com/demianrecords/premiere-nn-police-brutality";

client
  .getSongInfo(NN)
  .then(async (song) => {
    const stream = await song.downloadProgressive();
    const writer = stream.pipe(fs.createWriteStream(`./${song.title}.mp3`));
    writer.on("finish", () => {
      console.log("Finished writing song!");
      process.exit(1);
    });
  })
  .catch(console.error);
