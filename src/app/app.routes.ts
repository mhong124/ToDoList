import { Routes } from '@angular/router';
import {Home} from './Home/home';
import {Mood} from './Mood/mood';

export const routes: Routes = [
    {
        path : "",
        component : Home
    },
    {
        path : "mood",
        component : Mood
    },
];
