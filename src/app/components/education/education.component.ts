import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Education } from 'src/app/data/education';
import { AuthService } from 'src/app/service/auth.service';
import { PortfolioService } from 'src/app/service/portfolio.service';

@Component({
  selector: 'app-education',
  templateUrl: './Education.component.html',
  styleUrls: ['./Education.component.css']
})

export class EducationComponent implements OnInit {
  educationList: Education[] = [];
  isUserLogged: Boolean = false;

  educationForm: FormGroup;

  constructor(
    private porfolioService: PortfolioService,
    private authService: AuthService,
    private formBuilder: FormBuilder) {
      this.educationForm = this.formBuilder.group({
          id: [''],
          school: ['', [Validators.required]],
          title: ['', [Validators.required]],
          career:['', [Validators.required]],
          score: ['', [Validators.required]],
          img: ['', [Validators.required]],
          start: ['', [Validators.required]],
          end: ['', [Validators.required]],
          url:['', [Validators.required]],
        });
   }

  ngOnInit(): void {
    this.isUserLogged = this.authService.isUserLogged();
    
    this.reloadData();
  }

  private reloadData() {
    this.porfolioService.getDattaEducation().subscribe(
      (data) => {
        this.educationList = data;
      }
    );
  }

  private clearForm() {
    this.educationForm.setValue({
      id: '',
      school: '',
      title: '',
      score: 0,
      career: '',
      start: 0,
      end: 0,
      img: '',
      url:''
    })
  }

  private loadForm(education: Education) {
    this.educationForm.setValue({
      id: education.id,
      school: education.school,
      title: education.title,
      career: education.career,
      score: education.score,
      start: education.start,
      end: education.end,
      img: education.img,
      url: education.url
    })
  }

  onSubmit() {
    let education: Education = this.educationForm.value;
    if (this.educationForm.get('id')?.value == '') {
      this.porfolioService.safeNewEducation(education).subscribe(
        (newEducation: Education) => {
          this.educationList.push(newEducation);
        }
      );
    } else {
      this.porfolioService.modifyEducation(education).subscribe(
        () => {
          this.reloadData();
        }
      )
    }
  }

  onNewEducation() {
    this.clearForm();
  }

  onEditEducation(index: number) {
    let education: Education = this.educationList[index];
    this.loadForm(education);
  }

  onDeleteEducation(index: number) {
    let educacion: Education = this.educationList[index];
    if (confirm("¿Está seguro que desea borrar la educación seleccionada?")) {
      this.porfolioService.eraseEducation(educacion.id).subscribe(
        () => {
          this.reloadData();
        }
      )
    }
  }

}

