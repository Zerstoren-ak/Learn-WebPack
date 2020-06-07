// import * as $ from 'jquery';
import Swiper from 'swiper';
import 'swiper/css/swiper.css';
import * as SliderSettings from './swiper-settings';
// import '@/css/styles.css';
import '@/css/scss.scss';
// import logo from '@/img/logo.png';

//// Swiper set & initialization + import all test (* as)
const Slider = document.getElementById(`slider`);
SliderSettings.addSliderClasses(Slider, `container-polygon`, `swiper-slide`);
const sw = new Swiper('.swiper-container', SliderSettings.SWSettings);
////

///jQuery test
// $('.logo').click(function() {$(this).toggleClass('border')});
////


////Single import test
import {testFunction} from "./analytics";
testFunction();
////

console.log(`Вызвать статистику: analytics.getClick()`);
