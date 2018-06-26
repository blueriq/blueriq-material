import { Component, Host } from '@angular/core';
import { BlueriqComponent } from '@blueriq/angular';
import { Container } from '@blueriq/core';
import { FileUploader } from 'ng2-file-upload';

const URL = 'https://evening-anchorage-3159.herokuapp.com/api/';

@Component({
  selector: 'bq-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
@BlueriqComponent({
  type: Container,
  selector: '[contentStyle=fileupload]'
})
export class FileUploadComponent {

  public uploader: FileUploader = new FileUploader({ url: URL });
  public hasDropZoneOver: boolean = false;

  constructor(@Host() private container: Container) {
  }

  public fileOverDropZone(e: boolean): void {
    this.hasDropZoneOver = e;
  }
}
