/**
 *   on 2016-09-21.
 */

import osapi from 'jive/osapi';
import url from 'url'

import globalConfig from '../globalConfig'

export function fetchJSON(...args){
    return new Promise((resolve, reject) => {
        fetch(...args).then(r => r.json(), reject).then(resolve, reject)
    })
}

export function fetchOsapiGet(...args){
    return new Promise ((resolve, reject) => {
        
        osapi.http.get(...args).execute(result => {
            if (result.error) reject(result.error);
            else {
                resolve(result);
            }
        })
    })
}

export function fetchOsapiPost(...args){
    return new Promise ((resolve, reject) => {

        osapi.http.post(...args).execute(result => {

            console.log('POST result: ', result);

            if (result.status === 201 || result.status === 200) resolve(result);
            else {
                reject(result);
            }
        })
    })
}

export function osapiPromise(osapiRequestFunc){
    return new Promise((resolve, reject) => {

        const request = typeof osapiRequestFunc == 'function' ? osapiRequestFunc(osapi.jive.corev3) : osapiRequestFunc;

        request.execute(response => {
            if (response.error) {
                resolve({error: response.error})
            } else {
                resolve(response)
            }
        })
    });
}

export function initOsapiPicker(){
    return new Promise ((resolve, reject) => {

        osapi.jive.corev3.people.requestPicker({
            success: function(data) { console.log('success: '+JSON.stringify(data)); resolve(data); },
            error: function(data) { console.log('error: '+JSON.stringify(data)); reject(data); },
            multiple: false
        });
    })
}

export function URLWithParams(targetURL, query){
    const parsedURL = url.parse(globalConfig.serverBaseUrl + targetURL, true);
    
    const withParams = {
        ...parsedURL,
        query:{
            ...parsedURL.query,
            ...query
        }
    }; 
    
    return url.format(withParams);
}