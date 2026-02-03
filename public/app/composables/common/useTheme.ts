export type Theme = 'blue-futuristic' | 'notebook'

export default function useTheme() {
  const currentTheme = ref<Theme>('blue-futuristic')

  function setTheme(theme: Theme) {
    document.documentElement.setAttribute('data-theme', theme)
    currentTheme.value = theme
  }

  return {
    currentTheme : computed(() => currentTheme.value),
    setTheme,
  }
}
