/**
 * Public
 */
import { $, Base, GaeaAjax } from '../../../../_Base/js/window';
import { domain, interfaceRoute } from '../constant/interface';
import { href } from '../constant/href';
import { camp } from '../constant/camp';
import { winWidth, winHeight, winScroll, scrollTop, isPC, isMobile, isLogin, getImage } from '../controller/window';
import { createTippyMessage, TippyMessage, TippyCard } from '../controller/tippy';
import { route } from '../controller/route';

/**
 * Style
 */
import '../../src/css/cardLibraryGroup.less';

/**
 * Template
 */
import Loading from './common/loading';
import Popup from './common/popup';
import Share from './common/share';
import Editor from './common/editor';

/**
 * React
 */
import React from 'react';
import { Provider } from 'react-redux';
import { Link } from 'react-router-dom';

/**
 * CardLibraryGroupComponent
 */
export default class cardLibraryGroupComponent extends React.Component {
    
    /******生命周期******/
    
    /**
     * 构造函数
     * @param {object} props 参数对象
     */
    constructor(props) {
        super(props);
        
        const _this = this,
            {store, history} = _this.props,
            {pageState} = store.getState();
        
        _this.state = {
            platform: pageState.platform,
            permission: false,
            edit: false,
            autoEdit: Base.getUrlParam('state') === 'edit',
            id: history.location.hash.replace('#', ''),
            camp: '',
            like: 0,
            likeTotal: 0,
            info_title: '',
            info_cost: 0,
            info_number: 0,
            info_units: 0,
            info_provision: 0,
            info_valid: true,
            info_user: '',
            info_create_time: 0,
            info_introduction: '',
            cardList: []
        };
        
        _this.child = {};
        
        if (_this.state.id === '') {
            history.push(route.decks.path);
        }
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
                {_this.createTitle()}
                <div className={'box_card ' + _this.state.camp}>
                    {_this.createGroupLike()}
                    {_this.createGroupInfo()}
                    {
                        isMobile()
                            ? _this.createShare()
                            : null
                    }
                    {_this.createIntroduction()}
                    {_this.createCardList()}
                    <Loading store={store}
                             ref={
                                 (loading) => {
                                     _this.child.loading = loading;
                                 }
                             } />
                </div>
                {
                    isMobile()
                        ? _this.createBtnCreateCamp()
                        : null
                }
                <Popup store={store}
                       ref={
                           (popup) => {
                               _this.child.popup = popup;
                           }
                       } />
            </Provider>
        );
    }
    
    /**
     * 组件安装回调
     * @return {void}
     */
    componentDidMount() {
        const _this = this,
            {store} = _this.props;
        
        _this.update = store.subscribe(() => {
            const {pageState: newPageState} = store.getState();
            
            _this.setState({
                platform: newPageState.platform
            });
        });
        
        _this.getCardData();
        _this.child.popup.scriptPopupDeleteCradGroup(_this.clickBtnDelete);
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
        
        _this.update();
    }
    
    /******组件事件******/
    
    /**
     * 创建标题
     * @return {object} Dom对象
     */
    createTitle() {
        const _this = this;
        
        return (
            <div className="title">
                {_this.createBtnBack()}
                <span>昆特牌组库</span>
                {
                    isPC()
                        ? _this.createBtnCreateCamp()
                        : null
                }
            </div>
        );
    }
    
    /**
     * 创建返回按钮
     * @return {object} Dom对象
     */
    createBtnBack() {
        const _this = this;
        
        return (
            <Link to={{
                pathname: route.decks.path,
                search: '',
                hash: '',
                state: ''
            }}
                  className="btn btn_back"
                  href={href._void}
                  onClick={() => {
                      scrollTop(0);
                  }}>
                {
                    isPC()
                        ? <span>返回</span>
                        : ''
                }
            </Link>
        );
    }
    
    /**
     * 创建牌组按钮
     * @return {object} Dom对象
     */
    createBtnCreateCamp() {
        const _this = this;
        
        return (
            <div className="box_create">
                <a className="btn btn_1"
                   href={href._void}
                   onClick={
                       _this.child.popup
                           ? _this.clickOpenPopup1.bind(_this)
                           : null
                   }>创建牌组</a>
            </div>
        );
    }
    
    /**
     * 创建分享
     * @return {object} Dom对象
     */
    createShare() {
        const _this = this,
            {store} = _this.props;
        
        return (
            <div className="card_share">
                <Share store={store} name="card_share" />
            </div>
        );
    }
    
    /**
     * 创建牌组点赞信息
     * @return {object} Dom对象
     */
    createGroupLike() {
        const _this = this;
        
        return (
            <div className="card_group_like">
                <a className={'like' + (
                    _this.state.like !== 1
                        ? ' active'
                        : ''
                )}
                   href={href._void}
                   onClick={_this.evaluationCardGroup.bind(_this, true)} />
                <p>{_this.state.likeTotal}</p>
                <a className={'unlike' + (
                    _this.state.like !== 2
                        ? ' active'
                        : ''
                )}
                   href={href._void}
                   onClick={_this.evaluationCardGroup.bind(_this, false)} />
                {
                    isPC()
                        ? _this.createShare()
                        : null
                }
            </div>
        );
    }
    
    /**
     * 创建更新牌组信息按钮
     * @return {object} Dom对象
     */
    createBtnModify() {
        const _this = this;
        
        if (_this.state.edit) {
            return <div className="btn_box">
                <a className="btn btn_2" href={href._void}
                   onClick={() => {
                       _this.child.popup.popup.deleteCardGroup.open();
                   }}><span>删除</span></a>
                <a className="btn btn_2" href={href._void}
                   onClick={_this.clickBtnSave.bind(_this)}>
                    <span>保存</span>
                </a>
            </div>;
        } else {
            return <div className="btn_box">
                <a className="btn btn_2" href={href._void}
                   onClick={_this.clickBtnModify.bind(_this)}>
                    <span>更新牌组信息</span>
                </a>
            </div>;
        }
    }
    
    /**
     * 创建牌组类型
     * @return {object} Dom对象
     */
    createCampClass() {
        const _this = this;
        
        return (
            <div className="card_camp_class">
                {
                    isMobile()
                        ? _this.getCamp()
                        : ''
                }
            </div>
        );
    }
    
    /**
     * 创建牌组信息
     * @return {object} Dom对象
     */
    createGroupInfo() {
        const _this = this;
        
        TippyMessage.defaultProps.trigger = isPC() ? 'mouseenter focus' : 'click';
        TippyMessage.defaultProps.hideOnClick = isMobile();
        
        return (
            <div className="card_group_info">
                <div className="card_group_title">
                    {
                        isPC()
                            ? _this.createCampClass()
                            : null
                    }
                    {
                        isPC() && _this.state.edit
                            ? <input type="text" value={_this.state.info_title}
                                     onChange={_this.updateTitle.bind(_this)}
                                     maxLength={30} />
                            : <p>{_this.state.info_title}</p>
                    }
                    {
                        isPC() && _this.state.permission
                            ? _this.createBtnModify()
                            : null
                    }
                </div>
                {
                    isMobile()
                        ? _this.createCampClass()
                        : null
                }
                <div className="info">
                    <TippyMessage content={
                        createTippyMessage('碎片', '合成该牌组中的全部卡牌所需的碎片总数')
                    }>
                        <div className="cost">{_this.getCost(_this.state.info_cost)}</div>
                    </TippyMessage>
                    <TippyMessage content={
                        createTippyMessage('卡牌', '代表了该牌组中的卡牌数')
                    }>
                        <div className="number">{_this.state.info_number}</div>
                    </TippyMessage>
                    <TippyMessage content={
                        createTippyMessage('单位', '代表了该牌组中的单位数')
                    }>
                        <div className="units">{_this.state.info_units}</div>
                    </TippyMessage>
                    <TippyMessage content={
                        createTippyMessage('资源点数', '该牌组的总资源点数')
                    }>
                        <div className="provision">{_this.state.info_provision}</div>
                    </TippyMessage>
                    <div className="user">
                        <TippyMessage content={
                            _this.state.info_valid
                                ? createTippyMessage('当前版本牌组', '在当前版本的游戏中被创建/编辑')
                                : createTippyMessage('牌组待更新', '在过去版本的游戏中被创建/编辑')
                        }>
                            <i className={
                                _this.state.info_valid
                                    ? ' active'
                                    : ''
                            } />
                        </TippyMessage>
                        由<span>{_this.state.info_user}</span>
                        创建于{_this.getTimeInterval(_this.state.info_create_time)}
                    </div>
                </div>
            </div>
        );
    }
    
    /**
     * 创建卡牌列表
     * @return {object} Dom对象
     */
    createCardList() {
        const _this = this;
        
        return (
            <div className="card_list">
                {
                    _this.state.cardList.map((v, i, a) => {
                        return _this.createCard(i, v);
                    })
                }
            </div>
        );
    }
    
    /**
     * 创建卡牌
     * @param {number} index 卡牌key
     * @param {object} cardInfo 卡牌信息
     * @return {object} Dom对象
     */
    createCard(index, cardInfo) {
        const _this = this,
            isLeader = cardInfo.group === 'Leader';
        
        TippyCard.defaultProps.placement = isPC() ? 'right-start' : 'top';
        TippyCard.defaultProps.flipBehavior = isPC() ? ['right-start', 'right-end'] : ['top'];
        TippyCard.defaultProps.trigger = isPC() ? 'mouseenter focus' : 'click';
        TippyCard.defaultProps.hideOnClick = isMobile();
        TippyCard.defaultProps.onShow = (e) => {
            e.reference.classList.add('active');
            e.popper.classList.add('tippy_card_mobile');
            setTimeout(() => {
                const tippy = e.popper,
                    contentText = $(e.popperChildren.content).find('.card_text'),
                    tippyTop = tippy.getBoundingClientRect().top,
                    contentTextHeight = contentText.height();
                
                if (tippyTop + contentTextHeight > winHeight()) {
                    contentText.addClass('border');
                } else {
                    contentText.removeClass('border');
                }
            }, 10);
        };
        TippyCard.defaultProps.onHide = (e) => {
            e.reference.classList.remove('active');
        };
        
        return <TippyCard key={index}
                          content={
                              _this.createCardInfo(index, cardInfo)
                          }>
            <div className={isLeader ? 'captain' : 'card'}
                 style={{
                     backgroundImage: 'url("' + getImage(cardInfo.slot) + '")'
                 }}
                 data-id={cardInfo.id}><i />
                {
                    isLeader && cardInfo.provisions !== 0
                        ? <span>{cardInfo.provisions}</span>
                        : null
                }
                {
                    !isLeader && cardInfo.power !== 0
                        ? <span>{cardInfo.power}</span>
                        : <span className="star" />
                }
                {
                    !isLeader && cardInfo.provisions !== 0
                        ? <span>{cardInfo.provisions}</span>
                        : null
                }
                <p>{cardInfo.cardName}</p>
                {
                    !isLeader && cardInfo.most !== 1
                        ? <div className="most">x{cardInfo.most}</div>
                        : null
                }
            </div>
        </TippyCard>;
    }
    
    /**
     * 创建卡牌详细信息
     * @param {number} index 卡牌key
     * @param {object} cardInfo 卡牌信息
     * @return {object} Dom对象
     */
    createCardInfo(index, cardInfo) {
        const _this = this,
            isLeader = cardInfo.group === 'Leader';
        
        let scale = (winWidth() / 750).toFixed(2) * 1.5,
            grade = '',
            rarity = '';
        
        if (scale < 0.57) scale = 0.57;
        
        if (cardInfo.group === 'Leader') {
            grade = ' border_0';
        } else if (cardInfo.group === 'Bronze') {
            grade = ' border_1';
        } else if (cardInfo.group === 'Silver') {
            grade = ' border_2';
        } else if (cardInfo.group === 'Gold') {
            grade = ' border_3';
        }
        
        if (cardInfo.rarity === 'Common') {
            rarity = ' arrow_1';
        } else if (cardInfo.rarity === 'Rare') {
            rarity = ' arrow_2';
        } else if (cardInfo.rarity === 'Epic') {
            rarity = ' arrow_3';
        } else if (cardInfo.rarity === 'Legendary') {
            rarity = ' arrow_4';
        }
        
        return (
            <div className={'tippy_card_info ' + cardInfo.faction}
                 style={
                     isMobile()
                         ? {
                             width: winWidth()
                         }
                         : {}
                 }>
                <div className="card_info_box"
                     style={
                         isMobile() && winWidth() < 530
                             ? {
                                 transform: 'translateX(-50%) scale(' + scale + ')'
                             }
                             : {}
                     }>
                    <div className={'card_img' + grade + (
                        isLeader || cardInfo.power !== 0
                            ? rarity
                            : '')}>
                        <div className="img"
                             style={{
                                 backgroundImage: 'url("' + getImage(cardInfo.preview) + '")'
                             }} />
                        {
                            isLeader && cardInfo.provisions !== 0
                                ? <span className={'card_logo' + (
                                    index === 0 ? ' bg_captain' : ' bg'
                                )}>
                                <i>{cardInfo.provisions}</i>
                            </span>
                                : null
                        }
                        {
                            !isLeader && cardInfo.power !== 0
                                ? <span className={'card_logo' + (
                                    index === 0 ? ' bg_captain' : ' bg'
                                )}>
                                <i>{cardInfo.power}</i>
                            </span>
                                : null
                        }
                        {
                            !isLeader && cardInfo.provisions !== 0
                                ? <span className="card_number">
                                <i>{cardInfo.provisions}</i>
                            </span>
                                : null
                        }
                    </div>
                    <div className="card_text">
                        <div className="card_title">
                            <span>{cardInfo.cardName}</span>
                        </div>
                        <div className="card_content">
                            <div className="text"
                                 dangerouslySetInnerHTML={
                                     {__html: _this.getCardContent(cardInfo.tooltip)}
                                 } />
                            <div className="line" />
                            <div className="text"
                                 dangerouslySetInnerHTML={
                                     {__html: _this.getCardContent(cardInfo.fluff)}
                                 } />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    
    /**
     * 创建卡牌介绍或编辑器
     * @return {object} Dom对象
     */
    createIntroduction() {
        const _this = this,
            {store} = _this.props;
        
        return (
            <div className="card_introduction">
                {
                    isPC() && _this.state.edit
                        ? <Editor store={store}
                                  content={_this.state.info_introduction}
                                  ref={
                                      (editor) => {
                                          _this.child.editor = editor;
                                      }
                                  }
                                  menu={[
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
                                      // 'list', // 列表
                                      'justify', // 对齐方式
                                      // 'quote', // 引用
                                      'emoticon' // 表情
                                      // 'image', // 插入图片
                                      // 'table', // 表格
                                      // 'video', // 插入视频
                                      // 'code', // 插入代码
                                      // 'undo', // 撤销
                                      // 'redo' // 重复
                                  ]}
                                  color={[
                                      '#ffffff',
                                      '#666666',
                                      '#c24f4a',
                                      '#f9963b',
                                      '#f9eb00',
                                      '#8baa4a',
                                      '#46acc8',
                                      '#1c487f',
                                      '#7b5ba1'
                                  ]} />
                        : <div dangerouslySetInnerHTML={
                            {__html: _this.state.info_introduction}
                        } />
                }
            </div>
        );
    }
    
    /******点击事件******/
    
    /**
     * 点击打开创建牌组弹窗
     * @return {void}
     */
    clickOpenPopup1() {
        const _this = this;
        _this.child.popup.openCreateCardGroup();
    }
    
    /**
     * 点击进入修改状态
     * @return {void}
     */
    clickBtnModify() {
        const _this = this;
        
        if (!isLogin()) {
            _this.noLogin();
            return;
        }
        
        _this.setState({
            edit: true
        });
    }
    
    /**
     * 点击保存并退出修改状态
     * @return {void}
     */
    clickBtnSave() {
        const _this = this;
        
        if (!isLogin()) {
            _this.noLogin();
            return;
        }
        
        _this.updateIntroduction();
        
        _this.setState({
            edit: false
        });
    }
    
    /**
     * 点击删除牌组
     * @return {void}
     */
    clickBtnDelete() {
        const _this = this,
            {history} = _this.props;
        
        GaeaAjax.commonAjax(
            'get',
            domain + interfaceRoute.deldeck,
            {
                deck_id: _this.state.id
            },
            (result) => {
                history.push(route.decks.path);
            }
        );
    }
    
    /******数据事件******/
    
    /**
     * 获取牌组信息
     * @return {void}
     */
    getCardData() {
        const _this = this;
        
        GaeaAjax.commonAjax(
            'get',
            domain + interfaceRoute.getdeck,
            {
                deck_id: _this.state.id
            },
            (result) => {
                if (result.self) {
                    _this.setState({
                        permission: result.self
                    });
                }
                
                if (result.deck) {
                    _this.setState({
                        camp: result.deck.faction,
                        likeTotal: result.deck.like,
                        info_title: result.deck.title,
                        info_cost: result.deck.cost,
                        info_number: result.deck.cardsNum,
                        info_provision: result.deck.provisions,
                        info_valid: result.deck.oldVersion === false,
                        info_user: result.deck.author,
                        info_create_time: result.deck.createAt,
                        info_introduction: result.deck.article
                    }, () => {
                        if (result.self && _this.state.autoEdit) {
                            _this.setState({
                                edit: true,
                                autoEdit: false
                            });
                        }
                    });
                }
                
                if (result.cards) {
                    _this.setState({
                        cardList: _this.getCardList(result.cards)
                    });
                }
                
                if (result.like) {
                    _this.setState({
                        like: result.like
                    });
                }
            }
        );
    }
    
    /**
     * 赞或踩
     * @param {number} type 喜欢或者不喜欢
     * @return {void}
     */
    evaluationCardGroup(type) {
        const _this = this;
        
        if (!isLogin()) {
            _this.noLogin();
            return;
        }
        
        GaeaAjax.commonAjax(
            'get',
            domain + interfaceRoute.like,
            {
                deck_id: _this.state.id,
                like: type
            },
            (result) => {
                _this.setState({
                    like: result.like
                });
                
                _this.setState({
                    likeTotal: _this.state.likeTotal + result.offset
                });
            }
        );
    }
    
    /******其他事件******/
    
    /**
     * 尚未登录
     * @return {void}
     */
    noLogin() {
        const _this = this;
        
        _this.child.popup.tool.message({
            title: '',
            content: '请先登录！'
        });
    }
    
    /**
     * 格式化时间间隔
     * @param {number} time 时间戳
     * @return {string} 时间间隔
     */
    getTimeInterval(time) {
        const _this = this,
            dateUnit = {
                minute: 60,
                hour: 60 * 60,
                day: 60 * 60 * 24,
                month: 60 * 60 * 24 * 30,
                year: 60 * 60 * 24 * 365
            },
            dateInterval = Date.parse(new Date()) / 1000 - time;
        
        if (dateInterval < dateUnit.minute) {
            return parseInt(dateInterval) + '秒以前';
        } else if (dateInterval < dateUnit.hour) {
            return parseInt(dateInterval / dateUnit.minute) + '分钟前';
        } else if (dateInterval < dateUnit.day) {
            return parseInt(dateInterval / dateUnit.hour) + '小时前';
        } else if (dateInterval < dateUnit.month) {
            return parseInt(dateInterval / dateUnit.day) + '天前';
        } else if (dateInterval < dateUnit.year) {
            return parseInt(dateInterval / dateUnit.month) + '个月前';
        } else {
            return parseInt(dateInterval / dateUnit.year) + '年前';
        }
    }
    
    /**
     * 格式化价格
     * @param {number} cost 价格
     * @return {string} 价格
     */
    getCost(cost) {
        const _this = this,
            money = String(cost).split('').reverse();
        
        let newCost = '';
        
        Base.traversingArray(money, (i, v) => {
            newCost = v + newCost;
            if ((i + 1) % 3 === 0 && money.length > i + 1) newCost = ',' + newCost;
        });
        
        return newCost;
    }
    
    /**
     * 格式化卡牌介绍
     * @param {string} dom Dom字符串
     * @return {string} Dom字符串
     */
    getCardContent(dom) {
        const _this = this,
            cls = dom.match(/[^<keywprd]*=[^>]*/g) || [];
        
        let newDom = dom;
        
        for (let i = 0, n = cls.length; i < n; i++) {
            const name = cls[i].substring(1, cls[i].length),
                reg = new RegExp('<keyword=' + name + '.*?>');
            newDom = newDom.replace(reg, '<span class="' + name + '">');
        }
        
        newDom = newDom.replace(/<.keyword>/g, '</span>');
        newDom = newDom.replace(/\\n/g, '<br/><br/>');
        
        return newDom;
    }
    
    /**
     * 格式化牌组列表
     * @param {array} cardList 牌组列表
     * @return {array} 牌组列表
     */
    getCardList(cardList) {
        const _this = this,
            leader = [],
            list = [];
        
        let kind = 0;
        
        Base.traversingArray(cardList, (k, v) => {
            if (v.group === 'Leader') {
                v.most = 1;
                leader.push(v);
            } else {
                v.most = 1;
                if (v.power > 0) kind++;
                Base.traversingArray(list, (k0, v0) => {
                    if (v.id === v0.id) {
                        v.most++;
                        list.splice(k0, 1);
                    }
                });
                list.push(v);
            }
        });
        
        list.sort((a, b) => {
            if (a.provisions === b.provisions) {
                return b.power - a.power;
            }
            return b.provisions - a.provisions;
        });
        
        _this.setState({
            info_units: kind
        });
        
        return leader.concat(list);
    }
    
    /**
     * 获取阵营
     * @return {string} 阵营中文
     */
    getCamp() {
        const _this = this;
        
        let campName = '';
        
        Base.traversingArray(camp, (k, v) => {
            if (v.id === _this.state.camp) campName = v.name;
        });
        
        return campName;
    }
    
    /**
     * 更新牌组标题
     * @param {object} e 当前对象
     * @return {void}
     */
    updateTitle(e) {
        const _this = this;
        
        _this.setState({
            info_title: e.target.value
        });
    }
    
    /**
     * 更新牌组简介
     * @return {void}
     */
    updateIntroduction() {
        const _this = this;
        
        if (_this.child.editor) {
            const oldContent = _this.state.info_introduction,
                newContent = _this.child.editor.getContent();
            
            _this.setState({
                permission: false,
                info_introduction: '<p>保存中...</p>'
            });
            
            GaeaAjax.commonAjax(
                'post',
                domain + interfaceRoute.moddeck,
                JSON.stringify({
                    deck_id: _this.state.id,
                    title: _this.state.info_title,
                    article: newContent
                }),
                (result) => {
                    _this.getCardData();
                },
                (e) => {
                    const message = e.getResponseHeader('grpc-message');
                    
                    _this.setState({
                        info_introduction: oldContent
                    });
                    
                    if (message === 'title or article is too long') {
                        _this.child.popup.tool.message({
                            title: '保存失败',
                            content: '标题或内容过长'
                        });
                    } else {
                        _this.child.popup.tool.message({
                            title: '保存失败',
                            content: '系统错误，请稍后重试！'
                        });
                    }
                }
            );
        }
    }
    
}
