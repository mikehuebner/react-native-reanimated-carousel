function upcaseFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export const summaryTemplate = (
  pages,
) => {
  const page = 'summary';
  return `
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

import { Cards } from 'nextra/components'

<Cards num={2}>
  ${pages.map(page => `
  <Cards.Card
    image
    arrow
    title="${page}"
    id="summary-item"
    href="/Examples/${page}"
    style={{ maxHeight: 240 }}
  >
    <div style={{ maxHeight: 200 }}>![${page}](../../../app/src/pages/${page}/preview.gif)</div>
  </Cards.Card>
  `).join('\n')}
</Cards>
`}