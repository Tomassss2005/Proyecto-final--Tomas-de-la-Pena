import { TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterModule.forRoot([])
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  });

  //Test individual

  it('Está aplicación debe crearse', () => {

    //Se crea el componente 
    const fixture = TestBed.createComponent(AppComponent);

    //Se extrae la instancia del componente
    const app = fixture.componentInstance;

    //Espera que
    expect(app).

      //Matchers son funciones que permiten hacer comparaciones
      //Truthy es algo no nulo ni definido 
      toBeTruthy();
  });
});
