export const AppConfig = {
    version: require('../../package.json').version,
    linkPrefix: 'https://singalong.com/'
};

export const SongsConfig = {
    pageSize: 25
};

export const GroupConfig = {
    groupLinkPrefix: AppConfig.linkPrefix + 'group/'
};
