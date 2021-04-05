/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import cx from 'classnames';
import React from 'react';
import { Button, ButtonProps } from '../Button';
import { IconButton } from '../IconButton';
import { DropdownMenu } from '../../DropdownMenu';
import { Position } from '../../../utils';
import SvgCaretDown2 from '@bentley/icons-generic-react/cjs/icons/CaretDown2';
import SvgCaretUp2 from '@bentley/icons-generic-react/cjs/icons/CaretUp2';

import { useTheme } from '../../utils/hooks/useTheme';
import '@bentley/itwinui/css/button.css';

export type SplitButtonProps = {
  /**
   * Callback fired on clicking the primary button.
   */
  onClick: () => void;
  /**
   * Items in the dropdown menu.
   * Pass a function that takes the `close` argument (to close the menu),
   * and returns a list of `MenuItem` components.
   */
  menuItems: (close: () => void) => JSX.Element[];
  /**
   * Position of the dropdown menu.
   * @default Position.BOTTOM_RIGHT
   */
  menuPosition?: Position;
  /**
   * Style of the button.
   * @default 'default'
   */
  styleType?: 'cta' | 'high-visibility' | 'default';
  /**
   * Content of primary button.
   */
  children: React.ReactNode;
} & Omit<ButtonProps, 'styleType' | 'onClick'>;

/**
 * Split button component with a DropdownMenu.
 * @example
 * const menuItems = (close: () => void) => [
 *   <MenuItem key={1} onClick={onClick(1, close)}>Item #1</MenuItem>,
 *   <MenuItem key={2} onClick={onClick(2, close)}>Item #2</MenuItem>,
 * ];
 * <SplitButton onClick={onClick} menuItems={menuItems}>Default</SplitButton>
 * <SplitButton onClick={onClick} menuItems={menuItems} styleType='high-visibility'>High visibility</SplitButton>
 */
export const SplitButton = (props: SplitButtonProps) => {
  const {
    onClick,
    menuItems,
    className,
    menuPosition = Position.BOTTOM_RIGHT,
    styleType = 'default',
    size,
    children,
    style,
    title,
    ...rest
  } = props;

  useTheme();

  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const [menuWidth, setMenuWidth] = React.useState(0);
  const ref = React.useRef<HTMLSpanElement>(null);

  React.useEffect(() => {
    if (ref.current) {
      setMenuWidth(ref.current.offsetWidth);
    }
  }, [children, size]);

  return (
    <span
      className={cx(className, 'iui-button-split-menu')}
      style={style}
      title={title}
      ref={ref}
    >
      <Button styleType={styleType} size={size} onClick={onClick} {...rest}>
        {children}
      </Button>
      <DropdownMenu
        position={menuPosition}
        menuItems={menuItems}
        style={{ minWidth: menuWidth }}
        onOpen={() => setIsMenuOpen(true)}
        onClose={() => setIsMenuOpen(false)}
      >
        <IconButton styleType={styleType} size={size}>
          {isMenuOpen ? <SvgCaretUp2 /> : <SvgCaretDown2 />}
        </IconButton>
      </DropdownMenu>
    </span>
  );
};

export default SplitButton;