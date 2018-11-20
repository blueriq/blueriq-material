import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { BlueriqSessionTemplate, BlueriqTestingModule, BlueriqTestSession } from '@blueriq/angular/testing';
import { TextItemModule } from '@blueriq/angular/textitems';
import { AssetTemplate } from '@blueriq/core/testing';

import { AssetComponent } from './asset.component';
import { AssetModule } from './asset.module';

describe('AssetComponent', () => {
  let assetTemplate: AssetTemplate;
  let component: ComponentFixture<AssetComponent>;
  let session: BlueriqTestSession;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        BlueriqTestingModule,
        AssetModule,
        TextItemModule,
      ],
    });
  }));

  beforeEach(() => {
    assetTemplate = AssetTemplate.create().text('lorum ipsum');
    session = BlueriqSessionTemplate.create().build(assetTemplate);
    component = session.get(AssetComponent);
  });

  it('should contain the expected text', () => {
    expect(component.nativeElement.querySelector('div').innerText.trim()).toBe('lorum ipsum');
  });

  it('should have the asset class', () => {
    expect(component.nativeElement.querySelector('div').classList).toContain('asset');
  });
});
