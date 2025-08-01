// ==UserScript==
// @name         挂刀页面美化
// @namespace    https://github.com/vicoho/Steam-Market-Calculator
// @version      0.71
// @description  优化 smis.club 挂刀页面的显示效果，通过注入 CSS 实现，并根据日成交量高亮显示
// @author       vicoho
// @run-at       document-end
// @match        https://smis.club/exchange
// @grant        none
// ==/UserScript==

(function () {
    // 常量定义
    const VOLUME_THRESHOLD = 30; // 日成交量阈值（紫色）
    const HIGH_VOLUME_THRESHOLD = 80; // 高成交量阈值（红色）

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

    // 状态变量和样式元素 ID
    let isApplied = false; // 跟踪样式是否已应用
    const styleElementId = 'smis-beautify-styles'; // 样式元素 ID

    // 创建 CSS 样式元素
    const createStyleElement = () => {
        const style = document.createElement('style');
        style.id = styleElementId;
        style.type = 'text/css';
        style.textContent = cssStyles;
        return style;
    };

    // 应用美化样式
    const applyStyles = () => {
        if (!document.getElementById(styleElementId)) {
            document.head.appendChild(createStyleElement());
        }
        isApplied = true;
    };

    // 移除美化样式
    const revertStyles = () => {
        const existingStyle = document.getElementById(styleElementId);
        if (existingStyle) {
            existingStyle.remove();
        }
        isApplied = false;
    };

    // 高亮日成交量（如果满足阈值）
    const highlightDailyVolume = () => {
        // 选择 .exchange-phone-item-median 下的所有 span，并验证内容为纯数字
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

    // 检测动态加载的日成交量元素
    const observeDynamicContent = () => {
        // 立即尝试高亮
        if (highlightDailyVolume()) {
            return; // 如果已成功，不再轮询
        }

        // 使用 setInterval 轮询，直到找到元素或超时
        let attempts = 0;
        const maxAttempts = 20; // 最多尝试 10 秒（20 x 500ms）
        const interval = setInterval(() => {
            attempts++;
            if (highlightDailyVolume() || attempts >= maxAttempts) {
                clearInterval(interval); // 成功或超时后停止轮询
            }
        }, 500); // 每 500ms 检查一次
    };

    // 页面加载完成后执行
    window.addEventListener('load', () => {
        setupTriggerListeners();
        observeDynamicContent();
    });
})();