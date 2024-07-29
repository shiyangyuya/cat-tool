import { defineConfig, type DefaultTheme } from "vitepress";

export const zh = defineConfig({
  lang: "zh-Hans",
  description: "cat-tool 是一个模块化、简单易用的 JavaScript 实用工具库",
  themeConfig: {
    nav: nav(),
    sidebar: {
      "/zh/guide/": { base: "/zh/guide/", items: sidebarGuide() },
      "/zh/tools/": { base: "/zh/tools/", items: sidebarTool() },
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
      link: "/zh/guide/what-is",
      activeMatch: "/zh/guide/",
    },
    {
      text: "参考",
      link: "/zh/tools/overview",
      activeMatch: "/zh/tools/",
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
        { text: "Bus 事件总线", link: "bus" },
        { text: "IndexedDB 数据库", link: "IndexedDBWrapper" },
        { text: "Watermark 页面水印", link: "Watermark" },
      ],
    },
    {
      text: "函数工具",
      collapsed: false,
      items: [],
    },
  ];
}
