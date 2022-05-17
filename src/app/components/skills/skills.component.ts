import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Skills } from 'src/app/data/skills';
import { AuthService } from 'src/app/service/auth.service';
import { PortfolioService } from 'src/app/service/portfolio.service';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent implements OnInit {
  skillsList: Skills[] = [];
  isUserLogged: Boolean = false;

  skillsForm: FormGroup;

  constructor(
    private porfolioService: PortfolioService,
    private authService: AuthService,
    private formBuilder: FormBuilder) {
      this.skillsForm = this.formBuilder.group({
          id: [''],
          name: ['', [Validators.required]],
          percentage: ['', [Validators.required]],
          comments: ['', [Validators.required]],
        });
   }

  ngOnInit(): void {
    this.isUserLogged = this.authService.isUserLogged();
    
    this.reloadData();
  }

  private reloadData() {
    this.porfolioService.getDattaSkills().subscribe(
      (data) => {
        this.skillsList = data;
      }
    );
  }

  private clearForm() {
    this.skillsForm.setValue({
      id: '',
      name: '',
      percentage: 0,
      comments: ''
    })
  }

  private loadForm(skills: Skills) {
    this.skillsForm.setValue({
      id: skills.id,
      name: skills.name,
      percentage: skills.percentage,
      comments: skills.comments
    })
  }

  onSubmit() {
    let skills: Skills = this.skillsForm.value;
    if (this.skillsForm.get('id')?.value == '') {
      this.porfolioService.safeNewSkills(skills).subscribe(
        (newSkills: Skills) => {
          this.skillsList.push(newSkills);
        }
      );
    } else {
      this.porfolioService.modifySkills(skills).subscribe(
        () => {
          this.reloadData();
        }
      )
    }
  }

  onNewSkills() {
    this.clearForm();
  }

  onEditSkills(index: number) {
    let skills: Skills = this.skillsList[index];
    this.loadForm(skills);
  }

  onDeleteSkills(index: number) {
    let skills: Skills = this.skillsList[index];
    if (confirm("¿Está seguro que desea borrar la educación seleccionada?")) {
      this.porfolioService.eraseSkills(skills.id).subscribe(
        () => {
          this.reloadData();
        }
      )
    }
  }

}

