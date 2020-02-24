import {NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IonicModule} from '@ionic/angular';
import {SearchFilterPipe} from '../pipes/search-pipe';
@NgModule({
    imports: [
        CommonModule,
        IonicModule,
    ],
    exports: [SearchFilterPipe],
    declarations: [
        SearchFilterPipe
    ],
    entryComponents: [
    ],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
        NO_ERRORS_SCHEMA
    ]
})
export class SearchFilterModule {}
