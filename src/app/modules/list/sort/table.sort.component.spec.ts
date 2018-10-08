import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { BlueriqSessionTemplate, BlueriqTestingModule } from '@blueriq/angular/testing';
import { BlueriqTestSession } from '@blueriq/angular/testing/src/test_session';
import { ButtonTemplate } from '@blueriq/core/testing';
import { ListModule } from '../list.module';
import { TableSortComponent } from './table.sort.component';

describe('TableSortComponent', () => {
  let button: ButtonTemplate;
  let session: BlueriqTestSession;
  let component: ComponentFixture<TableSortComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        BlueriqTestingModule,
        ListModule
      ]
    });
  });

  beforeEach(() => {
    button = ButtonTemplate.create().styles('sort');
    session = BlueriqSessionTemplate.create().build(button);
    component = session.get(TableSortComponent);
    component.autoDetectChanges();
  });

  it('should have been created', () => {
    expect(component).toBeTruthy();
  });

  it('should display the right material icon', () => {
    let iconElement = component.debugElement.query(By.css('.material-icons')).nativeElement;
    let currentIcon = component.componentInstance.getIconByDirection();
    expect(iconElement).not.toContain('arrow_upward');
    expect(iconElement).not.toContain('arrow_downward');
    expect(currentIcon).toBe('');

    session.update(
      button.styles('icon', 'descending')
    );
    iconElement = component.nativeElement.querySelector('.material-icons').innerHTML;
    currentIcon = component.componentInstance.getIconByDirection();
    expect(iconElement).toContain('arrow_upward');
    expect(currentIcon).toBe('arrow_upward');

    session.update(
      button.styles('icon', 'ascending')
    );
    iconElement = component.nativeElement.querySelector('.material-icons').innerHTML;
    currentIcon = component.componentInstance.getIconByDirection();
    expect(iconElement).toContain('arrow_downward');
    expect(currentIcon).toBe('arrow_downward');
  });

  it('should have a working hovering', () => {
    let isHovering = component.componentInstance.hovering;
    let currentIcon = component.componentInstance.getIconByDirection();
    expect(isHovering).toBeFalsy();
    expect(currentIcon).toBe('');

    fireEvent(component.nativeElement.querySelector('.material-icons'), 'mouseenter');
    isHovering = component.componentInstance.hovering;
    currentIcon = component.componentInstance.getIconByDirection();
    expect(isHovering).toBeTruthy();
    expect(currentIcon).toBe('arrow_downward');

    fireEvent(component.nativeElement.querySelector('.material-icons'), 'mouseleave');
    isHovering = component.componentInstance.hovering;
    currentIcon = component.componentInstance.getIconByDirection();
    expect(isHovering).toBeFalsy();
    expect(currentIcon).toBe('');
  });

  function fireEvent(element, event) {
    if (element.fireEvent) {
      element.fireEvent('on' + event);
    } else {
      const evObj = document.createEvent('Events');
      evObj.initEvent(event, true, false);
      element.dispatchEvent(evObj);
    }
  }
});
