/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import SvgCheckmark from '@itwin/itwinui-icons-react/cjs/icons/Checkmark';
import React from 'react';
import { ToggleSwitch } from '@itwin/itwinui-react';

export default {
  title: 'Input/ToggleSwitch',
  component: ToggleSwitch,
  decorators: [
    (Story) => (
      <div style={{ padding: '5.5px 0' }}>
        <Story />
      </div>
    ),
  ],
};

export const Basic = () => {
  return <ToggleSwitch defaultChecked />;
};

export const Small = () => {
  return <ToggleSwitch defaultChecked size='small' />;
};

export const DisabledChecked = () => {
  return <ToggleSwitch defaultChecked disabled />;
};

export const DisabledUnchecked = () => {
  return <ToggleSwitch disabled />;
};

export const LabelRight = () => {
  return (
    <ToggleSwitch
      defaultChecked
      label='This is a right label'
      labelPosition='right'
    />
  );
};

export const LabelLeft = () => {
  return <ToggleSwitch label='This is a left label' labelPosition='left' />;
};

export const WithIcon = () => {
  return <ToggleSwitch defaultChecked icon={<SvgCheckmark />} />;
};
