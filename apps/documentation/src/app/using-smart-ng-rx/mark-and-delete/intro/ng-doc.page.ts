import { NgDocPage } from '@ng-doc/core';
import MarkAndDeleteCategory from '../ng-doc.category';

const ProxyChildPage: NgDocPage = {
  title: `Introduction`,
  mdFile: './index.md',
  order: 1,
  category: MarkAndDeleteCategory,
};

export default ProxyChildPage;
