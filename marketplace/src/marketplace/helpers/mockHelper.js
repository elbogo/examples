/**
 * execute in development mode. Replace osapi functionality and return test data
 */

import categories           from './Categories10';
import getContainerResult   from './getContainerResult';
import places               from './placesCount25';
import batchedPlaces        from './batchedPlaces';
import placesContents       from './placesContents';

if (__MOCK__) {
    window.osapi = {
        http: {
            get: function(params) {
                return {
                    execute: function(callback) {
                        setTimeout(function() {
                            var data= {};
                            data.content = "throw 'allowIllegalResourceCall is false.';"  + JSON.stringify(categories);
                            callback(data);
                        })
                    }
                }
            }
        },
        jive: {
            corev3: {
                contents: {
                    search: function(params) {
                        return {
                            execute: function(callback) {
                                setTimeout(function(){
                                    callback(places);
                                })
                            }
                        }
                    },

                    get: function(args) {

                        var placeId = args.place.split('/').pop();

                        return {
                            result: placesContents[placeId]
                        };

                    }
                },
                places: {
                    get: function(args) {

                        return {
                            result:batchedPlaces[args.id]
                        };

                    }
                }
            }
        },
        newBatch: function() {
            return {
                result: {},
                add: function (key, requestMock) {
                    this.result[key] = requestMock.result;
                },
                execute: function (callback) {
                    return callback(this.result);
                }
            };
        }
    };

    window.jive = {
        tile: {
            onOpen: function(callback) {
                return callback();
            },
            getContainer: function(callback) {
                return callback(getContainerResult);
            },
            close: function() {}
        }
    };


}