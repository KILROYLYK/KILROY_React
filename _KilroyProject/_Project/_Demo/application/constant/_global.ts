import _Global from '../../../_Base/Asset/_Global/_global';

import './style';
import GlobalConfig from './config'; // 配置
import GlobalFunction from './function'; // 函数
import Router from './router'; // 路由

export interface Vector { // 向量
    x: number, // X轴
    y: number // Y轴
}

/**
 * Global
 */
export default class Global {
    public static readonly $: typeof _Global.$ = _Global.$;
    public static readonly Console: typeof _Global.Console = _Global.Console;
    
    public static readonly W: Window = _Global.W;
    public static readonly $W: typeof Global.$ = _Global.$W;
    public static readonly D: Document = _Global.D;
    public static readonly $D: typeof Global.$ = _Global.$D;
    public static readonly B: HTMLElement = _Global.B;
    public static readonly $B: typeof Global.$ = _Global.$B;
    
    public static readonly FN: typeof _Global.FN = _Global.FN;
    public static readonly Adaptation: typeof _Global.Adaptation = _Global.Adaptation;
    public static readonly Crypto: typeof _Global.Crypto = _Global.Crypto;
    public static readonly Ajax: typeof _Global.Ajax = _Global.Ajax;
    public static readonly Popup: typeof _Global.Popup = _Global.Popup;
    
    public static Width: number = Global.$W.width();
    public static Height: number = Global.$W.height();
    public static Aspect: number = Global.Width / Global.Height;
    public static readonly $Application: typeof Global.$ = GlobalFunction.getApplication();
    public static readonly $Root: typeof Global.$ = Global.$Application.children('.container');
    public static Center: Vector = { // 中心
        x: Global.$Root.width() / 2,
        y: Global.$Root.height() / 2
    };
    public static Focus: Vector = Global.Center; // 焦点
    
    public static readonly Config: typeof GlobalConfig = GlobalConfig; // 配置
    public static readonly Function: typeof GlobalFunction = GlobalFunction; // 函数
    public static readonly Router: object = Router; // 路由
    
    public static Main: any = null; // React主对象
}
