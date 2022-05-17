import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Education } from '../data/education';
import { Head } from '../data/head';
import { About } from '../data/about';
import { Experience } from '../data/experience';
import { map } from 'rxjs/operators';
import { config } from '../data/config/Config';

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {

  constructor(private http: HttpClient) { }

  getDattaEducation(): Observable<Education[]> {
    return this.http.get<any>(config.baseUrl + "education");
  }

  safeNewEducation(education:Education): Observable<Education> {
    return this.http.post<any>(config.baseUrl + "education/create", education);
  }

  modifyEducation(education: Education): Observable<any> {
    return this.http.put<any>(config.baseUrl + "education/update", education);
  }

  eraseEducation(id: number): Observable<any> {
    return this.http.delete<any>(config.baseUrl + "education/" + id);
  }



  getDattaHead(): Observable<Head[]> {
    return this.http.get<any>(config.baseUrl + "head");
  }
  modifyHead(head: Head): Observable<any> {
    return this.http.put<any>(config.baseUrl + "head/update", head);
  }



  getDattaAbout(): Observable<About[]> {
    return this.http.get<any>(config.baseUrl + "about");
  }
  modifyAbout(about: About): Observable<any> {
    return this.http.put<any>(config.baseUrl + "about/update", about);
  }



  getDattaExperience(): Observable<Experience[]> {
    return this.http.get<any>(config.baseUrl + "experience");
  }

  safeNewExperience(experience:Experience): Observable<Experience> {
    return this.http.post<any>(config.baseUrl + "experience/create", experience);
  }

  modifyExperience(experience: Experience): Observable<any> {
    return this.http.put<any>(config.baseUrl + "experience/update", experience);
  }

  eraseExperience(id: number): Observable<any> {
    return this.http.delete<any>(config.baseUrl + "experience/" + id);
  }

}