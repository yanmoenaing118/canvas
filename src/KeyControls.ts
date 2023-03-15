import { fromEvent, Observable, Subject } from 'rxjs';
import { Keys } from './types';
export default class KeyControls {

    public keys: Keys = {};

    constructor() {
        this.listenKeyDown();
        this.listenKeyUp();
    }

    private listenKeyDown():void {
        fromEvent<KeyboardEvent>(document, 'keydown')
        .subscribe({
            next: (e: KeyboardEvent) => {
                e.preventDefault();
                this.keys[e.key] = true;
            }
        })
    }

    private listenKeyUp(): void {
        fromEvent<KeyboardEvent>(document, 'keyup')
        .subscribe({
            next: (e: KeyboardEvent) => {
                this.keys[e.key] = false;
            }
        })
    }


   
}