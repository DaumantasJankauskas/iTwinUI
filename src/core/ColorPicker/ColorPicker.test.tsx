/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { getColorValue, ColorPicker } from './ColorPicker';
import { ColorPalette } from './ColorPalette';
import { ColorBuilder } from './ColorBuilder';
import { ColorInputPanel } from './ColorInputPanel';

beforeAll(() => {
  window.CSS = { supports: () => true, escape: (i) => i };
});

it('should convert color list to ColorValues', () => {
  ['#9BA5AF', '#23450b', '#00121D', '#002A44'].forEach((value) => {
    const color = getColorValue(value);
    expect(color.toHexString()).toEqual(value.toLowerCase());
  });
});

it('should render in its most basic state', () => {
  const { container } = render(
    <ColorPicker>
      <ColorPalette colors={['#9BA5AF', '#23450b', '#00121D', '#002A44']} />
    </ColorPicker>,
  );

  expect(container.querySelector(`.iui-color-picker`)).toBeTruthy();
  expect(container.querySelector(`.iui-color-palette`)).toBeTruthy();
  expect(container.querySelectorAll(`.iui-color-swatch`).length).toBe(4);
});

it('should add className and style correctly', () => {
  const { container } = render(
    <ColorPicker className='test-class' style={{ width: '100px' }}>
      <ColorBuilder />
    </ColorPicker>,
  );

  const swatch = container.querySelector(
    '.iui-color-picker.test-class',
  ) as HTMLElement;
  expect(swatch).toBeTruthy();
  expect(swatch).toHaveStyle('width: 100px');
});

it('should render advanced color picker with no color swatches', () => {
  const { container } = render(
    <ColorPicker>
      <ColorBuilder />
      <ColorInputPanel defaultColorFormat='hex' />
    </ColorPicker>,
  );

  expect(container.querySelector(`.iui-color-picker`)).toBeTruthy();
  expect(container.querySelector(`.iui-color-selection-wrapper`)).toBeTruthy();
  expect(
    container.querySelectorAll(`.iui-color-picker-section-label`).length,
  ).toBe(1);
  const element = container.querySelectorAll(
    `.iui-color-picker-section-label`,
  )[0];
  expect(element).toBeDefined();
  expect(element?.textContent).toBe('HEX');
  expect(container.querySelector(`.iui-color-palette`)).toBeFalsy();
  expect(container.querySelector(`.iui-color-field`)).toBeTruthy();
  expect(container.querySelector(`.iui-hue-slider`)).toBeTruthy();
  expect(container.querySelector(`.iui-color-dot`)).toBeTruthy();
  expect(container.querySelectorAll(`.iui-color-swatch`).length).toBe(0);
});

it('should render advanced color picker with color swatches and no title', () => {
  const { container } = render(
    <ColorPicker>
      <ColorBuilder />
      <ColorInputPanel defaultColorFormat='hex' />
      <ColorPalette colors={['#FFFFFF']} />
    </ColorPicker>,
  );

  expect(container.querySelector(`.iui-color-picker`)).toBeTruthy();
  expect(container.querySelector(`.iui-color-selection-wrapper`)).toBeTruthy();
  expect(
    container.querySelectorAll(`.iui-color-picker-section-label`).length,
  ).toBe(1);
  expect(
    container.querySelectorAll(`.iui-color-picker-section-label`)[0]
      .textContent,
  ).toBe('HEX');
  expect(container.querySelector(`.iui-color-palette`)).toBeTruthy();
  expect(container.querySelector(`.iui-color-field`)).toBeTruthy();
  expect(container.querySelector(`.iui-hue-slider`)).toBeTruthy();
  expect(container.querySelector(`.iui-color-dot`)).toBeTruthy();

  expect(container.querySelectorAll(`.iui-color-swatch`).length).toBe(1);
});

it('should render color picker with color palette title', () => {
  const { container } = render(
    <ColorPicker>
      <ColorPalette colors={['#FFFFFF']} label='Test Title' />
    </ColorPicker>,
  );

  expect(container.querySelector(`.iui-color-picker`)).toBeTruthy();
  expect(
    container.querySelector(`.iui-color-picker-section-label`),
  ).toBeTruthy();
  expect(container.querySelector(`.iui-color-palette`)).toBeTruthy();

  expect(container.querySelectorAll(`.iui-color-swatch`).length).toBe(1);
  expect(
    container.querySelector(`.iui-color-picker-section-label`)?.textContent,
  ).toEqual('Test Title');
});

it('should set the selected color', () => {
  const { container } = render(
    <ColorPicker selectedColor={{ h: 42, s: 100, l: 50 }}>
      <ColorBuilder />
    </ColorPicker>,
  );

  //Set the correct square color
  const colorBuilder = container.querySelector(
    '.iui-color-picker .iui-color-field',
  ) as HTMLElement;
  expect(colorBuilder).toHaveStyle('--hue: #ffb300; --selected-color: #ffb300');
});

it('should set the dot positions', () => {
  const { container } = render(
    <ColorPicker selectedColor={{ h: 42, s: 100, l: 50 }}>
      <ColorBuilder />
    </ColorPicker>,
  );

  //Set the correct position on color square
  const colorDot = container.querySelector('.iui-color-dot') as HTMLElement;
  expect(colorDot).toBeTruthy();
  expect(colorDot.style.getPropertyValue('--left')).toEqual('100%');
  expect(colorDot.style.getPropertyValue('--top')).toEqual('0%');

  // Set the correct position on the slider
  const sliderDot = container.querySelector('.iui-slider-thumb') as HTMLElement;
  expect(sliderDot).toBeTruthy();
  expect(sliderDot.style.getPropertyValue('left')).toEqual(
    '11.699164345403899%',
  );
});

it('should handle arrow key navigation on slider dot', () => {
  const onSelectionChanged = jest.fn();

  const { container } = render(
    <ColorPicker
      onChangeComplete={onSelectionChanged}
      selectedColor={{ h: 0, s: 100, l: 50 }}
    >
      <ColorBuilder />
    </ColorPicker>,
  );

  const colorBuilder = container.querySelector(
    '.iui-color-picker .iui-color-field',
  ) as HTMLElement;
  expect(colorBuilder).toHaveStyle('--hue: #ff0000; --selected-color: #ff0000');

  const sliderDot = container.querySelector('.iui-slider-thumb') as HTMLElement;
  expect(sliderDot).toBeTruthy();
  expect(sliderDot.style.getPropertyValue('left')).toEqual('0%');

  // Go right
  fireEvent.keyDown(sliderDot, { key: 'ArrowRight' });
  fireEvent.keyDown(sliderDot, { key: 'ArrowRight' });
  expect(onSelectionChanged).toHaveBeenCalledTimes(2);
  expect(sliderDot.style.getPropertyValue('left')).toEqual(
    '0.5571030640668524%',
  );
  expect(colorBuilder).toHaveStyle('--hue: #ff0800');

  // Go left
  fireEvent.keyDown(sliderDot, { key: 'ArrowLeft' });
  expect(onSelectionChanged).toHaveBeenCalledTimes(3);
  expect(sliderDot.style.getPropertyValue('left')).toEqual(
    '0.2785515320334262%',
  );
  expect(colorBuilder).toHaveStyle('--hue: #ff0400');

  // Go left to edge
  fireEvent.keyDown(sliderDot, { key: 'ArrowLeft' });
  expect(sliderDot.style.getPropertyValue('left')).toEqual('0%');
  fireEvent.keyDown(sliderDot, { key: 'ArrowLeft' });
  expect(sliderDot.style.getPropertyValue('left')).toEqual('0%');
});

it('should handle arrow key navigation on color dot', () => {
  const onChange = jest.fn();
  const onChangeComplete = jest.fn();

  const { container } = render(
    <ColorPicker
      onChange={onChange}
      onChangeComplete={onChangeComplete}
      selectedColor={{ h: 0, s: 100, l: 50 }}
    >
      <ColorBuilder />
    </ColorPicker>,
  );

  const colorBuilder = container.querySelector(
    '.iui-color-picker .iui-color-field',
  ) as HTMLElement;

  expect(colorBuilder).toHaveStyle('--hue: #ff0000; --selected-color: #ff0000');

  const sliderDot = container.querySelector('.iui-slider-thumb') as HTMLElement;
  expect(sliderDot).toBeTruthy();
  expect(sliderDot.style.getPropertyValue('left')).toEqual('0%');

  const colorDot = container.querySelector('.iui-color-dot') as HTMLElement;
  expect(colorDot).toBeTruthy();
  expect(colorDot.style.getPropertyValue('--left')).toEqual('100%');
  expect(colorDot.style.getPropertyValue('--top')).toEqual('0%');

  // Go down
  fireEvent.keyDown(colorDot, { key: 'ArrowDown' });
  fireEvent.keyDown(colorDot, { key: 'ArrowDown' });
  expect(onChange).toHaveBeenCalledTimes(2);
  expect(onChangeComplete).not.toHaveBeenCalled();
  expect(colorDot.style.getPropertyValue('--top')).toEqual('2%');
  expect(colorDot.style.getPropertyValue('--left')).toEqual('100%');
  expect(colorBuilder).toHaveStyle('--selected-color: #fa0000');
  fireEvent.keyUp(colorDot, { key: 'ArrowDown' });
  expect(onChangeComplete).toHaveBeenCalledTimes(1);

  // Go left
  fireEvent.keyDown(colorDot, { key: 'ArrowLeft' });
  expect(onChange).toHaveBeenCalledTimes(3);
  expect(colorDot.style.getPropertyValue('--top')).toEqual('2%');
  expect(colorDot.style.getPropertyValue('--left')).toEqual('99%');
  expect(colorBuilder).toHaveStyle('--selected-color: #fa0202');

  fireEvent.keyUp(colorDot, { key: 'ArrowLeft' });
  expect(onChangeComplete).toHaveBeenCalledTimes(2);

  // Go up to top
  fireEvent.keyDown(colorDot, { key: 'ArrowUp' });
  fireEvent.keyDown(colorDot, { key: 'ArrowUp' });
  expect(colorDot.style.getPropertyValue('--top')).toEqual('0%');
  expect(colorDot.style.getPropertyValue('--left')).toEqual('99%');
  expect(colorBuilder).toHaveStyle('--selected-color: #ff0303');

  fireEvent.keyDown(colorDot, { key: 'ArrowUp' });
  expect(colorDot.style.getPropertyValue('--top')).toEqual('0%');
  expect(colorDot.style.getPropertyValue('--left')).toEqual('99%');
  expect(colorBuilder).toHaveStyle('--selected-color: #ff0303');
  fireEvent.keyUp(colorDot, { key: 'ArrowUp' });
  expect(onChangeComplete).toHaveBeenCalledTimes(3);

  // Go right to the edge
  fireEvent.keyDown(colorDot, { key: 'ArrowRight' });
  expect(colorDot.style.getPropertyValue('--top')).toEqual('0%');
  expect(colorDot.style.getPropertyValue('--left')).toEqual('100%');
  expect(colorBuilder).toHaveStyle('--selected-color: #ff0000');
  fireEvent.keyUp(colorDot, { key: 'ArrowRight' });
  expect(onChangeComplete).toHaveBeenCalledTimes(4);

  // Go up
  fireEvent.keyDown(colorDot, { key: 'ArrowUp' });
  expect(colorDot.style.getPropertyValue('--top')).toEqual('0%');
  expect(colorDot.style.getPropertyValue('--left')).toEqual('100%');
  expect(colorBuilder).toHaveStyle('--selected-color: #ff0000');
  fireEvent.keyUp(colorDot, { key: 'ArrowUp' });
  expect(onChangeComplete).toHaveBeenCalledTimes(5);
});

it('should call onChange and onChangeComplete from hueSlider', () => {
  const handleOnUpdate = jest.fn();
  const handleOnChange = jest.fn();

  const { container } = render(
    <ColorPicker
      onChangeComplete={handleOnChange}
      onChange={handleOnUpdate}
      selectedColor={{ h: 0, s: 100, l: 50 }}
    >
      <ColorBuilder />
    </ColorPicker>,
  );

  const sliderContainer = container.querySelector(
    '.iui-slider-container',
  ) as HTMLDivElement;
  const thumb = container.querySelector('.iui-slider-thumb') as HTMLDivElement;

  fireEvent.pointerDown(thumb, {
    pointerId: 5,
    buttons: 1,
    clientX: 210,
  });

  fireEvent.pointerMove(sliderContainer, {
    pointerId: 5,
    buttons: 1,
    clientX: 410,
  });
  expect(handleOnUpdate).toHaveBeenCalledTimes(1);

  fireEvent.pointerUp(sliderContainer, {
    pointerId: 5,
    buttons: 1,
    clientX: 410,
  });

  expect(handleOnChange).toHaveBeenCalledTimes(2);
});

it('should handle pointer down/move/up from color square', () => {
  const handleOnUpdate = jest.fn();
  const handleOnChange = jest.fn();

  const { container } = render(
    <ColorPicker
      onChangeComplete={handleOnChange}
      onChange={handleOnUpdate}
      selectedColor={{ h: 0, s: 100, l: 50 }}
    >
      <ColorBuilder />
      <ColorPalette colors={[{ h: 0, s: 100, l: 50 }]} />
    </ColorPicker>,
  );

  const colorPicker = container.querySelector(
    '.iui-color-picker',
  ) as HTMLElement;
  expect(colorPicker).toBeTruthy();

  const colorDot = container.querySelector('.iui-color-dot') as HTMLElement;
  expect(colorDot).toBeTruthy();

  fireEvent.pointerDown(colorDot, {
    pointerId: 5,
    buttons: 1,
    clientX: 210,
  });
  expect(handleOnUpdate).toHaveBeenCalledTimes(1);
  expect(handleOnChange).toHaveBeenCalledTimes(0);
  expect(document.activeElement).toBe(colorDot);

  fireEvent.pointerMove(colorPicker.ownerDocument, {
    pointerId: 5,
    buttons: 1,
    clientX: 410,
  });
  expect(handleOnUpdate).toHaveBeenCalledTimes(2);
  expect(handleOnChange).toHaveBeenCalledTimes(0);

  fireEvent.pointerUp(colorPicker.ownerDocument, {
    pointerId: 5,
    buttons: 1,
    clientX: 410,
  });
  expect(handleOnUpdate).toHaveBeenCalledTimes(2);
  expect(handleOnChange).toHaveBeenCalledTimes(1);
});

it('should render advanced color picker with input fields', () => {
  const { container } = render(
    <ColorPicker>
      <ColorBuilder />
      <ColorInputPanel defaultColorFormat='hex' />
    </ColorPicker>,
  );

  expect(
    container.querySelectorAll(`.iui-color-picker-section-label`).length,
  ).toBe(1);
  const element = container.querySelectorAll(
    `.iui-color-picker-section-label`,
  )[0];
  expect(element).toBeDefined();
  expect(element?.textContent).toBe('HEX');

  expect(container.querySelector('.iui-color-input')).toBeTruthy();
  expect(container.querySelector('.iui-color-input-fields')).toBeTruthy();
  expect(container.querySelectorAll('.iui-input-container').length).toBe(1);

  const swapButton = container.querySelector(
    '.iui-button.iui-borderless',
  ) as HTMLButtonElement;
  expect(swapButton).toBeTruthy();

  swapButton.click();
  expect(element.textContent).toBe('HSL');
  expect(container.querySelectorAll('.iui-input-container').length).toBe(3);

  swapButton.click();
  expect(element.textContent).toBe('RGB');
  expect(container.querySelectorAll('.iui-input-container').length).toBe(3);

  swapButton.click();
  expect(element.textContent).toBe('HEX');
  expect(container.querySelectorAll('.iui-input-container').length).toBe(1);
});

it('should only show allowed color formats on input panel', () => {
  const { container } = render(
    <ColorPicker>
      <ColorBuilder />
      <ColorInputPanel
        defaultColorFormat='hex'
        allowedColorFormats={['hex', 'hsl']}
      />
    </ColorPicker>,
  );

  expect(
    container.querySelectorAll(`.iui-color-picker-section-label`).length,
  ).toBe(1);
  const element = container.querySelectorAll(
    `.iui-color-picker-section-label`,
  )[0];
  expect(element).toBeDefined();
  expect(element?.textContent).toBe('HEX');

  const swapButton = container.querySelector(
    '.iui-button.iui-borderless',
  ) as HTMLButtonElement;
  expect(swapButton).toBeTruthy();

  swapButton.click();
  expect(element.textContent).toBe('HSL');

  swapButton.click();
  expect(element.textContent).toBe('HEX');
});

it('should not show swap button if only 1 color format allowed on input panel', () => {
  const { container } = render(
    <ColorPicker>
      <ColorBuilder />
      <ColorInputPanel defaultColorFormat='hex' allowedColorFormats={['hex']} />
    </ColorPicker>,
  );

  expect(
    container.querySelectorAll(`.iui-color-picker-section-label`).length,
  ).toBe(1);
  const element = container.querySelectorAll(
    `.iui-color-picker-section-label`,
  )[0];
  expect(element).toBeDefined();
  expect(element?.textContent).toBe('HEX');

  const swapButton = container.querySelector(
    '.iui-button.iui-borderless',
  ) as HTMLButtonElement;
  expect(swapButton).toBeFalsy();
});

it('should handle hex input change', () => {
  const handleOnChange = jest.fn();

  const { container } = render(
    <ColorPicker onChangeComplete={handleOnChange}>
      <ColorBuilder />
      <ColorInputPanel defaultColorFormat='hex' />
    </ColorPicker>,
  );

  const input = container.querySelectorAll('input')[0] as HTMLInputElement;
  expect(input).toBeTruthy();
  fireEvent.change(input, { target: { value: '#FF6200' } });
  fireEvent.keyDown(input, { key: 'Enter' });
  expect(handleOnChange).toHaveBeenCalledTimes(1);

  // Should not update with invalid input
  fireEvent.change(input, { target: { value: '#A' } });
  fireEvent.keyDown(input, { key: 'Enter' });
  expect(handleOnChange).toHaveBeenCalledTimes(1);

  // Should not update with keys other than Enter
  fireEvent.change(input, { target: { value: '#A' } });
  fireEvent.keyDown(input, { key: ' ' });
  expect(handleOnChange).toHaveBeenCalledTimes(1);

  // Should update even if # was not typed in
  fireEvent.change(input, { target: { value: 'FF6200' } });
  fireEvent.keyDown(input, { key: 'Enter' });
  expect(handleOnChange).toHaveBeenCalledTimes(2);
});

it('should handle hsl input change', () => {
  const handleOnChange = jest.fn();

  const { container } = render(
    <ColorPicker onChangeComplete={handleOnChange}>
      <ColorBuilder />
      <ColorInputPanel defaultColorFormat='hsl' />
    </ColorPicker>,
  );

  const h = container.querySelectorAll('input')[0] as HTMLInputElement;
  const s = container.querySelectorAll('input')[1] as HTMLInputElement;
  const l = container.querySelectorAll('input')[2] as HTMLInputElement;
  expect(h).toBeTruthy();
  expect(s).toBeTruthy();
  expect(l).toBeTruthy();

  fireEvent.change(h, { target: { value: '100' } });
  fireEvent.keyDown(h, { key: 'Enter' });
  expect(handleOnChange).toHaveBeenCalledTimes(1);

  fireEvent.change(s, { target: { value: '50' } });
  fireEvent.keyDown(s, { key: 'Enter' });
  expect(handleOnChange).toHaveBeenCalledTimes(2);

  fireEvent.change(l, { target: { value: '50' } });
  fireEvent.keyDown(l, { key: 'Enter' });
  expect(handleOnChange).toHaveBeenCalledTimes(3);

  // Should not update with invalid input
  fireEvent.change(h, { target: { value: '-1' } });
  fireEvent.keyDown(h, { key: 'Enter' });
  expect(handleOnChange).toHaveBeenCalledTimes(3);

  fireEvent.change(s, { target: { value: '101' } });
  fireEvent.keyDown(s, { key: 'Enter' });
  expect(handleOnChange).toHaveBeenCalledTimes(3);

  fireEvent.change(l, { target: { value: '5000' } });
  fireEvent.keyDown(l, { key: 'Enter' });
  expect(handleOnChange).toHaveBeenCalledTimes(3);

  // Should not update with keys other than Enter
  fireEvent.keyDown(h, { key: ' ' });
  expect(handleOnChange).toHaveBeenCalledTimes(3);

  fireEvent.keyDown(s, { key: ' ' });
  expect(handleOnChange).toHaveBeenCalledTimes(3);

  fireEvent.keyDown(l, { key: ' ' });
  expect(handleOnChange).toHaveBeenCalledTimes(3);
});

it('should handle rgb input change', () => {
  const handleOnChange = jest.fn();

  const { container } = render(
    <ColorPicker onChangeComplete={handleOnChange}>
      <ColorBuilder />
      <ColorInputPanel defaultColorFormat='rgb' />
    </ColorPicker>,
  );

  const r = container.querySelectorAll('input')[0] as HTMLInputElement;
  const g = container.querySelectorAll('input')[1] as HTMLInputElement;
  const b = container.querySelectorAll('input')[2] as HTMLInputElement;
  expect(r).toBeTruthy();
  expect(g).toBeTruthy();
  expect(b).toBeTruthy();

  fireEvent.change(r, { target: { value: '100' } });
  fireEvent.keyDown(r, { key: 'Enter' });
  expect(handleOnChange).toHaveBeenCalledTimes(1);

  fireEvent.change(g, { target: { value: '50' } });
  fireEvent.keyDown(g, { key: 'Enter' });
  expect(handleOnChange).toHaveBeenCalledTimes(2);

  fireEvent.change(b, { target: { value: '50' } });
  fireEvent.keyDown(b, { key: 'Enter' });
  expect(handleOnChange).toHaveBeenCalledTimes(3);

  // Should not update with invalid input
  fireEvent.change(r, { target: { value: '-1' } });
  fireEvent.keyDown(r, { key: 'Enter' });
  expect(handleOnChange).toHaveBeenCalledTimes(3);

  fireEvent.change(g, { target: { value: '256' } });
  fireEvent.keyDown(g, { key: 'Enter' });
  expect(handleOnChange).toHaveBeenCalledTimes(3);

  fireEvent.change(b, { target: { value: '5000' } });
  fireEvent.keyDown(b, { key: 'Enter' });
  expect(handleOnChange).toHaveBeenCalledTimes(3);

  // Should not update with keys other than Enter
  fireEvent.keyDown(r, { key: ' ' });
  expect(handleOnChange).toHaveBeenCalledTimes(3);

  fireEvent.keyDown(g, { key: ' ' });
  expect(handleOnChange).toHaveBeenCalledTimes(3);

  fireEvent.keyDown(b, { key: ' ' });
  expect(handleOnChange).toHaveBeenCalledTimes(3);
});

it('should handle hex input change with lose focus', () => {
  const handleOnChange = jest.fn();

  const { container } = render(
    <ColorPicker onChangeComplete={handleOnChange}>
      <ColorBuilder />
      <ColorInputPanel defaultColorFormat='hex' />
    </ColorPicker>,
  );

  const input = container.querySelectorAll('input')[0] as HTMLInputElement;
  expect(input).toBeTruthy();
  input.focus();
  fireEvent.change(input, { target: { value: '#FF6200' } });
  input.blur();
  expect(handleOnChange).toHaveBeenCalledTimes(1);
});

it('should handle hsl input change with lose focus', () => {
  const handleOnChange = jest.fn();

  const { container } = render(
    <ColorPicker onChangeComplete={handleOnChange}>
      <ColorBuilder />
      <ColorInputPanel defaultColorFormat='hsl' />
    </ColorPicker>,
  );

  const h = container.querySelectorAll('input')[0] as HTMLInputElement;
  const s = container.querySelectorAll('input')[1] as HTMLInputElement;
  const l = container.querySelectorAll('input')[2] as HTMLInputElement;
  expect(h).toBeTruthy();
  expect(s).toBeTruthy();
  expect(l).toBeTruthy();

  h.focus();
  fireEvent.change(h, { target: { value: '100' } });
  h.blur();
  expect(handleOnChange).toHaveBeenCalledTimes(1);

  s.focus();
  fireEvent.change(s, { target: { value: '50' } });
  s.blur();
  expect(handleOnChange).toHaveBeenCalledTimes(2);

  l.focus();
  fireEvent.change(l, { target: { value: '50' } });
  l.blur();
  expect(handleOnChange).toHaveBeenCalledTimes(3);
});

it('should handle rgb input change with lose focus', () => {
  const handleOnChange = jest.fn();

  const { container } = render(
    <ColorPicker onChangeComplete={handleOnChange}>
      <ColorBuilder />
      <ColorInputPanel defaultColorFormat='rgb' />
    </ColorPicker>,
  );

  const r = container.querySelectorAll('input')[0] as HTMLInputElement;
  const g = container.querySelectorAll('input')[1] as HTMLInputElement;
  const b = container.querySelectorAll('input')[2] as HTMLInputElement;
  expect(r).toBeTruthy();
  expect(g).toBeTruthy();
  expect(b).toBeTruthy();

  r.focus();
  fireEvent.change(r, { target: { value: '100' } });
  r.blur();
  expect(handleOnChange).toHaveBeenCalledTimes(1);

  g.focus();
  fireEvent.change(g, { target: { value: '50' } });
  g.blur();
  expect(handleOnChange).toHaveBeenCalledTimes(2);

  b.focus();
  fireEvent.change(b, { target: { value: '50' } });
  b.blur();
  expect(handleOnChange).toHaveBeenCalledTimes(3);
});

it('should preserve hue when color dot is black/at bottom of square', () => {
  const { container } = render(
    <ColorPicker selectedColor={{ h: 140, s: 60, l: 1 }}>
      <ColorBuilder />
    </ColorPicker>,
  );

  const colorBuilder = container.querySelector(
    '.iui-color-picker .iui-color-field',
  ) as HTMLElement;
  expect(colorBuilder.style.getPropertyValue('--selected-color')).toBe(
    '#010402',
  );
  expect(colorBuilder.style.getPropertyValue('--hue')).toBe('#00ff55');

  const colorDot = container.querySelector('.iui-color-dot') as HTMLElement;
  expect(colorDot).toBeTruthy();
  expect(colorDot.style.getPropertyValue('--left')).toEqual('75%');
  expect(colorDot.style.getPropertyValue('--top')).toEqual('98%');

  // Go to bottom of square and hue should be preserved
  fireEvent.keyDown(colorDot, { key: 'ArrowDown' });
  fireEvent.keyDown(colorDot, { key: 'ArrowDown' });
  expect(colorDot.style.getPropertyValue('--left')).toEqual('75%');
  expect(colorDot.style.getPropertyValue('--top')).toEqual('100%');
  expect(colorBuilder.style.getPropertyValue('--hue')).toBe('#00ff55');
});

it('should set focus if setFocus is true', () => {
  const { container } = render(
    <ColorPicker setFocus>
      <ColorBuilder />
    </ColorPicker>,
  );
  expect(container.querySelector('.iui-color-picker')).toBeTruthy();
  expect(container.querySelector('.iui-color-dot')).toHaveFocus(); // first tabbable element
});

it('should not set focus if setFocus is false', () => {
  const { container } = render(
    <ColorPicker>
      <ColorBuilder />
    </ColorPicker>,
  );
  expect(container.querySelector('.iui-color-picker')).toBeTruthy();
  expect(container.querySelector('.iui-color-dot')).not.toHaveFocus();
});