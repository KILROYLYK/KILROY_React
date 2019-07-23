/**
 * Style
 */
import '../../src/css/tippy.less';

/**
 * React
 */
import React from 'react';
import Tippy from '@tippy.js/react';

/**
 * 创建信息提示Dom
 * @param {string} title 标题
 * @param {string} content 内容
 * @return {object} Dom对象
 */
export const createTippyMessage = (title, content) => {
    const _this = this;
    
    return (
        <div className="tippy_message">
            <div className="tippy_title">{title}</div>
            <div className="tippy_content">{content}</div>
        </div>
    );
};

/**
 * 创建提示信息
 * @param {object} props 参数对象
 * @return {object} Dom对象
 */
export const TippyMessage = (props) => {
    return <Tippy {...props} />;
};

TippyMessage.defaultProps = {
    theme: 'translucent',
    boundary: 'HTMLElement',
    placement: 'top',
    delay: 0,
    duration: 500,
    distance: 5,
    offset: 0,
    zIndex: 1,
    maxWidth: 250,
    animateFill: false,
    flip: true,
    flipBehavior: ['top'],
    flipOnUpdate: true,
    ignoreAttributes: true,
    trigger: 'mouseenter focus',
    hideOnClick: false,
    popperOptions: {
        modifiers: {
            preventOverflow: {
                enabled: true
            }
        }
    },
    onCreate: () => {
    },
    onShow: () => {
    },
    onShown: () => {
    },
    onHide: () => {
    },
    onHidden: () => {
    }
};

/**
 * 创建卡牌详细信息
 * @param {object} props 参数对象
 * @return {object} Dom对象
 */
export const TippyCard = (props) => {
    return <Tippy {...props} />;
};

TippyCard.defaultProps = {
    theme: 'translucent',
    boundary: 'viewport',
    placement: 'right-start',
    delay: 0,
    duration: 500,
    distance: 5,
    offset: 0,
    zIndex: 1,
    maxWidth: 750,
    animateFill: false,
    flip: true,
    flipBehavior: ['right-start', 'right-end'],
    flipOnUpdate: true,
    ignoreAttributes: true,
    trigger: 'mouseenter focus',
    hideOnClick: false,
    popperOptions: {
        modifiers: {
            preventOverflow: {
                enabled: true
            }
        }
    }
};

