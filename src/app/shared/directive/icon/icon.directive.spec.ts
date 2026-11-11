import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIconModule } from '@angular/material/icon';
import { PresentationStyles } from '@blueriq/core';
import { BqIconDirective } from '@shared/directive/icon/icon.directive';

@Component({
    template: '<mat-icon [bqIcon]="styles"></mat-icon>',
    imports: [MatIconModule, BqIconDirective]
})
export class MockIconComponent {

  styles: PresentationStyles;

  constructor() {
    this.styles = new PresentationStyles(['some_presentationstyle', 'icon_my_awesome_icon']);
  }
}

describe('IconDirective', () => {

  let fixture: ComponentFixture<MockIconComponent>;
  let element: any;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      imports: [MockIconComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(MockIconComponent);
    element = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should use the given presentationstyles to pick the correct icon and rename if necessary', () => {
    const matIcon = element.querySelector('mat-icon');
    expect(matIcon.classList, 'only icon_ prefixed presentation styles should have been used').not.toContain('some_presentationstyle');
    expect(matIcon.classList, 'for fontawesome to work, "fa" class only should have also been added').toContain('fa');
    expect(matIcon.classList, 'should have replaced the _ with - and have stripped the icon_ prefix').toContain('fa-my-awesome-icon');
  });

});

describe('IconDirectiveStylesUpdate', () => {

  let component: MockIconComponent;
  let fixture: ComponentFixture<MockIconComponent>;
  let element: any;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      imports: [MockIconComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(MockIconComponent);
    component = fixture.componentInstance;
    element = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should use the given presentationstyles to pick the correct icon and rename if necessary', () => {
    const matIcon = element.querySelector('mat-icon');
    expect(matIcon.classList, 'only icon_ prefixed presentation styles should have been used').not.toContain('some_presentationstyle');
    expect(matIcon.classList, 'for fontawesome to work, "fa" class only should have also been added').toContain('fa');
    expect(matIcon.classList, 'should have replaced the _ with - and have stripped the icon_ prefix').toContain('fa-my-awesome-icon');

    component.styles = new PresentationStyles(['some_presentationstyle']);
    fixture.detectChanges();
    expect(matIcon.classList, 'class should have been removed so the icon is not visible anymore after update.').not.toContain('fa-my-awesome-icon');
  });

});
