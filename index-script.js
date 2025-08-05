function adjustValue(targetId, delta) {
    const input = document.getElementById(targetId);
    let value = parseFloat(input.value) || 0;
    value = Math.max(0, value + delta);
    input.value = value.toFixed(2);
    calculate();
}

function resetValue(targetId) {
    const input = document.getElementById(targetId);
    input.value = '';
    calculate();
    input.focus();
}

function calculate() {
    const a = parseFloat(document.getElementById('inputA').value) || 0;
    const b = parseFloat(document.getElementById('inputB').value) || 0;
    const xValue = b / 1.15;
    const cValue = xValue === 0 ? ' -' : a / xValue;
    document.getElementById('resultC').value = isNaN(cValue) ? ' -' : cValue.toFixed(4);
    document.getElementById('resultX').value = isNaN(xValue) ? ' -' : xValue.toFixed(4);
    
    const e = parseFloat(document.getElementById('inputE').value) || 0;
    const fValue = e === 0 ? ' -' : a / e;
    document.getElementById('resultF').value = isNaN(fValue) ? ' -' : fValue.toFixed(4);
}

function preventNegative(e) {
    if (['-', 'e', 'E'].includes(e.key)) {
        e.preventDefault();
        return false;
    }
    if (e.key === '.') {
        const input = e.target;
        if (input.value.includes('.')) {
            e.preventDefault();
            return false;
        }
    }
    return true;
}

document.querySelectorAll('input[type="number"]').forEach(input => {
    input.addEventListener('input', calculate);
    if (['inputA', 'inputB', 'inputE'].includes(input.id)) {
        input.addEventListener('click', function() {
            this.select();
        });
    }
    input.addEventListener('keydown', preventNegative);
});

document.querySelector('.container').addEventListener('click', (e) => {
    const button = e.target.closest('.btn');
    if (!button) return;
    const parentWrapper = button.closest('.input-wrapper');
    if (!parentWrapper) return;
    const input = parentWrapper.querySelector('input');
    if (button.classList.contains('btn-reset')) {
        resetValue(input.id);
    } else if(button.hasAttribute('data-delta')) {
        const delta = parseFloat(button.getAttribute('data-delta'));
        adjustValue(input.id, delta);
    }
});

calculate();
setTimeout(() => {
    const inputA = document.getElementById('inputA');
    if (inputA) {
        inputA.focus();
        inputA.select();
    }
}, 10);