import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { BlueriqSessionTemplate, BlueriqTestingModule, BlueriqTestSession } from '@blueriq/angular/testing';
import { ImageTemplate } from '@blueriq/core/testing';
import { SharedModule } from '@shared/shared.module';
import { ImageComponent } from './image.component';
import { ImageModule } from './image.module';

describe('ImageComponent', () => {
  let imageTemplate: ImageTemplate;
  let component: ComponentFixture<ImageComponent>;
  let session: BlueriqTestSession;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        BlueriqTestingModule,
        SharedModule,
        ImageModule,
      ],
    });
  }));

  beforeEach(() => {
    imageTemplate = ImageTemplate.create('myImage');
    session = BlueriqSessionTemplate.create().build(imageTemplate);
    component = session.get(ImageComponent);
  });

  it('should render properly', () => {
    expect(component.nativeElement.querySelector('img').getAttribute('width')).toBeFalsy();
    expect(component.nativeElement.querySelector('img').getAttribute('height')).toBeFalsy();
    expect(component.nativeElement.querySelector('img').getAttribute('src'))
    .toBe('/blueriq/api/v1/subscription/subscription-id/session/session-id/image/myImage/key/P0-I0');
  });

  it('should have the correct dimensions set', () => {
    session.update(
      imageTemplate.width(10),
      imageTemplate.height(1100),
    );
    expect(component.nativeElement.querySelector('img').getAttribute('width')).toBe('10');
    expect(component.nativeElement.querySelector('img').getAttribute('height')).toBe('1100');
  });

});
