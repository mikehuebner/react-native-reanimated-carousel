function upcaseFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export const pagesTemplate = (page, content) => `
---
id: ${page}
title: ${upcaseFirstLetter(page)}
sidebar_label: ${upcaseFirstLetter(page)}
description: ${upcaseFirstLetter(page)} animation
keywords:
  - ${page}
  - carousel animation
  - carousel animation ${page}
  - react-native-reanimated-carousel
  - reanimated-carousel
  - reanimated carousel
  - react-native
  - snap-carousel
  - react native
  - snap carousel
  - ios
  - android
  - carousel
  - snap
  - reanimated
image:
slug: /examples/${page}
---

{/* 

=========================================================================
=========================================================================
This page generated by /scripts/gen-pages.mjs, Don't update it manually 
=========================================================================
=========================================================================

*/}

Here is a \`${page}\` animation example. You can see the source code of this page [here](https://github.com/dohooo/react-native-reanimated-carousel/blob/main/apps/app/src/pages/${page}/index.tsx).

import Page from '../../components/Page'

<Page page='${page}' />

\`\`\`tsx copy
${content}
\`\`\`
`;
