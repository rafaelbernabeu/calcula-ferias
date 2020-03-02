import {Component} from '@angular/core';
import * as moment from "moment";
import {Moment} from "moment";
import {CalculaService} from "./calcula.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'calcula-ferias';

  public periodos: number[] = [15, 10, 5];

  public dataInicial: Moment = moment("2020-07-01");
  public dataFinal: Moment = moment("2020-07-29");
  public selected: {startDate: Moment, endDate: Moment} = {startDate: this.dataInicial, endDate: this.dataFinal};

  constructor(private calculaService: CalculaService) {
    calculaService.calcula();
  }

  choosedDate($event: any) {

    console.log($event);
    this.selected = $event

  }
}
