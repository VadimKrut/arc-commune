// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  docsSidebar: [
    {
      type: 'category',
      label: 'IRS System',
      collapsed: false,
      items: [
        'IRS',
        {
          type: 'category',
          label: 'Modules',
          collapsed: false,
          items: ['IR', 'IS'],
        },
        'IRCArchitecture',
        'StateDiagram',
      ],
    },
  ],
};

export default sidebars;
