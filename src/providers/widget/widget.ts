import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiProvider } from '../api';


@Injectable()
export class WidgetProvider extends ApiProvider {

  constructor(http: HttpClient) {
    super();

    this.http = http;
  }

  /**
   * get widgets
   * 
   */
  get widgtes() {
    return this.getCollection('widgets');
  }

  /**
   * get widgets by projectId
   * 
   * @param projectId 
   */
  getWidgetsByProjectId(projectId: string) {
    return this.getCollection('widgets', new HttpParams().set('project_id', projectId));
  }

  /**
   * get widget by id
   * 
   * @param widgetId 
   */
  getWidgetById(widgetId: string) {
    return this.getDocumentById('widgets', widgetId);
  }

  /**
   * delete widget
   * 
   * @param widgetId 
   */
  deleteWidget(widgetId: string) {
    return this.deleteDocument('widgets', widgetId);
  }

}
