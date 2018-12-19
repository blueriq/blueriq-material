import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { BlueriqSessionTemplate, BlueriqTestingModule, BlueriqTestSession } from '@blueriq/angular/testing';
import { AssetTemplate, ButtonTemplate, ContainerTemplate } from '@blueriq/core/testing';
import { ButtonModule } from '../../button/button.module';
import { ListComponent } from '../list.component';
import { ListModule } from '../list.module';
import { TableLimitComponent } from './table.limit.component';

describe('TableLimitComponent', () => {
  let session: BlueriqTestSession;
  let component: ComponentFixture<ListComponent>;
  let tableLimitComponent: TableLimitComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        BlueriqTestingModule,
        ButtonModule,
        ListModule,
      ],
    });
  });

  beforeEach(() => {

    const limit = ContainerTemplate.create('limitContainer').children(
      AssetTemplate.create().text('Showing only the first 42 results'),
      ButtonTemplate.create().caption('Show all'),
    );

    const header = ContainerTemplate.create('listplus_header').children(limit);

    const table = ContainerTemplate.create().contentStyle('table');
    const list = ContainerTemplate.create().children(table, header);
    session = BlueriqSessionTemplate.create().build(list);
    component = session.get(ListComponent);

    tableLimitComponent = new TableLimitComponent();

  });

  it('should render', () => {
    expect(component.nativeElement.querySelector('.limit')).toBeTruthy();
    expect(component.nativeElement.querySelector('.explanation')).toBeTruthy();
    expect(component.nativeElement.querySelector('button')).toBeTruthy();
  });

});
