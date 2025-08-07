// ==UserScript==
// @name         挂刀页面美化
// @namespace    https://github.com/vicoho/Steam-Market-Calculator
// @version      0.74
// @description  优化 smis.club 挂刀页面的显示效果，通过注入 CSS 实现，并根据日成交量高亮显示
// @author       vicoho
// @run-at       document-end
// @match        https://smis.club/exchange
// @grant        none
// ==/UserScript==

(function () {
    // 常量定义
    const VOLUME_THRESHOLD = 80; // 日成交量阈值（紫色）
    const HIGH_VOLUME_THRESHOLD = 120; // 高成交量阈值（红色）

    // 美化页面的 CSS 样式
    const cssStyles = `
        .exchange-header-bottom {
            display: none !important;
        }
        .commodity-exchange-header {
            height: 36px !important;
            padding: 0 15px !important;
        }
        .el-header {
            display: none !important;
        }
        .el-main {
            margin-top: 0 !important;
        }
        .header-top-left {
            margin-top: 7px !important;
        }
        .exchange-table-detail {
            min-width: auto !important;
        }
        .commodity-exchange-bottom {
            margin-top: 0px !important;
        }
        .exchange-phone-item-bottom + div > .exchange-table-detail:nth-last-child(2) {
            display: none !important;
        }
        .exchange-phone-item-bottom + div > .exchange-table-detail:nth-last-child(1) {
            display: none !important;
        }
    `;

    // 点击事件触发的额外 CSS 样式
    const clickCssStyles = `
        .commodity-exchange-header {
            position: absolute;
            bottom: 0;
            width: 100%;
            margin: 0 !important;
            box-sizing: border-box;
            z-index: 99;
        }
        .header-top-right {
            width: 100% !important;
        }
        .header-top-right button:nth-child(1) {
            display: none !important;
        }
        .header-top-right button:nth-child(2) {
            display: none !important;
        }
        .header-top-right button:nth-child(3) {
            width: 100% !important;
        }
    `;

    // 状态变量和样式元素 ID
    let isApplied = false; // 跟踪样式是否已应用
    const styleElementId = 'smis-beautify-styles'; // 基础样式元素 ID
    const clickStyleElementId = 'smis-beautify-click-styles'; // 点击样式元素 ID

    // 创建基础 CSS 样式元素
    const createStyleElement = () => {
        const style = document.createElement('style');
        style.id = styleElementId;
        style.type = 'text/css';
        style.textContent = cssStyles;
        return style;
    };

    // 创建点击触发的 CSS 样式元素
    const createClickStyleElement = () => {
        const style = document.createElement('style');
        style.id = clickStyleElementId;
        style.type = 'text/css';
        style.textContent = clickCssStyles;
        return style;
    };

    // 应用美化样式（包括基础和点击样式）
    const applyStyles = () => {
        if (!document.getElementById(styleElementId)) {
            document.head.appendChild(createStyleElement());
        }
        if (!document.getElementById(clickStyleElementId)) {
            document.head.appendChild(createClickStyleElement());
        }
        isApplied = true;
    };

    // 移除美化样式（包括基础和点击样式）
    const revertStyles = () => {
        const existingStyle = document.getElementById(styleElementId);
        const existingClickStyle = document.getElementById(clickStyleElementId);
        if (existingStyle) {
            existingStyle.remove();
        }
        if (existingClickStyle) {
            existingClickStyle.remove();
        }
        isApplied = false;
    };

    // 高亮日成交量
    const highlightDailyVolume = () => {
        const spans = Array.from(document.querySelectorAll('.exchange-phone-item-median span')).filter(span => {
            const text = span.textContent.trim();
            return /^\d+$/.test(text); // 仅匹配纯数字内容
        });

        if (spans.length > 0) {
            spans.forEach(span => {
                const volumeText = span.textContent.trim();
                const dailyVolume = parseInt(volumeText, 10);

                if (!isNaN(dailyVolume)) {
                    if (dailyVolume > HIGH_VOLUME_THRESHOLD) {
                        span.style.color = 'rgb(160, 28, 28)'; // 红色（> 80）
                        span.style.fontWeight = 'bold'; // 加粗
                    } else if (dailyVolume >= VOLUME_THRESHOLD) {
                        span.style.color = '#974ae8'; // 紫色（≥ 30）
                        span.style.fontWeight = 'bold'; // 加粗
                    }
                }
            });
            return true; // 成功找到并处理元素
        }
        return false; // 未找到元素
    };

    // 设置触发器点击事件
    const setupTriggerListeners = () => {
        const triggerElements = document.querySelectorAll('.header-top-image');
        triggerElements.forEach(element => {
            element.addEventListener('click', () => {
                if (isApplied) {
                    revertStyles();
                } else {
                    applyStyles();
                }
            });
        });

        // 自动点击第一个触发器（如果存在）
        if (triggerElements.length > 0) {
            triggerElements[0].click();
        }
    };

    // 使用 MutationObserver 监听动态加载的内容
    const observeDynamicContent = () => {
        // 立即尝试高亮
        highlightDailyVolume();

        // 监听“应用设置”按钮点击
        const applyButton = document.querySelector('.header-top-right button:last-child');
        if (applyButton) {
            applyButton.addEventListener('click', () => {
                // 延迟执行高亮，等待新内容加载
                setTimeout(highlightDailyVolume, 500);
            });
        }

        // 使用 MutationObserver 监听 DOM 变化
        const observer = new MutationObserver((mutations) => {
            for (const mutation of mutations) {
                if (mutation.addedNodes.length > 0) {
                    // 检测到新节点添加，尝试高亮
                    highlightDailyVolume();
                }
            }
        });

        // 监听 .el-main 的父容器（假设为 .el-main 或 body）
        const targetNode = document.querySelector('.el-main') || document.body;
        observer.observe(targetNode, {
            childList: true,
            subtree: true
        });
    };

    // 页面加载完成后执行
    window.addEventListener('load', () => {
        setupTriggerListeners();
        observeDynamicContent();
    });
})();