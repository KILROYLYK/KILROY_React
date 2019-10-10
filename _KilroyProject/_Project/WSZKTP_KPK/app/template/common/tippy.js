/**
 * Style
 */
import 'tippy.js/dist/tippy.css';
import '../../../src/css/tippy.less';

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
    return <Tippy arrow={false}
                  theme="translucent"
                  boundary="HTMLElement"
                  animation="fade"
                  placement="top"
                  flip={true}
                  flipBehavior={['top']}
                  flipOnUpdate={true}
                  offset={0}
                  distance={5}
                  zIndex={1}
                  maxWidth={250}
                  interactive={false}
                  interactiveBorder={0}
                  delay={0}
                  duration={500}
                  trigger="mouseenter focus"
                  touch={true}
                  hideOnClick={false}
                  ignoreAttributes={true}
                  popperOptions={{
                      modifiers: {
                          preventOverflow: {
                              enabled: true
                          }
                      }
                  }}
                  onCreate={() => {
                  }}
                  onShow={() => {
                  }}
                  onShown={() => {
                  }}
                  onHide={() => {
                  }}
                  onHidden={() => {
                  }}
                  {...props} />;
};

/**
 * 创建卡牌详细信息
 * @param {object} props 参数对象
 * @return {object} Dom对象
 */
export const TippyCard = (props) => {
    return <Tippy arrow={false}
                  theme="translucent"
                  boundary="viewport"
                  animation="fade"
                  placement="right-start"
                  flip={true}
                  flipBehavior={['right-start', 'right-end']}
                  flipOnUpdate={true}
                  offset={0}
                  distance={5}
                  zIndex={1}
                  maxWidth={750}
                  interactive={false}
                  interactiveBorder={0}
                  delay={0}
                  duration={500}
                  trigger="mouseenter focus"
                  touch={true}
                  hideOnClick={false}
                  ignoreAttributes={true}
                  popperOptions={{
                      modifiers: {
                          preventOverflow: {
                              enabled: true
                          }
                      }
                  }}
                  onCreate={() => {
                  }}
                  onShow={() => {
                  }}
                  onShown={() => {
                  }}
                  onHide={() => {
                  }}
                  onHidden={() => {
                  }}
                  {...props} />;
};
