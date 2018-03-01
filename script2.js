    "use strict";

    /**
     * 2. Для игры, реализованной на уроке (бродилка), добавить возможность ходить 
     * по диагонали цифрами 1, 3, 7, 9.
     * Также необходимо сделать так, чтобы пользователь не мог совершить шаг в стенку, 
     * т.е. при направлении в стенку игрок оставался на том же месте где стоял.
     * Объект с настройками игры.
     * @property {int} rowsCount Количество строк в карте.
     * @property {int} colsCount Количество колонок в карте.
     * @property {int} startPositionX Начальная позиция игрока по X координате.
     * @property {int} startPositionY Начальная позиция игрока по Y координате.
     */
    const settings = {
      rowsCount: 10,
      colsCount: 10,
      startPositionX: 0,
      startPositionY: 0,
    };

    /**
     * Объект игрока, здесь будут все методы и свойства связанные с ним.
     * @property {int} x Позиция по X-координате.
     * @property {int} y Позиция по Y-координате.
     * @property {settings} settings Настройки игры.
     */
    const player = {
      x: null,
      y: null,
      settings,

      /**
       * Инициализация игрока и его метоположения.
       */
      init(startX, startY) {
        this.x = startX;
        this.y = startY;
      },

      /**
       * Проверяет, не упрется ли игрок в стенку.
       * @param {int} x X-координата игрока после шага вперед.
       * @param {int} y Y-координата игрока после шага вперед.
       */
      toWall(x, y) {
        if (x > (this.settings.colsCount - 1) || x < this.settings.startPositionX) {
          return false;
        };
        if (y > (this.settings.rowsCount - 1) || y < this.settings.startPositionY) {
          return false;
        };
        return true;
      },

      /**
       * Двигает игрока по переданному направлению.
       * @param {int} direction Направление, в котором будет движение.
       */
      move(direction) {
        let x = this.x;
        let y = this.y;

        // Определяем направление и обновляем местоположение игрока в зависимости от направления.
        switch (direction) {
          case 2:
            this.toWall(x, ++y) && (this.y++);
            break;
          case 4:
            this.toWall(--x, y) && (this.x--);
            break;
          case 6:
            this.toWall(++x, y) && (this.x++);
            break;
          case 8:
            this.toWall(x, --y) && (this.y--);
            break;
          // добавлено перемещение по диагонали
          case 1:
            this.toWall(--x, ++y) && (this.y++, this.x--);
            break;
          case 3:
            this.toWall(++x, ++y) && (this.y++, this.x++);
            break;
          case 7:
            this.toWall(--x, --y) && (this.y--, this.x--);
            break;
          case 9:
            this.toWall(++x, --y) && (this.y--, this.x++);
            break;
        }
      },
    };

    /**
     * Объект игры, здесь будут все методы и свойства связанные с самой игрой в общем.
     * @property {player} player Игрок, участвующий в игре.
     */
    const game = {
      player,

      /**
       * Запускает игру.
       */
      run() {
        this.player.init(this.player.settings.startPositionX, this.player.settings.startPositionY);
        // Бесконечный цикл
        while (true) {
          // Отображаем нашу игру.
          this.render();

          // Получаем направление от игрока.
          const direction = this.getDirection();

          // Если игрок сказал что хочет выйти (набрал -1), значит выходим.
          if (direction === -1) {
            alert('До свидания.');
            return;
          }

          // Двигаем игрока.
          this.player.move(direction);
        }
      },

      /**
       * Отображает игру в консоли.
       */
      render() {
        // Сюда запишем все что надо отобразить.
        let map = "";

        // Цикл перебирает все строки, которые надо отобразить.
        for (let row = 0; row < this.player.settings.rowsCount; row++) {
          // В каждой строке отображаем для каждой колонки (x - клетка, o - игрок).
          for (let col = 0; col < this.player.settings.colsCount; col++) {
            // Проверяем, если на данной позиции должен быть и игрок, отображаем игрока, если нет - клетку.
            if (this.player.y === row && this.player.x === col) {
              map += 'o ';
            } else {
              map += 'x ';
            }
          }
          // После того как отобразили всю строку делаем переход на следующую строку.
          map += '\n';
        }

        // Чистим консоль.
        console.clear();
        // Выводим все что надо отобразить в игре.
        console.log(map);
      },

      /**
       * Получает и отдает направление от пользователя.
       * @returns {int} Возвращаем направление, введенное пользователем.
       */
      getDirection() {
        // Доступные значения ввода.
        const availableDirections = [-1, 2, 4, 6, 8, 1, 3, 7, 9];

        while (true) {
          // Получаем от пользователя направление.
          let direction = parseInt(prompt('Введите число, куда вы хотите переместиться, -1 для выхода.'));

          // Если направление не одно из доступных, то сообщаем что надо ввести корректные данные
          // и начинаем новую итерацию.
          if (!availableDirections.includes(direction)) {
            alert(`Для перемещения необходимо ввести одно из чисел: ${availableDirections.join(', ')}.`);
            continue;
          }

          // Если пользователь ввел корректное значение - отдаем его.
          return direction;
        }
      },
    };

    // Запускаем игру.
    game.run();