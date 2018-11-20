import { Component, Host } from '@angular/core';
import { BlueriqComponent } from '@blueriq/angular';
import { Asset } from '@blueriq/core';

@Component({
  selector: 'bq-asset',
  styleUrls: ['./asset.component.scss'],
  templateUrl: './asset.component.html',
})
@BlueriqComponent({
  type: Asset,
})
export class AssetComponent {

  constructor(@Host() public asset: Asset) {
  }

}
