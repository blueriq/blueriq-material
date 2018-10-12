import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { BlueriqSessionTemplate, BlueriqTestingModule, BlueriqTestSession } from '@blueriq/angular/testing';
import { ImageTemplate } from '@blueriq/core/testing';
import { SharedModule } from '@shared/shared.module';
import { ImageComponent } from './image.component';
import { ImageModule } from './image.module';

fdescribe('ImageComponent', () => {
  let imageTemplate: ImageTemplate;
  let component: ComponentFixture<ImageComponent>;
  let session: BlueriqTestSession;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        BlueriqTestingModule,
        SharedModule,
        ImageModule
      ]
    });
  }));

  beforeEach(() => {
    imageTemplate = ImageTemplate.create('myImage').width(10).height(1100);
    session = BlueriqSessionTemplate.create().build(imageTemplate);
    component = session.get(ImageComponent);
  });

  it('should contain the expected text', () => {
    expect(component.nativeElement.querySelector('img').getAttribute('width')).toBe('10');
    expect(component.nativeElement.querySelector('img').getAttribute('height')).toBe('1100');
  });

  it('should have the image class', () => {
    expect(component.nativeElement.querySelector('img').classList).toContain('image');
  });
});
