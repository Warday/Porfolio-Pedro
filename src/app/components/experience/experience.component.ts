import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Experience } from 'src/app/data/experience';
import { AuthService } from 'src/app/service/auth.service';
import { PortfolioService } from 'src/app/service/portfolio.service';
@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.css']
})

export class ExperienceComponent implements OnInit {
  experienceList: Experience[] = [];
  isUserLogged: Boolean = false;
  experienceForm: FormGroup;

  constructor(
    private porfolioService: PortfolioService,
    private authService: AuthService,
    private formBuilder: FormBuilder) {
      this.experienceForm = this.formBuilder.group({
          id: [''],
          company: ['', [Validators.required]],
          level: ['', [Validators.required]],
          worktime: ['', [Validators.required]],
          place: ['', [Validators.required]],
          start:['', [Validators.required]],
          end: ['', [Validators.required]],
          diff:['', [Validators.required]],
          img: ['', [Validators.required]],
        });
   }

  ngOnInit(): void {
    this.isUserLogged = this.authService.isUserLogged();
    
    this.reloadData();
  }

  private reloadData() {
    this.porfolioService.getDattaExperience().subscribe(
      (data) => {
        this.experienceList = data;
      }
    );
  }

  private clearForm() {
    this.experienceForm.setValue({
      id: '',
      company: '',
      level: '',
      worktime: '',
      start: 0,
      end: 0,
      diff: '',
      place: '',
      img: ''
    })
  }

  private loadForm(experience: Experience) {
    this.experienceForm.setValue({
      id: experience.id,
      company: experience.company,
      level: experience.level,
      worktime: experience.worktime,
      start: experience.start,
      end: experience.end,
      diff: experience.diff,
      place: experience.place,
      img: experience.img
    })
  }

  onSubmit() {
    let experience: Experience = this.experienceForm.value;
    if (this.experienceForm.get('id')?.value == '') {
      this.porfolioService.safeNewExperience(experience).subscribe(
        (newExperience: Experience) => {
          this.experienceList.push(newExperience);
        }
      );
    } else {
      this.porfolioService.modifyExperience(experience).subscribe(
        () => {
          this.reloadData();
        }
      )
    }
  }

  onNewExperience() {
    this.clearForm();
  }

  onEditExperience(index: number) {
    let experience: Experience = this.experienceList[index];
    this.loadForm(experience);
  }

  onDeleteExperience(index: number) {
    let experience: Experience = this.experienceList[index];
    if (confirm("¿Está seguro que desea borrar la educación seleccionada?")) {
      this.porfolioService.eraseExperience(experience.id).subscribe(
        () => {
          this.reloadData();
        }
      )
    }
  }

  calc(div1Num:number, div2Num:number) {
    //get first number
  
    //make the calculation
    var result = div1Num - div2Num;
    //return the result
    return "el valor es:"+result;}
  
}


function calc(div1Num:number, div2Num:number) {
  //get first number

  //make the calculation
  var result = div1Num - div2Num;
  //return the result
  return result;}
