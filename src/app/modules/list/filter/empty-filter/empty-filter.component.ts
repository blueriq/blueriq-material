import { Component } from '@angular/core';
import { MatFormField } from '@angular/material/form-field';
import { MatSelect } from '@angular/material/select';
import { MatInput } from '@angular/material/input';
import { MatCheckbox } from '@angular/material/checkbox';

@Component({
    selector: 'bq-empty-filter',
    templateUrl: './empty-filter.component.html',
    imports: [MatFormField, MatSelect, MatInput, MatCheckbox]
})
export class EmptyFilterComponent {
}
