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

  public periodos: number[] = [30];
  public ganho: number = 3;


  public dataInicial: Moment = moment("2020-07-01");
  public dataFinal: Moment = moment("2020-07-29");
  public selected: {startDate: Moment, endDate: Moment} = {startDate: this.dataInicial, endDate: this.dataFinal};
  public listaFerias: Map<Number, any[]>;

  constructor(private calculaService: CalculaService) {
    this.listaFerias = calculaService.calcula(this.periodos, this.ganho);
  }

  public adiciona() {
    if (this.periodos.length < 3) {
      this.periodos.push(0);
    }
  }

  public remove() {
    if (this.periodos.length > 1) {
      this.periodos.pop();
    }
  }

  public atualiza(): void {
    this.listaFerias = this.calculaService.calcula(this.periodos, this.ganho);
    this.periodos.map(p => p > 0 ? p : null).forEach(periodo => {
      let umPeriodo = this.listaFerias.get(periodo);
      if (umPeriodo) {
        umPeriodo.forEach(item => {
          console.log("Melhores Datas: \n" +
            "Inicio: " + item.inicio + "\n" +
            "Fim: " + item.fim + "\n" +
            "Período Original: " + item.original + "\n" +
            "Período Otimizado: " + item.period);
        });
      }
    });
  }

  public getMoment(date: Date): Moment {
    let month = date.getMonth() + 1;
    return moment("" + date.getFullYear()+"-"+ month+"-"+date.getDate())
  }

  public trackByFn(index: any, item: any) {
    return index;
  }

  choosedDate($event: any) {

    console.log($event);
    this.selected = $event

  }
}
