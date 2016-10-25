/**
 * when execute resize height of iframe
 */
export default function resizeIframe() {
    if (__MOCK__){
        console.log('development resize');
    } else {

        gadgets.window.adjustHeight();

        setTimeout(function(){
            gadgets.window.adjustHeight();
        }, 250);
    }
}
