import React from 'react';
import Panel from '../components/Panel';

import TURN_TABLE_IMG from '../assets/turntable.jpg'

import styled from 'styled-components';
import tw from 'tailwind-styled-components';

const Backdrop = tw.div`
    w-full h-full
    flex
    items-center
    justify-center
    backdrop-blur-2xl
    bg-black/70
`
const Album = tw.div`
    w-64 h-64
    object-cover
    rounded-xl
    border border-gray-800
    select-none
`;

const EffectedAlbum = styled(Album)`
    & {
        filter: drop-shadow(0 25px 25px rgb(255 255 255 / 0.35));
        background: url("${TURN_TABLE_IMG}");
        background-size: cover;
        background-position:bottom;
    }
`
const MusicAlbum = props => {
    return (
        <Panel style={{background: `url(${TURN_TABLE_IMG}) center/100%`, backgroundSize: 'cover'}}>
            <Backdrop>
                <EffectedAlbum src={TURN_TABLE_IMG} />
            </Backdrop>
        </Panel>
    );
};

export default MusicAlbum;