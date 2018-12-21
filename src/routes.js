import React from 'react';
import Booking from './Booking';
import Comment from './Comment';
import Gallery from './Gallery';
import Location from './Location';
import Provider from './Provider';
import Tour from './Tour';
import User from './User';
import Vehicle from './Vehicle';
import VehicleType from './VehicleType';
import Category from './Category';
import Rate from './Rate';
import RateType from './RateType';
import PictureL from './PictureL';
import PictureT from './PictureT';
import PictureP from './PictureP';
import Login from './Login';
const routes = [
    {
        path: '/Booking',
        exact: false,
        main: () => <Booking/>
    },
    {
        path: '/Category',
        exact: false,
        main: () => <Category/>
    },
    {
        path: '/Comment',
        exact: false,
        main: () => <Comment/>
    },
    {
        path: '/Gallery',
        exact: false,
        main: () => <Gallery/>
    },
    {
        path: '/Location',
        exact: false,
        main: () => <Location/>
    },
    {
        path: '/Provider',
        exact: false,
        main: () => <Provider/>
    },
    {
        path: '/Rate',
        exact: false,
        main: () => <Rate/>
    },
    {
        path: '/RateType',
        exact: false,
        main: () => <RateType/>
    },
    {
        path: '/Tour',
        exact: false,
        main: () => <Tour/>
    },
    {
        path: '/User',
        exact: false,
        main: () => <User/>
    },
    {
        path: '/VehicleType',
        exact: false,
        main: () => <VehicleType/>
    },
    {
        path: '/Vehicle',
        exact: false,
        main: () => <Vehicle/>
    },
    {
        path: '/PictureL',
        exact: false,
        main: () => <PictureL/>
    },
    {
        path: '/PictureT',
        exact: false,
        main: () => <PictureT/>
    },
    {
        path: '/PictureP',
        exact: false,
        main: () => <PictureP/>
    },
    {
        path: '/',
        exact: false,
        main: () => <Login/>
    },             
];

export default routes;