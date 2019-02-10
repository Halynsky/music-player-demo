import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {

  @ViewChild('player') player: ElementRef;

  trackIndex = 0;

  playlist = [
    'AC DC - High Way To Hell.mp3',
    'ACDC - Back In Black.mp3',
    'KISS - I Was Made For Lovin\' You.mp3',
    'Metallica - Nothing Else Matters.mp3',
    'Metallica - Memory Remains.mp3',
    'Nightwish - Wishmaster.mp3',
    'Nirvana - Smells Like Teen Spirit.mp3',
    'Scorpions - Rock You Like A Hurricane.mp3',
    'Scorpions - Wind Of Change.mp3',
    'Wolfmother - Cosmic Egg.mp3',
  ];

  ngAfterViewInit() {
    this.player.nativeElement.volume = 0.2;
    this.player.nativeElement.addEventListener('ended', this.onTrackEnd.bind(this));
  }

  onTrackEnd(event) {
    console.log("onTrackEnd");
    this.player.nativeElement.pause();
    this.trackIndex < this.playlist.length - 1 ? this.trackIndex++ : this.trackIndex = 0;
    this.player.nativeElement.load();
    this.player.nativeElement.play();
    // console.log(this.trackIndex);
    // console.log(this.player.nativeElement.src)
  }

}
