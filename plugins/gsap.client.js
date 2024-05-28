import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import { Observer } from 'gsap/Observer'
import { TextPlugin } from 'gsap/TextPlugin'
// import Lenis from 'lenis'

export default defineNuxtPlugin((nuxtApp) => {
  let lenis

  if (process.client) {
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, Observer, TextPlugin)

    // lenis = new Lenis({
    //   // duration: 1
    // })
    // lenis.on('scroll', ScrollTrigger.update)
    // gsap.ticker.add((time) => {
    //   lenis.raf(time * 1000)
    // })
    // gsap.ticker.lagSmoothing(0)
  }

  return {
    provide: {
      gsap,
      ScrollTrigger,
      ScrollToPlugin,
      Observer,
      lenis
    }
  }
})
