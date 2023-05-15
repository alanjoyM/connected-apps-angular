import { Client } from "./client";
import { TeamMembers } from "./team-members";

export class TeamSummary {

    teamLeader: string;

    summeryCode:string; 

    noOfMembers:number;

    totalCost: number;

    pendingTasks:number;

    totalTasks: number;

    upcomingProjects:number;

    clients: Array<Client>;

    regionWiseTeam?:TeamMembers;

    errorCode: string;

    errorMessage:string;



}
