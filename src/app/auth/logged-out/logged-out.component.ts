import { Component } from '@angular/core';
import { ErrorType } from '@blueriq/core';
import { ErrorModel } from '../../modules/error/error.model';

@Component({
  selector: 'bq-logged-out',
  templateUrl: './logged-out.component.html',
  styleUrls: ['./logged-out.component.scss'],
})
export class LoggedOutComponent {

  error = new ErrorModel(ErrorType.FlowEnded, 'Logged Out', 'Successfully logged out');

}
