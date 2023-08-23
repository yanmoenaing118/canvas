export default class Sound {
  sound: HTMLAudioElement;
  curr = 1.56;
  end = 2.5;
  isFirst = true;
  constructor(src: string) {
    this.sound = new Audio(src);
  }

  play() {
    if(this.isFirst) this.sound.play();
    if(!this.isFirst && this.sound.ended) {
        this.sound.play();
    }
  }

  stop() {
    this.sound.pause();
  }

  isPaused() {
    return this.sound.paused
  }

  reset() {
    this.sound.currentTime = 0;
  }
}
