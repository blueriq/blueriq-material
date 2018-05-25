import {Component, Host} from '@angular/core';
import {BlueriqComponent} from '@blueriq/angular';
import {TextItem} from '@blueriq/core';

@Component({
  selector: 'app-textitem',
  templateUrl: './textitem.component.html',
  styleUrls: ['./textitem.component.scss']
})

@BlueriqComponent({
  type: TextItem,
})

export class TextItemComponent {

  constructor(@Host() public textItem: TextItem) {
  }

}
