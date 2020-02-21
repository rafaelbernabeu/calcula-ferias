package br.bernabeu;

import java.time.LocalDate;
import java.time.Period;
import java.util.Objects;

public class RangeData {

    public LocalDate inicio;
    public LocalDate fim;

    public Period period;

    public int original;

    @Override
    public String toString() {
        return "RangeData{" +
                "inicio=" + inicio +
                ", fim=" + fim +
                ", qtdDias=" + period.getDays() +
                ", original=" + original +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        RangeData rangeData = (RangeData) o;
        return original == rangeData.original &&
                Objects.equals(inicio, rangeData.inicio) &&
                Objects.equals(fim, rangeData.fim) &&
                Objects.equals(period, rangeData.period);
    }

    @Override
    public int hashCode() {
        return Objects.hash(inicio, fim, period, original);
    }
}
