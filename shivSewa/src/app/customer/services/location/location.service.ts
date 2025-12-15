import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  private BASE_URL =
    'https://contentai.thehotelmate.co/api/geolocation/search';

  constructor(private http: HttpClient) {}

  searchLocation(query: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.BASE_URL}?address=${query}`);
  }
}
