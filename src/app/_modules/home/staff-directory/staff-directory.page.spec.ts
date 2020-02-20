import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { StaffDirectoryPage } from './staff-directory.page';

describe('StaffDirectoryPage', () => {
  let component: StaffDirectoryPage;
  let fixture: ComponentFixture<StaffDirectoryPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StaffDirectoryPage],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(StaffDirectoryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
