import { TestBed } from '@angular/core/testing';
import {AuthButtonComponent} from './authButton.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('AuthButtonComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthButtonComponent, HttpClientTestingModule],
    }).compileComponents();
  });

  it('should display a logout button if a token is present', () => {
    window.sessionStorage.setItem('x-access-token', 'a token')
    const fixture = TestBed.createComponent(AuthButtonComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('button')?.textContent).toContain('Log out');
  });

  it('should display a login button if a token is not present', () => {
    window.sessionStorage.clear()
    const fixture = TestBed.createComponent(AuthButtonComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('button')?.textContent).toContain('Log in');
  });
});
