export const AppConfig = {
    version: require('../../package.json').version,
    linkPrefix: 'https://singwithusapp.com/',
    iosLinkPrefix: 'singwithusapp://'
};

export const SongsConfig = {
    pageSize: 25,
    viewsCountMaxLength: 12
};

export const GroupConfig = {
    groupLinkPrefix: AppConfig.linkPrefix + 'group/'
};
