import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BlueriqComponents } from '@blueriq/angular';
import { BlueriqSessionTemplate, BlueriqTestingModule, BlueriqTestSession } from '@blueriq/angular/testing';
import { TextItemModule } from '@blueriq/angular/textitems';
import { AssetTemplate } from '@blueriq/core/testing';
import { MaterialModule } from '../../material.module';

import { AssetComponent } from './asset.component';

describe('AssetComponent', () => {
  let assetTemplate: AssetTemplate;
  let component: ComponentFixture<AssetComponent>;
  let session: BlueriqTestSession;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AssetComponent],
      providers: [BlueriqComponents.register([AssetComponent])],
      imports: [
        MaterialModule,
        BrowserAnimationsModule,
        BlueriqTestingModule,
        TextItemModule
      ]
    });
  }));

  beforeEach(() => {
    assetTemplate = AssetTemplate.create().text('lorum ipsum');
    session = BlueriqSessionTemplate.create().build(assetTemplate);
    component = session.get(AssetComponent);
  });

  it('should contain the expected text', () => {
    expect(component.nativeElement.querySelector('div').innerHTML).toBe('lorum ipsum');
  });
});
