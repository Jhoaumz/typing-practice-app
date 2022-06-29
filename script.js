import RandomWords from './randomWords.js'

let firstWord = document.getElementById('01')
let secondWord = document.getElementById('02')
let writeWord = document.querySelector('input')
let button = document.getElementById('countwpm')
let timeCount = document.getElementById('time')
let wpm = document.getElementById('wpm')

console.log(wpm.children[0])

let firstRandomWord
let secondRandomWord
let countwpm
let time = 0
let wordsPerMinute = 0
let canCount = false

button.onclick = e => {
    countwpm = true
}


function countTime() {
    if (countwpm) {
        if (time === 0 && time <= 59) {
            canCount = true
            let interval = setInterval(() => {
                if (time <= 59) {
                    time++
                }
                if (time < 10) {
                    timeCount.children[1].innerHTML = `0${time}`
                    timeCount.children[0].innerHTML = '00'
                } else if (time >= 10 && time < 60) {
                    timeCount.children[1].innerHTML = time
                } else if (time == 60) {
                    timeCount.children[0].innerHTML = '1'
                    timeCount.children[1].innerHTML = '00'
                    canCount = false
                    wpm.children[0].innerHTML = wordsPerMinute
                    wpm.classList.add('showwpm')
                    setTimeout(() => {
                        wpm.classList.remove('showwpm')
                    }, 200);
                    clearInterval(interval)
                    time = 0
                    wordsPerMinute = 0
                }
            }, 1000);
        }
    }
    countwpm = false
}

writeWord.onkeydown = e => {
    setTimeout(() => {
        let word = e.target.value.split('')
        let wordf = firstRandomWord.split('')
        let result = []
        let boolean
        word.forEach((e, i) => {
            if (word[i] === wordf[i]) {
                result.push(true)
            } else if (word[i] != wordf[i]) {
                result.push(false)
            }
        });

        if (result.includes(false)) {
            boolean = false
        } else if (!result.includes(false)) {
            boolean = true
        }
        if (boolean) {
            beautify(word, wordf)
        } else if (!boolean) {
            beautify(word, wordf, true)
        }
    }, 1);
}

writeWord.onkeypress = e => {
    if (e.key === ' ' || e.key === 'Spacebar' || e.key === 'Enter') {
        if (firstRandomWord === writeWord.value) {
            setTimeout(() => {
                firstRandomWord = secondRandomWord
                firstWord.innerHTML = turnInIntercaletedString(firstRandomWord)
                secondRandomWord = RandomWords(1)[0]
                secondWord.innerHTML = turnInIntercaletedString(secondRandomWord)
                writeWord.value = ''
                if (canCount) {
                    wordsPerMinute++
                }
            }, 1);
        }
        if (firstRandomWord != writeWord.value) {
            document.getElementById('01').classList.add('warning')
            let pastWord = writeWord.value
            setTimeout(() => {
                writeWord.value = pastWord
            }, 1);
            setTimeout(() => {
                document.getElementById('01').classList.remove('warning')
            }, 200);
        }
    }
    if (countwpm) {
        countTime()
    }
}


function beautify(word, wordf, ugly) {
    if (!ugly) {
        wordf.forEach((e, i) => {
            if (word[i] != undefined) {
                document.getElementById(`${i}`).classList.add('beaultify')
            }
            if (word[i] === undefined) {
                document.getElementById(`${i}`).classList.remove('beaultify')
            }
        })
    }
    if (ugly) {
        wordf.forEach((e, i) => {
            document.getElementById(`${i}`).classList.remove('beaultify')
        })
    }
}

function turnInIntercaletedString(word) {
    let arr = word.split('').map((e, i) => `<i id=${i}>${e}</i>`).join('');
    return arr
}

function addWords() {
    firstWord.innerHTML = turnInIntercaletedString(firstRandomWord)
    secondWord.innerHTML = turnInIntercaletedString(secondRandomWord)
}


function randomWordOrder(order) {
    if (order === 1) {
        firstRandomWord = RandomWords(1)[0]
    } else if (order === 2) {
        secondRandomWord = RandomWords(1)[0]
    }
}

function main() {
    randomWordOrder(1)
    randomWordOrder(2)
    addWords()
}

main()