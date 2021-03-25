import { $, $W, $B, FN } from '../../../_Base/Asset/_Global/_global';
import Global from './global';

/**
 * 函数
 */
export default class GlobalFunction {
    /**
     * 获取节点
     * @overview 获取节点，不存在则创建
     * @param {string} id 节点ID
     * @return {$} 节点
     */
    public static getDom(id: string = 'app'): typeof $ {
        const _this = this;
        
        let $dom = $('#' + id);
        
        if ($dom.length === 0) { // 不存在则创建
            $dom = $(`<div id="${ id }"></div>`);
            $B.append($dom);
        }
        
        $dom.addClass(id);
        $dom.attr('data-name', 'App');
        
        return $dom
    }
    
    /**
     * 获取节点宽高比
     * @param {$} $dom 节点
     * @return {number} 宽高比
     */
    public static getDomAspect($dom?: typeof $): number {
        const _this = this;
        
        return $dom
            ? $dom.width() / $dom.height()
            : Global.DomWidth / Global.DomHeight;
    }
    
    /**
     * 获取中心位置
     * @param {$} $dom 节点
     * @return {*} 中心位置
     */
    public static getDomCenter($dom?: typeof $): any {
        const _this = this;
        
        return $dom
            ? {
                x: $dom.width() / 2,
                y: $dom.height() / 2
            }
            : {
                x: Global.DomWidth / 2,
                y: Global.DomHeight / 2
            };
    }
    
    /**
     * 调整宽高
     * @return {void}
     */
    public static resizeDom(): void {
        const _this = this;
        
        Global.Width = Global.$W.width();
        Global.Height = Global.$W.height();
        Global.DomWidth = Global.$Dom.width();
        Global.DomHeight = Global.$Dom.height();
    }
    
    /**
     * 更新焦点
     * @param {boolean} isReset 是否重置
     * @return {void}
     */
    public static updateFocus(isReset: boolean = true): void {
        const _this = this;
        
        // Mouse
        $W.bind('mousemove', (e: MouseEvent) => {
            Global.Focus.x = e.clientX;
            Global.Focus.y = e.clientY;
        });
        
        // Touch
        $W.bind('touchstart', (e: TouchEvent) => {
            Global.Focus.x = e.touches[0].clientX;
            Global.Focus.y = e.touches[0].clientY;
        });
        $W.bind('touchmove', (e: TouchEvent) => {
            Global.Focus.x = e.touches[0].clientX;
            Global.Focus.y = e.touches[0].clientY;
        });
        
        if (isReset) {
            $W.bind('mouseout', (e: MouseEvent) => {
                const centerP = _this.getDomCenter();
                Global.Focus.x = centerP.x;
                Global.Focus.y = centerP.y;
            });
            $W.bind('touchend', (e: TouchEvent) => {
                const centerP = _this.getDomCenter();
                Global.Focus.x = centerP.x;
                Global.Focus.y = centerP.y;
            });
        }
    }
    
    /**
     * 屏幕调整时更新
     * @param {function} callback 回调
     * @param {number} time 间隔时间
     * @return {void}
     */
    public static updateResize(callback: Function, time: number = 150): void {
        const _this = this;
        
        if (!callback) return;
        
        FN.resize(() => {
            callback && callback();
        }, time);
    }
}
