import React from "react";
import {useColorScheme} from "@/utils/hooks/useColorScheme";
import {Row, Rows, Table} from 'react-native-table-component';
import {Colors} from "@/utils/colors";
import {FontService} from "@/utils/services/fontService";
import {FontWeightEnum} from "@/utils/enums";
import {LucideIcon} from "@/components/base/LucideIcon";

const yesIcon = <LucideIcon name={'Check'} size={18}/>;
const noIcon = <LucideIcon name={'X'} size={18}/>;

const subscriptionAdvantages = [
    ['Tracker de temps de travail', noIcon, yesIcon],
    ['Exercices de concentration ou respiration', '1 fois/jour', 'Illimité'],
    ["Bloqueur d'application pendant les sessions", noIcon, yesIcon],
    ['Aucune pubs', noIcon, yesIcon],
    ["Fonds d'écran pendant les sessions", '5 choix', 'Accès à la galerie'],
    ['Réglage libre du temps des sessions', yesIcon, yesIcon],
    ['Accès aux Rodpics + Social', yesIcon, yesIcon],
    ['Phrases de motivation personnalisables', noIcon, yesIcon],
];

export function SubscriptionAdvantageTable() {
    const colorScheme = useColorScheme() ?? 'light';

    return (
        <Table
            borderStyle={{
                //borderWidth: 1,
                borderColor: Colors.foreground[colorScheme] + '33',
                gap: 0,
            }}
        >
            <Row
                flexArr={[2, 1, 1]}
                data={['Fonctionnalités', 'Gratuit', 'Premium']}
                style={{
                    //backgroundColor: Colors.foreground[colorScheme],
                    borderBottomWidth: 1,
                    borderColor: Colors.foreground[colorScheme] + '33',
                    paddingVertical: 10,
                    gap: 5,
                }}
                textStyle={{
                    color: Colors.foreground[colorScheme],
                    fontFamily: FontService.getMainFontStatic(FontWeightEnum.ExtraBold),
                }}
            />
            <Rows
                flexArr={[2, 1, 1]}
                data={subscriptionAdvantages}
                style={{
                    borderBottomWidth: 1,
                    borderColor: Colors.foreground[colorScheme] + '33',
                    paddingVertical: 10,
                    gap: 5,
                }}
                textStyle={{
                    color: Colors.foreground[colorScheme],
                    fontFamily: FontService.getMainFontVariable(),
                }}
            />
        </Table>
    );
}
