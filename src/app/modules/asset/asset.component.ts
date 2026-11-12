import { Component, inject } from '@angular/core';
import { BlueriqComponent } from '@blueriq/angular';
import { Asset } from '@blueriq/core';

@Component({
    selector: 'bq-asset',
    styleUrls: ['./asset.component.scss'],
    templateUrl: './asset.component.html'
})
@BlueriqComponent({
    type: Asset,
})
export class AssetComponent {
    asset = inject(Asset);

}
