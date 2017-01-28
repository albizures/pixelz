import React from 'react';
import {
  Layout,
  Float,
  Register,
  Container,
  ROW,
  COLUMN,
  OPACITY,
  cuid
} from 'react-dynamic-layout/lib';

import 'react-dynamic-layout/lib/style/base/index.styl';
import 'react-dynamic-layout/lib/style/dark/index.styl';

import ContentCanvas from './components/Canvas/ContentCanvas';
import './components/Preview'; 
import './components/Palette'; 

import './components/Layers';
import './components/Frames';
import Sprites from './components/Sprites';
import Tools from './components/Tools.js';
import Menus from './components/Menus';
import ColorPicker from './components/ColorPicker.js';

const ColorPickerId = cuid();

const windowSize = {
  width: window.innerWidth,
  height: window.innerHeight
};

module.exports = () => <Layout name='Main' type={ROW} hiddenType={OPACITY} resize={false}>
  <Float width='65px' height='170px' x='250px' y='100px'>
    <Layout name='Float' type={ROW}>
      <Container size={100} tabs={false}>
        <Register type={Tools} props={{ text: 'Float', ColorPickerId }}/>
      </Container>
    </Layout>
  </Float>
  <Float width='400px' height='320px' x='300px' y='100px' id={ColorPickerId}>
    <Layout name='Float' type={ROW}>
      <Container size={100} tabs={false}>
        <Register type={ColorPicker} props={{ text: 'Float', ColorPickerId }}/>
      </Container>
    </Layout>
  </Float>
  <Container size='25px' tabs={false}>
    <Register type={Menus} props={{ text: 'Top' }}/>
  </Container>
  <Container size='calc(100% - 25px)' tabs={false}>
    <Layout type={COLUMN} name='Left'>
      <Container size={15}>
        <Register name='Frames' type={{}} props={{ text: 'Left top' }}/>
        <Register name='Layers' type={{}} props={{ text: 'Left bottom' }}/>
      </Container>
      <Container size={70} tabs={false}>
        <Layout type={ROW} name='Center' resize={false}>
          <Container size='16px' tabs={false}>
            <Register type={Sprites} props={{ text: 'Center top' }}/>
          </Container>
          <Container size='calc(100% - 16px)' tabs={false}>
            <Register name='Canvas' type={ContentCanvas} props={windowSize}/>
          </Container>
        </Layout>
      </Container>
      <Container size={15} tabs={false}>
        <Layout type={ROW} name='Right'>
          <Container size={50}>
            <Register name='Preview' type={{}} props={{ text: 'Right top' }}/>
          </Container>
          <Container size={50}>
            <Register name='Palette' type={{}} props={{ text: 'Right bottom' }}/>
          </Container>
        </Layout>
      </Container>
    </Layout>
  </Container>
</Layout>;