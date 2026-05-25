export const imgAltField = {
  title: 'Alt text',
  name: 'alt',
  type: 'text',
  placeholder: 'e.g. A woman and two men standing on a beach during sunset',
  rows: 2,
}

export const revealEffectField = {
  title: 'Reveal Effect',
  name: 'revealEffect',
  type: 'string',
  options: {
    list: [
      { title: 'None', value: 'none' },
      { title: 'Fade In Up', value: 'fade-up' },
      { title: 'Fade In Right', value: 'fade-right' },
    ],
  },
  initialValue: 'none',
}

export const rowWidthField = {
  title: 'Width of this section (only affects desktop)',
  name: 'rowWidth',
  type: 'number',
  initialValue: 12,
  options: {
    list: [
      { title: 'Full', value: 12 },
      { title: 'Medium', value: 10 },
      { title: 'Small', value: 8 },
      { title: 'Extra Small', value: 6 },
    ],
  },
}

export const rowWidthFieldLimited = {
  title: 'Width of this section (only affects desktop)',
  name: 'rowWidth',
  type: 'number',
  initialValue: 12,
  options: {
    list: [
      { title: 'Full', value: 12 },
      { title: 'Medium', value: 10 },
    ],
  },
}

export const sectionNameField = {
  title: 'Section Name (for organizational purposes)',
  name: 'sectionName',
  type: 'string',
  placeholder: 'e.g. "Intro Part 1", "Culture Blurb", "Contact Emails"',
}

export const spaceBetweenBlocksField = {
  title: 'Space Between Blocks',
  name: 'spaceBetweenBlocks',
  type: 'string',
  initialValue: 'gap-gut',
  hidden: ({ parent }: { parent: any }) => parent?.pbBlocks?.length < 2,
  options: {
    list: [
      { title: 'None', value: 'gap-0' },
      { title: 'Tighter', value: 'gap-gut-25' },
      { title: 'Tight', value: 'gap-gut-50' },
      { title: 'Normal', value: 'gap-gut' },
      { title: 'Loose', value: 'gap-gut-150' },
      { title: 'Looser', value: 'gap-gut-200' },
    ],
  },
}
