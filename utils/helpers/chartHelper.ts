import {ChartPeriod} from "@/utils/enums";
import {faker} from "@faker-js/faker";
import {barDataItem, lineDataItem, pieDataItem} from "react-native-gifted-charts";
import dayjs from "dayjs";

export abstract class ChartHelper {

    static generateLineChartData(period: ChartPeriod): lineDataItem[] {
        const count = this.getCountFromPeriod(period);
        return Array.from({length: count}, (_, index) => {
            const value = faker.number.int({min: 0, max: 100});
            return {
                value,
                dataPointText: value.toString()
            };
        });
    }

    static generatePieChartData(period: ChartPeriod): pieDataItem[] {
        const sections = faker.number.int({min: 3, max: 6});
        const pieData: pieDataItem[] = [];
        let remaining = 100;

        for (let i = 0; i < sections; i++) {
            const value = i === sections - 1 ? remaining : faker.number.int({
                min: 5,
                max: Math.min(remaining - (sections - i - 1) * 5, 40)
            });
            remaining -= value;

            pieData.push({
                value,
                color: faker.color.rgb(),
                gradientCenterColor: faker.color.rgb(),
                focused: i === 0
            });
        }

        return pieData;
    }

    static generateBarChartData(period: ChartPeriod): barDataItem[] {
        const count = this.getCountFromPeriod(period);
        const today = dayjs();

        return Array.from({length: count}, (_, index) => {
            const date = today.subtract(count - 1 - index, 'day').format('DD/MM');
            return {
                value: faker.number.int({min: 50, max: 800}),
                label: date,
                frontColor: faker.color.rgb(),
            };
        });
    }

    private static getCountFromPeriod(period: ChartPeriod): number {
        switch (period) {
            case ChartPeriod.Day:
                return 24;
            case ChartPeriod.Week:
                return 7;
            case ChartPeriod.Month:
                return 30;
            case ChartPeriod.Trimester:
                return 90;
            case ChartPeriod.All:
                return 100;
            default:
                return 7;
        }
    }
}
