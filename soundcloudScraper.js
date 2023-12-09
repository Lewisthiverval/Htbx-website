// const SoundCloud = require("soundcloud-scraper");
import SoundCloud from "soundcloud-scraper";
const client = new SoundCloud.Client();
// const fs = require("fs");
import fs from "fs";

const song = "https://soundcloud.com/pan_hq/puce-mary-the-size-of-our";
const NN = "https://soundcloud.com/demianrecords/premiere-nn-police-brutality";
const kylie =
  "https://soundcloud.com/rkills/padam-padam-rkills-hard-trance-remix";
const nin =
  "https://soundcloud.com/waxwingsofficial/nin-closer-wax-wings-animal-mix";
const ufo = "https://soundcloud.com/mamatoldya/ufo95-move-on";

client
  .getSongInfo(ufo)
  .then(async (song) => {
    const stream = await song.downloadProgressive();
    const writer = stream.pipe(fs.createWriteStream(`./${song.title}.mp3`));
    writer.on("finish", () => {
      console.log("Finished writing song!");
      process.exit(1);
    });
  })
  .catch(console.error);
