//  Привязать контекст объекта к функции logger, чтобы при вызове this.item выводило - some value
// (Привязать через bind, call, apply)

function logger() {
    console.log(`I output only external context: ${this.item}`);
  }
  const obj = { item: 'some value' };
  
  logger.call(obj);
  logger.apply(obj);
  const logger2 = logger.bind(obj);
  logger2();


  //////////////////////////////////
  
  // Требуется создать функцию createCache, которая возвращает объект для кэширования результатов выполнения других функций. Кэш должен хранить значения, которые были возвращены функцией при определенных входных параметрах.
  
  // Функция createCache должна иметь два метода:
  
  // cache(fn): принимает функцию fn и возвращает новую функцию, которая кэширует результаты выполнения fn. Если кэш уже содержит результат для данного набора входных параметров, то новая функция должна возвращать сохраненное значение, не вызывая fn.
  // clear(): очищает весь кэш.
  function multiplyByTwo(x) {
    return x * 2;
  }

  function createCache() {
    let cache = new Map();

    function cashe(func) {
        return function(x) {
            if (cache.has(x)) {
                console.log(`Выполнил: ${cache.get(x)} (значение взято из кэша)`);
                return cache.get(x);
              }
        
              let result = func(x); // иначе, вызываем функцию
              cache.set(x, result); // и кешируем (запоминаем) результат
              console.log(`Выполнил: ${cache.get(x)}`)    
              return result;
        }
        }
   function  clear() {
    cache = new Map();
   }
   return {
    cashe,
    clear
   }
  }

  var myCache = createCache();
  var cachedMultiplyByTwo = myCache.cashe(multiplyByTwo);
  
  console.log(cachedMultiplyByTwo(5)); // Вывод: Выполнил: 10
  console.log(cachedMultiplyByTwo(5)); // Вывод: Выполнил: 10 (значение взято из кэша)
  
  console.log(cachedMultiplyByTwo(3)); // Вывод: Выполнил: 6
  console.log(cachedMultiplyByTwo(3)); // Вывод: Выполнил: 6 (значение взято из кэша)
  
  myCache.clear(); // Вывод : Кэш отчищен
  
  console.log(cachedMultiplyByTwo(5)); // Вывод: Выполнил: 10
  
  //////////////////////////////////////////
  
  // Бонус
  // Реализовать полифил(собственную функцию реализующую встроенную в js) метода bind()
  
  // Код здесь
  Function.prototype.myBind = function (obj, ...args) {
    let func = this;
    return function (...newArgs) {
      func.apply(obj, [...args, ...newArgs]);
    };
  };
  //