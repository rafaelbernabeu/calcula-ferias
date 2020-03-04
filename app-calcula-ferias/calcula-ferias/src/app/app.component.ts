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
  title = 'Aproveite melhor suas férias!';

  public periodos: number[] = [15, 10, 5];
  public ganho: number = 3;

  public dataInicial: Moment = moment("2020-07-01");
  public dataFinal: Moment = moment("2020-07-29");
  public selected: {startDate: Moment, endDate: Moment} = {startDate: this.dataInicial, endDate: this.dataFinal};
  public listaFerias: Map<Number, any[]>;
  public defaultLocale: any = {
    direction: 'ltr',
    separator: ' - ',
    weekLabel: 'W',
    applyLabel: 'Apply',
    cancelLabel: 'Cancel',
    clearLabel: 'Clear',
    customRangeLabel: 'Custom range',
    daysOfWeek: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
    monthNames: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
    firstDay: 1
  };

  public isCollapsed: boolean[] = [false,false,false];

  constructor(private calculaService: CalculaService) {
    this.listaFerias = calculaService.calcula(this.periodos, this.ganho);
  }

  public adiciona() {
    if (this.periodos.length < 3) {
      this.periodos.push(5);
    }
  }

  public remove() {
    if (this.periodos.length > 1) {
      this.periodos.pop();
    }
  }

  public atualiza(): void {
    this.listaFerias = this.calculaService.calcula(this.periodos, this.ganho);
    this.isCollapsed = [false,false,false];
  }

  public getMoment(date: Date): Moment {
    let month = date.getMonth() + 1;
    return moment("" + date.getFullYear()+"-"+ month+"-"+date.getDate())
  }

  public trackByFn(index: any, item: any) {
    return index;
  }

}
