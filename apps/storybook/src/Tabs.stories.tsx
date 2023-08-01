/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/* eslint-disable react/jsx-key */
import SvgStar from '@itwin/itwinui-icons-react/cjs/icons/Star';
import { Meta, Story } from '@storybook/react/';
import React from 'react';
import { Button, Tabs } from '@itwin/itwinui-react';

type TabsProps = React.ComponentProps<typeof Tabs>;

export default {
  title: 'Core/Tabs',
  component: Tabs,
  args: {
    focusActivationMode: 'auto',
    color: 'blue',
    orientation: 'horizontal',
  },
  argTypes: {
    children: { control: { disable: true } },
    style: { control: { disable: true } },
    orientation: { control: 'radio', options: ['horizontal', 'vertical'] },
  },
} as Meta<TabsProps>;

export const DefaultTabs: Story<Partial<TabsProps>> = (args) => {
  return (
    <Tabs {...args}>
      <Tabs.TabList>
        <Tabs.Tab label='Item1' />
        <Tabs.Tab label='Item2' />
        <Tabs.Tab label='Item3' />
      </Tabs.TabList>

      <Tabs.ActionsWrapper>
        <Tabs.Actions>
          <Button key={'Small'} size={'small'}>
            Small size button
          </Button>
          <Button key={'Normal'}>Normal size button</Button>
        </Tabs.Actions>
      </Tabs.ActionsWrapper>

      <Tabs.Panels>
        <Tabs.Panel>
          Bentley Systems, Incorporated, is an American-based software
          development company that develops, manufactures, licenses, sells and
          supports computer software and services for the design, construction,
          and operation of infrastructure. The company&apos;s software serves
          the building, plant, civil, and geospatial markets in the areas of
          architecture, engineering, construction (AEC) and operations. Their
          software products are used to design, engineer, build, and operate
          large constructed assets such as roadways, railways, bridges,
          buildings, industrial plants, power plants, and utility networks. The
          company re-invests 20% of their revenues in research and development.
        </Tabs.Panel>
        <Tabs.Panel>
          Bentley Systems is headquartered in Exton, Pennsylvania, United
          States, but has development, sales and other departments in over 50
          countries. The company had revenues of $700 million in 2018.
        </Tabs.Panel>
        <Tabs.Panel>
          Keith A. Bentley and Barry J. Bentley founded Bentley Systems in 1984.
          They introduced the commercial version of PseudoStation in 1985, which
          allowed users of Intergraphs VAX systems to use low-cost graphics
          terminals to view and modify the designs on their Intergraph IGDS
          (Interactive Graphics Design System) installations. Their first
          product was shown to potential users who were polled as to what they
          would be willing to pay for it. They averaged the answers, arriving at
          a price of $7,943. A DOS-based version of MicroStation was introduced
          in 1986.
        </Tabs.Panel>
      </Tabs.Panels>
    </Tabs>
  );
};
DefaultTabs.args = {
  type: 'default',
};

export const BorderlessTabs: Story<Partial<TabsProps>> = (args) => {
  return (
    <Tabs type='borderless' {...args}>
      <Tabs.TabList>
        <Tabs.Tab label='Item1' />
        <Tabs.Tab label='Item2' />
        <Tabs.Tab label='Item3' />
      </Tabs.TabList>

      <Tabs.ActionsWrapper>
        <Tabs.Actions>
          <Button key={'Small'} size={'small'}>
            Small size button
          </Button>
          <Button key={'Normal'}>Normal size button</Button>
        </Tabs.Actions>
      </Tabs.ActionsWrapper>

      <Tabs.Panels>
        <Tabs.Panel>
          Bentley Systems, Incorporated, is an American-based software
          development company that develops, manufactures, licenses, sells and
          supports computer software and services for the design, construction,
          and operation of infrastructure. The company&apos;s software serves
          the building, plant, civil, and geospatial markets in the areas of
          architecture, engineering, construction (AEC) and operations. Their
          software products are used to design, engineer, build, and operate
          large constructed assets such as roadways, railways, bridges,
          buildings, industrial plants, power plants, and utility networks. The
          company re-invests 20% of their revenues in research and development.
        </Tabs.Panel>
        <Tabs.Panel>
          Bentley Systems is headquartered in Exton, Pennsylvania, United
          States, but has development, sales and other departments in over 50
          countries. The company had revenues of $700 million in 2018.
        </Tabs.Panel>
        <Tabs.Panel>
          Keith A. Bentley and Barry J. Bentley founded Bentley Systems in 1984.
          They introduced the commercial version of PseudoStation in 1985, which
          allowed users of Intergraphs VAX systems to use low-cost graphics
          terminals to view and modify the designs on their Intergraph IGDS
          (Interactive Graphics Design System) installations. Their first
          product was shown to potential users who were polled as to what they
          would be willing to pay for it. They averaged the answers, arriving at
          a price of $7,943. A DOS-based version of MicroStation was introduced
          in 1986.
        </Tabs.Panel>
      </Tabs.Panels>
    </Tabs>
  );
};
BorderlessTabs.args = {
  type: 'borderless',
};

export const PillTabs: Story<Partial<TabsProps>> = (args) => {
  return (
    <Tabs type='pill' {...args}>
      <Tabs.TabList>
        <Tabs.Tab>
          <Tabs.TabIcon>
            <SvgStar />
          </Tabs.TabIcon>
        </Tabs.Tab>

        <Tabs.Tab>
          <Tabs.TabIcon>
            <SvgStar />
          </Tabs.TabIcon>
        </Tabs.Tab>

        <Tabs.Tab>
          <Tabs.TabIcon>
            <SvgStar />
          </Tabs.TabIcon>
        </Tabs.Tab>
      </Tabs.TabList>

      <Tabs.Panels>
        <Tabs.Panel>
          Bentley Systems, Incorporated, is an American-based software
          development company that develops, manufactures, licenses, sells and
          supports computer software and services for the design, construction,
          and operation of infrastructure. The company&apos;s software serves
          the building, plant, civil, and geospatial markets in the areas of
          architecture, engineering, construction (AEC) and operations. Their
          software products are used to design, engineer, build, and operate
          large constructed assets such as roadways, railways, bridges,
          buildings, industrial plants, power plants, and utility networks. The
          company re-invests 20% of their revenues in research and development.
        </Tabs.Panel>
        <Tabs.Panel>
          Bentley Systems is headquartered in Exton, Pennsylvania, United
          States, but has development, sales and other departments in over 50
          countries. The company had revenues of $700 million in 2018.
        </Tabs.Panel>
        <Tabs.Panel>
          Keith A. Bentley and Barry J. Bentley founded Bentley Systems in 1984.
          They introduced the commercial version of PseudoStation in 1985, which
          allowed users of Intergraphs VAX systems to use low-cost graphics
          terminals to view and modify the designs on their Intergraph IGDS
          (Interactive Graphics Design System) installations. Their first
          product was shown to potential users who were polled as to what they
          would be willing to pay for it. They averaged the answers, arriving at
          a price of $7,943. A DOS-based version of MicroStation was introduced
          in 1986.
        </Tabs.Panel>
      </Tabs.Panels>
    </Tabs>
  );
};
PillTabs.args = {
  type: 'pill',
};
PillTabs.argTypes = {
  orientation: { control: { disable: true } },
};

export const SublabelsAndIcons: Story<Partial<TabsProps>> = (args) => {
  return (
    <Tabs type='borderless' {...args}>
      <Tabs.TabList>
        <Tabs.Tab>
          <Tabs.TabIcon>
            <SvgStar />
          </Tabs.TabIcon>
          <Tabs.TabLabel>Item0</Tabs.TabLabel>
          <Tabs.TabDescription>Sublabel 0</Tabs.TabDescription>
        </Tabs.Tab>

        <Tabs.Tab>
          <Tabs.TabIcon>
            <SvgStar />
          </Tabs.TabIcon>
          <Tabs.TabLabel>Item1</Tabs.TabLabel>
          <Tabs.TabDescription>Sublabel 1</Tabs.TabDescription>
        </Tabs.Tab>

        <Tabs.Tab disabled>
          <Tabs.TabIcon>
            <SvgStar />
          </Tabs.TabIcon>
          <Tabs.TabLabel>Item2</Tabs.TabLabel>
          <Tabs.TabDescription>Sublabel 2</Tabs.TabDescription>
        </Tabs.Tab>
      </Tabs.TabList>

      <Tabs.ActionsWrapper>
        <Tabs.Actions>
          <Button key={'Small'} size={'small'}>
            Small size button
          </Button>
          <Button key={'Normal'}>Normal size button</Button>
        </Tabs.Actions>
      </Tabs.ActionsWrapper>

      <Tabs.Panels>
        <Tabs.Panel>
          Bentley Systems, Incorporated, is an American-based software
          development company that develops, manufactures, licenses, sells and
          supports computer software and services for the design, construction,
          and operation of infrastructure. The company&apos;s software serves
          the building, plant, civil, and geospatial markets in the areas of
          architecture, engineering, construction (AEC) and operations. Their
          software products are used to design, engineer, build, and operate
          large constructed assets such as roadways, railways, bridges,
          buildings, industrial plants, power plants, and utility networks. The
          company re-invests 20% of their revenues in research and development.
        </Tabs.Panel>
        <Tabs.Panel>
          Bentley Systems is headquartered in Exton, Pennsylvania, United
          States, but has development, sales and other departments in over 50
          countries. The company had revenues of $700 million in 2018.
        </Tabs.Panel>
        <Tabs.Panel>
          Keith A. Bentley and Barry J. Bentley founded Bentley Systems in 1984.
          They introduced the commercial version of PseudoStation in 1985, which
          allowed users of Intergraphs VAX systems to use low-cost graphics
          terminals to view and modify the designs on their Intergraph IGDS
          (Interactive Graphics Design System) installations. Their first
          product was shown to potential users who were polled as to what they
          would be willing to pay for it. They averaged the answers, arriving at
          a price of $7,943. A DOS-based version of MicroStation was introduced
          in 1986.
        </Tabs.Panel>
      </Tabs.Panels>
    </Tabs>
  );
};
SublabelsAndIcons.args = {
  type: 'borderless',
};

export const HorizontalOverflow: Story<Partial<TabsProps>> = (args) => {
  const [activeIndex, setActiveIndex] = React.useState(10);

  const [tabData, setTabData] = React.useState([
    { name: 'Item 1', active: false, disabled: false },
    { name: 'Item 2', active: false, disabled: false },
    { name: 'Item 3', active: false, disabled: false },
    { name: 'Item 4', active: false, disabled: false },
    { name: 'Item 5', active: false, disabled: false },
    { name: 'Item 6', active: false, disabled: true },
    { name: 'Item 7', active: false, disabled: false },
    { name: 'Item 8', active: false, disabled: false },
    { name: 'Item 9', active: false, disabled: true },
    { name: 'Item 10', active: false, disabled: false },
    { name: 'Item 11', active: true, disabled: false },
    { name: 'Item 12', active: false, disabled: false },
    { name: 'Very long item number thirteen', active: false, disabled: false },
  ]);

  return (
    <div
      style={{
        width: '50%',
        maxWidth: 800,
        minWidth: 250,
        border: '1px solid lightpink',
        padding: 8,
      }}
    >
      <Tabs overflowOptions={{ useOverflow: true }} {...args}>
        <Tabs.TabList>
          {tabData?.map((item, index) => {
            return (
              <Tabs.Tab
                isActive={item.active}
                disabled={item.disabled}
                label={item.name}
                onActivated={() => {
                  setTabData((oldData) => {
                    const newData = [...oldData];

                    const oldActiveTab = { ...newData[activeIndex] };
                    oldActiveTab.active = false;
                    newData[activeIndex] = oldActiveTab;

                    const newActiveTab = { ...newData[index] };
                    newActiveTab.active = true;
                    newData[index] = newActiveTab;

                    return newData;
                  });
                  setActiveIndex(index);
                }}
              />
            );
          })}
        </Tabs.TabList>

        <Tabs.ActionsWrapper>
          <Tabs.Actions>
            <Button key={'button'}>Button</Button>
          </Tabs.Actions>
        </Tabs.ActionsWrapper>

        <Tabs.Panels>
          <Tabs.Panel>Tab Content One</Tabs.Panel>
          <Tabs.Panel>Tab Content Two</Tabs.Panel>
          <Tabs.Panel>Tab Content Three</Tabs.Panel>
          <Tabs.Panel>Tab Content Four</Tabs.Panel>
          <Tabs.Panel>Tab Content Five</Tabs.Panel>
          <Tabs.Panel>Tab Content Six</Tabs.Panel>
          <Tabs.Panel>Tab Content Seven</Tabs.Panel>
          <Tabs.Panel>Tab Content Eight</Tabs.Panel>
          <Tabs.Panel>Tab Content Nine</Tabs.Panel>
          <Tabs.Panel>Tab Content Ten</Tabs.Panel>
          <Tabs.Panel>Tab Content Eleven</Tabs.Panel>
          <Tabs.Panel>Tab Content Twelve</Tabs.Panel>
          <Tabs.Panel>Tab Content Thirteen</Tabs.Panel>
        </Tabs.Panels>
      </Tabs>
    </div>
  );
};
HorizontalOverflow.args = {
  type: 'default',
};
HorizontalOverflow.argTypes = {
  type: { options: ['default', 'borderless'] },
  orientation: { control: { disable: true } },
};

export const VerticalOverflow: Story<Partial<TabsProps>> = (args) => {
  const [activeIndex, setActiveIndex] = React.useState(10);

  const [tabData, setTabData] = React.useState([
    { name: 'Item 1', active: false, disabled: false },
    { name: 'Item 2', active: false, disabled: false },
    { name: 'Item 3', active: false, disabled: false },
    { name: 'Item 4', active: false, disabled: false },
    { name: 'Item 5', active: false, disabled: false },
    { name: 'Item 6', active: false, disabled: true },
    { name: 'Item 7', active: false, disabled: false },
    { name: 'Item 8', active: false, disabled: false },
    { name: 'Item 9', active: false, disabled: true },
    { name: 'Item 10', active: false, disabled: false },
    { name: 'Item 11', active: true, disabled: false },
    { name: 'Item 12', active: false, disabled: false },
    { name: 'Very long item number thirteen', active: false, disabled: false },
  ]);
  return (
    <div
      style={{
        height: '50vh',
        maxHeight: 400,
        minHeight: 100,
        border: '1px solid lightpink',
        padding: 8,
      }}
    >
      <Tabs
        orientation='vertical'
        overflowOptions={{ useOverflow: true }}
        {...args}
      >
        <Tabs.TabList>
          {tabData?.map((item, index) => {
            return (
              <Tabs.Tab
                isActive={item.active}
                disabled={item.disabled}
                label={item.name}
                onActivated={() => {
                  setTabData((oldData) => {
                    const newData = [...oldData];

                    const oldActiveTab = { ...newData[activeIndex] };
                    oldActiveTab.active = false;
                    newData[activeIndex] = oldActiveTab;

                    const newActiveTab = { ...newData[index] };
                    newActiveTab.active = true;
                    newData[index] = newActiveTab;

                    return newData;
                  });
                  setActiveIndex(index);
                }}
              />
            );
          })}
        </Tabs.TabList>

        <Tabs.ActionsWrapper>
          <Tabs.Actions>
            <Button key={'button'}>Button</Button>
          </Tabs.Actions>
        </Tabs.ActionsWrapper>

        <Tabs.Panels>
          <Tabs.Panel>Tab Content One</Tabs.Panel>
          <Tabs.Panel>Tab Content Two</Tabs.Panel>
          <Tabs.Panel>Tab Content Three</Tabs.Panel>
          <Tabs.Panel>Tab Content Four</Tabs.Panel>
          <Tabs.Panel>Tab Content Five</Tabs.Panel>
          <Tabs.Panel>Tab Content Six</Tabs.Panel>
          <Tabs.Panel>Tab Content Seven</Tabs.Panel>
          <Tabs.Panel>Tab Content Eight</Tabs.Panel>
          <Tabs.Panel>Tab Content Nine</Tabs.Panel>
          <Tabs.Panel>Tab Content Ten</Tabs.Panel>
          <Tabs.Panel>Tab Content Eleven</Tabs.Panel>
          <Tabs.Panel>Tab Content Twelve</Tabs.Panel>
          <Tabs.Panel>Tab Content Thirteen</Tabs.Panel>
        </Tabs.Panels>
      </Tabs>
    </div>
  );
};
VerticalOverflow.args = {
  orientation: 'vertical',
  type: 'default',
};
VerticalOverflow.argTypes = {
  type: { options: ['default', 'borderless'] },
  orientation: { control: { disable: true } },
};

export const Vertical: Story<Partial<TabsProps>> = (args) => {
  return (
    <Tabs orientation='vertical' type='borderless' {...args}>
      <Tabs.TabList>
        <Tabs.Tab>
          <Tabs.TabIcon>
            <SvgStar />
          </Tabs.TabIcon>
          <Tabs.TabLabel>Item0</Tabs.TabLabel>
          <Tabs.TabDescription>Sublabel 0</Tabs.TabDescription>
        </Tabs.Tab>

        <Tabs.Tab>
          <Tabs.TabIcon>
            <SvgStar />
          </Tabs.TabIcon>
          <Tabs.TabLabel>Item1</Tabs.TabLabel>
          <Tabs.TabDescription>Sublabel 1</Tabs.TabDescription>
        </Tabs.Tab>

        <Tabs.Tab>
          <Tabs.TabIcon>
            <SvgStar />
          </Tabs.TabIcon>
          <Tabs.TabLabel>Item2</Tabs.TabLabel>
          <Tabs.TabDescription>Sublabel 2</Tabs.TabDescription>
        </Tabs.Tab>
      </Tabs.TabList>

      <Tabs.ActionsWrapper>
        <Tabs.Actions>
          <Button key={'Small'} size={'small'}>
            Small size button
          </Button>
          <Button key={'Normal'}>Normal size button</Button>
        </Tabs.Actions>
      </Tabs.ActionsWrapper>

      <Tabs.Panels>
        <Tabs.Panel>
          Bentley Systems, Incorporated, is an American-based software
          development company that develops, manufactures, licenses, sells and
          supports computer software and services for the design, construction,
          and operation of infrastructure. The company&apos;s software serves
          the building, plant, civil, and geospatial markets in the areas of
          architecture, engineering, construction (AEC) and operations. Their
          software products are used to design, engineer, build, and operate
          large constructed assets such as roadways, railways, bridges,
          buildings, industrial plants, power plants, and utility networks. The
          company re-invests 20% of their revenues in research and development.
        </Tabs.Panel>
        <Tabs.Panel>
          Bentley Systems is headquartered in Exton, Pennsylvania, United
          States, but has development, sales and other departments in over 50
          countries. The company had revenues of $700 million in 2018.
        </Tabs.Panel>
        <Tabs.Panel>
          Keith A. Bentley and Barry J. Bentley founded Bentley Systems in 1984.
          They introduced the commercial version of PseudoStation in 1985, which
          allowed users of Intergraphs VAX systems to use low-cost graphics
          terminals to view and modify the designs on their Intergraph IGDS
          (Interactive Graphics Design System) installations. Their first
          product was shown to potential users who were polled as to what they
          would be willing to pay for it. They averaged the answers, arriving at
          a price of $7,943. A DOS-based version of MicroStation was introduced
          in 1986.
        </Tabs.Panel>
      </Tabs.Panels>
    </Tabs>
  );
};
Vertical.args = {
  orientation: 'vertical',
  type: 'borderless',
};
Vertical.argTypes = {
  type: { options: ['default', 'borderless'] },
  orientation: { control: { disable: true } },
};
