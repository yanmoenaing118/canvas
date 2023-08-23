export default class Sound {
  sound: HTMLAudioElement;
  curr = 1.56;
  end = 2.5;
  constructor(src: string) {
    this.sound = new Audio(src);
  }

  play() {
    if (this.curr > this.end) {
      this.curr = 1.56;
    } else {
      this.curr += this.sound.currentTime;
    }

    this.sound.currentTime = this.curr;
    this.sound.play();

    console.log(this.sound.currentTime);
  }

  stop() {
    this.sound.pause();
  }

  isPaused() {
    return this.sound.paused;
  }

  reset() {
    this.sound.currentTime = 0;
  }
}
