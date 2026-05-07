import {Component, ChangeDetectorRef, inject, OnInit, signal} from '@angular/core';
import { HttpClient } from '@angular/common/http';
//import {AsyncPipe} from '@angular/common';
import {CommonModule} from '@angular/common';
import { Api } from '../api/api';
import { villagersGet } from '../api/fn/operations/villagers-get';
import { Villager } from '../api/models';

@Component({
  selector: 'ac-game',
  templateUrl: './game.html',
  standalone: true,
  styles: [],
  imports: [CommonModule],
})
export class Game implements OnInit {
    constructor(private http: HttpClient, private cdr: ChangeDetectorRef) {}

    apiService = inject(Api);

    count = 0;

    currentVillagerName = "";

    currentVillagerUrl = "";

    currentVillagerSaying = "";

    position = '';

    started = false;

    showBell = false;

    randomTop = '0px';
    randomLeft = '0px';

    //data: Record<string, { image_uri: string, saying: string}> = {};

    protected readonly results = signal<Villager[] | null>(null);

    async ngOnInit() {
        // Optionally, you can fetch the data on initialization
        this.results.set(await this.apiService.invoke(villagersGet, {'X-API-KEY': import.meta.env['NG_APP_API_KEY'], 'Accept-Version': '1.7'}));
    }

    startGame() {
        this.getRandomVillager();
        this.started = true;
    }

    getRandomVillager(){
        if (!this.results()) {
            return;
        }
        else {
            const randIndex = Math.floor(Math.random() * this.results()!.length);
            this.currentVillagerName = this.results()![randIndex].name || "Error";
            this.currentVillagerUrl = this.results()![randIndex].image_url || "";
            this.currentVillagerSaying = this.results()![randIndex].quote || "";
            this.randomizePosition();
        }
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