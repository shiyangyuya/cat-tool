import { defineConfig } from "vitepress";
import { zh } from "./zh";
import { en } from "./en";

export default defineConfig({
  title: "cat-tool",
  base: "/cat-tool/",
  themeConfig: {
    logo: "https://img.scmttec.com/thematic%20pic/30/qe/9de531729676346446.gif",
    socialLinks: [
      { icon: "github", link: "https://github.com/shiyangyuya/cat-tool" },
    ],
  },
  locales: {
    zh: { label: "简体中文", ...zh },
    en: { label: "English", ...en },
  },
});
