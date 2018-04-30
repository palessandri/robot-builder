import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiProvider } from '../api';


@Injectable()
export class ProjectProvider extends ApiProvider {
  constructor(http: HttpClient) {
    super();

    this.http = http;
  }

  /**
   * get projects
   */
  get projects() {
    return this.getCollection('projects');
  }

  /**
   * get projects by user
   * 
   * @param userId 
   */
  getProjectsByUser(userId: string) {
    return this.getCollection('projects' , new HttpParams().set('userId', userId));
  }

  /**
   * add project
   */
  addProject() {

  }

  /**
   * delete project
   * 
   * @param projectId 
   */
  deleteProject(projectId: string) {
    return this.deleteDocument('projects', projectId);
  }
  

}
