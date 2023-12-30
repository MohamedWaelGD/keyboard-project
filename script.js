"use strict";
const selectedKeys = {
    Control: false,
    Shift: false,
};

const registeredKeys = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "0",
    "-",
    "=",
    "+",
    "_",
    "backspace",
    "q",
    "w",
    "e",
    "r",
    "t",
    "y",
    "u",
    "i",
    "o",
    "p",
    "[",
    "]",
    "{",
    "}",
    "\\",
    "|",
    "capslock",
    "a",
    "s",
    "d",
    "f",
    "g",
    "h",
    "j",
    "k",
    "l",
    ";",
    ":",
    "'",
    "\"",
    "z",
    "x",
    "c",
    "v",
    "b",
    "n",
    "m",
    "<",
    ",",
    ">",
    ".",
    "?",
    "/",
    "enter",
    "delete",
    " "
];

const soundFilePath = '/assets/click_sound.mp3';

(function () {
    toggleCapsLockIcons();
    addClickEventOnKeys();
    handleOnKeyDown();
    handleOnKeyUp();
})();

function addClickEventOnKeys() {
    document.querySelectorAll(".key").forEach((e) => {
        e.addEventListener("click", onClickKey);
    });
}

function handleOnKeyDown() {
    document.addEventListener("keydown", (e) => {
        e.preventDefault();
        const key = e.key;

        if (!key) return;

        selectedKeys[key] = true;
        handleKey(key);
        focusInTextArea();

        const element = getKeyElement(key);

        if (!element) return;
        element.classList.add("active");
    });
}

function handleOnKeyUp() {
    document.addEventListener("keyup", (e) => {
        const key = e.key;

        if (!key) return;

        selectedKeys[key] = false;
        const element = getKeyElement(key);

        if (!element) return;

        element.classList.remove("active");
    });
}

function onClickKey(element) {
    if (!element || !element.target) return;

    handleKey(element.target.dataset.key);
}

function handleKey(key) {
    const input = document.querySelector("textarea");
    if (key == undefined || key == null) return;
    if (!registeredKeys.includes(key.toLowerCase())) return;
    playSoundKeyClick();
    if (isSelected() && (key === "Delete" || key === "Backspace")) {
        input.value = "";
    } else if (isSelectAll(key)) {
        selectAll();
    } else if (key === "CapsLock") {
        toggleCapsLock();
    } else if (key === "Backspace") {
        input.value = input.value.slice(0, input.value.length - 1);
    } else if (key === "Enter") {
        input.value += "\n";
    } else {
        input.value += key;
    }
}

function toggleCapsLock() {
    const capsInput = document.querySelector("#capslock-inp");

    if (!capsInput) return;

    capsInput.value = getCapsLockValue() ? "off" : "on";
    toggleCapsKeysFormat();
    toggleCapsLockIcons();
}

function toggleCapsKeysFormat() {
    const isCaps = getCapsLockValue();
    const keys = document.querySelectorAll(`.key:not(.not-editable)`);

    keys.forEach((e) => {
        e.textContent = isCaps
            ? e.textContent.toUpperCase()
            : e.textContent.toLowerCase();
        e.dataset.key = isCaps
            ? e.dataset.key.toUpperCase()
            : e.dataset.key.toLowerCase();
    });
}

function toggleCapsLockIcons() {
    const capsBtn = document.querySelector(`.key[data-key="CapsLock"]`);

    if (!capsBtn) return;

    const isCaps = getCapsLockValue();
    const capsLockIcon = capsBtn.querySelector(".fa-lock");
    const capsUnLockIcon = capsBtn.querySelector(".fa-lock-open");

    if (isCaps) {
        capsLockIcon.classList.remove("d-none");
        capsUnLockIcon.classList.add("d-none");
    } else {
        capsUnLockIcon.classList.remove("d-none");
        capsLockIcon.classList.add("d-none");
    }
}

function getCapsLockValue() {
    const capsInput = document.querySelector("#capslock-inp");

    if (!capsInput) return;
    return capsInput.value === "on";
}

function convertCapsLockKeys() {
    document.querySelectorAll(".key").forEach((e) => { });
}

function getKeyElement(key) {
    return document.querySelector(`.keyboard-container [data-key="${key}"]`);
}

function isSelectAll(key) {
    return selectedKeys.Control && key.toLowerCase() === "a";
}

function selectAll() {
    const input = document.querySelector("textarea");
    input.select();
}

function isSelected() {
    const input = document.querySelector("textarea");

    const selectionStart = input.selectionStart;
    const selectionEnd = input.selectionEnd;

    return (
        selectionStart !== null &&
        selectionEnd !== null &&
        selectionStart !== selectionEnd
    );
}

function focusInTextArea() {
    const input = document.querySelector("textarea");
    input.scrollTop = input.scrollHeight;
}

function playSoundKeyClick() {

    const audio = new Audio(soundFilePath);
    audio.volume = 0.2 + Math.random() * .6;
    audio.playbackRate = 0.6 + Math.random() * .8;
    audio.play();
}