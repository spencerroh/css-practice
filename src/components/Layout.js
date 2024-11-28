import React, { Component } from 'react';
import { BrowserRouter, Route, Link, Routes } from 'react-router-dom';
import tw from 'tailwind-styled-components';
import Home from '../pages/Home';
import MusicAlbum from '../pages/MusicAlbum';
import Widget from '../pages/Widget';
import { RecoilTest } from '../pages/RecoilTest';

const Container = tw.div`
    fixed
    w-full h-full
    flex
`;

const Menus = tw.aside`
    w-48
    bg-black
`;

const Main = tw.main`
    grow
`;

const Menu = tw(Link)`
    font-menu    
    block
    px-4 py-2
    bg-black hover:bg-gray-800
    text-left text-white
`;

const Subtitle = tw.div`
    block
    mt-4
    px-2
    text-sm font-bold
    text-left
    text-gray-600
`;

class Layout extends Component {
  render() {
    return (
      <BrowserRouter>
        <Container>
          <Menus>
            <Subtitle>MAIN</Subtitle>
            <Menu to='/'>HOME</Menu>
            <br />

            <Subtitle>PRACTICES</Subtitle>
            <Menu to='/malbum'>Music Album</Menu>
            <Menu to='/widget'>Widget</Menu>
            <Menu to='/recoil'>Recoil</Menu>
          </Menus>
          <Main>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/malbum' element={<MusicAlbum />} />
              <Route path='/widget' element={<Widget />} />
              <Route path='/recoil' element={<RecoilTest />} />
              <Route path='*' element={<Home />} />
            </Routes>
          </Main>
        </Container>
      </BrowserRouter>
    );
  }
}

export default Layout;
