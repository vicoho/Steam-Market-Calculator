// ==UserScript==
// @name         挂刀页面美化
// @namespace    https://github.com/vicoho/Steam-Market-Calculator
// @version      0.52
// @description  优化smis.club挂刀页面的显示效果，通过注入CSS实现
// @author       vicoho
// @run-at       document-end
// @match        https://smis.club/exchange
// @grant        none
// ==/UserScript==

(function () {
    // 页面加载完成后执行
    window.addEventListener('load', function () {
        // --- 点击切换逻辑 ---
        // 查找所有具有 'header-top-image' class 的触发器元素
        var triggerElements = document.querySelectorAll('.header-top-image');

        // 定义要注入的CSS样式
        var cssStyles = `
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
            .exchange-table-detail[data-v-99d3c6b9] {
                min-width: auto !important;
            }
            .exchange-table-detail[data-v-99d3c6b9] > div:nth-last-child(2) {
                display: none !important;
            }
            .exchange-table-detail[data-v-99d3c6b9] > div:nth-last-child(1) {
                display: none !important;
            }
        `;

        // 创建一个style元素
        var styleElement = document.createElement('style');
        styleElement.id = 'smis-beautify-styles'; // 给style元素一个ID，方便后续查找和移除
        styleElement.type = 'text/css';
        // 兼容不同浏览器设置文本内容
        if (styleElement.styleSheet) { // IE
            styleElement.styleSheet.cssText = cssStyles;
        } else { // 其他浏览器
            styleElement.appendChild(document.createTextNode(cssStyles));
        }

        // 定义一个状态变量，用于判断当前是“执行”状态还是“复原”状态
        var isApplied = false;

        // 定义一个函数来应用样式 (注入CSS)
        function applyStyles() {
            // 确保styleElement只被添加一次
            if (!document.getElementById('smis-beautify-styles')) {
                document.head.appendChild(styleElement);
                console.log('Styles applied by injecting CSS.');
            }
            isApplied = true;
        }

        // 定义一个函数来复原样式 (移除CSS)
        function revertStyles() {
            var existingStyle = document.getElementById('smis-beautify-styles');
            if (existingStyle) {
                existingStyle.parentNode.removeChild(existingStyle);
                console.log('Styles reverted by removing injected CSS.');
            }
            isApplied = false;
        }

        // 遍历所有触发器元素，并为每个元素添加点击事件监听器
        triggerElements.forEach(function (element) {
            element.addEventListener('click', function () {
                if (!isApplied) {
                    applyStyles();
                } else {
                    revertStyles();
                }
            });
        });
    });
})();