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
          about:['', [Validators.required]],
          img: ['', [Validators.required]]
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
      place: '',
      start: 'yyyy-mm-dd',
      end: 'yyyy-mm-dd',
      about: '',
      img: ''
    })
    //console.log("experience");
  }

  private loadForm(experience: Experience) {
    
    this.experienceForm.setValue({
      id: experience.id,
      company: experience.company,
      level: experience.level,
      worktime: experience.worktime,
      place: experience.place,
      start: experience.start,
      end: experience.end,
      about: experience.about,
      img: experience.img
    })
    //console.log(experience);

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
    //console.log(index);
    //console.log(experience);
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

  

  calc(div1Num:string, div2Num:string) {
   
    if( div2Num == "0"){
      var today = new Date();
      var date =""
      var dd = String(today.getDate()).padStart(2, '0');
      var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
      var yyyy = today.getFullYear();
      div2Num = yyyy + '-' + mm + '-' + dd;
    }
    var diff = this.dateDiff(div1Num, div2Num);
    return diff;}

    dateDiff(startingDate:string, endingDate:string) {
      var startDate = new Date(new Date(startingDate).toISOString().substr(0, 10));
      if (!endingDate) {
        endingDate = new Date().toISOString().substr(0, 10); // need date in YYYY-MM-DD format
      }
      var endDate = new Date(endingDate);
      if (startDate > endDate) {
        var swap = startDate;
        startDate = endDate;
        endDate = swap;
      }
      var startYear = startDate.getFullYear();
      var february = (startYear % 4 === 0 && startYear % 100 !== 0) || startYear % 400 === 0 ? 29 : 28;
      var daysInMonth = [31, february, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    
      var yearDiff = endDate.getFullYear() - startYear;
      var monthDiff = endDate.getMonth() - startDate.getMonth();
      if (monthDiff < 0) {
        yearDiff--;
        monthDiff += 12;
      }
      var dayDiff = endDate.getDate() - startDate.getDate();
      if (dayDiff < 0) {
        if (monthDiff > 0) {
          monthDiff--;
        } else {
          yearDiff--;
          monthDiff = 11;
        }
        dayDiff += daysInMonth[startDate.getMonth()];
      }
      if (monthDiff == 1){
        var month= ' mes.'
      }
      else{
        var month= ' meses.'
      }
      if (yearDiff == 1){
        var year= ' año '
      }
      else{
        var year= ' años'
      }
      if (monthDiff > 0){
        var timemonth = monthDiff+ month;
      }
      else{
        var timemonth = '.';
      }
    
      if (yearDiff > 0){
        var timeyear = yearDiff + year ;
        }
        else{
          var timeyear =  '';
        }
      if (yearDiff > 0 && monthDiff > 0){
        var conector = ' y '
      }
      else{
        var conector = ''
      }
          
      return 'Se trabajó durante '+ timeyear + conector + timemonth;
    
    
      
    }
  
}

