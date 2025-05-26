import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SharedModule } from '../../../../shared/shared.module';
import { AuthService } from '../../../../core/services/auth.service';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [HttpClientTestingModule, SharedModule]
    })
      .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('El email y password son de caracter obligatorio', () => {

    component.loginForm.setValue({
      email: '',
      password: '',
    });

    expect(component.loginForm.valid).toBeFalsy();
  })


  it('Si el formulario es válido se debe hacer login', () => {

    component.loginForm.setValue({
      email: 'tomas@gmail.com',
      password: '340912',
    })

    const authService = TestBed.inject(AuthService);
    const loginSpy = spyOn(authService, 'login');

    component.logIn();
    expect(loginSpy).toHaveBeenCalled();
  })
  

  it('Si el formulario es inválido no se debe hacer login y mostrar un mensaje de error', () => {

    component.loginForm.setValue({

      email: '',
      password: '',
    })

    const alertSpy = spyOn(window, 'alert');
    component.logIn();

    expect(alertSpy).toHaveBeenCalledWith('Formulario incompleto')

  })
});
