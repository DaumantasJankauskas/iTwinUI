/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { action } from '@storybook/addon-actions';
import React from 'react';
import {
  Badge,
  Button,
  getUserColor,
  MenuItem,
  Tag,
  TagContainer,
  Tile,
  Avatar,
} from '@itwin/itwinui-react';
import SvgFolder from '@itwin/itwinui-icons-react/cjs/icons/Folder';
import SvgImodelHollow from '@itwin/itwinui-icons-react/cjs/icons/ImodelHollow';
import SvgInfo from '@itwin/itwinui-icons-react/cjs/icons/Info';
import SvgStar from '@itwin/itwinui-icons-react/cjs/icons/Star';
import SvgTag from '@itwin/itwinui-icons-react/cjs/icons/Tag';

export default {
  component: Tile,
  title: 'Core/Tile',
};

export const Basic = () => {
  return (
    <Tile.Wrapper>
      <Tile.Name name='Stadium' />
      <Tile.ThumbnailArea>
        <Tile.BadgeContainer>
          <Badge backgroundColor='skyblue'>Badge</Badge>
        </Tile.BadgeContainer>
        <Tile.ThumbnailPicture url='https://itwinplatformcdn.azureedge.net/iTwinUI/stadium.png' />
      </Tile.ThumbnailArea>
      <Tile.ContentArea>
        <Tile.Description>
          National stadium in Singapore. Features landscape details and a metro
          station. This is the largest sample iModel.
        </Tile.Description>
        <Tile.MoreOptions>
          <MenuItem key={1} onClick={action('clicked item 1')}>
            Item 1
          </MenuItem>
          <MenuItem key={2} onClick={action('clicked item 2')}>
            Item 2
          </MenuItem>
        </Tile.MoreOptions>
        <Tile.Metadata>
          <SvgTag />
          <TagContainer>
            <Tag variant='basic'>tag 1</Tag>
            <Tag variant='basic'>tag 2</Tag>
          </TagContainer>
        </Tile.Metadata>
      </Tile.ContentArea>
    </Tile.Wrapper>
  );
};

export const AllProps = () => {
  return (
    <Tile.Wrapper isSelected>
      <Tile.Name>
        <Tile.NameIcon />
        <Tile.NameLabel>Stadium</Tile.NameLabel>
      </Tile.Name>
      <Tile.ThumbnailArea>
        <Tile.BadgeContainer>
          <Badge backgroundColor='skyblue'>Badge</Badge>
        </Tile.BadgeContainer>
        <Tile.ThumbnailPicture url='https://itwinplatformcdn.azureedge.net/iTwinUI/stadium.png' />
        <Tile.TypeIndicator>
          <Tile.IconButton>
            <SvgStar />
          </Tile.IconButton>
        </Tile.TypeIndicator>
        <Tile.QuickAction>
          <Tile.IconButton>
            <SvgInfo />
          </Tile.IconButton>
        </Tile.QuickAction>
      </Tile.ThumbnailArea>
      <Tile.ContentArea>
        <Tile.Description>
          National stadium in Singapore. Features landscape details and a metro
          station. This is the largest sample iModel.
        </Tile.Description>
        <Tile.MoreOptions>
          <MenuItem key={1} onClick={action('clicked item 1')}>
            Item 1
          </MenuItem>
          <MenuItem key={2} onClick={action('clicked item 2')}>
            Item 2
          </MenuItem>
        </Tile.MoreOptions>
        <Tile.Metadata>
          <SvgTag />
          <TagContainer>
            <Tag variant='basic'>tag 1</Tag>
            <Tag variant='basic'>tag 2</Tag>
          </TagContainer>
        </Tile.Metadata>
      </Tile.ContentArea>
      <Tile.Buttons>
        <Button key={1} onClick={action('clicked left button')}>
          Manage
        </Button>
        <Button key={2} onClick={action('clicked right button')}>
          Projects
        </Button>
      </Tile.Buttons>
    </Tile.Wrapper>
  );
};
export const Actionable = () => {
  const [selected, setSelected] = React.useState(false);
  return (
    <Tile.Wrapper isSelected={selected}>
      <Tile.Name>
        <Tile.NameIcon />
        <Tile.NameLabel>
          <Tile.Action onClick={() => setSelected((prev) => !prev)}>
            Stadium
          </Tile.Action>
        </Tile.NameLabel>
      </Tile.Name>
      <Tile.ThumbnailArea>
        <Tile.ThumbnailPicture url='https://itwinplatformcdn.azureedge.net/iTwinUI/stadium.png' />
        <Tile.BadgeContainer>
          <Badge backgroundColor='skyblue'>Badge</Badge>
        </Tile.BadgeContainer>
      </Tile.ThumbnailArea>
      <Tile.ContentArea>
        <Tile.Description>
          If you click on this stadium, it is going to be selected.
        </Tile.Description>
        <Tile.Metadata>
          <SvgTag />
          <TagContainer>
            <Tag variant='basic'>tag 1</Tag>
            <Tag variant='basic'>tag 2</Tag>
          </TagContainer>
        </Tile.Metadata>
      </Tile.ContentArea>
    </Tile.Wrapper>
  );
};

export const AnchorLink = () => {
  return (
    <Tile.Wrapper>
      <Tile.Name>
        <Tile.NameIcon />
        <Tile.NameLabel>
          <Tile.Action href='https://inclusive-components.design/cards/'>
            Stadium
          </Tile.Action>
        </Tile.NameLabel>
      </Tile.Name>
      <Tile.ThumbnailArea>
        <Tile.BadgeContainer>
          <Badge backgroundColor='skyblue'>Badge</Badge>
        </Tile.BadgeContainer>
        <Tile.ThumbnailPicture url='https://itwinplatformcdn.azureedge.net/iTwinUI/stadium.png' />
      </Tile.ThumbnailArea>
      <Tile.ContentArea>
        <Tile.Description>
          If you click on this stadium, it is going to open another page.
        </Tile.Description>
        <Tile.Metadata>
          <SvgTag />
          <TagContainer>
            <Tag variant='basic'>tag 1</Tag>
            <Tag variant='basic'>tag 2</Tag>
          </TagContainer>
        </Tile.Metadata>
      </Tile.ContentArea>
    </Tile.Wrapper>
  );
};

export const Condensed = () => {
  return (
    <Tile.Wrapper>
      <Tile.Name>
        <Tile.NameIcon />
        <Tile.NameLabel>Condensed</Tile.NameLabel>
      </Tile.Name>
      <Tile.ThumbnailArea>
        <Tile.ThumbnailPicture>
          <SvgImodelHollow />
        </Tile.ThumbnailPicture>
      </Tile.ThumbnailArea>
      <Tile.ContentArea>
        <Tile.MoreOptions>
          <MenuItem key={1} onClick={action('clicked item 1')}>
            Item 1
          </MenuItem>
          <MenuItem key={2} onClick={action('clicked item 2')}>
            Item 2
          </MenuItem>
        </Tile.MoreOptions>
      </Tile.ContentArea>
    </Tile.Wrapper>
  );
};

export const WithAvatar = () => {
  return (
    <Tile.Wrapper>
      <Tile.Name>
        <Tile.NameIcon />
        <Tile.NameLabel>Some User</Tile.NameLabel>
      </Tile.Name>
      <Tile.ThumbnailArea>
        <Tile.BadgeContainer>
          <Badge backgroundColor='skyblue'>Badge</Badge>
        </Tile.BadgeContainer>
        <Tile.ThumbnailPicture>
          <Avatar
            size='x-large'
            status='online'
            abbreviation='TR'
            backgroundColor={getUserColor('Terry Rivers')}
            image={
              <img src='https://itwinplatformcdn.azureedge.net/iTwinUI/user-placeholder.png' />
            }
            title='Terry Rivers'
          />
        </Tile.ThumbnailPicture>
      </Tile.ThumbnailArea>
      <Tile.ContentArea>
        <Tile.Description>User Description</Tile.Description>
        <Tile.MoreOptions>
          <MenuItem key={1} onClick={action('clicked item 1')}>
            Item 1
          </MenuItem>
          <MenuItem key={2} onClick={action('clicked item 2')}>
            Item 2
          </MenuItem>
        </Tile.MoreOptions>
      </Tile.ContentArea>
    </Tile.Wrapper>
  );
};

export const Folder = () => {
  return (
    <Tile.Wrapper variant='folder'>
      <Tile.ThumbnailArea>
        <Tile.ThumbnailPicture>
          <SvgFolder />
        </Tile.ThumbnailPicture>
      </Tile.ThumbnailArea>
      <Tile.Name>
        <Tile.NameIcon />
        <Tile.NameLabel>Folder Name</Tile.NameLabel>
      </Tile.Name>
      <Tile.ContentArea>
        <Tile.Description>Folder description</Tile.Description>
        <Tile.MoreOptions>
          <MenuItem key={1} onClick={action('clicked item 1')}>
            Item 1
          </MenuItem>
          <MenuItem key={2} onClick={action('clicked item 2')}>
            Item 2
          </MenuItem>
        </Tile.MoreOptions>
        <Tile.Metadata>
          <span>Folder metadata</span>
        </Tile.Metadata>
      </Tile.ContentArea>
    </Tile.Wrapper>
  );
};

export const Status = () => {
  return (
    <Tile.Wrapper status='positive'>
      <Tile.Name>
        <Tile.NameIcon />
        <Tile.NameLabel>Tile Name</Tile.NameLabel>
      </Tile.Name>
      <Tile.ThumbnailArea>
        <Tile.ThumbnailPicture>
          <SvgImodelHollow />
        </Tile.ThumbnailPicture>
      </Tile.ThumbnailArea>
      <Tile.ContentArea>
        <Tile.Description>Description</Tile.Description>
        <Tile.MoreOptions>
          <MenuItem key={1} onClick={action('clicked item 1')}>
            Item 1
          </MenuItem>
          <MenuItem key={2} onClick={action('clicked item 2')}>
            Item 2
          </MenuItem>
        </Tile.MoreOptions>
        <Tile.Metadata>
          <span>Tile with status</span>
        </Tile.Metadata>
      </Tile.ContentArea>
    </Tile.Wrapper>
  );
};

export const Loading = () => {
  return (
    <Tile.Wrapper isLoading>
      <Tile.Name>
        <Tile.NameIcon />
        <Tile.NameLabel>Tile Name</Tile.NameLabel>
      </Tile.Name>
      <Tile.ThumbnailArea>
        <Tile.ThumbnailPicture>
          <SvgImodelHollow />
        </Tile.ThumbnailPicture>
      </Tile.ThumbnailArea>
      <Tile.ContentArea>
        <Tile.Description>Description</Tile.Description>
        <Tile.MoreOptions>
          <MenuItem key={1} onClick={action('clicked item 1')}>
            Item 1
          </MenuItem>
          <MenuItem key={2} onClick={action('clicked item 2')}>
            Item 2
          </MenuItem>
        </Tile.MoreOptions>
        <Tile.Metadata>
          <span>Loading tile</span>
        </Tile.Metadata>
      </Tile.ContentArea>
    </Tile.Wrapper>
  );
};

export const Disabled = () => {
  return (
    <Tile.Wrapper isDisabled>
      <Tile.Name>
        <Tile.NameIcon />
        <Tile.NameLabel>Tile Name</Tile.NameLabel>
      </Tile.Name>
      <Tile.ThumbnailArea>
        <Tile.BadgeContainer>
          <Badge backgroundColor='skyblue'>Badge</Badge>
        </Tile.BadgeContainer>
        <Tile.ThumbnailPicture>
          <SvgImodelHollow />
        </Tile.ThumbnailPicture>
      </Tile.ThumbnailArea>
      <Tile.ContentArea>
        <Tile.Description>Description</Tile.Description>
        <Tile.MoreOptions>
          <MenuItem key={1} onClick={action('clicked item 1')}>
            Item 1
          </MenuItem>
          <MenuItem key={2} onClick={action('clicked item 2')}>
            Item 2
          </MenuItem>
        </Tile.MoreOptions>
        <Tile.Metadata>
          <SvgTag />
          <TagContainer>
            <Tag variant='basic'>tag 1</Tag>
            <Tag variant='basic'>tag 2</Tag>
          </TagContainer>
        </Tile.Metadata>
      </Tile.ContentArea>
      <Tile.Buttons>
        <Button disabled>Button</Button>
      </Tile.Buttons>
    </Tile.Wrapper>
  );
};
