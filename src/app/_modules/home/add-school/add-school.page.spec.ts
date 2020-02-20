import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddSchoolPage } from './add-school.page';

describe('AddSchoolPage', () => {
  let component: AddSchoolPage;
  let fixture: ComponentFixture<AddSchoolPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AddSchoolPage],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddSchoolPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
