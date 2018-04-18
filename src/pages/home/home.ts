import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProjectProvider } from '../../providers/project/project';


@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  projects: any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private projectProvider: ProjectProvider
  ) {
    this.initData();
  }

  private initData() {
    this.projectProvider.projects
      .subscribe(projects => {
        this.projects = projects;
      });
  }

  addProject() {
    // this.navCtrl.push('ProjectAddPage');
    this.projectProvider.addDocument('projects', {
      name: `My Project ${this.projects.length + 1}`
    }).subscribe((res) => {
      this.initData();
    }, (error) => {
      console.log(error);
    });
  }

  goToProject(project: any) {
    this.navCtrl.push('ProjectPage', {project: project});
  }

}
