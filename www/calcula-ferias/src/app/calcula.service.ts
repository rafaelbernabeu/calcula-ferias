import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CalculaService {

  constructor() {
  }

  private anoNovo: Date = new Date(2020, 1, 1);
  private carnaval: Date = new Date(2020, 2, 25);
  private paixaoDeCristo: Date = new Date(2020, 4, 10);
  private tiradentes: Date = new Date(2020, 4, 21);
  private diaDoTrabalho: Date = new Date(2020, 5, 1);
  private independencia: Date = new Date(2020, 9, 7);
  private nsaSraAparecida: Date = new Date(2020, 10, 12);
  private finados: Date = new Date(2020, 11, 2);
  private proclamacaoDaRepublica: Date = new Date(2020, 11, 15);
  private natal: Date = new Date(2020, 12, 25);

  private feriados: Date[] = [this.anoNovo, this.carnaval, this.paixaoDeCristo, this.tiradentes, this.diaDoTrabalho,
    this.independencia, this.nsaSraAparecida, this.finados, this.proclamacaoDaRepublica, this.natal];

  private listaFerias: Map<Number, Object[]> = new Map<Number, Object[]>();




  private procuraPraFrente(dataAtual: Date): Date {
    let maisUmDia: Date = new Date(dataAtual);
    maisUmDia.setDate(maisUmDia.getDate() + 1);
    if (this.ehFeriado(dataAtual) && !this.ehFinalDeSemana(dataAtual) && !this.ehSexta(dataAtual)) {
    return dataAtual;
    }
    if (this.ehSexta(dataAtual)) {
      return this.procuraPraFrente(maisUmDia);
    }
    if (this.ehDomingo(dataAtual)) {
      if (this.ehFeriado(maisUmDia)) {
        return maisUmDia;
      }
      return dataAtual;
    }
    if (!this.ehFinalDeSemana(dataAtual)) {
      return dataAtual;
    }
    return this.procuraPraFrente(maisUmDia);
  }

  private procuraPraTras(dataAtual: Date): Date {
    let menosUmDia: Date = new Date(dataAtual);
    menosUmDia.setDate(menosUmDia.getDate() - 1);
    if (this.ehFeriado(dataAtual) && !this.ehFinalDeSemana(dataAtual) && !this.ehSegunda(dataAtual)) {
      return dataAtual;
    }
    if (this.ehSegunda(dataAtual)) {
      return this.procuraPraTras(menosUmDia);
    }
    if (this.ehSabado(dataAtual)) {
      if (this.ehFeriado(menosUmDia)) {
        return menosUmDia;
      }
      return dataAtual;
    }
    if (!this.ehFinalDeSemana(dataAtual)) {
      return dataAtual;
    }
    return this.procuraPraTras(menosUmDia);
  }

  private ehSegunda(date: Date): boolean {
    return date.getDay() === 1;
  }

  private ehSexta(date: Date): boolean {
    return date.getDay() === 5;
  }

  private ehFinalDeSemana(date: Date): boolean {
    return this.ehSabado(date) || this.ehDomingo(date);
  }

  private ehDomingo(date: Date): boolean {
    return date.getDay() === 0;
  }

  private ehSabado(date: Date): boolean {
    return date.getDay() === 6;
  }

  private ehFeriado(date: Date): boolean {
    return this.feriados.includes(date);
  }

/*
  weekday[0] = "Sunday";
  weekday[1] = "Monday";
  weekday[2] = "Tuesday";
  weekday[3] = "Wednesday";
  weekday[4] = "Thursday";
  weekday[5] = "Friday";
  weekday[6] = "Saturday";
*/
}
