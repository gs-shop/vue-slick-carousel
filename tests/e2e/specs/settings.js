describe('Settings', () => {
  describe('accessibility', () => {
    it('enables key navigation', () => {
      cy.visit('/example/simple')
      cy.get('.slick-slider').type('{rightarrow}')
      cy.get('.slick-track .slick-slide:nth-child(2)').should('be.visible')
      cy.get('.slick-slider').type('{leftarrow}')
      cy.get('.slick-track .slick-slide:nth-child(1)').should('be.visible')
    })
    it('disables key navigation', () => {
      cy.visit('/example/adaptive-height')
      cy.get('.slick-slider').type('{rightarrow}')
      cy.get('.slick-track .slick-slide:nth-child(1)').should('be.visible')
      cy.get('.slick-slider').type('{leftarrow}')
      cy.get('.slick-track .slick-slide:nth-child(1)').should('be.visible')
    })
  })
  describe('adaptiveHeight', () => {
    it('adapt slider height to match the height of the current slide', () => {
      cy.visit('/example/adaptive-height')
      let slideHeight
      cy.get('.slick-active').then($slide => {
        slideHeight = $slide[0].offsetHeight
      })
      cy.get('.slick-list').then($list => {
        expect($list[0].offsetHeight).to.equal(slideHeight)
      })
      cy.get('.slick-slider').type('{rightarrow}')
      cy.get('.slick-active').then($slide => {
        slideHeight = $slide[0].offsetHeight
      })
      cy.get('.slick-list').then($list => {
        expect($list[0].offsetHeight).to.equal(slideHeight)
      })
    })
  })
  describe('rtl', () => {
    it('makes key navigation in reverse', () => {
      cy.visit('/example/rtl')
      cy.get('.slick-slider').type('{rightarrow}')
      cy.get('.slick-track .slick-slide:nth-child(5)').should('be.visible')
      cy.get('.slick-slider').type('{leftarrow}')
      cy.get('.slick-track .slick-slide:nth-child(6)').should('be.visible')
    })
  })
})
