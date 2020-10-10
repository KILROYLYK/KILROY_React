import '../../../_Base/Resource/css/common.less';
import '../../../_Base/Resource/css/public.less';

import { W, D, Base } from '../../../_Base/Asset/typescript/window';

import Config from './config'; // 配置
import Function from './function'; // 函数
import Router from './router'; // 路由

/**
 * Global
 */
export default class Global {
    public static readonly Window: Window = W;
    public static readonly Document: Document = D;
    
    public static readonly Base: object = Base;
    
    public static Width: number = W.innerWidth;
    public static Height: number = W.innerHeight;
    
    public static readonly Config: object = Config; // 配置
    public static readonly Function: object = Function; // 函数
    public static readonly Router: object = Router; // 路由
    
    public static Main: any = null; // React主对象
}
