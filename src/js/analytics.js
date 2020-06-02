function analytics (){
    let counter = 0;

    const listener = function () {
        counter++;
    };

    document.addEventListener(`click`, listener);

     return {
         getClick() {
             return `Произведено ${counter} кликов по странице`;
         }
     };
}

window.analytics = analytics();

export function testFunction() {
    console.log(`dist_clean_test + watcher_test`);
}