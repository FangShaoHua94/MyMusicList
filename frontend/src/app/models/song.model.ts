export class Song {
    title: String;
    artist: String;
    genre: String;
    releaseDate: Date;
    youtubeLink: String;
    remark: String;
    duration: Duration;
    tags: [String];
    album: String;
    numPlayed: Number;
}

export class Duration {
    minutes: Number;
    seconds: Number;
}