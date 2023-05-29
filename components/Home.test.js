import React from 'react'
import { render, screen } from '@testing-library/react-native'

import App from '../App'

describe('Component App :', ()=>{
    it('Show Hello There', async()=>{
        render(<App/>)
        expect(screen.getByText("Hello There")).toBeDefined()
    })
    it('Show Must Go On', async()=>{
        render(<App/>)
        expect(screen.getByText("Must Go On")).toBeDefined()
    })
})


// Présentation de JEST et son fonctionnement
function verifEmail (email) {
    const regex = /[@.]/
    return (email.length > 7 && regex.test(email)) ?email :false
}

describe('Test email demonstratif :', ()=>{
    it('Test email Bon', () => {
        expect(verifEmail('Bonjour@lolilol.fr')).toBe('Bonjour@lolilol.fr')
        expect(verifEmail('Olikujde89@moi.fr')).toBe('Olikujde89@moi.fr')
    })

    it('Test email Mauvais', () => {
        expect(verifEmail('Bon')).toBe(false)
        expect(verifEmail('Olikujde89moifr')).toBe(false)
    })
})


describe('Test pour montrer :', ()=>{
    it('Test Mathématique Bon', () => {
        expect(20+22).toBe(42)
    })

    it('Test Mathématique Mauvais', () => {
        expect(20+22).toBe(42) // modifier le nombre dans toBe pour test failed
    })
})