import { HttpEventType, HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { UploadService } from '../../services/upload/upload.service';
import { SnackbarService } from '../../services/snackbar/snackbar.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {

  @ViewChild('fileUpload', {static: false}) fileUpload: ElementRef;
  files  = [];
  id: number;
  photos = [];
  propertiesOrProfile: string;

  constructor(
    private uploadService: UploadService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private snackbarService: SnackbarService
  ) { }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params.id;
    if (this.router.url.includes('my-properties')) {
      this.propertiesOrProfile = 'properties';
    } else {
      this.propertiesOrProfile = 'profile';
    }
  }

  uploadFile(file: any): void {
    const formData = new FormData();
    formData.append('file', file.data);
    file.inProgress = true;
    this.uploadService.upload(this.propertiesOrProfile, this.id, formData).pipe(
      map(event => {
        switch (event.type) {
          case HttpEventType.UploadProgress:
            file.progress = Math.round(event.loaded * 100 / event.total);
            break;
          case HttpEventType.Response:
            this.snackbarService.successSnackbar('La photo a été uploadé avec succès.');
            return event;
        }
      }),
      catchError((error: HttpErrorResponse) => {
        file.inProgress = false;
        this.snackbarService.alertSnackbar('Une erreur est survenue.');
        return of(`${file.data.name} upload failed.`);
      })).subscribe((event: any) => {
        if (typeof (event) === 'object') {
          console.log(event.body);
        }
      });
  }

  private uploadFiles(): void {
    this.fileUpload.nativeElement.value = '';
    this.files.forEach(file => {
      const name = file.data.name;
      const ext = (name.substring(name.lastIndexOf('.') + 1)).toLowerCase();

      // Verify if the file is an img and max 5mo.
      if (ext === 'png' || ext === 'jpeg' || ext === 'jpg') {
        if (file.data.size > 5000000) {
          this.snackbarService.alertSnackbar('Merci de choisir un image faisant au maximum 5mo !');
          throw new Error ('Le poids de l\'image est trop lourd !');
        } else {
          this.uploadFile(file);
        }
      } else {
        this.snackbarService.alertSnackbar('Merci de choisir un format .png ou .jpg ou .jpeg !');
        throw new Error ('Le format n\'est pas bon !');
      }

    });
  }

  onUploadFiles(): void {
    this.files = [];
    const fileUpload = this.fileUpload.nativeElement;

    fileUpload.onchange = () => {
      for (const file of fileUpload.files) {
        this.files.push({ data: file, inProgress: false, progress: 0});
      }
      this.uploadFiles();
    };
    fileUpload.click();
  }

}
