export function successAlert(text) {
    window.parent.$j('<p>'+text+'</p>')
        .message({style:'success'});
}

export function errorAlert(text) {
    window.parent.$j('<p>'+text+'</p>')
        .message({style:'error'});
}

export function infoAlert(text) {
    window.parent.$j('<p>'+text+'</p>')
        .message({style:'info'});
}