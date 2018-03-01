    "use strict";

    /**
     * 1. Написать функцию, преобразующую число в объект. Передавая на вход число в диапазоне [0, 999],
     * мы должны получить на выходе объект, в котором в соответствующих свойствах описаны разряды числа:
     *  - единицы (в свойстве firstDigit)
     *  - десятки (в свойстве secondDigit)
     *  - сотни (в свойстве thirdDigit)
     * Например, для числа 45 мы должны получить следующий объект:
     * 
     * ```
     * {
     *   'firstDigit': 5,
     *   'secondDigit': 4,
     *   'thirdDigit': 0,
     * }
     * ```
     * Обьект случайное целое число.
     */
    const randomInteger = {
      /**
       * Возвращает случайное целое число в диапазоне.
       * @param {int} min Нижняя граница диапазона чисел.
       * @param {int} max Верхняя граница диапазона чисел.
       */
      getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
      },
    };

    /**
     * Объект числа, здесь будут храниться единицы, десятки и сотни.
     * @property {int} 'firstDigit' Единицы.
     * @property {int} 'secondDigit' Десятки.
     * @property {int} 'thirstDigit' Сотни.
     */
    const objectNumber = {
      'firstDigit': null,
      'secondDigit': null,
      'thirstDigit': null,
    }; 

    /**
     * Объект ошибки, здесь будут храниться записи об ошибке.
     */
    const error = {
      errorMessage: null,

      /**
       * Если введенные данные (число) не того типа.
       */
      errorType() {
        this.errorMessage = 'введенные данные не являются числом';
      },

      /**
       * Если введенное число не попадает в диапазон.
       */
      errorNumberRange() {
        this.errorMessage = 'выбранное число не попадает в диапазон';
      },
    };

    /**
     * Объект проверки числа, здесь данные будут проверятся, являются ли они 
     * числом и попадает ли число в диапазон.
     * @property {number} data Проверяемые данные.
     * @property {int} startRange Верхняя граница диапазона.
     * @property {int} finishRange Нижняя граница диапазона.
     * @property {error} error Обьект ошибки.
     */
    const checkIntegerInRange = {
      data: null,
      startRange: null,
      finishRange: null,
      error,

      /**
       * Задает свойства обьекта - верхнюю и нижнюю границу диапазона.
       * @param {int} min Нижняя граница диапазона чисел.
       * @param {int} max Верхняя граница диапазона чисел.
       */
      createRange(min, max) {
        this.startRange = min; 
        this.finishRange = max;
      },

      /**
       * Проверка являются ли данные строкой.
       */
      isString() {
        const type = typeof this.data;
        if (type === 'string') {
          return true;
        };
        return false; 
      },

      /**
       * Проверка являются ли данные числом.
       */
      isNumber() {
        const type = typeof this.data;
        if (type === 'number') {
          return true;
        };
        return false;
      },

      /**
       * Проверка являются ли данные целым числом.
       */
      isInteger() {
        return (this.data ^ 0) === this.data;
      },

      /**
       * Проверка поподают ли данные (число) в диапазон.
       */
      isRange() {
        if (this.data >= this.startRange && this.data <= this.finishRange) {
          return true;
        };
        return false; 
      },

      /**
       * Проверка данных, являются ли они числом и попадает ли число 
       * в диапазон, если нет, то изменяется обьект ошибки.
       * @param {number} num Проверяемые данные.
       * @param {int} min Нижняя граница диапазона чисел.
       * @param {int} max Верхняя граница диапазона чисел.
       */
      check(num, min, max) {
        this.data = num;
        this.createRange(min, max); 
        if (this.isString()) {
          this.error.errorType();
          return false; 
        };
        if (!this.isNumber()) {
          this.error.errorType();
          return false; 
        };
        if (!this.isInteger()) {
          this.error.errorType();
          return false; 
        };
        if (!this.isRange()) {
          this.error.errorNumberRange();
          return false; 
        };
        return true; 
      }, 
    }; 

    /**
     * Объект разделения числа на сотни, десятки и единицы.
     * @property {objectNumber} objectNumber Обьект числа.
     * @property {checkIntegerInRange} checkIntegerInRange Обьект проверки числа.
     */
    const describeNumber = {
      objectNumber,
      checkIntegerInRange, 

      /**
       * Функция осуществляет проверку, и разделяет число 
       * на сотни, десятки и единицы.
       * @param {int} min Нижняя граница диапазона чисел.
       * @param {int} max Верхняя граница диапазона чисел.
       */
      divideNumber(num, min, max) {
        const check = this.checkIntegerInRange.check(num, min, max);
        if (check) {
          this.objectNumber.firstDigit = num % 10 / 1;
          this.objectNumber.secondDigit = (num % 100 - num % 10) / 10;
          this.objectNumber.thirstDigit = (num % 1000 - num % 100) / 100;
          return this.objectNumber;
        } else {
          return this.checkIntegerInRange.error.errorMessage;
        };
      },
    };
    
    // вводим число x
    const x = randomInteger.getRandomInt(0, 999); 
    // let x = parseInt(prompt('Введите число, '));

    // выводим обьект числа, разделенного на разряды
    console.log(describeNumber.divideNumber(x, 0, 999)); 