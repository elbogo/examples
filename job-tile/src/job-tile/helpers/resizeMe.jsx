import gadgets from "jive/gadgets";

export default function resizeMe(){
    gadgets.window.adjustHeight();
    gadgets.window.adjustWidth();

    setTimeout(() => {
        gadgets.window.adjustHeight();
        gadgets.window.adjustWidth();
    });

    setTimeout(() => {
        gadgets.window.adjustHeight();
        gadgets.window.adjustWidth();
    }, 250);

    setTimeout(() => {
        gadgets.window.adjustHeight();
        gadgets.window.adjustWidth();
    }, 500);

    setTimeout(() => {
        gadgets.window.adjustHeight();
        gadgets.window.adjustWidth();
    }, 2000);
}
