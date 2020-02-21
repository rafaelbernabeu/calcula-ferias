package br.bernabeu;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.Period;
import java.util.*;

public class Main {

    private static final LocalDate anoNovo = LocalDate.of(2020, 1, 1);
    private static final LocalDate carnaval = LocalDate.of(2020, 2, 25);
    private static final LocalDate paixaoDeCristo = LocalDate.of(2020, 4, 10);
    private static final LocalDate tiradentes = LocalDate.of(2020, 4, 21);
    private static final LocalDate diaDoTrabalho = LocalDate.of(2020, 5, 1);
    private static final LocalDate independencia = LocalDate.of(2020, 9, 7);
    private static final LocalDate nsaSraAparecida = LocalDate.of(2020, 10, 12);
    private static final LocalDate finados = LocalDate.of(2020, 11, 2);
    private static final LocalDate proclamacaoDaRepublica = LocalDate.of(2020, 11, 15);
    private static final LocalDate natal = LocalDate.of(2020, 12, 25);

    private static final List<LocalDate> feriados = Arrays.asList(anoNovo, carnaval, paixaoDeCristo, tiradentes, diaDoTrabalho,
            independencia, nsaSraAparecida, finados, proclamacaoDaRepublica, natal);

    private static Map<Integer, Set<RangeData>> listaFerias = new HashMap<>();

    public static void main(String[] args) {

        int[] duracoes = new int[]{15, 10, 5};

        LocalDate hoje = LocalDate.now();
        LocalDate primeiroDiaDoAno = LocalDate.of(hoje.getYear(), 1, 1);
        LocalDate ultimoDiaDoAno = LocalDate.of(hoje.getYear(), 12, 31);

        for (int i = 0; i < duracoes.length; i++) {
            int periodo = duracoes[i];
            listaFerias.put(periodo, new HashSet<>());

            LocalDate avaliando = LocalDate.from(primeiroDiaDoAno);

            while (avaliando.isBefore(ultimoDiaDoAno)) {

                LocalDate praFrente = avaliando.plusDays(periodo - 1);

                RangeData rangeData = new RangeData();
                rangeData.original = periodo;

                rangeData.inicio = procuraPraTras(avaliando);
                rangeData.fim = procuraPraFrente(praFrente);

                rangeData.period = Period.between(rangeData.inicio, rangeData.fim.plusDays(1));

                if (rangeData.period.getDays() >= periodo + 3) {
                    listaFerias.get(periodo).add(rangeData);
                }
                avaliando = avaliando.plusDays(1);
            }

            listaFerias.get(periodo).stream().sorted((o1, o2) -> {
                if (o1.period.getDays() - o2.period.getDays() == 0) {
                    return 0;
                }
                return o1.period.getDays() - o2.period.getDays() > 0 ? 1 : -1;
            }).sorted(Comparator.comparing(o -> o.inicio))
                .forEach((item) -> {
                System.out.println("Melhores Datas:" + item);
            });
        }
    }

    private static LocalDate procuraPraFrente(LocalDate dataAtual) {
        LocalDate menosUmDia = dataAtual.plusDays(1);
        if (ehFeriado(dataAtual) && !ehFinalDeSemana(dataAtual) && !ehSexta(dataAtual)) {
            return dataAtual;
        }
        if (ehSexta(dataAtual)) {
            return procuraPraFrente(menosUmDia);
        }
        if (ehDomingo(dataAtual)) {
            if (ehFeriado(menosUmDia)) {
                return menosUmDia;
            }
            return dataAtual;
        }
        if (!ehFinalDeSemana(dataAtual)) {
            return dataAtual;
        }
        return procuraPraFrente(menosUmDia);
    }

    private static LocalDate procuraPraTras(LocalDate dataAtual) {
        LocalDate menosUmDia = dataAtual.minusDays(1);
        if (ehFeriado(dataAtual) && !ehFinalDeSemana(dataAtual) && !ehSegunda(dataAtual)) {
            return dataAtual;
        }
        if (ehSegunda(dataAtual)) {
            return procuraPraTras(menosUmDia);
        }
        if (ehSabado(dataAtual)) {
            if (ehFeriado(menosUmDia)) {
                return menosUmDia;
            }
            return dataAtual;
        }
        if (!ehFinalDeSemana(dataAtual)) {
            return dataAtual;
        }
        return procuraPraTras(menosUmDia);
    }

    private static boolean ehSegunda(LocalDate localDate) {
        return localDate.getDayOfWeek().equals(DayOfWeek.MONDAY);
    }

    private static boolean ehSexta(LocalDate localDate) {
        return localDate.getDayOfWeek().equals(DayOfWeek.FRIDAY);
    }

    private static boolean ehFinalDeSemana(LocalDate localDate) {
        return ehSabado(localDate) || ehDomingo(localDate);
    }

    private static boolean ehDomingo(LocalDate localDate) {
        return localDate.getDayOfWeek().equals(DayOfWeek.SUNDAY);
    }

    private static boolean ehSabado(LocalDate localDate) {
        return localDate.getDayOfWeek().equals(DayOfWeek.SATURDAY);
    }

    private static boolean ehFeriado(LocalDate localDate) {
        return feriados.contains(localDate);
    }


}

