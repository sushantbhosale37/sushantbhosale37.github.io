import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  private BASE_URL: string = environment.baseUrl;

  constructor(private http: HttpClient) {}

  public getRoleDetails(roleId: number) {
    return this.http.get(
      `${this.BASE_URL}/umf/v1/common/role/get-role-details/${roleId}`
    );
  }

  public getRoles() {
    return this.http.get(`${this.BASE_URL}/umf/v1/common/role/get-roles`);
  }

  public getUsersByRole(roleId: number) {
    return this.http.get(`${this.BASE_URL}/umf/v1/roles/roles/get-role-users/${roleId}`);
  }

  public updateRole(roleId: number, permissions) {
    return this.http.put(
      `${this.BASE_URL}/umf/v1/roles/roles/update-role/${roleId}`,
      permissions
    );
  }

  public updateImpactedRole(roleId: number, permissions) {
    return this.http.put(
      `${this.BASE_URL}/umf/v1/roles/roles/update-impacted-user/${roleId}`,
      permissions
    );
  }

  public createRole(role) {
    return this.http.post(
      `${this.BASE_URL}/umf/v1/users/role/create-role`,
      role
    );
  }

  public getUserTeamDetails(roleId: number) {
     return this.http.get(
       `${this.BASE_URL}/umf/v1/roles/role/get-associated-users-teams/${roleId}`
     );
  }

}
