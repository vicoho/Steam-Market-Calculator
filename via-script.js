// ==UserScript==
// @name         挂刀页面美化
// @namespace    https://github.com/vicoho/Steam-Market-Calculator
// @version      0.41
// @description  优化smis.club挂刀页面的显示效果
// @author       vicoho
// @run-at       document-end
// @match        https://smis.club/exchange
// @grant        none
// ==/UserScript==

(function () {
    // 页面加载完成后执行
    window.addEventListener('load', function () {
        // --- 直接修改样式：min-width: auto !important; ---
        var exchangeTableDetail = document.querySelector('.exchange-table-detail');
        if (exchangeTableDetail) {
            exchangeTableDetail.style.setProperty('min-width', 'auto', 'important');
        }

        // --- 媒体查询逻辑 ---
        // 定义媒体查询
        var mediaQuery = window.matchMedia('(max-width: 1000px)');

        // 定义应用媒体查询样式和复原样式的函数
        function applyMediaQueryStyles() {
            if (exchangeTableDetail) {
                // 在 max-width: 1000px 时，将 min-width 设置为 auto
                exchangeTableDetail.style.setProperty('min-width', 'auto', 'important');
                // 你可以在这里添加其他在小屏幕下需要修改的样式
                // 例如：
                // exchangeTableDetail.style.setProperty('width', '100%', 'important');
            }
        }

        function revertMediaQueryStyles() {
            if (exchangeTableDetail) {
                // 移除 min-width 属性，恢复到 CSS 中定义的默认值或之前的样式
                exchangeTableDetail.style.removeProperty('min-width');
                // 移除其他你可能在 applyMediaQueryStyles 中添加的样式
                // 例如：
                // exchangeTableDetail.style.removeProperty('width');
            }
        }

        // 初始检查媒体查询状态并应用样式
        if (mediaQuery.matches) {
            applyMediaQueryStyles();
        } else {
            revertMediaQueryStyles();
        }

        // 添加监听器，当媒体查询状态改变时执行
        mediaQuery.addListener(function (mq) {
            if (mq.matches) {
                applyMediaQueryStyles();
            } else {
                revertMediaQueryStyles();
            }
        });


        // --- 点击切换逻辑 (保持不变) ---
        var triggerElements = document.querySelectorAll('.header-top-image');
        var targetElement1 = document.querySelector('.exchange-header-bottom');
        var targetElement2 = document.querySelector('.commodity-exchange-header');
        var targetElement3 = document.querySelector('.el-header');
        var targetElement4 = document.querySelector('.el-main');
        var targetElement5 = document.querySelector('.header-top-left');
        var isApplied = false;

        function applyStyles() {
            if (targetElement1) {
                targetElement1.style.display = 'none';
            }
            if (targetElement2) {
                targetElement2.style.setProperty('height', '36px', 'important');
                targetElement2.style.setProperty('padding', '0 15px', 'important');
            }
            if (targetElement3) {
                targetElement3.style.display = 'none';
            }
            if (targetElement4) {
                targetElement4.style.setProperty('margin-top', '0', 'important');
            }
            if (targetElement5) {
                targetElement5.style.setProperty('margin-top', '7px', 'important');
            }
            isApplied = true;
        }

        function revertStyles() {
            if (targetElement1) {
                targetElement1.style.display = '';
            }
            if (targetElement2) {
                targetElement2.style.removeProperty('height');
                targetElement2.style.removeProperty('padding');
            }
            if (targetElement3) {
                targetElement3.style.display = '';
            }
            if (targetElement4) {
                targetElement4.style.removeProperty('margin-top');
            }
            if (targetElement5) {
                targetElement5.style.removeProperty('margin-top');
            }
            isApplied = false;
        }

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