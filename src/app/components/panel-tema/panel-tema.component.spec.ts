import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelTemaComponent } from './panel-tema.component';

describe('PanelTemaComponent', () => {
  let component: PanelTemaComponent;
  let fixture: ComponentFixture<PanelTemaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PanelTemaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelTemaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
