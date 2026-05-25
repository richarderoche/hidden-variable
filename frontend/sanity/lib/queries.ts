import {defineQuery} from 'next-sanity'

// PARTIALS
const seo = `
  "seoTitle": seo.seoTitle,
  "description": seo.description,
  "ogImage": seo.image,
  "noIndex": seo.hideFromSearchEngines
`

const page = `
  "type": _type,
  "slug": slug.current,
  title
`

const link = `
  ...,
  "page": page->{
    ${page},
  }
`

const portableText = `
  ...,
  markDefs[]{
    ...,
    _type == "internalLink" => {
      ...,
      "slug": reference->slug,
      "type": reference->_type
    }
  }
`

const pbButton = `
  ...,
  sitePage {
    ${link},
  },
  externalLink {
    ${link},
  },
  fileLink {
    ...,
    "url": file.asset->url,
  },
`

const pbBlocks = `
  ...,
  _type == "pbBlockText" => {
    ...,
    textContent[]{
      ${portableText}
    }
  },
  _type == "pbBlockButton" => {
    ${pbButton}
  },
`

const pb = `
  pbSections[]{
    ...,
    _type == "pbGridMulti" => {
      columns[]{
        ...,
        pbBlocks[]{
          ${pbBlocks}
        }
      }
    },
    _type == "pbGridSingle" => {
      ...,
      pbBlocks[]{
        ${pbBlocks}
      }
    },
    _type == "pbGridDouble" => {
      ...,
      columnOne {
        ...,
        pbBlocks[]{
          ${pbBlocks}
        }
      },
      columnTwo {
        ...,
        pbBlocks[]{
          ${pbBlocks}
        }
      }
    },
  }
`

// QUERIES
export const homePageQuery = defineQuery(`
  *[_type == "home"][0]{
    ...,
    ${pb},
  }
`)

export const pagesBySlugQuery = defineQuery(`
  *[_type == "page" && slug.current == $slug][0] {
    ...,
    "slug": slug.current,
    ${pb},
    ${seo},
  }
`)

export const slugsByTypeQuery = defineQuery(`
  *[_type == $type && defined(slug.current)]{"slug": slug.current}
`)

export const sitemapByTypeQuery = defineQuery(`
  *[_type == $type]{"slug": slug.current, "updatedAt": _updatedAt}
`)

export const settingsQuery = defineQuery(`
  *[_type == "settings"][0]{
    ...,
    ${seo},
  }
`)

export const scriptsQuery = defineQuery(`
  *[_type == "settings"][0]{
    "gtmId": googletagmanagerID,
    customScripts,
  }
`)
