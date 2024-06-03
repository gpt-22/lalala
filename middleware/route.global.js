export default defineNuxtRouteMiddleware((to, from, kek) => {
  const { width } = useWindowSize()
  const { unavailableReason } = useShow()

  const isChrome = navigator.userAgent.indexOf('Chrome') !== -1
  const isFirefox = navigator.userAgent.indexOf('Firefox') !== -1

  if (!isChrome && !isFirefox) {
    unavailableReason.value = 'Браузер не поддерживается :('
    setPageLayout('inappropriate-device')
  }

  if (width.value < 1024 && to.name !== 'cinematic') {
    unavailableReason.value = 'Cайт доступен только на больших разрешениях экрана.'
    setPageLayout('inappropriate-device')
  }

  if (to.matched.length === 0) {
    console.log('navigateTo /')
    return navigateTo('/')
  }
})
