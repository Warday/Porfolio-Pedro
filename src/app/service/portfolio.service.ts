import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Education } from '../data/education';
import { Head } from '../data/head';
import { About } from '../data/about';
import { Experience } from '../data/experience';
import { Skills } from '../data/skills';
import { Publications } from '../data/publications';
import { Projects } from '../data/projects';
import { Awards } from '../data/awards';
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


  getDattaSkills(): Observable<Skills[]> {
    return this.http.get<any>(config.baseUrl + "skills");
  }

  safeNewSkills(skills:Skills): Observable<Skills> {
    return this.http.post<any>(config.baseUrl + "skills/create", skills);
  }

  modifySkills(skills: Skills): Observable<any> {
    return this.http.put<any>(config.baseUrl + "skills/update", skills);
  }

  eraseSkills(id: number): Observable<any> {
    return this.http.delete<any>(config.baseUrl + "skills/" + id);
  }



  getDattaPublications(): Observable<Publications[]> {
    return this.http.get<any>(config.baseUrl + "publications");
  }

  safeNewPublications(publications:Publications): Observable<Publications> {
    return this.http.post<any>(config.baseUrl + "publications/create", publications);
  }

  modifyPublications(publications: Publications): Observable<any> {
    return this.http.put<any>(config.baseUrl + "publications/update", publications);
  }

  erasePublications(id: number): Observable<any> {
    return this.http.delete<any>(config.baseUrl + "publications/" + id);
  }



  getDattaProjects(): Observable<Projects[]> {
    return this.http.get<any>(config.baseUrl + "projects");
  }

  safeNewProjects(projects:Projects): Observable<Projects> {
    return this.http.post<any>(config.baseUrl + "projects/create", projects);
  }

  modifyProjects(projects: Projects): Observable<any> {
    return this.http.put<any>(config.baseUrl + "projects/update", projects);
  }

  eraseProjects(id: number): Observable<any> {
    return this.http.delete<any>(config.baseUrl + "projects/" + id);
  }



  getDattaAwards(): Observable<Awards[]> {
    return this.http.get<any>(config.baseUrl + "awards");
  }

  safeNewAwards(awards:Awards): Observable<Awards> {
    return this.http.post<any>(config.baseUrl + "awards/create", awards);
  }

  modifyAwards(awards: Awards): Observable<any> {
    return this.http.put<any>(config.baseUrl + "awards/update", awards);
  }

  eraseAwards(id: number): Observable<any> {
    return this.http.delete<any>(config.baseUrl + "awards/" + id);
  }


}