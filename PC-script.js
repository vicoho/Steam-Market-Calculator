// ==UserScript==
// @name         挂刀页面美化-PC
// @namespace    https://github.com/vicoho/Steam-Market-Calculator
// @version      0.02
// @description  优化 smis.club 电脑端挂刀页面的显示效果，通过注入 CSS 实现，并根据日成交量高亮显示
// @author       vicoho
// @run-at       document-end
// @match        https://smis.club/exchange*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const VOLUME_THRESHOLD = 30; // 日成交量阈值（紫色）
    const HIGH_VOLUME_THRESHOLD = 80; // 高成交量阈值（红色）

    // 创建样式元素
    const style = document.createElement('style');
    style.textContent = `
        .el-table_1_column_6 {
            font-weight: bold !important;
        }
        .purple-bold {
            color: #974ae8 !important;
            font-weight: bold !important;
        }
        .red-bold {
            color: #a01c1c !important;
            font-weight: bold !important;
        }
    `;
    document.head.appendChild(style);

    // 处理表格单元格的高亮显示
    function highlightCells() {
        const cells = document.querySelectorAll('.el-table_1_column_4');
        cells.forEach(cell => {
            const value = parseFloat(cell.textContent.trim());
            if (!isNaN(value)) {
                if (value > HIGH_VOLUME_THRESHOLD) {
                    cell.classList.add('red-bold');
                } else if (value > VOLUME_THRESHOLD) {
                    cell.classList.add('purple-bold');
                }
            }
        });
    }

    // 使用 MutationObserver 监控 DOM 变化
    const observer = new MutationObserver(() => {
        highlightCells();
    });

    // 开始观察 DOM 变化
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });

    // 初次运行
    highlightCells();
})();
