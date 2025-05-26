import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { AuthService } from "./auth.service"
import { Router } from "@angular/router";
import { TestBed } from "@angular/core/testing";
import { MockProvider } from "ng-mocks";
import { User } from "../models";


describe('AuthService', () => {
    let service: AuthService;
    let httpMock: HttpTestingController;
    let router: Router;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [
                AuthService,
                MockProvider(Router)
            ],
        });
        service = TestBed.inject(AuthService);
        httpMock = TestBed.inject(HttpTestingController);
        router = TestBed.inject(Router);
    });

    it('El login es obligatorio', () => {

        const email = 'false@gmail.com';
        const password = 'false1234';
        const mockResponse: User[] = [

            {
                id: 1,
                name: 'False User',
                lastname: '',
                email,
                password,
                role: 'ADMIN',
                token: 'rufnd832h32ois',
            },
        ];

        service.login(email, password);

        httpMock
            .expectOne(
                `http://localhost:3000/users?email=${email}&password=${password}`
            )
            .flush(mockResponse);

        expect(localStorage.getItem('token')).toBe(mockResponse[0].token);
    });


    it('Debe realizar el logout', () => {

        const spyOnNavigate = spyOn(router, 'navigate')

        service.logout();

        expect(localStorage.getItem('token')).toBeNull();
        expect(spyOnNavigate).toHaveBeenCalledWith(['/login']);
    })


    it('Debe devolver el usuario si el token es válido', () => {

        const storedtoken = '8354jd932csjsn28';

        const mockResponse: User[] = [
            {
                id: 1,
                name: 'Fake User',
                lastname: '',
                email: 'fake@gmail.com',
                password: 'fake1234',
                role: 'ADMIN',
                token: storedtoken,
            },
        ];

        // Simular que ya hay un token guardado
        localStorage.setItem('token', storedtoken);

        service.verifyToken().subscribe(result => {
            expect(result).toEqual(mockResponse[0]);
            expect(localStorage.getItem('token')).toBe(storedtoken);
        });

        httpMock
            .expectOne(
                `http://localhost:3000/users?token=${storedtoken}`
            )
            .flush(mockResponse);

        expect(localStorage.getItem('token')).toBe(mockResponse[0].token);
    });

    it('Debe devolver false si el token es inválido', () => {

        const storedtoken = '';

        const mockResponse: User[] = [];

        localStorage.setItem('token', storedtoken);

        service.verifyToken().subscribe(result => {
            // El resultado debe ser false porque el token no corresponde a ningún usuario
            expect(result).toBeFalse();

            // El token permanece igual en localStorage
            expect(localStorage.getItem('token')).toBe(storedtoken);
        });

        httpMock
            .expectOne(
                `http://localhost:3000/users?token=${storedtoken}`
            )
            .flush(mockResponse);

        expect(localStorage.getItem('token')).toBe(storedtoken);
    });
});