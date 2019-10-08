/**
 * Public
 */
import { Editor } from '../../../../_Base/js/window';

/**
 * Style
 */
import '../../../src/css/editor.less';

/**
 * React
 */
import React from 'react';
import { Provider } from 'react-redux';

/**
 * CardLibraryEditorComponent
 */
export default class cardLibraryEditorComponent extends React.Component {
    
    /******生命周期******/
    
    /**
     * 构造函数
     * @param {object} props 参数对象
     */
    constructor(props) {
        super(props);
        
        const _this = this,
            {menu, color} = _this.props;
        
        _this.state = {
            id: 'cardLibraryEditor',
            menu: menu || [
                'head', // 标题
                'bold', // 粗体
                'fontSize', // 字号
                'fontName', // 字体
                'italic', // 斜体
                'underline', // 下划线
                'strikeThrough', // 删除线
                'foreColor', // 文字颜色
                'backColor', // 背景颜色
                'link', // 插入链接
                'list', // 列表
                'justify', // 对齐方式
                'quote', // 引用
                'emoticon', // 表情
                'image', // 插入图片
                'table', // 表格
                'video', // 插入视频
                'code', // 插入代码
                'undo', // 撤销
                'redo' // 重复
            ],
            color: color || [
                '#ffffff',
                '#dddddd',
                '#000000',
                '#c24f4a',
                '#f9963b',
                '#f9eb00',
                '#8baa4a',
                '#46acc8',
                '#1c487f',
                '#7b5ba1'
            ]
        };
        
        _this.editor = null;
        
        _this.child = {};
    }
    
    /**
     * 核心组件
     * @return {object} Dom对象
     */
    render() {
        const _this = this,
            {store} = _this.props;
        
        return (
            <Provider store={store}>
                <div id={_this.state.id}
                     className="cardLibraryEditor" />
            </Provider>
        );
    }
    
    /**
     * 组件安装回调
     * @return {void}
     */
    componentDidMount() {
        const _this = this;
        
        _this.createEditor();
    }
    
    /**
     * 组件更新回调
     * @return {void}
     */
    componentDidUpdate() {
        const _this = this;
    }
    
    /**
     * 组件卸载回调
     * @return {void}
     */
    componentWillUnmount() {
        const _this = this;
        
        _this.editor = null;
    }
    
    /******其他事件******/
    
    /**
     * 创建编辑器
     * @return {string} 时间间隔
     */
    createEditor() {
        const _this = this,
            {content} = _this.props,
            {id, menu, color} = _this.state;
        
        _this.editor = new Editor('#' + id);
        _this.editor.customConfig.menus = menu;
        _this.editor.customConfig.colors = color;
        // _this.editor.customConfig.uploadImgShowBase64 = true;
        _this.editor.customConfig.pasteIgnoreImg = true;
        _this.editor.customConfig.pasteFilterStyle = false;
        _this.editor.customConfig.pasteTextHandle = (inputContent) => {
            if (inputContent === '' && !inputContent) return '';
            
            let str = inputContent;
            str = str.replace('/(\\n|\\r| class=(")?Mso[a-zA-Z]+(")?)/g', '');
            str = str.replace(/<!--(.*?)-->/g, '');
            str = str.replace(/<xml>[\s\S]*?<\/xml>/ig, '');
            str = str.replace(/<style>[\s\S]*?<\/style>/ig, '');
            str = str.replace(/color:rgb\(255,255,255\);/ig, '');
            // str = str.replace(/<\/?[^>]*>/g, '');
            // str = str.replace(/[ | ]*\n/g, '\n');
            // str = str.replace(/&nbsp;/ig, '');
            return str;
        };
        
        _this.editor.create();
        _this.editor.txt.html(content);
    }
    
    /**
     * 获取编辑器内容
     * @return {string} 编辑器内容
     */
    getContent() {
        const _this = this;
        
        if (!_this.editor) return '';
        
        return _this.editor.txt.html();
    }
}
