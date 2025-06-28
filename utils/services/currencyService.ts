export abstract class CurrencyService {
    private static formatter = new Intl.NumberFormat('fr-FR', {
        style: 'currency',
        currency: 'EUR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 2
    });

    static format(amount: number): string {
        return CurrencyService.formatter.format(amount);
    }

    static computeDifferenceInPercent(amount1: number, amount2: number): number {
        const diff = Math.abs(amount1 - amount2);
        const maxAmount = Math.max(amount1, amount2);
        return Math.round((diff / maxAmount) * 100);
    }
}