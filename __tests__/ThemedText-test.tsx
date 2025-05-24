import * as React from 'react';
import {render} from '@testing-library/react-native';

import {ThemedText} from '@/components/base/ThemedText';

it(`renders correctly`, () => {
    const tree = render(<ThemedText>test</ThemedText>).toJSON();

    expect(tree).toMatchSnapshot();
});
