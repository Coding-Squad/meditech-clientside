import { DomSanitizer } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from './../User.model';
import { CategoryService } from './../Services/category.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-doctor-list',
  templateUrl: './doctor-list.component.html',
  styleUrls: ['./doctor-list.component.css']
})
export class DoctorListComponent implements OnInit {
  categoryService: CategoryService;
  doctors: User[] = [];
  router: ActivatedRoute;
  categoryId: number;
  domSanitizer: DomSanitizer;

  constructor(categoryService: CategoryService, router: ActivatedRoute, domSanitizer: DomSanitizer) {
    this.categoryService = categoryService;
    this.router = router;
    this.domSanitizer = domSanitizer;
   }

  ngOnInit(): void {
    this.router.params.subscribe(param =>{
      console.log("param id is "+param.id);
      this.categoryId = param.id;
    })
    this.categoryService.getUserDoctorList(this.categoryId).subscribe(result =>{
      this.doctors = result;
      this.doctors.forEach(element => {
        element.userAvatar.image = this.domSanitizer.bypassSecurityTrustUrl('data:image/png;base64, '+element.userAvatar.image);
      });

    })

  }

}
