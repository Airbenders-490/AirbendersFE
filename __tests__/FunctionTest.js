import 'react-native';
import React from 'react';
import Home from '../src/Home';

import renderer from 'react-test-renderer';

it('check function and dtate test case', ()=>{
    let HomeData = renderer.create(<Home />).getInstance();
   // HomeData.change(2);

    expect(HomeData.change(2)).toEqual(20);
})