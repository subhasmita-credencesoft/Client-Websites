import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocationService {



  constructor(private http: HttpClient) {}

  searchLocation(query: string): Observable<any[]> {
      const BASE_URL =
    'https://contentai.thehotelmate.co/api/geolocation/search';
    return this.http.get<any[]>(`${BASE_URL}?address=${query}`);
  }

  getPlaceDetails(placeId: string) {
  return this.http.get<any>(
    `https://contentai.thehotelmate.co/api/geolocation/placeDetails?place_id=${placeId}`
  );
}
}
