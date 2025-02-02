/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from 'react';
import { Textarea } from '@itwin/itwinui-react';

export default {
  title: 'Input/Textarea',
  component: Textarea,
};

export const Basic = () => {
  return <Textarea placeholder={'This is a textarea'} />;
};

export const Disabled = () => {
  return <Textarea disabled={true} placeholder='This is a textarea' />;
};
