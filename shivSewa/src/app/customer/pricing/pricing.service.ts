import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, tap } from "rxjs";
import { QuoteRequest } from "./dto";
import { calculateFare } from "./fare-engine";

@Injectable({ providedIn: 'root' })
export class PricingService {
  private config!: any;

  constructor(private http: HttpClient) {}

  load(): Observable<any> {
    return this.http.get('/assets/pricing/pricing.config.json')
      .pipe(tap(cfg => this.config = cfg));
  }
    isReady(): boolean {
    return !!this.config;
  }

  calculate(req: QuoteRequest, distanceKm: number) {
    return calculateFare(this.config, req, distanceKm);
  }
  getConfig() {
  return this.config;
}
}
