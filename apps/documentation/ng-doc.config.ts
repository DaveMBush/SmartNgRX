import { NgDocConfiguration } from '@ng-doc/builder';

const NgDocConfig: NgDocConfiguration = {
  repoConfig: {
    url: 'https://github.com/DaveMBush/SmartNgRX',
    mainBranch: 'main',
    releaseBranch: 'release',
  },
  guide: {
    headerTemplate: './apps/documentation/src/app/header-template.html',
  },
};

export default NgDocConfig;
