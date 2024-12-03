import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiResponse } from '../interfaces/api-response';



@Injectable({
  providedIn: 'root'
})
export class RicknmortyapiService {

  nextUrl = '';
  previousUrl = '';
  private currentPage: string | null = null;

  constructor(private http: HttpClient) { }

  getNextPage(): Observable<ApiResponse> {
    const url = this.nextUrl || ApiUrl;
    return this.http.get<any>(url).pipe(
      map((response) => this.mapResponse(response, response.info.prev, response.info.next))
    );
  }

  getPreviousPage(): Observable<ApiResponse> {
    if (!this.currentPage) return this.getNextPage();
    return this.http.get<any>(this.previousUrl).pipe(
      map((response) =>
        this.mapResponse(response, response.info.prev,response.info.next))
    );
  }

  private mapResponse(response: any, prevPage: string, nextPage: string): any {
    this.currentPage = nextPage;
    this.nextUrl = nextPage;
    this.previousUrl = prevPage;
    return {
      characters: response.results.map((char: any) => ({
        id: char.id,
        name: char.name,
        status: char.status,
        species: char.species,
        image: char.image
      })),
      hasNextPage: !!response.info.next,
      hasPreviousPage: !!response.info.prev
    };
  }
}

const ApiUrl: string = 'https://rickandmortyapi.com/api/character';
