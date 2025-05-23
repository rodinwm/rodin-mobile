import React from "react";
import {useColorScheme} from "@/utils/hooks/useColorScheme";
import {Row, Rows, Table} from 'react-native-table-component';
import {subscriptionAdvantages} from "@/utils/mocks";
import {Colors} from "@/utils/colors";
import {FontHelper} from "@/utils/helpers/fontHelper";
import {FontWeightEnum} from "@/utils/enums";

type Props = {};

export function SubscriptionAdvantageTable({}: Props) {
    const colorScheme = useColorScheme() ?? 'light';

    return (
        <Table
            borderStyle={{
                borderWidth: 1,
                borderColor: Colors.foreground[colorScheme] + 'AA',
            }}
        >
            <Row
                flexArr={[2, 1, 1]}
                data={['Fonctionnalités', 'Gratuit', 'Premium']}
                style={{
                    backgroundColor: Colors.foreground[colorScheme],
                    borderColor: Colors.background[colorScheme],
                    gap: 10,
                }}
                textStyle={{
                    color: Colors.background[colorScheme],
                    fontFamily: FontHelper.getMainFontStatic(FontWeightEnum.Bold),
                    padding: 5,
                }}
            />
            <Rows
                flexArr={[2, 1, 1]}
                data={subscriptionAdvantages}
                textStyle={{
                    color: Colors.foreground[colorScheme],
                    fontFamily: FontHelper.getMainFontVariable(),
                    padding: 5,
                }}
            />
        </Table>
    );
}
