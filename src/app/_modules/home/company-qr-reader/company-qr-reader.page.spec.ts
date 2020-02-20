import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CompanyQrReaderPage } from './company-qr-reader.page';

describe('CompanyQrReaderPage', () => {
  let component: CompanyQrReaderPage;
  let fixture: ComponentFixture<CompanyQrReaderPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CompanyQrReaderPage],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CompanyQrReaderPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
