import { Component, OnInit } from '@angular/core';
import { Client } from '../../common-ui-models/client';
import { TeamSummary } from '../../common-ui-models/team-summary';
import { DashboardService } from '../../common-ui-services/dashboard.service';
import {Observable} from "rxjs";
import { RouterLinkWithHref } from '@angular/router';
import { Project } from 'src/app/common-ui-models/project';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AddProjectComponent } from '../add-project/add-project.component';



export interface TeamSummaryInterface{
region: string;
count: number;
unAvailCount: number;
}

export interface members{
  id:number;
  name:string;
  status:string;
}
const TABLE_DATA_TEAM_SUMMARY : TeamSummaryInterface [] = [
  {region:"East",count:20,unAvailCount:4},
  {region:"South",count:15,unAvailCount:8},
  {region:"West",count:17,unAvailCount:1},
  {region:"North",count:15,unAvailCount:6},
];
export interface TeamMembersInterface{
  id: number;
  name: string;
  status:string;
  region:string;
}



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  Designation:string ="";
  Username: string = "";
  NoOfTeamMembers: number = 0;
  TotalCostOfAllProjects: number = 0;
  PendingTasks: number = 0;
  UpComingProjects: number = 0;
  ProjectCost: number =0;
  CurrentExpenditure: number = 0;
  AvailableFunds: number = 0;

  TEAM_LEADER: string = "";



  Clients: string[] = ["ABC Infotec Ltd.","DEF Software Soln.","GHI Industries"];
  Projects: string[] = ["On-demand outsourcing","Nielsen Connect","L&T Careers"," FB MVP Roundoffs"];
  selectedProject = this.Projects[0];
  Years: number[] = [2016,2017,2018,2019,2020,2021,2022];
  selectedYear: number = this.Years[6];
  displayedColumns: string[] = ['region', 'count', 'unAvailCount'];
  displayedColumsMembers: string []= ['ID','NAME','STATUS']
  dataSourceSummary= TABLE_DATA_TEAM_SUMMARY;

  dataSourceEAST: any;
  dataSourceWEST: any;
  dataSourceSOUTH: any;
  dataSourceNORTH: any;

  newDataSource: Array<any> = new Array();

  constructor( private dashboardService :DashboardService,private dialog: MatDialog) {

  }

  ngOnInit() {
    this.Designation = 'Team Leader';
    this.Username = 'Alan Joy';
    this.NoOfTeamMembers = 67;
    this.TotalCostOfAllProjects = 240;
    this.PendingTasks = 15;
    this.UpComingProjects = 2;
    this.ProjectCost = 2113507;
    this.CurrentExpenditure = 96788;
    this.AvailableFunds = 52536;

    this.loadTeamSummary();
 this.dashboardService.fetchAllProjects().subscribe(
  (response: Project[]) =>
  {
    console.log('result is', response);
    response.forEach(x=>{
      this.Projects.push(x.name as string);
    })
  }
);

  }
  loadTeamSummary(){
    this.newDataSource = this.dashboardService.fetchTeamSummary();
  }

  selectionChange(selectedProject:any){
   console.log(selectedProject.value);
   if(selectedProject.value=="Nielsen Connect")this.AvailableFunds=886245;
   else{
    this.AvailableFunds=52536;
  }}

addProject(){
  const dialogRef = this.dialog.open(AddProjectComponent, {
    disableClose: true,
    width: '700px',
    height: '550px',
  });
}
}
