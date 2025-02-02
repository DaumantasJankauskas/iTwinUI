/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from 'react';
import { Anchor } from '@itwin/itwinui-react';
import { action } from '@storybook/addon-actions';

export default {
  title: 'Typography/Anchor',
  component: Anchor,
};

export const Basic = () => {
  return <Anchor href='https://www.example.com/'>www.example.com</Anchor>;
};

export const AsButton = () => {
  return (
    <Anchor as='button' onClick={action('clicked')}>
      Perform action
    </Anchor>
  );
};
