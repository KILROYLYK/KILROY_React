import '../../../_Base/css/common.less';
import '../../../_Base/css/public.less';

import { W, D, Base } from '../../../_Base/javascript/window.ts'; // 浏览器对象

import Config from './config'; // 配置
import Function from './function'; // 函数

/**
 * Global
 */
export default class Global {
    readonly static Window: Window = W; // Window
    readonly static Document: Document = D; // Document
    
    readonly static Base: any = Base; // Document
    
    public static Width: number = W.innerWidth;
    public static Height: number = W.innerHeight;
    
    readonly static Config: any = Config; // 配置
    readonly static Function: any = Function; // 函数
    
    public static Instance: any = {}; // 实例
}
