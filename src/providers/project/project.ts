import { HttpClient } from '@angular/common/http';
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
