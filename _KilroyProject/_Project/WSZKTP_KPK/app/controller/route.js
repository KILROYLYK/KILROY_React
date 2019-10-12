/**
 * Page
 */
import Index from '../page/index';
import CardLibrary from '../page/cardLibrary';
import CardLibraryGroup from '../page/cardLibraryGroup';

export const route = {
    index: {
        name: '首页',
        path: '/',
        template: Index
    },
    decks: {
        name: '牌组库',
        path: '/decks/',
        template: CardLibrary
    },
    decksGuide: {
        name: '牌组库-牌组',
        path: '/decks/guide/',
        template: CardLibraryGroup
    }
};
