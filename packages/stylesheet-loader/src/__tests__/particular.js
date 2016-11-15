'use strict';

import particular from '../particular';
import appendRemIfNeeded from '../appendRemIfNeeded';

describe('particular', () => {
  function testBorder(methodName) {
    const borderResult = particular[methodName]('1 solid red');

    expect(borderResult[methodName + 'Width']).toEqual('1rem');
    expect(borderResult[methodName + 'Style']).toEqual('solid');
    expect(borderResult[methodName + 'Color']).toEqual('rgb(255,0,0)');
  }

  function testMeasure(key) {
    const result = particular[key]('1 2 3 4');

    expect(result[key + 'Top']).toEqual('1rem');
    expect(result[key + 'Right']).toEqual('2rem');
    expect(result[key + 'Bottom']).toEqual('3rem');
    expect(result[key + 'Left']).toEqual('4rem');
  }

  function testPrefix(methodName, isRem) {
    let value = 'testValue';
    const result = particular[methodName](value);
    const word = methodName.substring(0, 1).toUpperCase() + methodName.substring(1);

    if (isRem) {
      value = appendRemIfNeeded(methodName, value);
    }
    expect(result['ms' + word]).toEqual(value);
    expect(result['moz' + word]).toEqual(value);
    expect(result['o' + word]).toEqual(value);
    expect(result['webkit' + word]).toEqual(value);
    expect(result[methodName]).toEqual(value);
  }

  it('should separate border value', () => {
    testBorder('border');
    testBorder('borderTop');
    testBorder('borderRight');
    testBorder('borderBottom');
    testBorder('borderLeft');
  });

  it('should separate inside and outside distance', () => {
    testMeasure('padding');
    testMeasure('margin');
  });

  it('should separate three numbers', () => {
    const key = 'padding';
    const result = particular[key]('1 2 3');

    expect(result[key + 'Top']).toEqual('1rem');
    expect(result[key + 'Right']).toEqual('2rem');
    expect(result[key + 'Bottom']).toEqual('3rem');
    expect(result[key + 'Left']).toEqual('2rem');
  });

  it('should separate two numbers', () => {
    const key = 'padding';
    const result = particular[key]('1 2');

    expect(result[key + 'Top']).toEqual('1rem');
    expect(result[key + 'Right']).toEqual('2rem');
    expect(result[key + 'Bottom']).toEqual('1rem');
    expect(result[key + 'Left']).toEqual('2rem');
  });

  it('should separate one numbers', () => {
    const key = 'padding';
    const result = particular[key](1);

    expect(result[key + 'Top']).toEqual('1rem');
    expect(result[key + 'Right']).toEqual('1rem');
    expect(result[key + 'Bottom']).toEqual('1rem');
    expect(result[key + 'Left']).toEqual('1rem');
  });

  it('should return in front of four values with over four numbers', () => {
    const key = 'padding';
    const result = particular[key]('1 2 3 4 5');

    expect(result).toEqual({});
  });

  it('should add prefix with some property', () => {
    testPrefix('boxShadow');
    testPrefix('borderRadius', true);
    testPrefix('userSelect');
    testPrefix('flex');
    testPrefix('justifyContent');
    testPrefix('transition');
    testPrefix('transform');
  });
});
