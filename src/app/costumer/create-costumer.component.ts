import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {User} from "../model/user";
import {CostumerService} from "../services/costumer.service";
import Swal from "sweetalert2";
import {Router} from "@angular/router";

@Component({
  selector: 'app-create-costumer',
  templateUrl: './create-costumer.component.html',
  styleUrls: ['./create-costumer.component.css']
})
export class CreateCostumerComponent implements OnInit {
  firstFormGroup: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<CreateCostumerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User,
    private _formBuilder: FormBuilder,
    private costumerService: CostumerService,
    private router: Router
  ) {
  }


  ngOnInit() {

    this.firstFormGroup = this._formBuilder.group({
      fullName: ['', Validators.required],
      nit: ['', Validators.required],
      phone: ['', Validators.required],
      address: ['', Validators.required],
      creditLimit: ['', Validators.required]
    });

  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onClick() {
    this.costumerService.save(this.data).subscribe(response => {
        Swal.fire('Éxito', 'Se a guardado el cliente con exito', 'success');
      }, error => {
        Swal.fire('Error', 'Lo sentimos ha ocurrido un error comuniquese con el administrador!', 'error');
      }
    )
  }

  test() {
    console.log("esta mierda cambio");
  }


}
