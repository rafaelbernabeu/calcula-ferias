import {Component} from '@angular/core';
import * as moment from "moment";
import {Moment} from "moment";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'calcula-ferias';

  public dataInicial: Moment = moment("2020-07-01");
  public dataFinal: Moment = moment("2020-07-29");
  public selected: {startDate: Moment, endDate: Moment} = {startDate: this.dataInicial, endDate: this.dataFinal};

  choosedDate($event: any) {

    console.log($event);
    this.selected = $event

  }
}
