import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Inscription } from './models';


@Injectable({
    providedIn: 'root'
})
export class InscriptionsService {
    private url = 'http://localhost:3000/inscriptions';

    constructor(private http: HttpClient) { }

    createInscription(inscription: Inscription): Observable<Inscription> {
        return this.http.post<Inscription>('http://localhost:3000/inscriptions', inscription);
    }


    getInscriptions(): Observable<Inscription[]> {
        return this.http.get<Inscription[]>('http://localhost:3000/inscriptions');
    }
}
