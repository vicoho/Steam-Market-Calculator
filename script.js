// 数值调整函数
function adjustValue(targetId, delta) {
    const input = document.getElementById(targetId);
    let value = parseFloat(input.value) || 0;
    value = Math.max(0, value + delta);
    input.value = value.toFixed(2);
    calculate();
}

// 重置函数
function resetValue(targetId) {
    const input = document.getElementById(targetId);
    input.value = ''; // 清空输入框内容
    calculate(); // 重新计算结果
    input.focus(); // 重置后自动聚焦到当前输入框
}

// 计算函数
function calculate() {
    // 第一列计算
    const a = parseFloat(document.getElementById('inputA').value) || 0;
    const b = parseFloat(document.getElementById('inputB').value) || 0;
    const xValue = b / 1.15;
    const cValue = xValue === 0 ? ' -' : a / xValue;
    document.getElementById('resultC').value = isNaN(cValue) ? ' -' : cValue.toFixed(4);
    document.getElementById('resultX').value = isNaN(xValue) ? ' -' : xValue.toFixed(4);
    
    // 第二列计算
    const e = parseFloat(document.getElementById('inputE').value) || 0;
    const fValue = e === 0 ? ' -' : a / e;
    document.getElementById('resultF').value = isNaN(fValue) ? ' -' : fValue.toFixed(4);
}

// 阻止键盘输入负号等无效字符
function preventNegative(e) {
    if (e.key === '-' || e.key === 'e' || e.key === 'E') {
        e.preventDefault();
        return false;
    }
    return true;
}

// 为所有输入框添加通用监听
document.querySelectorAll('input[type="number"]').forEach(input => {
    // 实时输入时重新计算
    input.addEventListener('input', calculate);

    // 点击时全选内容 (仅限指定输入框)
    if (['inputA', 'inputB', 'inputE'].includes(input.id)) {
        input.addEventListener('click', function() {
            this.select();
        });
    }

    // 阻止输入负号
    input.addEventListener('keydown', preventNegative);
});

// **【推荐】使用事件委托处理所有按钮点击**
document.querySelector('.container').addEventListener('click', (e) => {
    const button = e.target.closest('.btn'); // 确保点击的是按钮或按钮内的元素
    if (!button) return; // 如果没点到按钮，则不做任何事

    const parentWrapper = button.closest('.input-wrapper');
    if (!parentWrapper) return;

    const input = parentWrapper.querySelector('input');

    if (button.classList.contains('btn-reset')) {
        // 如果是重置按钮
        resetValue(input.id);
    } else if(button.hasAttribute('data-delta')) {
        // 如果是 +/- 按钮
        const delta = parseFloat(button.getAttribute('data-delta'));
        adjustValue(input.id, delta);
    }
});

// -------------------初始化-------------------
// 页面加载后立即执行一次计算
calculate();