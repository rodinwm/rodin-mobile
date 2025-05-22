import {ChartPeriod} from "@/utils/enums";
import {faker} from "@faker-js/faker";
import {barDataItem, lineDataItem, pieDataItem, stackDataItem} from "react-native-gifted-charts";
import dayjs from "dayjs";
import {Colors} from "@/utils/colors";
import {ReactNode} from "react";

export abstract class ChartHelper {

    static generateLineChartData(period: ChartPeriod, labelComponent?: ReactNode): lineDataItem[] {
        const count = this.getCountFromPeriod(period);
        return Array.from({length: count}, (_, index) => {
            const value = faker.number.int({min: 0, max: 100});
            return {
                value,
                dataPointText: value.toString(),
                label: dayjs().subtract(count - 1 - index, 'day').format('DD/MM'),
            };
        });
    }

    static generatePieChartData(period: ChartPeriod): pieDataItem[] {
        const labels = ['Travail', 'Repos'];
        const colors = [
            Colors.background.work.light,
            Colors.background.rest.light,
        ];

        const values: number[] = [];
        let remaining = 100;

        // Génération des valeurs
        for (let i = 0; i < labels.length; i++) {
            const value = i === labels.length - 1
                ? remaining
                : faker.number.int({
                    min: 5,
                    max: Math.min(remaining - (labels.length - i - 1) * 5, 40)
                });
            values.push(value);
            remaining -= value;
        }

        // Création directe des items complets
        const pieData: pieDataItem[] = [];
        for (let i = 0; i < labels.length; i++) {
            pieData.push({
                value: values[i],
                color: colors[i],
                gradientCenterColor: colors[i] + '33',
                text: labels[i],
            });
        }

        return pieData;
    }


    static generateBarChartData(period: ChartPeriod): barDataItem[] {
        const count = this.getCountFromPeriod(period);

        return Array.from({length: count}, (_, index) => {
            return {
                value: faker.number.int({min: 50, max: 800}),
                label: dayjs().subtract(count - 1 - index, 'day').format('DD/MM'),
                frontColor: faker.color.rgb(), // Couleurs aléatoires
            };
        });
    }

    static generateStackBarChartData(period: ChartPeriod): stackDataItem[] {
        const count = this.getCountFromPeriod(period);

        return Array.from({length: count}, (_, index) => {
            // Valeurs aléatoires : travail (60 à 480 min), repos (15 à 180 min)
            const workTime = faker.number.int({min: 60, max: 480});
            const restTime = faker.number.int({min: 15, max: 180});

            return {
                label: dayjs().subtract(count - 1 - index, 'day').format('DD/MM'),
                stacks: [
                    {
                        value: workTime,
                        color: Colors.background['work'].light,
                    },
                    {
                        value: restTime,
                        color: Colors.background['rest'].light,
                    },
                ]
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
