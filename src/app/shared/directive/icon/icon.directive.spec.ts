import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIconModule } from '@angular/material/icon';
import { PresentationStyles } from '@blueriq/core';
import { BqIconDirective } from '@shared/directive/icon/icon.directive';

@Component({
  template: '<mat-icon [bqIcon]="styles"></mat-icon>',
})
export class MockIconComponent {

  styles: PresentationStyles;

  constructor() {
    this.styles = new PresentationStyles(['some_presentationstyle', 'icon_my_awesome_icon']);
  }
}

describe('IconDirective', () => {

  let component: MockIconComponent;
  let fixture: ComponentFixture<MockIconComponent>;
  let element: any;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      declarations: [MockIconComponent, BqIconDirective],
      imports: [MatIconModule],
    }).compileComponents();
    fixture = TestBed.createComponent(MockIconComponent);
    component = fixture.componentInstance;
    element = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should use the given presentationstyles to pick the correct icon and rename if necessary', () => {
    const matIcon = element.querySelector('mat-icon');
    expect(matIcon.classList).not.toContain('some_presentationstyle', 'only icon_ prefixed presentation styles should have been used');
    expect(matIcon.classList).toContain('fa', 'for fontawesome to work, "fa" class only should have also been added');
    expect(matIcon.classList).toContain('fa-my-awesome-icon', 'should have replaced the _ with - and have stripped the icon_ prefix');
  });

});

describe('IconDirectiveStylesUpdate', () => {

  let component: MockIconComponent;
  let fixture: ComponentFixture<MockIconComponent>;
  let element: any;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      declarations: [MockIconComponent, BqIconDirective],
      imports: [MatIconModule],
    }).compileComponents();
    fixture = TestBed.createComponent(MockIconComponent);
    component = fixture.componentInstance;
    element = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should use the given presentationstyles to pick the correct icon and rename if necessary', () => {
    const matIcon = element.querySelector('mat-icon');
    expect(matIcon.classList).not.toContain('some_presentationstyle', 'only icon_ prefixed presentation styles should have been used');
    expect(matIcon.classList).toContain('fa', 'for fontawesome to work, "fa" class only should have also been added');
    expect(matIcon.classList).toContain('fa-my-awesome-icon', 'should have replaced the _ with - and have stripped the icon_ prefix');

    component.styles = new PresentationStyles(['some_presentationstyle']);
    fixture.detectChanges();
    expect(matIcon.classList).not.toContain('fa-my-awesome-icon', 'class should have been removed so the icon is not visible anymore after update.');
  });

});
