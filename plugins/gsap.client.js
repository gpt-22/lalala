import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import { Observer } from 'gsap/Observer'
import { TextPlugin } from 'gsap/TextPlugin'

export default defineNuxtPlugin((nuxtApp) => {
  if (process.client) {
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, Observer, TextPlugin)
  }

  return {
    provide: {
      gsap,
      ScrollTrigger,
      ScrollToPlugin,
      Observer
    }
  }
})
