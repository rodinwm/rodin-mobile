import {barDataItem, lineDataItem, pieDataItem} from "react-native-gifted-charts";

export const mockedBarData: barDataItem[] = [
    {value: 250, label: 'M'},
    {value: 500, label: 'T', frontColor: '#177AD5'},
    {value: 745, label: 'W', frontColor: '#177AD5'},
    {value: 320, label: 'T'},
    {value: 600, label: 'F', frontColor: '#177AD5'},
    {value: 256, label: 'S'},
    {value: 300, label: 'S'},
];

export const mockedPieData: pieDataItem[] = [
    {
        value: 47,
        color: '#009FFF',
        gradientCenterColor: '#006DFF',
        focused: true,
    },
    {value: 40, color: '#93FCF8', gradientCenterColor: '#3BE9DE'},
    {value: 16, color: '#BDB2FA', gradientCenterColor: '#8F80F3'},
    {value: 3, color: '#FFA5BA', gradientCenterColor: '#FF7F97'},
];

export const mockedLineData: lineDataItem[] = [
    {value: 0, dataPointText: '0'},
    {value: 10, dataPointText: '10'},
    {value: 8, dataPointText: '8'},
    {value: 58, dataPointText: '58'},
    {value: 56, dataPointText: '56'},
    {value: 78, dataPointText: '78'},
    {value: 74, dataPointText: '74'},
    {value: 98, dataPointText: '98'},
];

export const subscriptionAdvantages = [
    ['1', '2', '3', '4'],
    ['a', 'b', 'c', 'd'],
    ['1', '2', '3', '456\n789'],
    ['a', 'b', 'c', 'd']
];