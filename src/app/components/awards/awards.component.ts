import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Awards } from 'src/app/data/awards';
import { AuthService } from 'src/app/service/auth.service';
import { PortfolioService } from 'src/app/service/portfolio.service';

@Component({
  selector: 'app-awards',
  templateUrl: './awards.component.html',
  styleUrls: ['./awards.component.css']
})

export class AwardsComponent implements OnInit {
  awardsList: Awards[] = [];
  isUserLogged: Boolean = false;
  awardsForm: FormGroup;

  constructor(
    private porfolioService: PortfolioService,
    private authService: AuthService,
    private formBuilder: FormBuilder) {
      this.awardsForm = this.formBuilder.group({
          id: [''],
          name: ['', [Validators.required]],
          title: ['', [Validators.required]],
          year: ['', [Validators.required]],
          img: ['', [Validators.required]]
        });
   }

  ngOnInit(): void {
    this.isUserLogged = this.authService.isUserLogged();
    
    this.reloadData();
  }

  private reloadData() {
    this.porfolioService.getDattaAwards().subscribe(
      (data) => {
        this.awardsList = data;
      }
    );
  }

  private clearForm() {
    this.awardsForm.setValue({
      id: '',
      name: '',
      title: '',
      year: 0,
      career: '',
      start: 0,
      end: 0,
      img: ''
    })
  }

  private loadForm(awards: Awards) {
    this.awardsForm.setValue({
      id: awards.id,
      name: awards.name,
      title: awards.title,
      year: awards.year,
      img: awards.img
    })
  }

  onSubmit() {
    let awards: Awards = this.awardsForm.value;
    if (this.awardsForm.get('id')?.value == '') {
      this.porfolioService.safeNewAwards(awards).subscribe(
        (newAwards: Awards) => {
          this.awardsList.push(newAwards);
        }
      );
    } else {
      this.porfolioService.modifyAwards(awards).subscribe(
        () => {
          this.reloadData();
        }
      )
    }
  }

  onNewAwards() {
    this.clearForm();
  }

  onEditAwards(index: number) {
    let awards: Awards = this.awardsList[index];
    this.loadForm(awards);
  }

  onDeleteAwards(index: number) {
    let awards: Awards = this.awardsList[index];
    if (confirm("¿Está seguro que desea borrar la educación seleccionada?")) {
      this.porfolioService.eraseAwards(awards.id).subscribe(
        () => {
          this.reloadData();
        }
      )
    }
  }

}

