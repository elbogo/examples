/**
 * Created by t_t on 3/11/2016.
 */
import React from 'react';
import classNames           from 'classnames';
import './ThumbnailItem.css';



export default function ThumbnailItem(props) {

    const {colors,displayMode,toggleLike,getCategoryIcon,isMobile} = props;
    const {
      contentID,
      attachments,
      subject,
      content,
      categories,
      resources,
      like,
      unlike,
      likeCount,
      viewCount,
      isCertified,
      isPartners,
      byexample
    } = props.data;


    //console.log('isMobile check:!   ', isMobile)

    //check if list view
    const isListView = displayMode == 'list';

    //console.log('attachments: ', attachments);

    // for now we stick with attachments for images
      const imageAttachment =  attachments ? attachments.find((attachment)=>{return attachment.contentType == 'image/png' && attachment.name && attachment.name.match(/.jpg|.jpeg|.png|.gif|.JPG|.JPEG|.PNG|.GIF/)}) : false;
      //console.log('imageAttachment, : ', imageAttachment);

    let image = imageAttachment ? imageAttachment.url : require('../../images/fallback.jpg');


    //console.log('IMAGE: ', image, imageAttachment)

    const categoryIcon = getCategoryIcon(categories);

    if ( isMobile || isListView){
      image = categoryIcon;
    }

    //create description
    let descTmp = document.createElement('div')
    descTmp.innerHTML = content.text;
    let description = descTmp.innerText.trim();
    description = description.length > 95 ? description.slice(0,description.slice(0,95).lastIndexOf(' '))+'...' : description.trim();

    //fix Jive's subject
    let subjTmp = document.createElement('div')
      subjTmp.innerHTML = subject;
    const subjectFormatted = subjTmp.innerText;

    //likes
    const likes = likeCount == 1 ? '1 like' : likeCount + ' likes';
    const views = viewCount == 1 ? '1 view' : viewCount + ' views';

    //sees like
    const seeLike = typeof like == 'function' || typeof unlike == 'function';

    //check if user can like
    const canLike = typeof like == 'function';


    const likesClassName = classNames('thumbnail-likes',{ noButton: !seeLike });
    const likesListClassName = classNames('thumbnail-list-likes',{ noButton: !seeLike });

    return <div data-index={props.index} data-content-id={contentID} className="thumbnail-item">
      <div className="thumbnail-image">
        <a href={resources.html.ref} target="_blank">
            <div className="thumbnail-item__image" style={{backgroundImage: 'url('+image+')'}}>
              { !isMobile && !isListView && <div className={likesClassName}>
                <div className="likes">{likes}</div>
                <div className="views">{views}</div>
                { seeLike && canLike && <div className="like-it" onClick={ (e)=> { toggleLike(e,contentID,like) } } >Like</div> }
                { seeLike && !canLike && <div className="like-it liked" onClick={ (e)=> { toggleLike(e,contentID,unlike) } }>Unlike</div> }
              </div>
              }
              { byexample && !isListView && <div className="byexample-large">by example</div> }
              { isPartners && !isListView && <div className="partners-large">partners</div> }
              { isCertified && !isListView && <div className="certified-large">certified</div> }
            </div>
            <div className="likes-mobile">{likes}</div>
            <div className="views-mobile">{views}</div>
        </a>
      </div>
      <div className="thumbnail-meta">
        <a href={resources.html.ref} target="_blank">
            <h4 style={{color: colors.title}} className="thumbnail-item__title">{subjectFormatted}</h4>
            <div className="mobile-ribons">
                  { byexample && <div className="byexample">by example</div> }
                  { isPartners && <div className="partners">partners</div> }
                  { isCertified && <div className="certified">certified</div> }
            </div>
            { isCertified && isListView && <i className="certified-list-small"></i> }
            { byexample && isListView && <i className="byexample-list-small"></i> }
            { isPartners && isListView && <i className="partners-list-small"></i> }
        </a>
        <p className="thumbnail-item__description">{description}</p>
      </div>
      { isMobile || isListView && <div className={likesListClassName}>
        <div className="count">{likeCount}</div>
        <div className="view-count">{viewCount}</div>
        { seeLike && canLike && <div className="like-it" onClick={ (e)=> { toggleLike(e,contentID,like) } } ></div> }
        { seeLike && !canLike && <div className="like-it liked" onClick={ (e)=> { toggleLike(e,contentID,unlike) } }></div> }
        { !seeLike && <div className="like-it"></div> }
        </div>
      }
    </div>
}
