/**
 * Page
 */
// import Index from '../page/index';
import CardLibrary from '../page/cardLibrary';
import CardLibraryGroup from '../page/cardLibraryGroup';

export const route = {
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
