import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Projects } from 'src/app/data/projects';
import { AuthService } from 'src/app/service/auth.service';
import { PortfolioService } from 'src/app/service/portfolio.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
  projectsList: Projects[] = [];
  isUserLogged: Boolean = false;

  projectsForm: FormGroup;

  constructor(
    private porfolioService: PortfolioService,
    private authService: AuthService,
    private formBuilder: FormBuilder) {
      this.projectsForm = this.formBuilder.group({
          id: [''],
          name: ['', [Validators.required]],
          description: ['', [Validators.required]]

        });
   }

  ngOnInit(): void {
    this.isUserLogged = this.authService.isUserLogged();
    
    this.reloadData();
  }

  private reloadData() {
    this.porfolioService.getDattaProjects().subscribe(
      (data) => {
        this.projectsList = data;
      }
    );
  }

  private clearForm() {
    this.projectsForm.setValue({
      id: '',
      name: '',
      description: '',
    })
  }

  private loadForm(projects: Projects) {
    this.projectsForm.setValue({
      id: projects.id,
      name: projects.name,
      description: projects.description
    })
  }

  onSubmit() {
    let projects: Projects = this.projectsForm.value;
    if (this.projectsForm.get('id')?.value == '') {
      this.porfolioService.safeNewProjects(projects).subscribe(
        (newProjects: Projects) => {
          this.projectsList.push(newProjects);
        }
      );
    } else {
      this.porfolioService.modifyProjects(projects).subscribe(
        () => {
          this.reloadData();
        }
      )
    }
  }

  onNewProjects() {
    this.clearForm();
  }

  onEditProjectsn(index: number) {
    let projects: Projects = this.projectsList[index];
    this.loadForm(projects);
  }

  onDeleteProjects(index: number) {
    let projects: Projects = this.projectsList[index];
    if (confirm("¿Está seguro que desea borrar la educación seleccionada?")) {
      this.porfolioService.eraseProjects(projects.id).subscribe(
        () => {
          this.reloadData();
        }
      )
    }
  }

}

