import exampleConfig from '../../../demo/pages/examples/configs'

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
  describe('arrows', () => {
    it('enables left/right arrows', () => {
      cy.visit('/example/simple')
      cy.get('.slick-prev').should('exist')
      cy.get('.slick-next').should('exist')
    })
    it('disables left/right arrows', () => {
      cy.visit('/example/auto-play')
      cy.get('.slick-prev').should('not.exist')
      cy.get('.slick-next').should('not.exist')
    })
  })
  describe('asNavFor', () => {
    it('syncs two slides', () => {
      cy.visit('/example/as-nav-for')
      let currentSlide
      cy.get('.carousel-wrapper:nth-of-type(1) .slick-prev').click()
      cy.get('.carousel-wrapper:nth-of-type(1) .slick-current').then($slide => {
        currentSlide = $slide.text()
      })
      cy.get('.carousel-wrapper:nth-of-type(2) .slick-current').then($slide => {
        expect($slide.text()).to.contains(currentSlide)
      })
    })
  })
  describe('autoplay', () => {
    it('should change the current slide over time', () => {
      cy.visit('/example/auto-play')
      let currentSlide
      cy.get('.slick-current').then($slide => {
        currentSlide = $slide.text()
      })
      cy.wait(200)
      cy.get('.slick-current').then($slide => {
        expect($slide.text()).not.to.equal(currentSlide)
      })
    })
  })
  describe('centerMode', () => {
    it('should center the current slide', () => {
      cy.visit('/example/center-mode')
      let slideCenter
      cy.getCenterXY('.slick-current').then(center => (slideCenter = center))
      cy.getCenterXY().then(viewportCenter => {
        expect(slideCenter.x).to.be.closeTo(viewportCenter.x, 10)
      })
    })
    it('should center the clicked slide', () => {
      cy.visit('/example/center-mode')
      cy.get('[data-index="1"]').click()
      let slideCenter
      cy.getCenterXY('[data-index="1"]').then(center => (slideCenter = center))
      cy.getCenterXY().then(viewportCenter => {
        expect(slideCenter.x).to.be.closeTo(viewportCenter.x, 10)
      })
    })
  })
  describe('centerPadding', () => {
    it('should set padding on inner slider', () => {
      cy.visit('/example/center-mode')
      cy.get('.slick-list').then($innerSlider => {
        const { centerPadding: settingsCenterPadding } = exampleConfig[
          'center-mode'
        ].settings
        const {
          paddingTop,
          paddingRight,
          paddingBottom,
          paddingLeft,
        } = getComputedStyle($innerSlider[0])
        expect(paddingLeft).to.equal(settingsCenterPadding)
        expect(paddingRight).to.equal(settingsCenterPadding)
        expect(paddingTop).to.equal('0px')
        expect(paddingBottom).to.equal('0px')
      })

      cy.visit('/example/vertical-swipe-to-slide')
      cy.get('.slick-list').then($innerSlider => {
        const { centerPadding: settingsCenterPadding } = exampleConfig[
          'vertical-swipe-to-slide'
        ].settings
        const {
          paddingTop,
          paddingRight,
          paddingBottom,
          paddingLeft,
        } = getComputedStyle($innerSlider[0])
        expect(paddingTop).to.equal(settingsCenterPadding)
        expect(paddingBottom).to.equal(settingsCenterPadding)
        expect(paddingLeft).to.equal('0px')
        expect(paddingRight).to.equal('0px')
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
