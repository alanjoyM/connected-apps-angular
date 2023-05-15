import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import {  Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Client } from '../common-ui-models/client';
import { Member } from '../common-ui-models/member';
import { Projects } from '../common-ui-models/projects';
import { TeamMembers } from '../common-ui-models/team-members';
import { TeamSummary } from '../common-ui-models/team-summary';
import { Project } from '../common-ui-models/project';
import { ProjectStatus } from '../common-ui-models/projectStatus';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})

export class DashboardService {

  _baseUrl= environment.baseurl;
  client: Client;


  teamSummary: Array<TeamMembers>;


  teamList: Array<TeamMembers> = new Array<TeamMembers>();

  memberGeneral: Array<Member> = new Array<Member>();
  teamGeneral: TeamMembers = new TeamMembers();

  constructor(private httpClient: HttpClient)
  {
  }

  loadTeamSummary() {

    let regions: Array<string> = ['EAST', 'WEST', 'SOUTH', 'NORTH'];

    regions.forEach(x => {
      for (let i = 1; i < 5; i++) {
        let mem: Member = new Member();
        mem.id = i + 1000;
        mem.name = i + '_' + 'Member_' + x;
        if (i == 3) {
          mem.status = "Not Available";
        }
        else {
          mem.status = "Aavilable";
        }
        this.memberGeneral.push(mem);
        if (i == 4) break;
        mem = new Member();

      }
      this.teamGeneral.region = x;
      this.teamGeneral.members= this.memberGeneral;
      this.teamList.push(this.teamGeneral);
      this.memberGeneral = new Array<Member>();
      this.teamGeneral = new TeamMembers();

    });

console.log("New Final Teeeamm", this.teamList);
  }

  fetchTeamSummary(): Array<TeamMembers> {
    this.teamList = new Array<TeamMembers>();
    this.loadTeamSummary();
    console.log("Final Team", this.teamList);
    return this.teamList;
  }

fetchAllProjects():Observable<Project[]>{
 return this.httpClient.get<Project[]>(this._baseUrl+"/api/getAllProjects");
}
addProject(newProject:Project):Observable<Project>{
  const headers = new HttpHeaders()
          .set('Authorization', 'my-auth-token')
          .set('Content-Type', 'application/json');
  console.log("in service",newProject);

  return this.httpClient.post<Project>(this._baseUrl+"/api/insertProject",JSON.stringify(newProject), {
    headers: headers
  })

}
fetchAllProjectStatuses():Observable<ProjectStatus[]>{
  return this.httpClient.get<ProjectStatus[]>(this._baseUrl+"/api/getAllProjectsStatus");
 }
}
