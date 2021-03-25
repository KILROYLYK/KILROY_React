import { $, $W, $B } from '../../../_Base/Asset/_Global/_global';
import Global, { Vector } from './_global';

/**
 * 函数
 */
export default class GlobalFunction {
    /**
     * 获取Application节点
     * @return {$} 节点
     */
    public static getApplication(): typeof $ {
        const _this = this,
            name = 'application';
        
        let $application = $('#' + name);
        
        ($application.length > 0) && $B.removeChild($application);
        $application = $(`<div id="${ name }" class="${ name }" data-name="${ name }"></div>`);
        $application.append($(`<div class="container"></div>`));
        $B.prepend($application);
        
        return $application
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
            : Global.$Root.width() / Global.$Root.height();
    }
    
    /**
     * 获取中心位置
     * @param {$} $dom 节点
     * @return {*} 中心位置
     */
    public static getDomCenter($dom?: typeof $): Vector {
        const _this = this;
        
        return $dom
            ? {
                x: $dom.width() / 2,
                y: $dom.height() / 2
            }
            : {
                x: Global.$Root.width() / 2,
                y: Global.$Root.height() / 2
            };
    }
    
    /**
     * 更新宽高
     * @return {void}
     */
    public static updateSize(): void {
        const _this = this;
        
        Global.Width = Global.$W.width();
        Global.Height = Global.$W.height();
        Global.Aspect = Global.Width / Global.Height;
        Global.Center = {
            x: Global.$Root.width() / 2,
            y: Global.$Root.height() / 2
        };
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
                const center = _this.getDomCenter();
                Global.Focus.x = center.x;
                Global.Focus.y = center.y;
            });
            $W.bind('touchend', (e: TouchEvent) => {
                const center = _this.getDomCenter();
                Global.Focus.x = center.x;
                Global.Focus.y = center.y;
            });
        }
    }
}
