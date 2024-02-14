// /**
//  * Функция для фильтрации массива по заданному полю и поисковому запросу.
//  *
//  * @template T - тип элементов в массиве
//  * @template K - тип ключей элементов в массиве
//  * @param {Ref<T[]>} array - исходный массив для фильтрации
//  * @param {Ref<string>} searchQuery - поисковый запрос для фильтрации
//  * @param {K} filterField - поле объекта, по которому происходит фильтрация
//  * @returns {object} объект с тремя свойствами:
//  * - isNotEmpty: вычисляемое свойство, возвращающее true, если исходный массив не пуст
//  * - filteredArray: вычисляемое свойство, возвращающее отфильтрованный массив
//  * - isFilteredArrayNotEmpty: вычисляемое свойство, возвращающее true, если отфильтрованный массив не пуст
//  */
// export const useFilteredArray = <T, K extends keyof T>(
//   array: Ref<T[]>, // исходный массив для фильтрации
//   searchQuery: Ref<string>, // поисковый запрос для фильтрации
//   filterField: K // поле объекта, по которому происходит фильтрация
// ) => {
//   // вычисляемое свойство, возвращающее true, если исходный массив не пуст
//   const isNotEmpty = computed(() => array.value.length > 0);

//   // вычисляемое свойство, возвращающее отфильтрованный массив
//   const filteredArray = computed(() => {
//     const query = searchQuery.value.toLowerCase();

//     if (!query) {
//       return array.value;
//     }

//     return array.value.filter((item) => {
//       const value = item[filterField];
//       return typeof value === 'string' && value.toLowerCase().includes(query);
//     });
//   });

//   // вычисляемое свойство, возвращающее true, если отфильтрованный массив не пуст
//   const isFilteredArrayNotEmpty = computed(
//     () => filteredArray.value.length > 0
//   );

//   return { isNotEmpty, filteredArray, isFilteredArrayNotEmpty };
// };

/**
 *  Функция позволяет фильтровать по вложенным полям, указывая их через точку в filterField.
 *
 * @template T - тип элементов в массиве
 * @param {Ref<T[]>} array - исходный массив для фильтрации
 * @param {Ref<string>} searchQuery - поисковый запрос для фильтрации
 * @param {string} filterField - поле объекта, по которому происходит фильтрация
 * @returns {object} объект с тремя свойствами:
 * - isNotEmpty: вычисляемое свойство, возвращающее true, если исходный массив не пуст
 * - filteredArray: вычисляемое свойство, возвращающее отфильтрованный массив
 * - isFilteredArrayNotEmpty: вычисляемое свойство, возвращающее true, если отфильтрованный массив не пуст
 */
export const useFilteredArray = <T>(
  array: Ref<T[]>, // исходный массив для фильтрации
  searchQuery: Ref<string>, // поисковый запрос для фильтрации
  filterField: string // поле объекта, по которому происходит фильтрация
) => {
  // вычисляемое свойство, возвращающее true, если исходный массив не пуст
  const isNotEmpty = computed(() => array.value.length > 0);

  // вычисляемое свойство, возвращающее отфильтрованный массив
  const filteredArray = computed(() => {
    const query = searchQuery.value.toLowerCase();

    if (!query) {
      return array.value;
    }

    return array.value.filter((item) => {
      let value: any = item;
      // разбиваем filterField на отдельные поля
      const fields = filterField.split('.');
      for (let field of fields) {
        if (Array.isArray(value)) {
          // если текущее значение массив, проверяем все его элементы на совпадение с запросом
          const matches = value.map((v) =>
            v[field]?.toLowerCase().includes(query)
          );
          // если хотя бы один элемент массива совпадает с запросом, возвращаем true
          return matches.some(Boolean);
        }
        // переходим к следующему полю
        value = value[field];
      }
      // если значение не массив и это строка, проверяем ее на совпадение с запросом
      return typeof value === 'string' && value.toLowerCase().includes(query);
    });
  });

  // вычисляемое свойство, возвращающее true, если отфильтрованный массив не пуст
  const isFilteredArrayNotEmpty = computed(
    () => filteredArray.value.length > 0
  );

  return { isNotEmpty, filteredArray, isFilteredArrayNotEmpty };
};
