import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { BlueriqSessionTemplate, BlueriqTestingModule, BlueriqTestSession } from '@blueriq/angular/testing';
import { AssetTemplate } from '@blueriq/core/testing';

import { AssetComponent } from './asset.component';
import { provideAssetComponents } from './asset.providers';
import { provideTextItemComponents } from '../textitem/textitem.providers';

describe('AssetComponent', () => {
  let assetTemplate: AssetTemplate;
  let component: ComponentFixture<AssetComponent>;
  let session: BlueriqTestSession;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      providers: [provideAssetComponents(), provideTextItemComponents()],
      imports: [
        NoopAnimationsModule,
        BlueriqTestingModule,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    assetTemplate = AssetTemplate.create().text('lorum ipsum');
    session = BlueriqSessionTemplate.create().build(assetTemplate);
    component = session.get(AssetComponent);
  });

  it('should contain the expected text', () => {
    expect(component.nativeElement.querySelector('div').textContent.trim()).toBe('lorum ipsum');
  });

  it('should have the asset class', () => {
    expect(component.nativeElement.querySelector('div').classList).toContain('asset');
  });
});
