import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CalculaService {

  constructor() {}

  private listaFerias: Map<Number, any[]> = new Map<Number, any[]>();

  private calculaFeriados(ano: number): Date[] {
    let anoNovo: Date = new Date(ano, 0, 1);
    let carnaval: Date = this.getCarnaval(ano);
    let sextaFeiraSanta: Date = this.getSextaFeiraSanta(ano);
    let tiradentes: Date = new Date(ano, 3, 21);
    let diaDoTrabalho: Date = new Date(ano, 4, 1);
    let independencia: Date = new Date(ano, 8, 7);
    let nsaSraAparecida: Date = new Date(ano, 9, 12);
    let finados: Date = new Date(ano, 10, 2);
    let proclamacaoDaRepublica: Date = new Date(ano, 10, 15); 
    let natal: Date = new Date(ano, 11, 25);

    return [anoNovo, carnaval, sextaFeiraSanta, tiradentes, diaDoTrabalho, independencia, 
      nsaSraAparecida, finados, proclamacaoDaRepublica, natal];
  }

  public calculaFerias(duracoes: any[], ganho: number, ano: number): Map<Number, any[]> {

    let primeiroDiaDoAno: Date = new Date(ano, 0,1);
    let ultimoDiaDoAno: Date = new Date(ano, 11, 31);

    let feriados: Date[] = this.calculaFeriados(ano);

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

        rangeData.inicio = new Date(this.procuraPraTras(avaliando, feriados));
        rangeData.fim = new Date(this.procuraPraFrente(praFrente, feriados));

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

  private procuraPraFrente(dataAtual: Date, feriados: Date[]): Date {
    let maisUmDia: Date = new Date(dataAtual);
    maisUmDia.setDate(maisUmDia.getDate() + 1);
    if (this.ehFeriado(dataAtual, feriados) && !this.ehFinalDeSemana(dataAtual) && !this.ehSexta(dataAtual)) {
      return dataAtual;
    }
    if (this.ehSexta(dataAtual)) {
      return this.procuraPraFrente(maisUmDia, feriados);
    }
    if (this.ehDomingo(dataAtual)) {
      if (this.ehFeriado(maisUmDia, feriados)) {
        return maisUmDia;
      }
      return dataAtual;
    }
    if (!this.ehFinalDeSemana(dataAtual)) {
      return dataAtual;
    }
    return this.procuraPraFrente(maisUmDia, feriados);
  }

  private procuraPraTras(dataAtual: Date, feriados: Date[]): Date {
    let menosUmDia: Date = new Date(dataAtual);
    menosUmDia.setDate(menosUmDia.getDate() - 1);
    if (this.ehFeriado(dataAtual, feriados) && !this.ehFinalDeSemana(dataAtual) && !this.ehSegunda(dataAtual)) {
      return dataAtual;
    }
    if (this.ehSegunda(dataAtual)) {
      return this.procuraPraTras(menosUmDia, feriados);
    }
    if (this.ehSabado(dataAtual)) {
      if (this.ehFeriado(menosUmDia, feriados)) {
        return menosUmDia;
      }
      return dataAtual;
    }
    if (!this.ehFinalDeSemana(dataAtual)) {
      return dataAtual;
    }
    return this.procuraPraTras(menosUmDia, feriados);
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

  private ehFeriado(date: Date, feriados: Date[]): boolean {
    for (const f of feriados) {
      if (f.getTime() == date.getTime()) {
        return true;
      }
    }
    return false;
  }

  private getSextaFeiraSanta(ano: number): Date {
    let pascoa: Date = this.getPascoa(ano);
    return new Date(pascoa.setDate(pascoa.getDate() - 2));
  }

  private getCarnaval(ano: number): Date {
    let pascoa: Date = this.getPascoa(ano);
    return new Date(pascoa.setDate(pascoa.getDate() - 47));
  }

  private getPascoa(year: number): Date {
      var X=0;
      var Y=0;
      
      if (year>=1582 && year<=1699){X = 22; Y = 2;}
      if (year>=1700 && year<=1799){X = 23; Y = 3;}
      if (year>=1800 && year<=1899){X = 23; Y = 4;}
      if (year>=1900 && year<=2099){X = 24; Y = 5;}
      if (year>=2100 && year<=2199){X = 24; Y = 6;}
      if (year>=2200 && year<=2299){X = 25; Y = 7;}
      
      var a = year % 19;
      var b = year % 4;
      var c = year % 7;
      var d = ((19*a)+X) % 30;
      var e = (((2*b)+(4*c)+(6*d)+Y)) % 7;

      /* 
      a = ANO MOD 19
        b = ANO MOD 4
        c = ANO MOD 7
        d = ((19*a)+X)MOD 30
        e = ((2*b)+(4*c)+(6*d)+Y) MOD 7
        se: (d+e)<10 então o dia = (d+e+22) e mês=Março
        senão: dia=(d+e-9) e mês=Abril
      */
      
      var day;
      var month;

      if ((d+e)<10) { 
        day = d + e + 22; 
        month = 3;
      } else {
        day = d + e - 9; 
        month = 4;
      }
      //26 of april 2076
      if (day == 26 && month == 4) {
        day = 19;
      }
      
      //25 of april 2049
      if (day == 25 && month == 4 && d == 28 && a > 10) {
        day = 18;
      }
      
      return new Date(year, month-1, day, 0, 0, 0, 0);
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
