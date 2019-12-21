// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

Cypress.Commands.add('getCenterXY', el => {
  if (el) {
    cy.get(el).then($el => {
      const { left, right, top, bottom } = $el[0].getBoundingClientRect()

      return { x: (left + right) / 2, y: (top + bottom) / 2 }
    })
  } else {
    const { viewportWidth, viewportHeight } = Cypress.config()

    return { x: viewportWidth / 2, y: viewportHeight / 2 }
  }
})

Cypress.Commands.add('drag', (el, diff) => {
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
      .trigger('mousedown', { which: 1 }) // mouse down left button
      .trigger('mousemove', coordination)
  })
})

Cypress.Commands.add('dragAndDrop', (el, diff) => {
  return cy.drag(el, diff).then(() => {
    return cy.get(el).trigger('mouseup', { force: true })
  })
})
