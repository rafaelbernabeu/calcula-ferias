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

  public periodos: number[] = [15, 5, 10];
  public ganho: number = 3;
  public ano: number = new Date().getFullYear();

  public dataInicial: Moment = this.getMoment(new Date());
  public dataFinal: Moment = this.getMoment(new Date());
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
    this.listaFerias = calculaService.calculaFerias(this.periodos, this.ganho, this.ano);
  }

  public adiciona() {
    if (this.periodos.length < 3) {
      this.periodos.push(30 - this.periodos.reduce((p, c) => p + c));
    }
  }

  public remove() {
    if (this.periodos.length > 1) {
      this.periodos.pop();
    }
  }

  public atualiza(): void {
    this.listaFerias = this.calculaService.calculaFerias(this.periodos, this.ganho, this.ano);
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
