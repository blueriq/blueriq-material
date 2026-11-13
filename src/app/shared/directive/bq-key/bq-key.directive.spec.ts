import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Element } from '@blueriq/core';
import { ButtonTemplate } from '@blueriq/core/testing';
import { BqKeyDirective } from '@shared/directive/bq-key/bq-key.directive';

@Component({
  template: '<div [bqKey]="key"></div>',
  imports: [BqKeyDirective],
})
class BqKeyHostComponent {
  key: Element | null | undefined;
}

describe('BqKeyDirective', () => {
  let fixture: ComponentFixture<BqKeyHostComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: Element,
          useValue: ButtonTemplate.create('MyButton').build(),
        },
      ],
    });

    fixture = TestBed.createComponent(BqKeyHostComponent);
  });

  function renderedId(): string {
    fixture.detectChanges();
    return fixture.nativeElement.querySelector('div').id;
  }

  it('should get correct id', () => {
    expect(renderedId()).toContain('MyButton');
  });

  it('should override element used for id creation', () => {
    fixture.componentInstance.key = ButtonTemplate.create('MyButton1').build();

    expect(renderedId()).toContain('MyButton1');
  });

  it('should not override element used for id creation if element is undefined', () => {
    fixture.componentInstance.key = undefined;

    expect(renderedId()).toContain('MyButton');
  });

  it('should not override element used for id creation if element is null', () => {
    fixture.componentInstance.key = null;

    expect(renderedId()).toContain('MyButton');
  });
});
