import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import {RouterOutlet} from "@angular/router";
import {LoaderModule} from "./loader/loader.module";

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        LoaderModule,
        RouterOutlet
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
