import Swiper from 'swiper';
import * as SliderSettings from './swiper-settings';
import '../../node_modules/swiper/css/swiper.css'
import '../css/styles.css';
import logo from '../img/logo.png';

const Slider = document.getElementById(`slider`);
SliderSettings.addSliderClasses(Slider, `container-polygon`, `swiper-slide`);

const sw = new Swiper('.container', SliderSettings.SWSettings);

import {testFunction} from "./analytics";
testFunction();
