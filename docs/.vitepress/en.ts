import { defineConfig, type DefaultTheme } from "vitepress";

export const en = defineConfig({
  lang: "en-US",
  description: "cat-tool is a modular, easy-to-use JavaScript utility library",
  themeConfig: {
    nav: nav(),
    sidebar: {
      "/en/guide/": { base: "/en/guide/", items: sidebarGuide() },
      "/en/tools/": { base: "/en/tools/", items: sidebarTool() },
    },
    editLink: {
      pattern: "https://github.com/shiyangyuya/cat-tool/tree/main/docs",
      text: "Edit this page on GitHub",
    },
    footer: {
      message: "Released under the MIT License",
      copyright: `MIT © 2023-${new Date().getFullYear()} shiyangyuya@gmail.com`,
    },
    docFooter: {
      prev: "Previous page",
      next: "Next page",
    },
    outline: {
      label: "Webpage navigation",
    },
    lastUpdated: {
      text: "last updated",
      formatOptions: {
        dateStyle: "short",
        timeStyle: "medium",
      },
    },
    langMenuLabel: "multi-language",
    returnToTopLabel: "back to the top",
    sidebarMenuLabel: "menu",
    darkModeSwitchLabel: "theme",
    lightModeSwitchTitle: "light mode",
    darkModeSwitchTitle: "dark mode",
  },
});

function nav(): DefaultTheme.NavItem[] {
  return [
    {
      text: "guide",
      link: "/en/guide/what-is",
      activeMatch: "/en/guide/",
    },
    {
      text: "reference",
      link: "/en/tools/overview",
      activeMatch: "/en/tools/",
    },
  ];
}

function sidebarGuide(): DefaultTheme.SidebarItem[] {
  return [
    {
      text: "base",
      collapsed: false,
      items: [
        { text: "what is cat-tool", link: "what-is" },
        { text: "start", link: "getting-started" },
      ],
    },
    {
      text: "more",
      collapsed: false,
      items: [{ text: "changelog", link: "CHANGELOG" }],
    },
  ];
}

function sidebarTool(): DefaultTheme.SidebarItem[] {
  return [
    {
      text: "overview",
      collapsed: false,
      items: [{ text: "overview ", link: "overview" }],
    },
    {
      text: "class tools",
      collapsed: false,
      items: [
        { text: "Event Bus", link: "bus" },
        { text: "IndexedDB database", link: "IndexedDBWrapper" },
        { text: "Watermark Page Watermark", link: "Watermark" },
      ],
    },
    {
      text: "function tools",
      collapsed: false,
      items: [],
    },
  ];
}
