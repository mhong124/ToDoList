import { Routes } from '@angular/router';
import {Home} from './Home/home';
import {Extra} from './Extra/extra';

export const routes: Routes = [
    {
        path : "",
        component : Home
    },
    {
        path : "extra",
        component : Extra
    },
];
