import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CharlyFundPage } from './charly-fund.page';

describe('CharlyFundPage', () => {
  let component: CharlyFundPage;
  let fixture: ComponentFixture<CharlyFundPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CharlyFundPage],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CharlyFundPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
