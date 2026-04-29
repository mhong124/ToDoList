import { Component, signal } from '@angular/core';
import { RouterOutlet, RouterLinkWithHref } from '@angular/router';
import {Nav} from "./Nav/nav";
import { Footer } from './Footer/footer';
import {Game} from './Game/game';

@Component({
  selector: 'app-root',
  imports: [Nav, RouterOutlet, RouterLinkWithHref, Footer, Game],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  
}
