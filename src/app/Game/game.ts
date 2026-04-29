import {Component, ChangeDetectorRef} from '@angular/core';
import { HttpClient } from '@angular/common/http';
//import {AsyncPipe} from '@angular/common';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'ac-game',
  templateUrl: './game.html',
  standalone: true,
  styles: [],
  imports: [CommonModule],
})
export class Game {
    constructor(private http: HttpClient, private cdr: ChangeDetectorRef) {}

    count = 0;

    currentVillagerKey = "";

    currentVillagerUri = "";

    currentVillagerSaying = "";

    position = '';

    started = false;

    showBell = false;

    randomTop = '0px';
    randomLeft = '0px';

    data: Record<string, { image_uri: string, saying: string}> = {};

    getData() {
        return this.http.get<Record<string, { image_uri: string, saying : string }>>('assets/villagers.json');
    }

    startGame() {
        // fetch the json and initialize currentVillager!
        this.getData().subscribe(result => {
            this.data = result;
            this.getRandomVillager();
            this.started = true;
            this.cdr.markForCheck(); // Manually trigger change detection
        });
        //this.started = true;
    }

    getRandomVillager(){
        let keys = Object.keys(this.data);
        let randomIndex = Math.floor(Math.random() * keys.length);
        //console.log(randomIndex);
        this.currentVillagerKey = keys[randomIndex];
        //console.log(this.currentVillagerKey);
        this.currentVillagerUri = this.data[this.currentVillagerKey]['image_uri'];
        //console.log(this.currentVillagerUri);
        this.currentVillagerSaying = this.data[this.currentVillagerKey]['saying'];
        //console.log(this.currentVillagerSaying);
    }

    randomizePosition() {
        // Generates random % values, can also use vh/vw
        this.randomTop = Math.floor(Math.random() * 80) + '%'; 
        this.randomLeft = Math.floor(Math.random() * 80) + '%';
        this.cdr.markForCheck(); // Manually trigger change detection
    }

    triggerBell() {
        this.showBell = true;

        setTimeout(() => {
            this.showBell = false;
            this.cdr.markForCheck(); // Manually trigger change detection
        }, 1000);
        this.randomizePosition();
    }

    changeVillager() {
        this.getRandomVillager();
        this.count += 1;
        this.triggerBell();
    }
}