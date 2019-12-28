describe('APIs', () => {
  describe('prev', () => {
    it('should move the slide right', () => {
      cy.visit('/#/example/multiple')
      cy.window().then(window => window.carousel.prev())
      cy.get('[data-index="8"]').should('be.visible')
    })
  })
})
