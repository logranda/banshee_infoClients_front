import {Component, OnInit, ViewChild} from '@angular/core';
import {DisplayedColumns} from "../model/displayedColumns";
import {User} from "../model/user";
import {FormGroup} from "@angular/forms";
import {Visit} from "../model/visit";
import {FormlyFieldConfig, FormlyFormOptions} from "@ngx-formly/core";
import {CostumerService} from "../services/costumer.service";
import {MatDialog} from "@angular/material/dialog";
import {City} from "../model/city";
import {StateDto} from "../model/stateDto";
import {Country} from "../model/country";
import Swal from "sweetalert2";
import {CreateCostumerComponent} from "./create-costumer.component";
import {CreateVisitComponent} from "./create-visit.component";
import {concat, of} from "rxjs";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {SaleRepresentative} from "../model/SaleRepresentative";
interface Search {
  nit: number;
  name: string;
}
@Component({
  selector: 'app-costumer',
  templateUrl: './costumer.component.html',
  styleUrls: ['./costumer.component.css']
})
export class CostumerComponent implements OnInit {


  search: Search = {nit: null, name: null};
  displayedColumns: DisplayedColumns[] = [];
  displayedColumnsName: string[] = [];
  dataSource: MatTableDataSource<User>;
  pageSizeOptions: number[] = [1,5, 10, 25, 100];
  form = new FormGroup({});
  visit: Visit;

  options: FormlyFormOptions = {};
  fields: FormlyFieldConfig[];
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private costumerService: CostumerService,
              public dialog: MatDialog
  ) {
  }

  ngOnInit() {
    this.visit = new Visit();
    this.visit.customer = new User();
    this.visit.city = new City();
    this.visit.city.state = new StateDto();
    this.visit.city.state.country = new Country();
    this.visit.saleRepresentative = new SaleRepresentative();
    this.getConcat();
  }

  getListCostumer() {
    this.costumerService.getResponse(this.search, this.paginator
    ).subscribe(response => {
        this.dataSource = new MatTableDataSource(response.response.content);
        this.paginator.length = response.response.totalElements;
        console.log('llego a getListLoan', this.dataSource);
      }, error => {
        Swal.fire('Error', 'Lo sentimos ha ocurrido un error comuniquese con el administrador!', 'error');
      }
    );
  }

  getListSystemSearch() {
    this.paginator.firstPage();
    this.getListCostumer();
  }

  getPageEvent(pageEvent: PageEvent) {
    console.log(pageEvent)
    this.paginator.length = pageEvent.length;
    this.paginator.pageSize = pageEvent.pageSize;
    this.paginator.pageIndex = pageEvent.pageIndex;
    this.getListCostumer();
  }

  getCreateCustomer() {
    const dialogRef = this.dialog.open(CreateCostumerComponent, {
      width: '50%',
      height: '70%',
      data: this.visit,
    });
  }

  getRecord(row: any) {
    console.log('logranda clic en la fila', row);
    this.visit.customer = row
    const dialogRef = this.dialog.open(CreateVisitComponent, {
      width: '50%',
      height: '40%',
      data: this.visit
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      // tslint:disable-next-line:triple-equals
      if (result != undefined) {
        row.value = result;
        /*     this.systemConfigurationService.updateSystem(row).subscribe(response => {
               console.log(response);
               if (response.message === 'OK') {
                 swal.fire('Éxito', 'La actualización de la configuración se ha actualizado con éxito', 'success');
               } else {
                 swal.fire('Error actualizando configuración', 'La actualización de la configuración no se pudo actualizar', 'error');
               }

             });*/
        console.log(row);
      }
    });
  }

  private getColumns() {
    this.costumerService.getColumns().subscribe(response => {
        this.displayedColumns = response.displayedColumns;
        this.displayedColumns.map(a => this.displayedColumnsName.push(a.name));
        this.paginator.pageIndex = response.pageIndex;
        this.paginator.pageSize = response.pageSize;
        console.log('llego a getColumns', this.displayedColumns);
      }
    );
  }

  private getConcat() {
    concat(of(this.getColumns(), this.getListCostumer())).subscribe();
  }

}
