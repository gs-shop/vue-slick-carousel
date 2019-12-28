describe('APIs', () => {
  describe('prev', () => {
    it('should move the slide right', () => {
      cy.visit('/#/example/multiple')
      cy.window().then(window => window.carousel.prev())
      cy.get('[data-index="8"]').should('be.visible')
    })
  })
  describe('next', () => {
    it('should move the slide left', () => {
      cy.visit('/#/example/multiple')
      cy.window().then(window => window.carousel.next())
      cy.get('[data-index="3"]').should('be.visible')
    })
  })
  describe('goTo', () => {
    it('should move the given slide to current', () => {
      cy.visit('/#/example/multiple')
      cy.window().then(window => window.carousel.goTo(3))
      cy.get('[data-index="3"]').should('be.visible')
    })
  })
})
