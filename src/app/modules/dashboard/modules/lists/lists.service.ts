import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, delay } from "rxjs";
import { List } from "./models";


@Injectable({ providedIn: 'root' })
export class ListsService {

    constructor(private httpclient: HttpClient) { }


    getLists(): Observable<List[]> {

        return this.httpclient.get<List[]>(`http://localhost:3000/lists?_embed=product&_embed=user`)
            .pipe(
                (delay(1000))
            )
    }

    createList(list: List): Observable<List> {
        return this.httpclient.post<List>(`http://localhost:3000/lists`, list)
    }

    editList(list: List): Observable<List> {
        return this.httpclient.put<List>(`http://localhost:3000/lists/${list.id}`, list)
    }

    deleteList(id: number): Observable<void> {
        return this.httpclient.delete<void>(`http://localhost:3000/lists/${id}`)
    }
}