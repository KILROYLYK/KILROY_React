/**
 * Public
 */
import { Base, GaeaAjax } from '../../../_Base/js/window';
import { scrollTop, isPC, isMobile, getImage } from '../controller/window';
import { route } from '../controller/route';
import { domain, interfaceRoute } from '../constant/interface';
import { campCookie } from '../constant/cookie';
import { camp } from '../constant/camp';

/**
 * Style
 */
import '../../src/css/cardLibrary.less';

/**
 * Template
 */
import Loading from './common/loading';
import Popup from './common/popup';
import { createTippyMessage, TippyMessage } from './common/tippy';

/**
 * React
 */
import React from 'react';
import { Provider } from 'react-redux';
import { Link } from 'react-router-dom';

/**
 * CardLibraryComponent
 */
export default class cardLibraryComponent extends React.Component {
    
    /******生命周期******/
    
    /**
     * 构造函数
     * @param {object} props 参数对象
     */
    constructor(props) {
        super(props);
        
        const _this = this,
            {store} = _this.props,
            {pageState} = store.getState(),
            state = JSON.parse(Base.cookie.get(campCookie));
        
        _this.state = {
            platform: pageState.platform,
            noResult: false,
            switchTime: false,
            time: state && state.time ? state.time : 1,
            search: state && state.search ? state.search : '',
            camp: state && state.camp ? state.camp : 'Neutral',
            hero: state && state.hero ? state.hero : '',
            sequence: state && state.sequence ? state.sequence : false,
            createTime: state && state.createTime ? state.createTime : false,
            cost: state && state.cost ? state.cost : false,
            limit: 15,
            page: state && state.page ? state.page : 1,
            campList: {},
            cardGroupList: [],
            btnPrev: false,
            btnNext: false
        };
        
        if (!_this.state.sequence &&
            !_this.state.createTime &&
            !_this.state.cost) {
            _this.state.sequence = 'bottom';
        }
        
        _this.child = {};
    }
    
    /**
     * 核心组件
     * @return {object} Dom对象
     */
    render() {
        const _this = this,
            {store} = _this.props,
            campList = _this.state.campList,
            campListKey = Object.keys(campList);
        
        return (
            <Provider store={store}>
                {_this.createTitle()}
                <div className="box_card_group">
                    <div className="box">
                        <div className={'camp_list' + (
                            isMobile() && _this.state.camp !== 'Neutral'
                                ? ' active'
                                : ''
                        )}>
                            {_this.createCamp()}
                        </div>
                        {
                            isPC()
                                ? _this.createSearch()
                                : null
                        }
                        {
                            isMobile()
                                ? campListKey.map((v, i, a) => {
                                    return _this.createCampHero(v, campList[v]);
                                })
                                : null
                        }
                    </div>
                    <div className="card_group">
                        {_this.createCondition()}
                        {
                            _this.state.cardGroupList.length > 0
                                ? _this.createCardGroupList()
                                : null
                        }
                        {
                            _this.state.noResult
                                ? _this.createEmptyList()
                                : null
                        }
                    </div>
                    {
                        _this.state.btnPrev || _this.state.btnNext
                            ? _this.createPagination()
                            : null
                    }
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
        
        _this.getCampData();
        _this.getCardGroupData();
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
     * 创建牌组按钮
     * @return {object} Dom对象
     */
    createBtnCreateCamp() {
        const _this = this;
        
        return (
            <div className="box_create">
                <button className="btn btn_1"
                        onClick={
                            _this.child.popup
                                ? _this.clickOpenPopup1.bind(_this)
                                : null
                        }>创建牌组
                </button>
            </div>
        );
    }
    
    /**
     * 创建阵营
     * @return {object} Dom对象
     */
    createCamp() {
        const _this = this,
            campList = _this.state.campList,
            campListKey = Object.keys(campList);
        
        return campListKey.map((v, i, a) => {
            return (
                <div key={v}
                     className={'camp ' + v + (
                         _this.state.camp === v
                             ? ' active'
                             : ''
                     )}
                     data-id={v.id}>
                    <span onClick={_this.clickCardCamp.bind(_this, v)} />
                    {
                        isPC()
                            ? _this.createCampHero(v, campList[v])
                            : null
                    }
                </div>
            );
        });
    }
    
    /**
     * 创建阵营英雄
     * @param {string} campName 阵营名称
     * @param {array} array 英雄
     * @return {object} Dom
     */
    createCampHero(campName, array) {
        const _this = this;
        
        return (
            <div key={campName}
                 className={'hero' + (
                     _this.state.camp === campName
                         ? ' active'
                         : ''
                 )}>
                {
                    array.map((v, i, a) => {
                        return (
                            <i key={v.name}
                               className={
                                   _this.state.camp === campName &&
                                   _this.state.hero === v.name
                                       ? 'active'
                                       : ''
                               }
                               style={{
                                   backgroundImage: 'url("' + getImage(v.avatar) + '")'
                               }}
                               data-id={v.id}
                               onClick={_this.clickCardHero.bind(_this, campName, v.name)} />
                        );
                    })
                }
            </div>
        );
    }
    
    /**
     * 创建搜索
     * @return {object} Dom对象
     */
    createSearch() {
        const _this = this;
        
        return (
            <div className="search">
                <input className="input_search"
                       name="input_search"
                       value={_this.state.search}
                       placeholder="搜索"
                       onChange={_this.updateSearch.bind(_this)} />
            </div>
        );
    }
    
    /**
     * 创建条件
     * @return {object} Dom对象
     */
    createCondition() {
        const _this = this,
            time = [
                '过去24小时',
                '过去7天',
                '过去30天',
                '过去1年'
            ];
        
        return (
            <div className="condition">
                <div className="switch_time">
                    <button onClick={_this.clickSwitchTime.bind(_this)}>
                        {time[_this.state.time]}
                        <span className={'icon i_1' + (
                            _this.state.switchTime
                                ? ' active'
                                : ''
                        )} />
                    </button>
                    <div className={'popup_switch_time' + (
                        _this.state.switchTime
                            ? ' active'
                            : ''
                    )}>
                        {
                            time.map((v, i, a) => {
                                return <button key={i} onClick={_this.clickTime.bind(_this, i)}>{v}</button>;
                            })
                        }
                    </div>
                </div>
                <div className="switch_sort">
                    <button onClick={_this.clickSequence.bind(_this)}>#
                        <span className={'icon i_2' + (
                            _this.state.sequence
                                ? ' ' + _this.state.sequence
                                : ''
                        )} />
                    </button>
                    <div>牌组名称</div>
                    {
                        isPC()
                            ? <div>作者</div>
                            : null
                    }
                    {
                        isPC()
                            ? <button onClick={_this.clickCreateTime.bind(_this)}>
                                更新时间
                                <span className={'icon i_2' + (
                                    _this.state.createTime
                                        ? ' ' + _this.state.createTime
                                        : ''
                                )} />
                            </button>
                            : null
                    }
                    {
                        isPC()
                            ? <button onClick={_this.clickCost.bind(_this)}>
                                合成花费
                                <span className={'icon i_2' + (
                                    _this.state.cost
                                        ? ' ' + _this.state.cost
                                        : ''
                                )} />
                            </button>
                            : null
                    }
                </div>
            </div>
        );
    }
    
    /**
     * 创建空结果
     * @return {object} Dom对象
     */
    createEmptyList() {
        const _this = this;
        
        return (
            <div className="emptyList">
                <div className="img" />
                <p>无搜索结果,请更换条件重试！</p>
            </div>
        );
    }
    
    /**
     * 创建卡牌列表
     * @return {object} Dom对象
     */
    createCardGroupList() {
        const _this = this;
        
        TippyMessage.defaultProps.trigger = isPC() ? 'mouseenter focus' : 'click';
        TippyMessage.defaultProps.hideOnClick = isMobile();
        
        return (
            <div className="card_group_list">
                {
                    _this.state.cardGroupList.map((v, i, a) => {
                        return (
                            <Link key={v.deckId}
                                  to={{
                                      pathname: route.decksGuide.path,
                                      search: '',
                                      hash: String(v.deckId),
                                      state: ''
                                  }}
                                  className={v.faction}
                                  onClick={() => {
                                      scrollTop(0);
                                  }}>
                                <div className="bg" />
                                <div className="serial">
                                    <span>{v.like}</span>
                                </div>
                                <div className="avatar">
                                    <img src={getImage(v.leaderAvatar)} />
                                </div>
                                <div className="name">
                                    <span>{v.title}</span>
                                </div>
                                <div className="data">
                                    <div className="author">
                                        {v.author}
                                    </div>
                                    <div className="time">
                                        <TippyMessage content={
                                            !v.valid
                                                ? createTippyMessage('当前版本牌组', '在当前版本的游戏中被创建/编辑')
                                                : createTippyMessage('牌组待更新', '在过去版本的游戏中被创建/编辑')
                                        }>
                                            <i className={
                                                !v.valid
                                                    ? ' active'
                                                    : ''
                                            } />
                                        </TippyMessage>
                                        {_this.getTimeInterval(v.modified)}
                                    </div>
                                    <div className="cost">
                                        {_this.getCost(v.cost)}
                                    </div>
                                </div>
                            </Link>
                        );
                    })
                }
            </div>
        );
    }
    
    /**
     * 创建分页
     * @return {object} Dom对象
     */
    createPagination() {
        const _this = this;
        
        return (
            <div className="pagination">
                <button className={'btn btn_2' +
                (_this.state.btnPrev
                        ? ' active'
                        : ''
                )}
                        onClick={_this.clickBtnPrev.bind(_this)}>
                    <span>上一页</span>
                </button>
                <button className={'btn btn_2' +
                (_this.state.btnNext
                        ? ' active'
                        : ''
                )}
                        onClick={_this.clickBtnNext.bind(_this)}>
                    <span>下一页</span>
                </button>
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
     * 点击阵营
     * @param {string} campName 阵营名称
     * @return {void}
     */
    clickCardCamp(campName) {
        const _this = this;
        
        _this.setState({
            search: '',
            camp: campName,
            hero: '',
            sequence: 'bottom',
            createTime: false,
            cost: false,
            page: 1
        }, () => {
            _this.saveCookie();
            _this.getCardGroupData();
        });
    }
    
    /**
     * 点击英雄
     * @param {string} campName 阵营名称
     * @param {string} heroName 英雄名称
     * @return {void}
     */
    clickCardHero(campName, heroName) {
        const _this = this;
        
        _this.setState({
            search: '',
            camp: campName,
            hero: heroName,
            sequence: 'bottom',
            createTime: false,
            cost: false,
            page: 1
        }, () => {
            _this.saveCookie();
            _this.getCardGroupData();
        });
    }
    
    /**
     * 点击时间筛选开关
     * @return {void}
     */
    clickSwitchTime() {
        const _this = this;
        
        if (_this.state.switchTime) {
            _this.setState({
                switchTime: false
            });
        } else {
            _this.setState({
                switchTime: true
            });
        }
    }
    
    /**
     * 点击时间筛选
     * @param {string} time 时间
     * @return {void}
     */
    clickTime(time) {
        const _this = this;
        
        _this.setState({
            switchTime: false,
            time: time,
            page: 1
        }, () => {
            _this.saveCookie();
            _this.getCardGroupData();
        });
    }
    
    /**
     * 点击顺序筛选
     * @return {void}
     */
    clickSequence() {
        const _this = this;
        
        if (!_this.state.sequence ||
            _this.state.sequence === 'top') {
            _this.setState({
                sequence: 'bottom',
                createTime: false,
                cost: false,
                page: 1
            }, () => {
                _this.saveCookie();
                _this.getCardGroupData();
            });
        } else {
            _this.setState({
                sequence: 'top',
                createTime: false,
                cost: false,
                page: 1
            }, () => {
                _this.saveCookie();
                _this.getCardGroupData();
            });
        }
    }
    
    /**
     * 点击创建时间筛选
     * @return {void}
     */
    clickCreateTime() {
        const _this = this;
        
        if (!_this.state.createTime ||
            _this.state.createTime === 'top') {
            _this.setState({
                sequence: false,
                createTime: 'bottom',
                cost: false,
                page: 1
            }, () => {
                _this.saveCookie();
                _this.getCardGroupData();
            });
        } else {
            _this.setState({
                sequence: false,
                createTime: 'top',
                cost: false,
                page: 1
            }, () => {
                _this.saveCookie();
                _this.getCardGroupData();
            });
        }
    }
    
    /**
     * 点击价格筛选
     * @return {void}
     */
    clickCost() {
        const _this = this;
        
        if (!_this.state.cost ||
            _this.state.cost === 'top') {
            _this.setState({
                sequence: false,
                createTime: false,
                cost: 'bottom',
                page: 1
            }, () => {
                _this.saveCookie();
                _this.getCardGroupData();
            });
        } else {
            _this.setState({
                sequence: false,
                createTime: false,
                cost: 'top',
                page: 1
            }, () => {
                _this.saveCookie();
                _this.getCardGroupData();
            });
        }
    }
    
    /**
     * 点击上一页
     * @return {void}
     */
    clickBtnPrev() {
        const _this = this;
        
        _this.setState({
            page: _this.state.page - 1
        }, () => {
            _this.saveCookie();
            _this.getCardGroupData();
            scrollTop(0);
        });
    }
    
    /**
     * 点击下一页
     * @return {void}
     */
    clickBtnNext() {
        const _this = this;
        
        _this.setState({
            page: _this.state.page + 1
        }, () => {
            _this.saveCookie();
            _this.getCardGroupData();
            scrollTop(0);
        });
    }
    
    /******数据事件******/
    
    /**
     * 获取阵营及领袖
     * @return {void}
     */
    getCampData() {
        const _this = this,
            condition = _this.getCondition();
        
        GaeaAjax.jsonpAjax(
            domain + interfaceRoute.leaders,
            {},
            (result) => {
                if (result.retCode === 0) {
                    _this.setState({
                        campList: _this.getCamp(result.data.leaders)
                    });
                }
            }
        );
    }
    
    /**
     * 获取库组
     * @return {void}
     */
    getCardGroupData() {
        const _this = this,
            condition = _this.getCondition();
        
        //颠倒时间参数
        let time = _this.state.time;
        if (time === 0) {
            time = 1;
        } else if (time === 1) {
            time = 0;
        }
        
        _this.setState({
            noResult: false,
            cardGroupList: [],
            btnPrev: false,
            btnNext: false
        });
        
        GaeaAjax.encryptAjax(
            domain + interfaceRoute.getDecks,
            {
                limit: _this.state.limit,
                after_id: _this.state.limit * (_this.state.page - 1),
                sort_by: condition.sort,
                asc: condition.asc,
                after: time,
                filter: _this.state.search,
                faction: _this.state.camp === 'Neutral' ? '' : _this.state.camp,
                leader: _this.state.hero
            },
            (result) => {
                if (result.retCode === 0) {
                    if (result.data.decks.length > 0) {
                        _this.setState({
                            cardGroupList: result.data.decks
                        });
                    } else {
                        _this.setState({
                            noResult: true
                        });
                    }
                    if (result.data.page.prev !== '') {
                        _this.setState({
                            btnPrev: true
                        });
                    }
                    if (result.data.page.next !== '') {
                        _this.setState({
                            btnNext: true
                        });
                    }
                }
            }
        );
    }
    
    /******其他事件******/
    
    /**
     * 保存State至Cookie
     * @return {void}
     */
    saveCookie() {
        const _this = this,
            campState = {
                time: _this.state.time,
                search: _this.state.search,
                camp: _this.state.camp,
                hero: _this.state.hero,
                sequence: _this.state.sequence,
                createTime: _this.state.createTime,
                cost: _this.state.cost,
                page: _this.state.page
            };
        
        Base.cookie.set(campCookie, JSON.stringify(campState), 0.5);
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
            dateInterval = (Date.parse(new Date()) - Date.parse(new Date(time))) / 1000;
        
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
     * 格式化阵营
     * @param {array} heroList 英雄列表
     * @return {object} 阵营
     */
    getCamp(heroList) {
        const _this = this,
            campList = {};
        
        Base.traversingArray(camp, (i, v) => {
            campList[v.id] = [];
        });
        
        Base.traversingObject(campList, (i, v) => {
            Base.traversingArray(heroList, (i0, v0) => {
                if (i === v0.function) {
                    v.push({
                        name: v0.name,
                        avatar: v0.thumbnail
                    });
                }
            });
        });
        
        return campList;
    }
    
    /**
     * 获取当前筛选条件
     * @return {object} 条件
     */
    getCondition() {
        const _this = this;
        
        let sort = 0,
            asc = false;
        
        if (_this.state.sequence) {
            sort = 0;
            if (_this.state.sequence === 'top') asc = true;
        }
        
        if (_this.state.createTime) {
            sort = 1;
            if (_this.state.createTime === 'top') asc = true;
        }
        
        if (_this.state.cost) {
            sort = 2;
            if (_this.state.cost === 'top') asc = true;
        }
        
        return {
            sort: sort,
            asc: asc
        };
    }
    
    /**
     * 更新搜索结果
     * @param {object} e 当前对象
     * @return {void}
     */
    updateSearch(e) {
        const _this = this;
        
        _this.setState({
            search: e.target.value,
            camp: '',
            hero: '',
            sequence: 'bottom',
            createTime: false,
            cost: false,
            page: 1
        }, () => {
            _this.saveCookie();
            _this.getCardGroupData();
        });
    }
    
}
