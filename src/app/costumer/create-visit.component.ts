import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Visit} from "../model/visit";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Observable} from "rxjs";
import {CountryService} from "../services/country.service";
import {StateService} from "../services/state.service";
import {map, startWith} from "rxjs/operators";
import {Country} from "../model/country";
import {StateDto} from "../model/stateDto";
import {City} from "../model/city";
import {CityService} from "../services/city.service";
import {SaleRepresentativeService} from "../services/saleRepresentative.service";
import {SaleRepresentative} from "../model/SaleRepresentative";
import {VisitService} from "../services/visit.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-create-visit',
  templateUrl: './create-visit.component.html',
  styleUrls: ['./create-visit.component.css']
})
export class CreateVisitComponent implements OnInit {

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  fourthFormGroup: FormGroup;
  countryControl = new FormControl();
  stateControl = new FormControl();
  cityControl = new FormControl();
  salesControl = new FormControl();
  optionsCountry: string[] = [];
  optionsState: string[] = [];
  optionsCity: string[] = [];
  optionsSales: string[] = [];
  countyList: Country[] = [];
  stateList: StateDto[] = [];
  cityList: City[] = [];
  salesList: SaleRepresentative[] = [];
  countryOptions: Observable<string[]>;
  stateOptions: Observable<string[]>;
  cityOptions: Observable<string[]>;
  salesOptions: Observable<string[]>;

  constructor(
    public dialogRef: MatDialogRef<CreateVisitComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Visit,
    private _formBuilder: FormBuilder,
    private countryService: CountryService,
    private stateService: StateService,
    private cityService: CityService,
    private saleRepresentativeService: SaleRepresentativeService,
    private visitService: VisitService
  ) {
  }


  ngOnInit() {
    this.getAllCountry();
    this.firstFormGroup = this._formBuilder.group({});
    this.secondFormGroup = this._formBuilder.group({});
    this.thirdFormGroup = this._formBuilder.group({});
    this.fourthFormGroup = this._formBuilder.group({
      net: ['', Validators.required]
    });

  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onClick() {
    this.data.city = this.cityList.find(a => a.name == this.data.city.name);
    this.data.city.state = this.stateList.find(a => a.name == this.data.city.state.name);
    this.data.city.state.country = this.countyList.find(a => a.name == this.data.city.state.country.name);
    this.data.saleRepresentative = this.salesList.find(a => a.name == this.data.saleRepresentative.name);

    this.visitService.save(this.data).subscribe(response => {
      Swal.fire('Éxito', 'Se a guardado las visistas del cliente con exito', 'success');
    }, error => {
      Swal.fire('Error', 'Lo sentimos ha ocurrido un error comuniquese con el administrador!', 'error');
    });
  }

  validateCountry() {
    if (this.optionsCountry.includes(this.data.city.state.country.name)) {
      return true;
    }
    return false;
  }

  validateState() {
    if (this.optionsState.includes(this.data.city.state.name)) {
      return true;
    }
    return false;
  }

  validateCity() {
    if (this.optionsCity.includes(this.data.city.name)) {
      return true;
    }
    return false;
  }

  validateSales() {
    if (this.optionsSales.includes(this.data.saleRepresentative.name)) {
      return true;
    }
    return false;
  }

  private _filterCountry(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.optionsCountry.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }

  private _filterCity(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.optionsCity.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }

  private _filterSales(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.optionsSales.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }

  private _filterState(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.optionsState.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }

  private getAllCountry() {
    this.countryService.getAllCountry().subscribe(response => {
      this.countyList = response.response;
      this.countyList.forEach(country => this.optionsCountry.push(country.name));
      this.countryOptions = this.countryControl.valueChanges.pipe(
        startWith(''),
        map(value => this._filterCountry(value))
      );
    })
  }

  private getAllState() {
    this.stateService.getAllState(this.data.city.state.country.name).subscribe(response => {
      this.stateList = response.response;
      this.stateList.forEach(state => this.optionsState.push(state.name));
      this.stateOptions = this.stateControl.valueChanges.pipe(
        startWith(''),
        map(value => this._filterState(value))
      );
    })
  }

  private getAllCity() {
    this.cityService.getAllCity(this.data.city.state.name).subscribe(response => {
      this.cityList = response.response;
      this.cityList.forEach(state => this.optionsCity.push(state.name));
      this.cityOptions = this.cityControl.valueChanges.pipe(
        startWith(''),
        map(value => this._filterCity(value))
      );
    })
  }

  private getAllSaleRepresentative() {
    this.saleRepresentativeService.getAllSaleRepresentative().subscribe(response => {
      this.salesList = response.response;
      this.salesList.forEach(state => this.optionsSales.push(state.name));
      this.salesOptions = this.salesControl.valueChanges.pipe(
        startWith(''),
        map(value => this._filterSales(value))
      );
    })
  }

}
