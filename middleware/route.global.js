export default defineNuxtRouteMiddleware((to, from, kek) => {
  // isAuthenticated() is an example method verifying if a user is authenticated
  console.log('MIDDLEWARE', to)

  if (to.matched.length === 0) {
    return navigateTo('/')
  }
})
