// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

Cypress.Commands.add('getBoundingClientRect', el => {
  cy.get(el).then($el => $el[0].getBoundingClientRect())
})

Cypress.Commands.add('getCenterXY', el => {
  if (el) {
    cy.getBoundingClientRect(el).then(rect => ({
      x: (rect.left + rect.right) / 2,
      y: (rect.top + rect.bottom) / 2,
    }))
  } else {
    const { viewportWidth, viewportHeight } = Cypress.config()

    return { x: viewportWidth / 2, y: viewportHeight / 2 }
  }
})

Cypress.Commands.add('drag', (el, diff, touch = false) => {
  return cy.getCenterXY(el).then(center => {
    const coordination = {}
    if (typeof diff.x === 'number') {
      coordination.clientX = center.x + diff.x
    }
    if (typeof diff.y === 'number') {
      coordination.clientY = center.y + diff.y
    }
    return cy
      .get(el)
      .trigger(touch ? 'touchstart' : 'mousedown', { which: 1 }) // mouse down left button
      .trigger(touch ? 'touchmove' : 'mousemove', coordination)
  })
})

Cypress.Commands.add('dragAndDrop', (el, diff, touch) => {
  return cy.drag(el, diff, touch).then(() => {
    return cy.get(el).trigger(touch ? 'touchend' : 'mouseup', { force: true })
  })
})

Cypress.Commands.add('swipe', (el, diff) => {
  return cy.dragAndDrop(el, diff, true)
})
