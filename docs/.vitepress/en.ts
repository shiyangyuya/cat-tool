import { defineConfig, type DefaultTheme } from "vitepress";

export const en = defineConfig({
  lang: "en-US",
  description: "cat-tool 是一个模块化、简单易用的 JavaScript 实用工具库",
  themeConfig: {
    nav: nav(),
    sidebar: {
      "/en/guide/": { base: "/en/guide/", items: sidebarGuide() },
      "/en/tools/": { base: "/en/tools/", items: sidebarTool() },
    },
    editLink: {
      pattern: "https://github.com/shiyangyuya/cat-tool/tree/main/docs",
      text: "在 GitHub 上编辑此页面",
    },
    footer: {
      message: "基于 MIT 许可发布",
      copyright: `版权所有 © 2023-${new Date().getFullYear()} shiyangyuya@gmail.com`,
    },
    docFooter: {
      prev: "上一页",
      next: "下一页",
    },
    outline: {
      label: "页面导航",
    },
    lastUpdated: {
      text: "最后更新于",
      formatOptions: {
        dateStyle: "short",
        timeStyle: "medium",
      },
    },
    langMenuLabel: "多语言",
    returnToTopLabel: "回到顶部",
    sidebarMenuLabel: "菜单",
    darkModeSwitchLabel: "主题",
    lightModeSwitchTitle: "切换到浅色模式",
    darkModeSwitchTitle: "切换到深色模式",
  },
});

function nav(): DefaultTheme.NavItem[] {
  return [
    {
      text: "指南",
      link: "/en/guide/what-is",
      activeMatch: "/en/guide/",
    },
    {
      text: "工具",
      link: "/en/tools/overview",
      activeMatch: "/en/tools/",
    },
  ];
}

function sidebarGuide(): DefaultTheme.SidebarItem[] {
  return [
    {
      text: "基础",
      collapsed: false,
      items: [
        { text: "什么是 cat-tool", link: "what-is" },
        { text: "快速开始", link: "getting-started" },
      ],
    },
    {
      text: "进阶",
      collapsed: false,
      items: [{ text: "更新日志", link: "CHANGELOG" }],
    },
  ];
}

function sidebarTool(): DefaultTheme.SidebarItem[] {
  return [
    {
      text: "工具总览",
      collapsed: false,
      items: [{ text: "工具总览 ", link: "overview" }],
    },
    {
      text: "类工具",
      collapsed: false,
      items: [
        { text: "bus 事件", link: "bus" },
        { text: "IndexedDBWrapper", link: "IndexedDBWrapper" },
      ],
    },
    {
      text: "函数工具",
      collapsed: false,
      items: [],
    },
  ];
}
