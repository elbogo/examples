import React         from 'react';
import classNames    from 'classnames';

export default function Node(props){

    const className = classNames('node', {
        active: props.isActive,
        default: props.isDefault,
        headline: !props.isDefault
    });

    return (
        <div className={ className }
                onClick={ props.onClick }>
                    {props.module}
            </div>
    );
}
