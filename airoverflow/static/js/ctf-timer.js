// Most of this code is open source:
// For nixie clock:
// https://github.com/qwerji/nixie-clock

const days = document.querySelector('.days');
const hours = document.querySelector('.hours');
const mins = document.querySelector('.mins');
const secs = document.querySelector('.secs');

function getTime() {
    function prependZero(n) {
        return n <= 0 ? `0${n}` : `${n}`;
    }
    // Check if `ctf_start` date has passed, then set date to `ctf_end`
    var now = new Date();
    var stDate = new Date("{{ ctf_start }}").getTime();
    date = (stDate - now <= 0) ? "{{ ctf_end }}" : "{{ ctf_start }}";
    console.log(date);

    var countDownDate = new Date(date).getTime();
    var distance = countDownDate - now;
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    return {
        days: prependZero(days),
        hours: prependZero(hours),
        mins: prependZero(minutes),
        secs: prependZero(seconds)
    }
}

function setDigits(section, digit) {
    const tens = [...section.children[0].children];
    const ones = [...section.children[1].children];
    tens.forEach(number => number.classList.remove('active'))
    tens[digit[0]].classList.add('active')
    ones.forEach(number => number.classList.remove('active'))
    ones[digit[1]].classList.add('active')
}

function tick() {
    const time = getTime();
    setDigits(days, time.days);
    setDigits(hours, time.hours);
    setDigits(mins, time.mins);
    setDigits(secs, time.secs);
}
tick();
setInterval(tick, 1000);