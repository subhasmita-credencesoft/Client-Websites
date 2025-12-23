import { HttpClient, HttpHeaders } from '@angular/common/http';
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
getAvailableCarsByDate(date: string) {
  return this.http.get<any>(
    `https://api.bookone.io/api-bookone/api/website/1350/slots?Date=${date}`
  );
}
getPropertyDetails(propertyId: any) {
  return this.http.get<any>(
    `https://api.bookone.io/api-bookone/api/website/findByPropertyId/${propertyId}`
  );
}
  savePayment(payload: any): Observable<any> {
    const SAVE_PAYMENT_URL = 'https://api.bookone.io/api-bookone/api/website/savePayment';
    return this.http.post<any>(SAVE_PAYMENT_URL, payload);
  }


  bookService(payload: any): Observable<any> {
    const BOOK_SERVICE_URL = 'https://api.bookonelocal.in/api-bookone/api/website/book';
    return this.http.post<any>(BOOK_SERVICE_URL, payload);
  }

  createCustomer(payload: any): Observable<any> {
    const CUSTOMER_URL =
    'https://api.bookone.io/api-bookone/api/customer';
    return this.http.post<any>(CUSTOMER_URL, payload);
  }
  sendOtp(payload: any) {
  const headers = new HttpHeaders({
    'APP_ID': 'BOOKONE_WEB_APP'
  });

  return this.http.post(
    'https://api.bookone.io/api-bookone/api/message/authorisationToken',
    payload,
    { headers }
  );
}


verifyOtp(payload: any) {
  const headers = new HttpHeaders({
    'APP_ID': 'BOOKONE_WEB_APP'
  });

  return this.http.post(
    'https://api.bookone.io/api-bookone/api/message/verifyAuthorisationToken',
    payload,
    { headers }
  );
}


checkEmail(email: string) {
  return this.http.get(
    `https://api.bookone.io/api-bookone/api/website/email/${email}/`
  );
}

checkMobile(mobile: string) {
  return this.http.get(
    `https://api.bookone.io/api-bookone/api/website/mobile/${mobile}`
  );
}

}
