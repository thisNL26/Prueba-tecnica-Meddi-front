export const useTaskChecked = () => {
    const isChecked = ref(false);

    const setChecked = () => {
        isChecked.value = !isChecked.value;
    };

    return { isChecked, setChecked };
};