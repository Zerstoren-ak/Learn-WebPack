export const SWSettings = {
    direction: 'horizontal',
    loop: true,
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
};
export {addSliderClasses};

function addSliderClasses(node, static_class, special_class) {
    let slides = node.querySelectorAll(`.${static_class}`);
    slides.forEach(e=>{
        e.classList.add(special_class);
    })
}
