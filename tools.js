function $(selector = null) {
  return (selector === null) ?document: document.querySelectorAll(selector)
}

function $$(selector) {
  return document.querySelector(selector)
}

EventTarget.prototype.on = EventTarget.prototype.addEventListener

function Element(tag, class_name="", id="", text="") {
  let item = document.createElement(tag)
  item.className = class_name
  item.id = id
  item.textContent = text
  return item
}

function WindowY() {
  y = window.pageYOffset
  return {
    "top": y,
    "bottom": y + window.innerHeight
  }
}

function WindowH() {
  return $().documentElement.scrollHeight
}