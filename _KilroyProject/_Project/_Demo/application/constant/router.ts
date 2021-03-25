import React from 'react';

import Index from '../page/index.tsx';

export interface RouteConfig { // 路由配置
    name: string,
    path: string,
    template: React.Component
}

/**
 * 路由
 */
export default class GlobalRoute {
    // 一级页面
    public static readonly index: RouteConfig = {
        name: '首页',
        path: '/',
        template: Index
    };
    
    // 二级页面
};
