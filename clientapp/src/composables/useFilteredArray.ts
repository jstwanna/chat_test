export const useFilteredArray = <T, K extends keyof T>(
  array: Ref<T[]>,
  searchQuery: Ref<string>,
  filterField: K
) => {
  const isNotEmpty = computed(() => array.value.length > 0);

  const filteredArray = computed(() => {
    const query = searchQuery.value.toLowerCase();

    if (!query) {
      return array.value;
    }

    return array.value.filter((item) => {
      const value = item[filterField];
      return typeof value === 'string' && value.toLowerCase().includes(query);
    });
  });

  const isFilteredArrayNotEmpty = computed(
    () => filteredArray.value.length > 0
  );

  return { isNotEmpty, filteredArray, isFilteredArrayNotEmpty };
};
