import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TeamService {
  private BASE_URL: string = environment.baseUrl;

  constructor(private http: HttpClient) {}

  public getTeamDetails(teamId: number) {
    return this.http.get(
      `${this.BASE_URL}/umf/v1/users/team/get-team-details/${teamId}`
    );
  }

  public getTeams() {
    return this.http.get(`${this.BASE_URL}/umf/v1/common/team/get-teams`);
  }

  public getTeamsAssociatedWithRole(roleId) {
    return this.http.get(`${this.BASE_URL}/umf/v1/users/team/get-teams/${roleId}`);
  }
  public getUsersByTeam(teamId: number) {
    return this.http.get(`${this.BASE_URL}/umf/v1/teams/team/get-team-users/${teamId}`);
  }

  public updateTeam(teamId: number, resources) {
    return this.http.put(
      `${this.BASE_URL}/umf/v1/teams/team/update-team/${teamId}`,
      resources
    );
  }

  public updateImpactedTeam(teamId: number, resources) {
    return this.http.put(
      `${this.BASE_URL}/umf/v1/teams/team/update-impacted-team/${teamId}`,
      resources
    );
  }

  public createTeam(team) {
    return this.http.post(
      `${this.BASE_URL}/umf/v1/users/team/create-team`,
      team
    );
  }

  public getUsersRolesAssociatedWithTeam(teamId) {
    return this.http.get(`${this.BASE_URL}/umf/v1/teams/team/get-associated-users-roles?teamId=${teamId}`);
  }
}
