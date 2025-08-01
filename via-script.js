// ==UserScript==
// @name         挂刀页面美化
// @namespace    https://github.com/vicoho/Steam-Market-Calculator
// @version      0.36
// @description  优化smis.club挂刀页面的显示效果
// @author       vicoho
// @run-at       document-end
// @match        https://smis.club/exchange
// @grant        none
// ==/UserScript==

(function () {
    // 页面加载完成后执行
    window.addEventListener('load', function () {
        // --- 点击切换逻辑 ---
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

        // --- 立即移除 min-width 逻辑（不依赖点击，不还原） ---
        var exchangeTableDetail = document.querySelector('.exchange-table-detail');
        if (exchangeTableDetail) {
            exchangeTableDetail.style.removeProperty('min-width');
        }
    });
})();