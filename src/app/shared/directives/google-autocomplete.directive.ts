import { Directive, ElementRef, OnInit, Output, EventEmitter, NgZone } from "@angular/core";
declare var google: any;

@Directive({
    selector: '[google-autocomplete]',
    outputs: ['placeChanged']
})
export class GoogleAutocompleteDirective implements OnInit{

    @Output() placeChanged: EventEmitter<any> = new EventEmitter();
    element: HTMLInputElement;

    constructor(
        private ref: ElementRef,
        private ngZone: NgZone
    ) {
        this.element = this.ref.nativeElement;
    }

    ngOnInit() {
        const autocomplete = new google.maps.places.Autocomplete(this.element);
        autocomplete.addListener('place_changed', () => {
            this.ngZone.run(() => {
                const place = autocomplete.getPlace();
                this.placeChanged.emit(place);
            })
        })
    }



}