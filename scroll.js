class TScrollApp {
  constructor(init_n = -1, total_n = 100, win_n = 20, load_n = 5) {
    this.item_size = 100

    this.init_n   = init_n   // Количество начальных элементов (< 0 - всё окно)
    this.total_n  = total_n  // Общее количество элементов
    this.window_n = win_n    // Размер окна (максимальное количество элементов
                             //              на странице в данный момент)
    this.load_n   = load_n   // Количество подгружаемых элементов

    this.first_id = 0
    this.last_id  = 0
    this.lastScrollTop = 0

    if (init_n < 0) {
      while (!this.is_full()) this.put()
    } else {
      for (let i=0; i<this.init_n; i++) this.put()
    }

    window.on('scroll', (event) => {
      let top = window.pageYOffset;
      //console.log(WindowY(), WindowH() - WindowY().bottom)

      if (this.lastScrollTop > top) {
        if (WindowY().top < this.item_size) {
          //this.put(true)
          this.up()
        }
      } else {
        if (WindowH() - WindowY().bottom < this.item_size) {
          //this.put()
          this.down()
        }
      }

      this.lastScrollTop = top
    })
  }

  up() {
    let n = this.first_id - this.load_n > 0?
            this.load_n:
            this.first_id
    this.put(true, n)
  }

  down() {
    let n = this.last_id + this.load_n < this.total_n?
            this.load_n:
            this.total_n - this.last_id
    this.put(false, n)
  }

  put(pervious = false, n = 1) {
    //console.log("put " + pervious + " " + n)
    for (let i = 0; i < n; i++) {
      if (pervious) {
        if (this.first_id <= 0) return;
        let card_id = --this.first_id
        let item = Element('div', "card", 'card-' + card_id, card_id)
        $$('#Content').prepend(item)
      } else {
        if (this.last_id >= this.total_n) return;
        let card_id = this.last_id++
        let item = Element('div', "card", 'card-' + card_id, card_id)
        $$('#Content').append(item)
      }
    }
    while (this.is_overflow()) {
      this.remove(!pervious)
    }
  }

  remove(pervious = false) {
    //console.log("remove " + pervious)
    let card
    if (pervious) {
      card = $$('#card-' + this.first_id++)
    } else {
      card = $$('#card-' + --this.last_id)
    }
    card.remove()
  }

  is_full() {
    return Math.abs(this.last_id-this.first_id) == this.window_n
  }
  is_overflow() {
    return Math.abs(this.last_id-this.first_id) > this.window_n
  }
}

ScrollApp = new TScrollApp(1)
