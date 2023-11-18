let input = document.getElementById('input');
let buttons = document.querySelectorAll('button');
let str = "";

let arr = Array.from(buttons);
arr.forEach(button => {
    button.addEventListener('click', (e) => {
        if (e.target.innerHTML == '=') {
            str = eval(str);


        }
        else if (e.target.innerHTML == 'AC') {
            str = "";

        } else if (e.target.innerHTML == 'DEL') {
            str = str.substring(0, str.length - 1);

        } else {
            str += e.target.innerHTML;
        }
        input.value = str;
    });
});

