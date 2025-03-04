import * as React from 'react';
import renderer from 'react-test-renderer';

import {ThemedText} from '@/components/base/ThemedText';

it(`renders correctly`, () => {
    const tree = renderer.create(<ThemedText>test</ThemedText>).toJSON();

    expect(tree).toMatchSnapshot();
});
