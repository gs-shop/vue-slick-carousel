import exampleConfig from '../../../demo/pages/examples/configs'

describe('Settings', () => {
  describe('accessibility', () => {
    it('enables key navigation', () => {
      cy.visit('/#/example/simple')
      cy.get('.slick-slider').type('{rightarrow}')
      cy.get('.slick-track .slick-slide:nth-child(2)').should('be.visible')
      cy.get('.slick-slider').type('{leftarrow}')
      cy.get('.slick-track .slick-slide:nth-child(1)').should('be.visible')
    })
    it('disables key navigation', () => {
      cy.visit('/#/example/adaptive-height')
      cy.get('.slick-slider').type('{rightarrow}')
      cy.get('.slick-track .slick-slide:nth-child(1)').should('be.visible')
      cy.get('.slick-slider').type('{leftarrow}')
      cy.get('.slick-track .slick-slide:nth-child(1)').should('be.visible')
    })
  })
  describe('adaptiveHeight', () => {
    it('adapt slider height to match the height of the current slide', () => {
      cy.visit('/#/example/adaptive-height')
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
      cy.visit('/#/example/simple')
      cy.get('.slick-prev').should('exist')
      cy.get('.slick-next').should('exist')
    })
    it('disables left/right arrows', () => {
      cy.visit('/#/example/auto-play')
      cy.get('.slick-prev').should('not.exist')
      cy.get('.slick-next').should('not.exist')
    })
  })
  describe('asNavFor', () => {
    it('syncs two slides', () => {
      cy.visit('/#/example/as-nav-for')
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
      cy.visit('/#/example/auto-play')
      let currentSlide
      cy.get('.slick-current').then($slide => {
        currentSlide = $slide.text()
      })
      cy.wait(2000)
      cy.get('.slick-current').then($slide => {
        expect($slide.text()).not.to.equal(currentSlide)
      })
    })
  })
  describe('centerMode', () => {
    it('should center the current slide', () => {
      cy.visit('/#/example/center-mode')
      let slideCenter
      cy.getCenterXY('.slick-current').then(center => {
        slideCenter = center
      })
      cy.getCenterXY().then(viewportCenter => {
        expect(slideCenter.x).to.be.closeTo(viewportCenter.x, 10)
      })
    })
    it('should center the clicked slide', () => {
      cy.visit('/#/example/center-mode')
      cy.get('[data-index="1"]').click()
      let slideCenter
      cy.getCenterXY('[data-index="1"]').then(center => {
        slideCenter = center
      })
      cy.getCenterXY().then(viewportCenter => {
        expect(slideCenter.x).to.be.closeTo(viewportCenter.x, 10)
      })
    })
  })
  describe('centerPadding', () => {
    it('should set padding on inner slider', () => {
      cy.visit('/#/example/center-mode')
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

      cy.visit('/#/example/vertical-swipe-to-slide')
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
  describe('dots', () => {
    it('should enable dots', () => {
      cy.visit('/#/example/simple')
      cy.get('.slick-dots').should('exist')
    })
    it('should disable dots', () => {
      cy.visit('/#/example/multiple-rows')
      cy.get('.slick-dots').should('not.exist')
    })
  })
  describe('dotClass', () => {
    it('should set given class to dots', () => {
      cy.visit('/#/example/simple')
      cy.get('.slick-dots').should('have.class', 'custom-dot-class')
    })
  })
  describe('draggable', () => {
    it('should enable drag ability', () => {
      cy.visit('/#/example/simple')
      let currentSlide
      cy.get('.slick-current').then($slide => {
        currentSlide = $slide.text()
      })
      cy.dragAndDrop('.slick-current', { x: -500 })
      cy.get('.slick-current').then($slide => {
        expect($slide.text()).not.to.equal(currentSlide)
      })
    })
  })
  describe('edgeFriction', () => {
    it('should resist drag', () => {
      cy.visit('/#/example/simple')
      const { edgeFriction } = exampleConfig['simple'].settings
      let originalCenter
      cy.getCenterXY('.slick-current').then(center => {
        originalCenter = center
      })
      cy.drag('.slick-current', { x: 500 })
      cy.getCenterXY('.slick-current').then(center => {
        expect(center.x).to.be.closeTo(
          originalCenter.x + 500 * edgeFriction,
          10,
        )
      })
    })
  })
  describe('focusOnSelect', () => {
    it('should move the clicked slide to the first', () => {
      cy.visit('/#/example/multiple')
      let firstSlideCenter
      cy.getCenterXY('.slick-current').then(center => {
        firstSlideCenter = center
      })
      cy.get('[data-index="1"]').click()
      cy.getCenterXY('[data-index="1"]').then(center => {
        expect(center.x).to.be.closeTo(firstSlideCenter.x, 10)
      })
    })
    it('should not move the clicked slide to the first if disabled', () => {
      cy.visit('/#/example/responsive')
      let firstSlideCenter
      cy.getCenterXY('.slick-current').then(center => {
        firstSlideCenter = center
      })
      cy.get('[data-index="1"]').click()
      cy.getCenterXY('[data-index="1"]').then(center => {
        expect(center.x).not.to.be.closeTo(firstSlideCenter.x, 10)
      })
    })
  })
  describe('infinite', () => {
    it('should navigate around ends', () => {
      cy.visit('/#/example/multiple')
      let currentSlide
      cy.get('.slick-current').then($slide => {
        currentSlide = $slide.text().trim()
      })
      cy.get('.slick-prev').click()
      cy.get('.slick-current').then($slide => {
        expect($slide.text().trim()).not.to.equal(currentSlide)
      })
    })
    it('should not navigate around ends if disabled', () => {
      cy.visit('/#/example/simple')
      let currentSlide
      cy.get('.slick-current').then($slide => {
        currentSlide = $slide.text().trim()
      })
      cy.get('.slick-prev').click()
      cy.get('.slick-current').then($slide => {
        expect($slide.text().trim()).to.equal(currentSlide)
      })
    })
  })
  describe('initialSlide', () => {
    it('should set first slide', () => {
      const { initialSlide } = exampleConfig['resizable'].settings
      cy.visit('/#/example/resizable')
      cy.get('.slick-current').then($slide => {
        expect($slide.text().trim()).to.equal(String(initialSlide + 1))
      })
    })
  })
  describe('pauseOnHover', () => {
    it('should pause auto play', () => {
      cy.visit('/#/example/pause-on-hover')
      cy.get('.slick-current').trigger('mouseover')
      let currentSlide
      cy.get('.slick-current').then($slide => {
        currentSlide = $slide.text().trim()
      })
      cy.wait(200)
      cy.get('.slick-current').then($slide => {
        expect($slide.text().trim()).to.equal(currentSlide)
      })
    })
  })
  describe('pauseOnDotsHover', () => {
    it('should pause auto play', () => {
      cy.visit('/#/example/pause-on-hover')
      cy.get('.slick-active > button').trigger('mouseover')
      let currentSlide
      cy.get('.slick-current').then($slide => {
        currentSlide = $slide.text().trim()
      })
      cy.wait(200)
      cy.get('.slick-current').then($slide => {
        expect($slide.text().trim()).to.equal(currentSlide)
      })
    })
  })
  describe('pauseOnDotsHover', () => {
    it('should pause auto play', () => {
      cy.visit('/#/example/pause-on-hover')
      cy.get('.slick-dots .slick-active').trigger('mouseover')
      let currentSlide
      cy.get('.slick-current').then($slide => {
        currentSlide = $slide.text().trim()
      })
      cy.wait(200)
      cy.get('.slick-current').then($slide => {
        expect($slide.text().trim()).to.equal(currentSlide)
      })
    })
  })
  describe('responsive', () => {
    it('should apply settings given to the screen sizes', () => {
      cy.visit('/#/example/responsive')
      cy.viewport(1025, 660)
      cy.get('.slick-list .slick-active').should('have.length', 4)
      cy.viewport(1024, 660)
      cy.get('.slick-list .slick-active').should('have.length', 3)
      cy.viewport(600, 660)
      cy.get('.slick-list .slick-active').should('have.length', 2)
      cy.viewport(480, 660)
      cy.get('.slick-list .slick-active').should('have.length', 1)
    })
  })
  describe('rows', () => {
    it('enables key navigation', () => {
      cy.visit('/#/example/multiple-rows')
      const { rows } = exampleConfig['multiple-rows'].settings
      cy.get('.slick-current > div').should('have.length', rows)
    })
  })
  describe('rtl', () => {
    it('makes key navigation in reverse', () => {
      cy.visit('/#/example/rtl')
      cy.get('.slick-slider').type('{rightarrow}')
      cy.get('.slick-track .slick-slide:nth-child(5)').should('be.visible')
      cy.get('.slick-slider').type('{leftarrow}')
      cy.get('.slick-track .slick-slide:nth-child(6)').should('be.visible')
    })
  })
  describe('swipe', () => {
    it('should enable swipe ability', () => {
      cy.visit('/#/example/simple')
      let currentSlide
      cy.get('.slick-current').then($slide => {
        currentSlide = $slide.text()
      })
      cy.swipe('.slick-current', { x: -500 }, true)
      cy.get('.slick-current').then($slide => {
        expect($slide.text()).not.to.equal(currentSlide)
      })
    })
  })
  describe('swipeToSlide', () => {
    it('should enable swiping number of slides irrespective of slidesToScroll', () => {
      cy.visit('/#/example/resizable')
      let firstSlideCenter
      cy.getCenterXY('.slick-current').then(center => {
        firstSlideCenter = center
      })
      let slideDiffX
      cy.getCenterXY('[data-index="2"]').then(center => {
        slideDiffX = firstSlideCenter.x - center.x
      })
      cy.swipe('.slick-current', { x: slideDiffX }, true)
      cy.get('.slick-current').then($slide => {
        expect($slide.text().trim()).to.equal('3')
      })
    })
  })
  describe('touchThreshold', () => {
    it('should decide whether move the slide or not', () => {
      cy.visit('/#/example/multiple')
      const { touchThreshold } = exampleConfig['multiple'].settings
      let currentSlide
      cy.get('.slick-current').then($slide => {
        currentSlide = $slide.text().trim()
      })
      cy.getBoundingClientRect('.slick-list').then(({ width: slideWidth }) => {
        // swipe less than threshold
        cy.swipe('.slick-current', { x: slideWidth / touchThreshold - 10 })
        cy.get('.slick-current').then($slide => {
          expect($slide.text().trim()).to.equal(currentSlide)
        })
        // swipe more than threshold
        cy.swipe('.slick-current', { x: slideWidth / touchThreshold + 10 })
        cy.get('.slick-current').then($slide => {
          expect($slide.text().trim()).not.to.equal(currentSlide)
        })
      })
    })
  })
})
