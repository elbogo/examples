/**
 * get Categories from jive via osapi.http.get
 * @param url {String} - receive from jive.tile.getContainer --> resources.categories.ref
 * @param callback - return parsed object
 */
export function getCategories(url, callback) {
    osapi.http.get({
        'href': url
    }).execute(function(data) {

       callback( parseContent(data.content) );
    })
}
/**
 * get all places per one
 * @param places - selected places
 */
export function batchPlaces(places){
    let placesBatch = osapi.newBatch();

    places.map( place => {
        placesBatch.add(place.placeID, osapi.jive.corev3.places.get({id:place.placeID, count: 100}));
    });

    return new Promise(function(resolve, reject){
        //performing batch
        placesBatch.execute( response => {
            resolve(response);
        });
    });
}

/**
 * @param documents - documents retrieved after calling trending API endpoint.
 * @returns original Documents objects
*/
export function getOriginalDocuments(documents){

return new Promise( (resolve, reject) => {
    if (documents.length){

        let documentsBatch = osapi.newBatch();

        documents.map( brokenJiveDocObject => {
            documentsBatch.add( brokenJiveDocObject.contentID, osapi.jive.corev3.contents.get({
                id: brokenJiveDocObject.contentID
            }))
        })

          documentsBatch.execute( batchRes => {

            let originalDocuments = [];

            for( let prop in batchRes ){
              originalDocuments.push(batchRes[prop]);
            }

            resolve(originalDocuments);

      });

    }else{
      resolve([]);
    }

  })

}

export function getPlacesInformation(batchedPlaces, apiEndpointIndicator) {
    let placesBatch = osapi.newBatch();

    for (var prop in batchedPlaces) {
        if( batchedPlaces.hasOwnProperty( prop ) && batchedPlaces[prop].status != 403 ) {


          if (apiEndpointIndicator == 'regular'){
            placesBatch.add(batchedPlaces[prop].placeID, osapi.jive.corev3.contents.get({
                count: 100,
                place: batchedPlaces[prop].resources.self.ref,
                type: 'document'
            }));
          }
          //if fetching PopularContent use Trending Content feed
          else{
            // placesBatch.add(batchedPlaces[prop].placeID, osapi.jive.corev3.contents.get({

            placesBatch.add(batchedPlaces[prop].placeID, osapi.jive.corev3.contents.getTrendingContent({
                count: 100,
                place: batchedPlaces[prop].resources.self.ref,
                type: 'document',
                fields: 'subject,categories,contentID,attachments,content,likeCount'
            }));
          }

        }
    }

    return new Promise(function(resolve, reject){
        //performing batch
        placesBatch.execute( (response) => {
            resolve(response);
        });
    });
}

/**
 * search for places in contents
 * @param options - configuration object
 * @param callback
 *
 * Example :
 *  searchPlaces({search: 'a*'}, function(response){ <!-- response manipulation --!>  })
 */
export function searchPlaces(options, callback) {
    osapi.jive.corev3.contents.search(options).execute(function(response){
        callback(response);
    })
}

/**
 * remove stupid jive security
 * @param content
 */
function parseContent(content) {
    return JSON.parse(content.replace("throw 'allowIllegalResourceCall is false.';", ''))
}
