// ==UserScript==
// @name         挂刀页面美化-PC
// @namespace    https://github.com/vicoho/Steam-Market-Calculator
// @version      0.10
// @description  优化 smis.club 电脑端挂刀页面的显示效果
// @author       vicoho
// @run-at       document-end
// @match        https://smis.club/exchange*
// @grant        none
// ==/UserScript==


(function() {
    'use strict';

    const VOLUME_THRESHOLD = 30; // 日成交量阈值（紫色）
    const HIGH_VOLUME_THRESHOLD = 80; // 高成交量阈值（红色）
    const PURPLE_COLOR = '#974ae8'; // 紫色
    const RED_COLOR = '#ff0303'; // 红色

    // 创建样式元素
    const style = document.createElement('style');
    style.textContent = `
        .purple-bold {
            color: ${PURPLE_COLOR} !important;
            font-weight: bold !important;
        }
        .red-bold {
            color: ${RED_COLOR} !important;
            font-weight: bold !important;
        }
    `;
    document.head.appendChild(style);

    // 处理表格单元格的高亮显示
    function highlightCells() {
        const rows = document.querySelectorAll('.el-table__body tr.el-table__row');
        rows.forEach(row => {
            const cell4 = row.querySelector('.el-table_1_column_4');
            const cell6 = row.querySelector('.el-table_1_column_6');
            if (cell4 && cell6) {
                const value = parseFloat(cell4.textContent.trim());
                if (!isNaN(value)) {
                    // 移除旧的高亮类
                    cell6.classList.remove('purple-bold', 'red-bold');
                    // 应用新的高亮类仅到 cell6
                    if (value >= HIGH_VOLUME_THRESHOLD) {
                        cell6.classList.add('red-bold');
                    } else if (value >= VOLUME_THRESHOLD) {
                        cell6.classList.add('purple-bold');
                    }
                }
            }
        });
    }

    // 更新表格样式
    function updateTable() {
        highlightCells();
    }

    // 使用 MutationObserver 监控 DOM 变化
    const observer = new MutationObserver(() => {
        updateTable();
    });

    // 开始观察 DOM 变化
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });

    // 初次运行
    updateTable();
})();
