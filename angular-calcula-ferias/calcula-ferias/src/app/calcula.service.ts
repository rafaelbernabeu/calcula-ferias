import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CalculaService {

  constructor() {
  }

  private anoNovo: Date = new Date(2020, 0, 1);
  private carnaval: Date = new Date(2020, 1, 25);
  private paixaoDeCristo: Date = new Date(2020, 3, 10);
  private tiradentes: Date = new Date(2020, 3, 21);
  private diaDoTrabalho: Date = new Date(2020, 4, 1);
  private independencia: Date = new Date(2020, 8, 7);
  private nsaSraAparecida: Date = new Date(2020, 9, 12);
  private finados: Date = new Date(2020, 10, 2);
  private proclamacaoDaRepublica: Date = new Date(2020, 10, 15);
  private natal: Date = new Date(2020, 11, 25);

  private feriados: Date[] = [this.anoNovo, this.carnaval, this.paixaoDeCristo, this.tiradentes, this.diaDoTrabalho,
    this.independencia, this.nsaSraAparecida, this.finados, this.proclamacaoDaRepublica, this.natal];

  private listaFerias: Map<Number, any[]> = new Map<Number, any[]>();

  public calcula(duracoes: any[], ganho: number): Map<Number, any[]> {

    let hoje: Date = new Date();
    let primeiroDiaDoAno: Date = new Date(hoje.getFullYear(), 0,1);
    let ultimoDiaDoAno: Date = new Date(hoje.getFullYear(), 11, 31);

    for (let i = 0; i < duracoes.length; i++) {
      let periodo = duracoes[i];
      if (!periodo) { continue };
      this.listaFerias.set(periodo, []);

      let avaliando: Date = new Date(primeiroDiaDoAno);

      while (avaliando < ultimoDiaDoAno) {

        let praFrente: Date = new Date(avaliando);
        praFrente.setDate(praFrente.getDate() + (periodo - 1));

        let rangeData: any = {};
        rangeData.original = periodo;

        rangeData.inicio = new Date(this.procuraPraTras(avaliando));
        rangeData.fim = new Date(this.procuraPraFrente(praFrente));

        let dataFimMaisUm: any = new Date(rangeData.fim);
        dataFimMaisUm.setDate(dataFimMaisUm.getDate() + 1);

        const diffTime = Math.abs(dataFimMaisUm - rangeData.inicio);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        rangeData.period = diffDays;

        if (rangeData.period == (periodo + ganho)) {
          this.listaFerias.get(periodo).push(rangeData);
        }
        avaliando.setDate(avaliando.getDate() + 1);
      }
    }
    return this.listaFerias;
  }

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
    for (const f of this.feriados) {
      if (f.getTime() == date.getTime()) {
        return true;
      }
    }
    return false;
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
