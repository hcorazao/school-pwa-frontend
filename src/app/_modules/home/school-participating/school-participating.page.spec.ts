import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SchoolParticipatingPage } from './school-participating.page';

describe('SchoolParticipatingPage', () => {
  let component: SchoolParticipatingPage;
  let fixture: ComponentFixture<SchoolParticipatingPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SchoolParticipatingPage],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SchoolParticipatingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
