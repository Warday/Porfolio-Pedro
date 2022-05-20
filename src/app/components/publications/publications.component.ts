import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Publications } from 'src/app/data/publications';
import { AuthService } from 'src/app/service/auth.service';
import { PortfolioService } from 'src/app/service/portfolio.service';

@Component({
  selector: 'app-publications',
  templateUrl: './publications.component.html',
  styleUrls: ['./publications.component.css']
})
export class PublicationsComponent implements OnInit {
  publicationsList: Publications[] = [];
  isUserLogged: Boolean = false;

  publicationsForm: FormGroup;

  constructor(
    private porfolioService: PortfolioService,
    private authService: AuthService,
    private formBuilder: FormBuilder) {
      this.publicationsForm = this.formBuilder.group({
          id: [''],
          place: ['', [Validators.required]],
          title: ['', [Validators.required]],
          year: ['', [Validators.required]],
          doi: ['', [Validators.required]],
        });
   }

  ngOnInit(): void {
    this.isUserLogged = this.authService.isUserLogged();
    
    this.reloadData();
  }

  private reloadData() {
    this.porfolioService.getDattaPublications().subscribe(
      (data) => {
        this.publicationsList = data;
      }
    );
  }

  private clearForm() {
    this.publicationsForm.setValue({
      id: '',
      place: '',
      title: '',
      year: 0,
      doi: ''
    })
  }

  private loadForm(publications: Publications) {
    this.publicationsForm.setValue({
      id: publications.id,
      place: publications.place,
      title: publications.title,
      year: publications.year,
      doi: publications.doi
    })
  }

  onSubmit() {
    let publications: Publications = this.publicationsForm.value;
    if (this.publicationsForm.get('id')?.value == '') {
      this.porfolioService.safeNewPublications(publications).subscribe(
        (newPublications: Publications) => {
          this.publicationsList.push(newPublications);
        }
      );
    } else {
      this.porfolioService.modifyPublications(publications).subscribe(
        () => {
          this.reloadData();
        }
      )
    }
  }

  onNewPublications() {
    this.clearForm();
  }

  onEditPublications(index: number) {
    let publications: Publications = this.publicationsList[index];
    this.loadForm(publications);
  }

  onDeletePublications(index: number) {
    let publications: Publications = this.publicationsList[index];
    if (confirm("¿Está seguro que desea borrar la educación seleccionada?")) {
      this.porfolioService.erasePublications(publications.id).subscribe(
        () => {
          this.reloadData();
        }
      )
    }
  }

}

