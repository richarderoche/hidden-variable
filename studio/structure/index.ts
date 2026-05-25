/**
 * This plugin contains all the logic for setting up the singletons
 */

import { type DocumentDefinition } from 'sanity'
import { type StructureResolver } from 'sanity/structure'

export const singletonPlugin = (types: string[]) => {
  return {
    name: 'singletonPlugin',
    document: {
      // Hide 'Singletons (such as Home)' from new document options
      newDocumentOptions: (prev: any, { creationContext }: any) => {
        if (creationContext.type === 'global') {
          return prev.filter(
            (templateItem: any) => !types.includes(templateItem.templateId)
          )
        }

        return prev
      },
      // Removes the "duplicate" action on the Singletons (such as Home)
      actions: (prev: any, { schemaType }: any) => {
        if (types.includes(schemaType)) {
          return prev.filter(({ action }: any) => action !== 'duplicate')
        }

        return prev
      },
    },
  }
}

// The StructureResolver is how we're changing the DeskTool structure to linking to document (named Singleton)
// like how "Home" is handled.
export const pageStructure = (
  typeDefArray: DocumentDefinition[]
): StructureResolver => {
  return (S) => {
    // Goes through all of the singletons that were provided and translates them into something the
    // Desktool can understand
    const singletonItems = typeDefArray.map((typeDef) => {
      return S.listItem()
        .title(typeDef.title!)
        .icon(typeDef.icon)
        .child(
          S.editor()
            .id(typeDef.name)
            .schemaType(typeDef.name)
            .documentId(typeDef.name)
        )
    })

    // The default root list items (except custom ones and mux.videoAsset)
    const defaultListItems = S.documentTypeListItems().filter(
      (listItem) =>
        !typeDefArray.find(
          (singleton) => singleton.name === listItem.getId()
        ) && listItem.getId() !== 'mux.videoAsset'
    )

    return S.list()
      .title('Content')
      .items([...singletonItems, S.divider(), ...defaultListItems])
  }
}
